pragma solidity ^0.4.11;

import "LibAddressUtil.sol";
/**
 * LibAddressUtil.sol test case
 */
contract AddressUtilTest {
    using LibAddressUtil for *;

    //isContract call
    function isContract(address a) constant public returns(bool) {
        return a.isContract();
    }
    
    //isContract call
    function isContractZero() constant public returns(bool) {
        address a = 0x0;
        return a.isContract(); //0x0 is not the address of contract , this should return false
    }

   //isContract call
    function isContractSelf() constant public returns(bool) {
        address a = this;
        return a.isContract(); //this is the address of contract self, this should return true
    }
}
