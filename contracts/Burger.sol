/*
CRYPTOBURGERS
Web: https://cryptoburgers.io
Telegram: https://t.me/cryptoburgersnft
*/

// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

import "./BurgToken.sol";

contract Burger is
    ERC721EnumerableUpgradeable,
    PausableUpgradeable,
    OwnableUpgradeable,
    ReentrancyGuardUpgradeable
{
    using SafeMathUpgradeable for uint256;
    using SafeERC20Upgradeable for IERC20Upgradeable;
    using AddressUpgradeable for address;
    using StringsUpgradeable for uint256;

    mapping(uint256 => uint8) private boxTypeById;

    uint256[] private boxPriceBNB;
    uint256[] private boxPriceBURG;

    // string public strBaseTokenURI =
    //     "https://backend.cryptoburgers.io/metadata/";
    string private strBaseTokenURI;

    // true BNB - false BURG
    bool private saleBNBEnabled;

    // Change to true in the mainnet deploy.
    bool private whitelistActive;
    bytes32 private root;
    address BURG;

    uint256[] private _tokenSupply;
    uint64[] private _limitTokenAmountPerBoxtype;

    event MintNFT(
        address indexed _to,
        uint256 indexed _id,
        uint8 indexed _boxType
    );

    event whitelistModeChanged(bool isWhiteList);

    constructor() initializer {}

    function initialize() public initializer {
        __ERC721_init("Burger", "BURGER");
        boxPriceBNB = [1e16, 2 * 1e16, 3 * 1e16];
        boxPriceBURG = [1e16, 2 * 1e16, 3 * 1e16];
        strBaseTokenURI = "http://localhost:8080/api/metadta/";
        saleBNBEnabled = true;
        whitelistActive = false;
        root = 0xa2fc709bf2f4b9cb44b8a9114485d12d4877bb1beedd81f62f4f85a8056480ee;
        _tokenSupply = [0, 0, 0];
        _limitTokenAmountPerBoxtype = [4400, 2200, 900];
        // Uncomment if we want deploy paused
        // _pause();
    }

    function _leaf(address account) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(account));
    }

    function mintWhitelist(bytes32[] memory proof, uint8 boxType)
        external
        payable
        whenNotPaused
        nonReentrant
    {
        require(whitelistActive, "Whitelist is not active");
        require(msg.value >= boxPriceBNB[boxType], "Not enought BNB");
        require(
            _tokenSupply[boxType] < _limitTokenAmountPerBoxtype[boxType],
            "Limitation has been reached"
        );
        bool isWhitelisted = verifyWhitelist(_leaf(msg.sender), proof);

        if (isWhitelisted) {
            mint(msg.sender, boxType);
        } else {
            revert("Not whitelisted");
        }

        payable(msg.sender).transfer(msg.value - boxPriceBNB[boxType]);
    }

    function mintOwner(address _to, uint8 boxType)
        external
        onlyOwner
        returns (uint256)
    {
        return mint(_to, boxType);
    }

    function mintForGoldenTicket(address _to)
        external
        onlyOwner
        returns (uint256)
    {
        return mint(_to, 1);
    }

    function mintNormal(uint8 boxType)
        external
        payable
        whenNotPaused
        nonReentrant
        returns (uint256)
    {
        require(!whitelistActive, "Whitelist is active");
        require(saleBNBEnabled, "Sales in BNB are not permitted");
        require(msg.value >= boxPriceBNB[boxType], "Not enought BNB");
        uint256 idMinted = mint(msg.sender, boxType);
        payable(msg.sender).transfer(msg.value - boxPriceBNB[boxType]);
        return idMinted;
    }

    function mintNormalBURG(uint8 boxType)
        external
        whenNotPaused
        nonReentrant
        returns (uint256)
    {
        require(!whitelistActive, "Whitelist is active");
        require(!saleBNBEnabled, "Sales in BURG are not permitted");
        require(
            IERC20Upgradeable(BURG).allowance(msg.sender, address(this)) >=
                boxPriceBURG[boxType],
            "Not enought allowance"
        );

        BurgToken(BURG).transferFrom(
            msg.sender,
            owner(),
            boxPriceBURG[boxType].mul(8).div(100)
        );
        BurgToken(BURG).burn(
            msg.sender,
            boxPriceBURG[boxType].mul(92).div(100)
        );

        uint256 idMinted = mint(msg.sender, boxType);
        return idMinted;
    }

    function mint(address _to, uint8 boxType) internal returns (uint256) {
        //boxType: 0, 1, 2
        uint256 tokenId = totalSupply();
        _safeMint(_to, tokenId);
        boxTypeById[tokenId] = boxType;
        _tokenSupply[boxType]++;
        emit MintNFT(_to, tokenId, boxType);

        return tokenId;
    }

    function walletOfOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 tokenCount = balanceOf(_owner);
        uint256[] memory tokensId = new uint256[](tokenCount);
        for (uint256 i = 0; i < tokenCount; i++) {
            tokensId[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokensId;
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
    }

    function changeBaseTokenURI(string memory newBaseTokenURI)
        external
        onlyOwner
    {
        strBaseTokenURI = newBaseTokenURI;
    }

    function changeWhitelistState(bool newState) external onlyOwner {
        whitelistActive = newState;
        emit whitelistModeChanged(whitelistActive);
    }

    function changeRoot(bytes32 newRoot) external onlyOwner {
        root = newRoot;
    }

    function verifyWhitelist(bytes32 leaf, bytes32[] memory proof)
        public
        view
        returns (bool)
    {
        bytes32 computedHash = leaf;

        for (uint256 i = 0; i < proof.length; i++) {
            bytes32 proofElement = proof[i];

            if (computedHash < proofElement) {
                // Hash(current computed hash + current element of the proof)
                computedHash = keccak256(
                    abi.encodePacked(computedHash, proofElement)
                );
            } else {
                // Hash(current element of the proof + current computed hash)
                computedHash = keccak256(
                    abi.encodePacked(proofElement, computedHash)
                );
            }
        }

        // Check if the computed hash (root) is equal to the provided root
        return computedHash == root;
    }

    function updateBoxPricesBNB(uint256[] memory _newBoxPricesBNB)
        external
        onlyOwner
        returns (bool)
    {
        boxPriceBNB = _newBoxPricesBNB;
        return true;
    }

    function updateBoxPricesBURG(uint256[] memory _newBoxPricesBURG)
        external
        onlyOwner
        returns (bool)
    {
        boxPriceBURG = _newBoxPricesBURG;
        return true;
    }

    function _baseURI() internal view override returns (string memory) {
        return strBaseTokenURI;
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(_exists(_tokenId), "Token does not exist");
        return string(abi.encodePacked(_baseURI(), _tokenId.toString()));
    }

    function getboxTypeById(uint256 _tokenId) external view returns (uint8) {
        require(_exists(_tokenId), "Token does not exist");
        return boxTypeById[_tokenId];
    }

    function pause() external onlyOwner returns (bool) {
        _pause();
        return true;
    }

    function unpause() external onlyOwner returns (bool) {
        _unpause();
        return true;
    }

    function setBURGAddress(address _newAddress)
        external
        onlyOwner
        returns (bool)
    {
        BURG = _newAddress;
        return true;
    }

    function getPriceType() external view returns (string memory) {
        if (saleBNBEnabled) {
            return "BNB";
        } else {
            return "BURG";
        }
    }

    function changeEnableSaleBNB(bool newValue) external onlyOwner {
        saleBNBEnabled = newValue;
    }

    function getBoxPriceBNB(uint8 boxID) external view returns(uint256) {
        return boxPriceBNB[boxID];
    }

    function getBoxPriceBURG(uint8 boxID) external view returns(uint256) {
        return boxPriceBURG[boxID];
    }

    function getBaseTokenURI() external view returns(string memory) {
        return strBaseTokenURI;
    }

    function isSaleBNBEnabled() external view returns(bool) {
        return saleBNBEnabled;
    }

    function isWhitelistActive() external view returns(bool) {
        return whitelistActive;
    }

    function whitelistRoot() external view returns(bytes32) {
        return root;
    }

    function getTokenSupply(uint8 boxId) external view returns(uint256) {
        return _tokenSupply[boxId];
    }
    function getLimitTokenAmountPerBoxType(uint8 boxId) external view returns(uint256) {
        return _limitTokenAmountPerBoxtype[boxId];
    }

}
