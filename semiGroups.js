"use strict";
/**
 * create types with semi groups
 * Semi groups come from abstract algebra
 * Associativity
 * Append/Prepend activity doesn't matter
 * (1+1)+1 == 1+(1+1)
 * true && false
 * true && true
 */

//const res = "a".concat("b").concat("c");
//const res = [1,2].concat([3,4]).concat([5,6]);

// const Sum = x => ({
//     x,
//     concat: o =>
//         Sum(x + o.x),
//     inspect: () =>
//         `Sum(${x})`        
// });

// const res = Sum(1).concat(Sum(2));

// console.log(res);
const All = x => ({
    x,
    concat: o =>
        All(x && o.x),
    inspect: () =>
        `All(${x})`        
});

const res = All(true).concat(All(false));
console.log(res);