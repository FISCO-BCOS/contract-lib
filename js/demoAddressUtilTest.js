/**
 * @file: demoAddressUtilTest.js
 * @author: fisco-dev
 * 
 * @date: 2018
 */

var Web3= require('web3');
var config=require('../web3lib/config');
var fs=require('fs');
var execSync =require('child_process').execSync;
var web3sync = require('../web3lib/web3sync');
var BigNumber = require('bignumber.js');

function getAbi(file){
  var abi=JSON.parse(fs.readFileSync(config.Ouputpath+"./"/*+file+".sol:"*/+file+".abi",'utf-8'));
  return abi;
}

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider(config.HttpProvider));
}

//console.log(config);

console.log("========== AddressUtils test begin ========");

var filename="AddressUtilTest";

(async function(){

  //AddressUtilTest contract deploy
  var AddressUtilTestReicpt= await web3sync.rawDeploy(config.account, config.privKey,  filename);
  var instance=web3.eth.contract(getAbi(filename)).at(AddressUtilTestReicpt.contractAddress);

  //AddressUtilTest isContract test, paramter is address
  b=instance.isContract(AddressUtilTestReicpt.contractAddress);
  console.log("isContract(" + AddressUtilTestReicpt.contractAddress + "), result => :"+b.toString());
  
  //AddressUtilTest isContractZero test
  b=instance.isContractZero();
  console.log("isContractZero, result => :"+b.toString());
  
  //AddressUtilTest isContractSelf test
  b=instance.isContractSelf();
  console.log("isContractSelf, result => :"+b.toString());

})()


console.log("========== AddressUtils test end ========");