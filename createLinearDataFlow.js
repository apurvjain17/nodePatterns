//flattening a method is a good idea try using map 
//whenever a transformation needs to happen on a varriable
//map is more about composition within a context and in this case 
//boxes are a context
//what is an identity function
"use strict";

const nextCharForNumberString1 = str =>{
    const trimmed = str.trim();
    const number = parseInt(trimmed);
    const nextNumber = number+1;
    return String.fromCharCode(nextNumber);
};
// a better way to write the same method would better

const nextCharForNumberString2 = str =>
    Box(str)
        .map(el => el.trim())
        .map(el => new Number(el))
        .map(el => el+1)
        .map(el => String.fromCharCode(el))
        .fold(el => el);

const Box = x =>({
    map: f=>Box(f(x)),
    inspect:() =>`Box(${x})`,
    fold: f => f(x)
});
console.log(nextCharForNumberString1("64"));
console.log(nextCharForNumberString2("82"));