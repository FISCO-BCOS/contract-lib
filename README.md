# 简介  
当前, solidity语言并没有统一的标准库, 用户使用时, 即使是在其他语言中使用的最简单的功能模块, 可能也需要自己进行封装, 很是影响开发效率, 而且比较容易出现bug。  
为此, fisco-bcos收集了一些最基本的library模块, 期望能改善用户的solidity编程体验, 并且附带提供了一个solidity的资料的地址。 

# 目录介绍  
## lib 
库目录.  
## test 
solidity测试代码, 供js调用测试.  
## js 
js测试代码, 使用web3调用test目录中的测试合约.

# 库  
## LibAddressUtil  
提供对address操作的基本接口.   

接口： function isContract(address addr) internal returns (bool)  
功能： 判断一个地址是否是合约的地址.  
参数： address addr  ：输入地址.  
返回： addr是一个合约的地址, 返回true, 否则返回false.

## LibInt  
提供对uint256、int256操作的基本接口.  

接口: function toString(uint256 _self) internal returns (string _ret)  
功能: 将uint256类型转换为字符串.  
参数: uint256 _self ：整形输入.  
返回: 转换的字符串.  

接口: function toHexString(uint256 _self) internal returns (string _ret)  
功能: 将uint256类型转换为16进制的字符串.  
参数: uint256 _self ：整形输入.  
返回: 转换的16进制字符串.   

接口: function toHexString64(uint256 _self) internal returns (string _ret)  
功能: 将uint256类型转换为定长的字符串, 长度为64字符.  
参数: uint256 _self ：整形输入.
返回: 定长的16进制字符串.  

接口: function toString(int256 _self) internal returns (string _ret)  
功能: uint256类型转换为字符串.  
参数: int256 _self ：整形输入.  
返回: 转换的字符串.  

接口: function toAddrString(uint256 _self) internal returns (string _ret)  
功能: 将uint256转换为字符串格式的address类型, 返回字符以"0x"开头.  
参数: uint256 _self : 整形输入.  
返回: 转换的字符串.  

接口: function toKeyValue(uint256 _self, string _key) internal returns (string _ret)  
功能: 将字符串_key, 整形_self转换为键值对格式.  
参数：string _key ： 字符串输入, kv键值对的key.  
uint256 _self ： 整形输入, kv键值对的value.  
返回：转换的kv键值对字符串形式.  

接口: function toKeyValue(int256 _self, string _key) internal returns (string _ret)  
功能: 将字符串_key, 整形_self转换为键值对格式.  
参数：string _key ： 字符串输入, kv键值对的key.  
int256 _self ： 整形输入, kv键值对的value.  
返回：转换的kv键值对字符串形式.  

## LibString  
接口: function compare(string _self, string _str) internal returns (int8 _ret)  
功能: 比较字符串.  
参数: string _self、string _str 需要比较的字符串.  
返回: _self大于_str, 返回1, 小于返回-1, 等于返回0.  

接口: function compareNoCase(string _self, string _str) internal returns (int8 _ret)  
功能: 比较字符串, 忽略大小写.  
参数: string _self、string _str 需要比较的字符串.  
返回: _self大于_str, 返回1, 小于返回-1, 等于返回0.  

接口: function equals(string _self, string _str) internal returns (bool _ret)  
功能: 判断字符串是否相等.  
参数: string _self、string _str 需要比较的字符串.  
返回: 相等返回true, 不相等返回false.  

接口: function equalsNoCase(string _self, string _str) internal returns (bool _ret)  
功能: 判断字符串是否相等, 忽略大小写.
参数: string _self、string _str 需要比较的字符串.  
返回: 相等返回true, 不相等返回false.  


接口: function substr(string _self, uint _start, uint _len) internal returns (string _ret)  
功能: 截取字符串.  
参数: string _self : 要截取的字符串.  uint _start : 截取位置.  uint _len ： 截取长度.  
返回: 截取的字符串.  

接口: function concat(string _self, string _str) internal returns (string _ret)  
功能: 拼接字符串.  
参数: string _self、string _str需要拼接的字符串.  
返回: 拼接生成的字符串.  

接口: function trim(string _self) internal returns (string _ret)  
功能: 去掉字符串两边的空白字符.  
参数: string _self 输入字符串. 
返回: 去除空白字符之后的字符串. 

接口: function trim(string _self, string _chars) internal returns (string _ret)  
功能: 去掉字符串两边的指定的字符.  
参数: string _self : 输入字符.  string _chars : 需要去除的字符的集合.  
返回: 去除指定字符之后的字符串.  

