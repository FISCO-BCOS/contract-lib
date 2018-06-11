
/**
 * @file: demoSafeMathTest.js
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
var abiDecoder = require('abi-decoder');


if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider(config.HttpProvider));
}

function getAbi(file){
  var abi=JSON.parse(fs.readFileSync(config.Ouputpath+"./"/*+file+".sol:"*/+file+".abi",'utf-8'));
  return abi;
}

console.log(config);

console.log("========== LibSafeMath test begin ========");

var filename="SafeMathTest";

function receiptParser(test_case, receipt) {
  //parser event log for mul_test result
  abiDecoder.addABI(getAbi(filename));
  const decodeLogs = abiDecoder.decodeLogs(receipt.logs);
  if(decodeLogs != null) {
    if(decodeLogs.length > 0) {
      console.log(test_case + " Success.");
    } else {
      console.log(test_case + " Failed.");
    }
  } else {
    console.log(test_case + " Failed..");
  }
}

(async function(){
   //SafeMathTest contract deploy
   var SafeMathTestReicpt= await web3sync.rawDeploy(config.account, config.privKey,  filename);
   var instance=web3.eth.contract(getAbi(filename)).at(SafeMathTestReicpt.contractAddress);

   //test for 123456 * 654321
   var func = "mul_test()";
   var params = [];
   var receipt = await web3sync.sendRawTransaction(config.account, config.privKey, SafeMathTestReicpt.contractAddress, func, params);
   receiptParser("mul_test", receipt);

    //test for 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff * 654321
    var func = "mul_overflow_test()";
    var params = [];
    var receipt = await web3sync.sendRawTransaction(config.account, config.privKey, SafeMathTestReicpt.contractAddress, func, params);
    receiptParser("mul_overflow_test", receipt);

   //test for 2 - 1
   var func = "sub_test()";
   var params = [];
   var receipt = await web3sync.sendRawTransaction(config.account, config.privKey, SafeMathTestReicpt.contractAddress, func, params);
   receiptParser("sub_test", receipt);

    //test for 1 - 2
    var func = "sub_overflow_test()";
    var params = [];
    var receipt = await web3sync.sendRawTransaction(config.account, config.privKey, SafeMathTestReicpt.contractAddress, func, params);
    receiptParser("sub_overflow_test", receipt);

   //test for add 1 + 1
   var func = "add_test()";
   var params = [];
   var receipt = await web3sync.sendRawTransaction(config.account, config.privKey, SafeMathTestReicpt.contractAddress, func, params);
   receiptParser("add_test", receipt);

    //test for add 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff + 1
    var func = "add_overflow_test()";
    var params = [];
    var receipt = await web3sync.sendRawTransaction(config.account, config.privKey, SafeMathTestReicpt.contractAddress, func, params);
    receiptParser("add_overflow_test", receipt);

   //test for 111000 / 111
   var func = "div_test()";
   var params = [];
   var receipt = await web3sync.sendRawTransaction(config.account, config.privKey, SafeMathTestReicpt.contractAddress, func, params);
   receiptParser("div_test", receipt);

  //test for 111000 / 0
  var func = "div_overflow_test()";
  var params = [];
  var receipt = await web3sync.sendRawTransaction(config.account, config.privKey, SafeMathTestReicpt.contractAddress, func, params);
  receiptParser("div_overflow_test", receipt);

})()


console.log("========== AddressUtils test end ========");