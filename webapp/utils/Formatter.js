// /* global hcm, zhcm */

// $.sap.declare("com.ewm.audit.parker.zewmauditcheck.utils.Formatter");

// com.ewm.audit.parker.zewmauditcheck.utils.Formatter = {};

// com.ewm.audit.parker.zewmauditcheck.utils.Formatter.removeExtrachar = function (value) {
//     if(value.length == "14"){
//         return value.slice(6,14);
//     }
//     else{
//         return value;
//     }

//     };



sap.ui.define([
    "com/ewm/audit/parker/zewmauditcheck/utils/Formatter"
], function (Formatter) {
    "use strict";
    return {

        removeExtrachar: function (value) {
            if (value.length == "14") {
                return value.slice(6, 14);
            }
            else {
                return value;
            }
        }



    };
});