// Funciones Flecha

const saludar = ()=> {
    console.log("Hola desde una funcion arrow");
}
saludar();
saludar();
//Funcion flecha const
const num = parseFloat(prompt("Ingrese un numero para el cuadrado:" ));

const cuadrado1 = (num)=> {
    alert("cuadrado de 6 igual a " + num * num);
} 
cuadrado1(6);

const cuadrado2 = (num)=> {
    alert("cuadrado de " + num + " igual a " + num * num);
} 
cuadrado2(num);

//Retorno directo
const cuadrado = x => x * x;
console.log(("5x5=", cuadrado(5)));


