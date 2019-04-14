"use strict";
var university = /** @class */ (function () {
    function university(name, dept) {
        this.name = name;
        this.dept = dept;
    }
    university.prototype.graduation = function (year) {
        // next line not working why?
        //console.log('Graduating ${this.dept} ${year} students');
        console.log('Graduating ' + this.dept + ' ' + year + ' students');
    };
    return university;
}());
var mum = new university('MUM', 'Computer Science');
mum.graduation(2019);
// testing import ts file not working 
