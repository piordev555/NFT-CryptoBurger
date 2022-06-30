/**
 * Whitelist
 * Add addresses in whitelist.js in this directory
 * Run: node calculate_root.js
 * Insert the result in the contract using changeRoot function
 */

const chalk = require('chalk');
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
const whitelistArray = require('../whitelist/whitelist.js');

const calculate = () => {
    const leaves = whitelistArray.whitelist.array.map(v => keccak256(v));
    const tree = new MerkleTree(leaves, keccak256, { sort: true });
    const root = tree.getHexRoot();

    console.log(chalk.green('Remember to add root to contract:'));
    console.log(chalk.greenBright('root: ', root));
}

calculate();