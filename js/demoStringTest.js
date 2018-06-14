/**
 * @file: demoStringTest.js
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

console.log("========== StringTest test begin ========");

(async function(){

    var filename="StringTest";

    var types = ["string", "string", "string", "string"];
    var slist = ["Hello", "hello0", "HelloWorld", "helloworld"];
    //StringSimpleTest contract deploy
    var StringSimpleTestReicpt= await web3sync.rawDeploy(config.account, config.privKey,  filename, types, slist);
    var instance=web3.eth.contract(getAbi(filename)).at(StringSimpleTestReicpt.contractAddress);

    var s0="Hello";
    var s1="hello";
    //LibString compare
    _r=instance._compare(s0, s1);
    console.log(" LibString compare( \"" + s0 + "\",\"" + s1 + "\" )  => :"+_r);

    var s0="Hello";
    var s1="Hello";
    //LibString compare
    _r=instance._compare(s0, s1);
    console.log(" LibString compare( \"" + s0 + "\",\"" + s1 + "\" )  => :"+_r);

    var s0="Hello";
    var s1="hello";
    //LibString _compareNoCase
    _r=instance._compareNoCase(s0, s1);
    console.log(" LibString compareNoCase( \"" + s0 + "\",\"" + s1 + "\" )  => :"+_r);

    var s0="Hello";
    var s1="hello";
    //LibString equals
    _r=instance._equals(s0, s1);
    console.log(" LibString equals( \"" + s0 + "\",\"" + s1 + "\" )  => :"+_r);

    //LibString equalsNoCase
    _r=instance._equalsNoCase(s0, s1);
    console.log(" LibString equalsNoCase( \"" + s0 + "\",\"" + s1 + "\" )  => :"+_r);

    var s="aaaHelloWorld";
    var pos=3;
    var len=30
     //LibString substrString
     _r=instance._substrString(s, pos, len);
     console.log(" LibString substrString( \"" + s + "\"," + pos + "," + len + " )  => :"+_r);

     var s0="Hello";
     var s1=" World";
      //LibString concat
      _r=instance._concat(s0, s1);
      console.log(" LibString concat( \"" + s0 + "\",\"" + s1 + "\" ) => :"+_r);

      var s=" \t HelloWorld \t";
      //LibString trim
      _r=instance._trim(s);
      console.log(" LibString trim( \"" + s + "\" ) => :"+_r);

      var s0="aaaaaaHelloWorldbbbbbbaaaaaaHelloWorldbbbbbb";
      var s1="Hello";
      //LibString indexOf
      _r=instance._indexOf(s0,s1);
      console.log(" LibString indexOf( \"" + s0 + "\",\"" + s1 + "\" ) => :"+_r);
      
      //LibString indexOf
      var pos = 10
      _r=instance._indexOf(s,s1,10);
      console.log(" LibString indexOf( \"" + s + "\",\"" + s0 + "\"," + pos +" ) => :"+_r);

      var s = "10000";
      //LibString toInt
      _r=instance._toInt(s);
      console.log(" LibString toInt( \"" + s + "\" ) => :"+_r);

      var s = "0x123";
      //LibString toAddress
      _r=instance._toAddress(s);
      console.log(" LibString toAddress( \"" + s + "\" ) => :"+_r);
      
      var s="Hello";
      //LibString toUpper
      _r=instance._toUpper(s);
      console.log(" LibString toUpper( \"" + s + "\" ) => :"+_r);
      
      //LibString toLower
      _r=instance._toLower(s);
      console.log(" LibString toLower( \"" + s + "\" ) => :"+_r);

      var key = "key";
      var value = "100000";
      //LibString toKeyValue
      _r=instance._toKeyValue(key, value);
      console.log(" LibString toKeyValue( \"" + key + "\",\"" + value + "\" ) => :"+_r);

      var kv=_r;
      //LibString keyExists
      _r=instance._keyExists(kv, key);
      console.log(" LibString keyExists( \"" + kv + "\",\"" + key + "\" ) => :"+_r);

      //LibString getStringValueByKey
      _r=instance._getStringValueByKey(key, kv);
      console.log(" LibString getStringValueByKey( \"" + key + "\",\"" + kv + "\" ) => :"+_r);

      //LibString getIntValueByKey
      _r=instance._getIntValueByKey(key, kv);
      console.log(" LibString getIntValueByKey( \"" + key + "\",\"" + kv + "\" ) => :"+_r);

      var s="hello";
      //LibString inArray
      _r=instance._inArray(s);
      console.log(" LibString inArray( \"" + s + "\" ) => :"+_r);

      var s="hello";
      //LibString inArrayNoCase
      _r=instance._inArrayNoCase(s);
      console.log(" LibString inArrayNoCase( \"" + s + "\" ) => :"+_r);

      var s="HelloaaWorldaa!";
      var delim="a";
      var func = "_split(string,string)";
      var params = [s, delim];
      var receipt = await web3sync.sendRawTransaction(config.account, config.privKey, StringSimpleTestReicpt.contractAddress, func, params);
      //parser event log for split result
      abiDecoder.addABI(getAbi(filename));
      const decodeLogs = abiDecoder.decodeLogs(receipt.logs);
      var length = 0;
      var split_s_list = [];
      for(var i=0;i<decodeLogs.length;++i) {
          if (decodeLogs[i].name == "log_string_list_length") {
            var event = decodeLogs[i]["events"][0].value;
            //console.log("split result length => " + event.value);
            length = event.value
          } else if (decodeLogs[i].name == "log_string") {
            var event = decodeLogs[i]["events"][1].value;
            split_s_list.push(event.value);
          }
      }

      console.log(" LibString split( \"" + s + "\" ," + delim + ") => " + split_s_list.toString() );

    })()


console.log("========== StringTest test end ========");