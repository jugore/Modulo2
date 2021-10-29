/*-Escribe una función que reciba un parámetro y lo imprima en consola.*/

x = prompt('Ingrese parametro');
alert(x)
console.clear();


/*--Escribe una función que reciba dos parámetros, los sume e imprima en consola el resultado de la operación.*/
x = prompt('ingrese primer numero');
y = prompt('ingrese segundo numero');

if (!Number.isNaN(x) && !Number.isNaN(y)) {
    suma = +x + +y;
    alert(suma);
}
else {
    alert("Ingrese valores numericos")

}

console.clear();



/*-Escribe una función que reciba dos parámetros, los reste e imprima en consola el resultado de la operación.*/

x = prompt('ingrese primer numero');
y = prompt('ingrese segundo numero');

if (!Number.isNaN(x) && !Number.isNaN(y)) {
    suma = +x - +y;
    alert(suma);
}
else {
    alert("Ingrese valores numericos")

}

console.clear();

/*-Escribe una función que reciba dos parámetros, los multiplique e imprima en consola el resultado de la operación.*/
x = prompt('ingrese primer numero');
y = prompt('ingrese segundo numero');

if (!Number.isNaN(x) && !Number.isNaN(y)) {
    suma = +x * +y;
    alert(suma);
}
else {
    alert("Ingrese valores numericos")

}

console.clear();


/*-Escribe una función que reciba dos parámetros, los divida e imprima en consola el resultado de la operación. */

x = prompt('ingrese primer numero');
y = prompt('ingrese segundo numero');

if (!Number.isNaN(x) && !Number.isNaN(y)) {
    suma = +x / +y;
    alert(suma);
}

else {
    alert("Ingrese valores numericos")

}

console.clear();

/*-Escribe una función que reciba el radio de un círculo como parámetro, calcule el área del círculo e imprima en consola.
*/


function area(radio) {
    return 2 * Math.PI * radio;
  }  
  area(8);

  /*-Escribe una función que reciba como parámetro un valor en metros e imprima en consola su equivalente en kilómetros, con máximo dos decimales.
  */

  
  function metros(m) {
    return  m/1000;
  }  
  metros(100);


  /*Escribe una función que reciba como parámetro un valor en grados Celsius e imprima en consola su equivalente en grados Farenheit, con máximo dos decimales.*/

  function grados(m) {
    return  m*(9/5)+32;
  }  
  grados(5);/*Ingresar grados en celsius*/


  /*-Escribe una función que reciba dos parámetros con los que se calculará el valor exponencial de una base. El primer parámetro será la base y el segundo será el exponente. Imprimir el resultado del valor exponencial de la base en consola.*/

  
  function exponencial(base,exp) {
    
    return Math.pow(base,exp);

  }  
  exponencial(3,3)