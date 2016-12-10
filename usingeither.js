var fs = require("fs");
const Either = Right || Left;
const Right = x =>({
    chain: f => f(x),
    map: f => Right(f(x)),
    fold: (f,g) => g(x),
    inspect:() => `Right(${x})`
});

const Left = x => ({
    chain: f => Left(x),
    map: f => Left(x),
    fold: (f,g) => f(x),
    inspect:() => `Left(${x})`
});

const fromNullable = x => 
    x != null ? Right(x) : Left(x);

const findColor = name => 
    fromNullable(({ red:"#fff4444",blue:"#3b5998",yellow:"#fff68f"})[name]);

//const result = Left(2).map(x => x + 1).map(x => x/2).fold(x => "error",x => x);
//const result = Right(2).map(x => x + 1).map(x => x/2).fold(x => "error",x => x);
// const result = findColor("green")
//     .map(c => c.splice(1))
//     .fold(e => "No color found",c => c.toUpperCase());
// console.log(result);
const tryCatch = f => {
    try{
        return Right(f());
    }
    catch(e){
        return Left(e);
    }
};

/**
 * The chain method defined over here takes care of boxing and
 * unboxing of the objects
 */

const getPort = () => 
    tryCatch(() => fs.readFileSync("package.json")) //Right('')
    .chain(c => tryCatch(() => JSON.parse(c))) //Right(Righ(''))
    .fold(e => 3000,
        c => 8888); 
const result = getPort();
console.log(result);


/**
 * COnverting imperative to functional
 */

// const getPrefs = user => {
//     if(user.premium){
//         return findColor(user);
//     }
//     else{
//         return "";
//     }
// }
// const getPrefsFunctional = user => 
//     user.premium?Right(user) : Left(user)
//         .map(u => u.preferences)
//         .fold(() => "",pref => findColor(pref));

// const streetName = user => {
//     const address = user.address;
//     if(address){
//         const street = address.street;
//         if(street){
//             return street.name;
//         }
//     }
//     return "no street";
// };

// const streetName = user => 
//     fromNullable(user.address)
//         .chain(address => fromNullable(address.street))
//         .map(s => s.map)
//         .fold(e => "no street",g => g);