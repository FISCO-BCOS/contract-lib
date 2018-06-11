pragma solidity ^0.4.11;

import "LibString.sol";

contract StringTest {
    using LibString for *;

    event split_length(uint256 length);
    event split_string(uint256 index, string s);

    string[] public slist;
    function StringTest(string s, string s0, string s1, string s2) {
        slist.push(s);
        slist.push(s0);
        slist.push(s1);
        slist.push(s2);
    }

    function _inArray(string s) public constant returns(bool) {
        return s.inArray(slist);
    }

    function _inArrayNoCase(string s) public constant returns(bool) {
        return s.inArrayNoCase(slist);
    }

    function _compare(string s ,string _s) public constant returns(int8) {
        return s.compare(_s);  
    }

    function _compareNoCase(string s, string _s) public constant returns(int8) {
        return s.compareNoCase(_s);
    }

    function _equals(string s, string _s) public constant returns(bool) {
        return s.equals(_s);
    }

    function _equalsNoCase(string s, string _s) public constant returns(bool) {
        return s.equalsNoCase(_s);
    }

    function _substrString(string s, uint _start, uint _len) public constant returns(string) {
        return s.substr(_start, _len);
    }

    function _concat(string s, string _s) public constant returns(string) {
        return s.concat(_s);
    }

    function _trim(string s) public constant returns(string) {
        return s.trim();
    }

    function _trim(string s, string chars) public constant returns(string) {
        return s.trim(chars);
    }

    function _indexOf(string s, string _s) public constant returns(int) {
        return s.indexOf(_s);
    }

    function _indexOf(string s, string _s, uint pos) public constant returns(int) {
        return s.indexOf(_s, pos);
    }

    function _toInt(string s) public constant returns(int) {
        return s.toInt();
    }

    function _toAddress(string s) public constant returns(address) {
        return s.toAddress();
    }

     function _toUpper(string s) public constant returns(string) {
        return s.toUpper();
    }

    function _toLower(string s) public constant returns(string) {
        return s.toLower();
    }

    function _toKeyValue(string key, string value) public constant returns(string) {
        return LibString.toKeyValue(value, key);
    }

    function _getStringValueByKey(string key, string kv) public constant returns(string) {
        return kv.getStringValueByKey(key);
    }

    function _getIntValueByKey(string key, string kv) public constant returns(int256) {
        return kv.getIntValueByKey(key);
    }

    function _keyExists(string kv, string key) public constant returns(bool) {
        return kv.keyExists(key);
    }

    function _split(string s, string delim) public {
        s.split(delim, slist);
        split_length(slist.length);
        for(uint256 i=0;i<slist.length;++i) {
            split_string(i, slist[i]);
        }
    }
}