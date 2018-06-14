/**
 * @file: demoIntTest.js
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

console.log("========== IntTest test begin ========");

var filename="IntTest";

(async function(){
    //IntTest contract deploy
    var IntTestReicpt= await web3sync.rawDeploy(config.account, config.privKey,  filename);
    var instance=web3.eth.contract(getAbi(filename)).at(IntTestReicpt.contractAddress);

    var u = 9999999
    var i = -9999999
    var s = "LibInt library test."

    //toString(uint256)
    _r=instance.toStringU(u);
    console.log(" uint256( " + u + " ) toString => :"+_r);

    //toString(int256)
    _r=instance.toStringI();
    console.log(" int256( " + i + " ) toString => :"+_r);

    //toHexString(int256)
    _r=instance.toHexString(u);
    console.log(" uint256( " + u + " ) toHexString => :"+_r);

    //toHexString64(int256)
    _r=instance.toHexString64(u);
    console.log(" uint256( " + u + " ) toHexString64 => :"+_r);

    //toKeyValue(uint256, string)
    _r=instance.toKeyValueU(u, s);
    console.log(" uint256( " + u + " ) string( \"" + s + "\" ) toKeyValue => :"+_r);
    
    //toKeyValue(int256, string)
    _r=instance.toKeyValueI(i, s);
    console.log(" int256( " + i + " ) string( \"" + s + "\" ) toKeyValue => :"+_r);

    //toAddrString(uint256)
    _r=instance.toAddrString(u);
    console.log(" uint256( " + u + " ) toAddrString => :"+_r);

    })()


console.log("========== IntTest test end ========");