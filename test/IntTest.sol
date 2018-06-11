pragma solidity ^0.4.11;

import "LibInt.sol";
/**
 * LibInt.sol test case
 */
contract IntTest {
    using LibInt for *;
    // LibInt.sol  toString(uint256)  test
    function toStringU(uint256 u) public constant returns(string) {
        return u.toString();
    }

    // LibInt.sol  toString(int256)  test
    function toStringI(int256 i) public constant returns(string) {
        return i.toString();
    }

    // LibInt.sol  toHexString(uint256)  test
    function toHexString(uint256 u) public constant returns(string) {
        return u.toHexString();
    }

    // LibInt.sol  toHexString64(uint256)  test
    function toHexString64(uint256 u) public constant returns(string) {
        return u.toHexString64();
    }

    // LibInt.sol  toKeyValue(uint256, string) test
    function toKeyValueU(uint256 u, string s) public constant returns(string) {
        return u.toKeyValue(s);
    }

    // LibInt.sol  toKeyValue(int256, string) test
    function toKeyValueI(int256 i, string s) public constant returns(string) {
        return i.toKeyValue(s);
    }

    // LibInt.sol  toAddrString(int256) test
    function toAddrString(uint256 u) public constant returns(string) {
        return u.toAddrString();
    }
}