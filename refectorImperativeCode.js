/**
 * Refactor imperative code to a single composed
 * expression using box
 */

const Box = x =>({
    map: f=>Box(f(x)),
    inspect:() =>`Box(${x})`,
    fold: f => f(x)
});

const moneyToFloat = str => 
    Box(str)
        .map(s => s.replace(/\%/g,""))
        .map(r => parseFloat(r));

const percentToFloat = str => 
    Box(str.replace(/\%/g,""))
        .map(replaced => parseFloat(replaced))
        .map(number => number*0.01);

const applyDiscount = (price,discount) =>
    moneyToFloat(price)
        .fold(cost => 
            percentToFloat(discount)
                .fold(saving => 
                    cost = cost*saving));

const result = applyDiscount("55.00","20%");
console.log(result);                    