接口: function split(string _self, string _delim, string[] storage _array) internal  
功能: 字符串分割.  
参数: string _self : 需要分割的字符串. string _delim : 分隔符. string[] storage _array : 分割结果.  
注意：该函数并没有返回值, _array用来保存结果.  

接口: function indexOf(string _self, string _str) internal returns (int _ret)   
功能: 字符串查找, 在_self中查找_str首次出现的位置.  
参数: string _self ： 源字符.  string _str查找字符.  
返回: 字符首次出现的位置, 查找不到则返回-1.  

接口: function indexOf(string _self, string _str, uint pos) internal returns (int _ret)  
功能: 字符串查找, 在_self中从pos开始的位置查找_str.  
参数: string _self ： 源字符.  string _str ： 查找字符. uint pos ： 开始查找的位置.  
返回: 字符首次出现的位置, 查找不到则返回-1. 

接口: function toInt(string _self) internal returns (int _ret)  
功能: 字符串转换为整形.  
参数: string _self 输入字符  
返回: 转换的整形值, 如果_self包含非整形字符, 则返回0.  

接口: function toAddress(string _self) internal returns (address _ret)  
功能: 字符串转换为address. 
参数: string _self 输入字符.  
返回: 转换的地址, 如果_self包含无法转换为地址的字符, 则返回address(0).  

接口: function toKeyValue(string _self, string _key) internal returns (string _ret)  
功能: 将输入转换为键值对格式.  
参数: string _self ： 输入字符串,作为键值对的value.  string _key : 输入字符串, 作为键值对的key.  
返回: 转换的kv键值对字符串形式.  

接口: function getStringValueByKey(string _self, string _key) internal returns (string _ret)   
功能: 从键值对解析_key对应的value值.  
参数: string _self ： 键值对.   string _key : key值.  
返回: 返回对应的value值, 如果_key解析不到, 则返回空字符串.  

接口: function getIntValueByKey(string _self, string _key) internal returns (int _ret)  
功能: 从键值对解析_key对应的value值, 然后将value转换为整形返回.  
参数: string _self ： 键值对.   string _key : key值.   
返回: _key对应的value值的整形格式,若_key不存在,或者解析的value无法转换为整形, 则返回0.  

接口: function toUpper(string _self) internal returns (string _ret)   
功能: 将字符串中的字符都转换为大写.  
参数: string _self ： 输入字符串.  
返回: 转换后的字符串. 


接口: function toLower(string _self) internal returns (string _ret)  
功能: 将字符串中的字符都转换为小写.  
参数: string _self ： 输入字符串.  
返回: 转换后的字符串.   

接口: function inArray(string _self, string[] storage _array) internal returns (bool _ret)  
功能: 判断字符串是与字符串数组中某个字符串相等.  
参数: string _self ： 输入字符串.   string[] storage _array : 字符串数组.  
返回: 如果_self在_array中有存在相等的字符串, 返回true, 否则返回false.  


接口: function inArrayNoCase(string _self, string[] storage _array) internal returns (bool _ret)  
功能: 判断字符串是否与字符串数组中某个字符串忽略大小写比较相等.  
参数: string _self ： 输入字符串.   string[] storage _array : 字符串数组.  
返回: 如果_self在_array中有存在相等的字符串, 返回true, 否则返回false.  

## LibSafeMath  
提供安全的加减乘除基本数学运算, 有溢出时会抛出异常.  

接口: function mul(uint256 a, uint256 b) internal returns (uint256 c)  
功能: 整形乘法运算.  
参数: uint256 a、uint256 b乘法参数.  
返回: a乘b的值, 当有溢出错误时, 抛出异常.  

接口: function div(uint256 a, uint256 b) internal returns (uint256)  
作用: 整形除法运算.  
参数: uint256 a、uint256 b除法参数.  
返回: a除b的结果, 当a为0时, 抛出异常.  

接口: function sub(uint256 a, uint256 b) internal returns (uint256)  
作用: 整形减法运算.  
参数: uint256 a、uint256 b减法参数.  
返回: a减b的结果, 当a小于b时, 抛出异常.  

接口: function add(uint256 a, uint256 b) internal returns (uint256 c)  
作用: 整形加法运算.  
返回: a加b的和, 当有溢出错误时, 抛出异常.

# 资料链接  
这里给出一个连接, 里面有solidity的相关学习资料[solidity链接](https://github.com/bkrem/awesome-solidity), 个人觉得比较全面, 大家也可以共同学习下。