console.log("funciones")
setTimeout (function(){
    console.log("hola");

},3000);

let mensaje =function(){
    return"mensaje anonimo";

}
console.log(mensaje());