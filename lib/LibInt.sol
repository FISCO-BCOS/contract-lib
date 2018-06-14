
/**
 * @file: LibInt.sol
 * @author: fisco-dev
 * 
 * @date: 2018
 */
 
pragma solidity ^0.4.11;

/**
 * @title LibInt
 * @dev Utility library of functions on uint256 and int256 type
 */
library LibInt {
    using LibInt for *;

    /**
   * @dev This function will convert uint256 to string.
   * @param _self uint256 value to be convert
   * @return _ret the conversion result in string format.
   */
    function toString(uint256 _self) internal returns (string _ret) {
        if (_self == 0) {
            return "0";
        }

        uint8 len = 0;
        uint tmp = _self;
        while (tmp > 0) {
            tmp /= 10;
            len++;
        }
        
        _ret = new string(len);

        uint8 i = len-1;
        while (_self > 0) {
            bytes(_ret)[i--] = byte(_self%10+0x30);
            _self /= 10;
        }
    }

    /**
   * @dev This function will convert uint256 to hex string.
   * @param _self uint256 value to be convert
   * @return _ret the conversion result in string format.
   */
    function toHexString(uint256 _self) internal returns (string _ret) {
        if (_self == 0) {
            return "0x0";
        }

        uint8 len = 2;
        uint tmp = _self;
        while (tmp > 0) {
            tmp /= 16;
            len++;
        }
        
        _ret = new string(len);

        uint8 i = len-1;
        while (_self > 0) {
            if (_self%16 > 9) {
                    bytes(_ret)[i--] = byte(_self%16+0x61-0xa);
                } else {
                    bytes(_ret)[i--] = byte(_self%16+0x30);
                }
            
            _self /= 16;
        }
        
        bytes(_ret)[0] = byte(0x30);
        bytes(_ret)[1] = byte(0x78);
    }

     /**
   * @dev This function will convert uint256 to hex string with 64 fixed length.
   * @param _self uint256 value to be convert
   * @return _ret the conversion result in string format.
   */
    function toHexString64(uint256 _self) internal returns (string _ret) {      
        _ret = new string(66);
        bytes(_ret)[0] = '0';
        bytes(_ret)[1] = 'x';

        for (uint8 i=65; i>=2; --i) {
            uint8 digit = uint8(_self&0x0F);
            _self /= 16;

            if (digit < 10)
                bytes(_ret)[i] = byte(digit+0x30);
            else
                bytes(_ret)[i] = byte(digit-10+0x61);
        }
    }

    /**
   * @dev This function will convert int256 to string.
   * @param _self int256 value to be convert
   * @return _ret the conversion result in string format.
   */
    function toString(int256 _self) internal returns (string _ret) {
        if (_self == 0) {
            return "0";
        }

        uint ui = uint(_self);
        bool positive = true;
        uint8 len = 0;
        if (_self < 0) {
            ui = uint(-_self);
            positive = false; 
            len++;
        }
        
        uint tmp = ui;
        while (tmp > 0) {
            tmp /= 10;
            len++;
        }
        
        _ret = new string(len);
        if (!positive) {
            bytes(_ret)[0] = '-';
        }
        
        uint8 i = len-1;
        while (ui > 0) {
            bytes(_ret)[i--] = byte(ui%10+0x30);
            ui /= 10;
        }
    }

     /**
   * @dev This function will convert uint256 to address with string format.
   * @param _self uint256 value to be convert
   * @return _ret the conversion result in string format.
   */
    function toAddrString(uint256 _self) internal returns (string _ret) {      
        _ret = new string(42);
        bytes(_ret)[0] = '0';
        bytes(_ret)[1] = 'x';

        for (uint8 i=41; i>=2; --i) {
            uint8 digit = uint8(_self&0x0F);
            _self /= 16;

            if (digit < 10)
                bytes(_ret)[i] = byte(digit+0x30);
            else
                bytes(_ret)[i] = byte(digit-10+0x61);
        }
    }

     /**
   * @dev This function will convert uint256 and string to key value format.
   * @param _self _key uint256 value and string value to be convert
   * @return the conversion result in string.
   */
    function toKeyValue(uint256 _self, string _key) internal returns (string _ret) {
        uint len = bytes(_key).length+3;

        if (_self == 0) {
            len += 1;
        } else {
            uint tmp = _self;
            while (tmp > 0) {
                tmp /= 10;
                len++;
            }
        }
        
        _ret = new string(len);
        
        uint i = 0;
        bytes(_ret)[i++] = '"';
        for (uint j=0; j < bytes(_key).length; j++) {
            bytes(_ret)[i++] = bytes(_key)[j];
        }
        bytes(_ret)[i++] = '"';
        
        bytes(_ret)[i++] = ':';

        i = len-1;
        if (_self == 0) {
            bytes(_ret)[i] = byte(0x30);
        } else {
            while (_self > 0) {
                bytes(_ret)[i--] = byte(_self%10+0x30);
                _self /= 10;
            }
        }
    }
    
    /**
   * @dev This function will convert int256 and string to key value format.
   * @param _self _key int256 value and string value to be convert
   * @return the conversion result in string.
   */
    function toKeyValue(int256 _self, string _key) internal returns (string _ret) {
        uint ui = uint(_self);
        bool positive = true;
        uint len = bytes(_key).length+3;
        if (_self < 0) {
            ui = uint(-_self);
            positive = false; 
            len++;
        }

        if (_self == 0) {
            len += 1;
        } else {
            uint tmp = ui;
            while (tmp > 0) {
                tmp /= 10;
                len++;
            }
        }
        
        _ret = new string(len);
        
        uint i = 0;
        bytes(_ret)[i++] = '"';
        for (uint j=0; j < bytes(_key).length; j++) {
            bytes(_ret)[i++] = bytes(_key)[j];
        }
        bytes(_ret)[i++] = '"';
        
        bytes(_ret)[i++] = ':';

        if (!positive) {
            bytes(_ret)[i++] = '-';
        }
        i = len-1;
        if (_self == 0) {
            bytes(_ret)[i] = byte(0x30);
        } else {
            while (ui > 0) {
                bytes(_ret)[i--] = byte(ui%10+0x30);
                ui /= 10;
            }
        }
    }

}