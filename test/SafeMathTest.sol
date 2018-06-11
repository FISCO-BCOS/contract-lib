pragma solidity ^0.4.11;


import "LibSafeMath.sol";

contract SafeMathTest {

  event Mul(uint256 a, uint256 b, uint256 r);
  event Div(uint256 a, uint256 b, uint256 r);
  event Sub(uint256 a, uint256 b, uint256 r);
  event Add(uint256 a, uint256 b, uint256 r);

  //test for 123456 * 654321
  function mul_test() public {
    uint256 a=123456;
    uint256 b=654321;
    uint256 result = LibSafeMath.mul(a, b);
    Mul(a,b,result);
  }

  //test for 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff * 654321
  function mul_overflow_test() public {
    uint256 a=0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;
    uint256 b=654321;
    uint256 result = LibSafeMath.mul(a, b);
    Mul(a,b,result);
  }

  //test for 2 - 1
  function sub_test() public {
    uint256 a=2;
    uint256 b=1;
    uint256 result = LibSafeMath.sub(a, b);
    Sub(a,b,result);
  }

  //test for 1 - 2
  function sub_overflow_test() public {
    uint256 a=1;
    uint256 b=2;
    uint256 result = LibSafeMath.sub(a, b);
    Sub(a,b,result);
  }
  
   //test for 111000 / 111
  function div_test() public {
    uint256 a=111000;
    uint256 b=111;
    uint256 result = LibSafeMath.div(a, b);
    Div(a,b,result);
  }

   //test for 111000 / 0
  function div_overflow_test() public {
    uint256 a=111000;
    uint256 b=0;
    uint256 result = LibSafeMath.div(a, b);
    Div(a,b,result);
  }

  //test for add 1 + 1
  function add_test() public {
    uint256 a = 1;
    uint256 b = 1;

    uint256 result = LibSafeMath.add(a, b);
    Add(a,b,result);
  }

    //test for add 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff + 1
  function add_overflow_test() public {
    uint256 a=0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff; // assign -1 to uint256 , a will be the max number of uint256
    uint256 b=1;

    uint256 result = LibSafeMath.add(a, b);
    Add(a,b,result);
  }
}
