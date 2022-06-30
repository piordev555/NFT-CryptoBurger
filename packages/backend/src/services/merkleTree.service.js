/**
 * This is the function for the backend:
 * 
 * You receive the address at the endpoint
 * 
 */
 const { MerkleTree } = require('merkletreejs');
 const keccak256 = require('keccak256');


const verifyWhitelist = (address) => {
    const whiteListArray = require('../whitelist/whitelist').whitelist.array;
    console.log('whitelistarray: ',whiteListArray);
    console.log('address: ', address);
    const leaves = whiteListArray.map(v => keccak256(v));
    const tree = new MerkleTree(leaves, keccak256, { sort: true });
    const root = tree.getHexRoot();
    const leaf = keccak256(address);
    const proof = tree.getHexProof(leaf);
    const verified = tree.verify(proof, leaf, root);
    console.log('leaf: ', leaf);
    return {proof, leaf, verified};
}

module.exports = {
    verifyWhitelist
}