console.log(" funciones con parametros por defecto ");
function saludar(nombre="Invitado"){
    console.log("bienvenido : ", nombre);
}

saludar("Pedra Fulana")
saludar();

function multiplicar(num1 = 5, num2= 10){
     console.log("multiplicacion de : ",num1,"*",num2,"=", num1*num2);
}

multiplicar(3,4);
multiplicar();



function areatriangulo(num3 = 4, num4 = 2) {
    let area = (num3 * num4) / 2;
    console.log("area triangulo con base:", num3, "y altura:", num4, "es =", area);
}

areatriangulo(6, 8);
areatriangulo();

