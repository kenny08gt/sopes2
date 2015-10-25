var sleep = require('sleep')
var fs=require('fs');
var sys = require('sys')
var exec = require('child_process').exec;
var child;

var matriz="",ruta="",accion="";
process.argv.forEach(function (val, index, array) {
  if(index===2){
  	accion=val;
  }else if(index===3){
  	ruta=val;
  }
});
var buffer=fs.readFileSync(ruta);
matriz=buffer.toString();
if(accion=="multiplicacion"){
  console.log("es multi "+matriz);
}else{
  console.log("es determinante "+matriz);
  //matriz=ruta;
}
var matriz1,matriz2;
var matArr=matriz.split("*");
if(matArr.length==2){
	var mat1=matArr[0].split("[");
	matriz1=new Array(mat1.length-2);
	for(var i=2;i<mat1.length;i++){
		var row=mat1[i].split("]");
		var elementos=row[0].split(",");
		matriz1[i-2]=new Array(elementos.length);
		for(var j=0;j<elementos.length;j++){
			matriz1[i-2][j]=elementos[j];
		}
	}
	//segunda matriz
	matriz2=new Array(mat1.length-2);
	var mat1=matArr[1].split("[");
	for(var i=2;i<mat1.length;i++){
		var row=mat1[i].split("]");
		var elementos=row[0].split(",");
		matriz2[i-2]=new Array(elementos.length);
		for(var j=0;j<elementos.length;j++){
			matriz2[i-2][j]=elementos[j];
		}
	}
}else{
	var mat1=matriz.split("[");
	//console.log(mat1);
	matriz1=new Array(mat1.length-2);
	for(var i=2;i<mat1.length;i++){
		var row=mat1[i].split("]");
		var elementos=row[0].split(",");
		matriz1[i-2]=new Array(elementos.length);
		for(var j=0;j<elementos.length;j++){
			matriz1[i-2][j]=elementos[j];
			//console.log("elemejot i,j"+(i-2)+", "+j+" "+matriz1[i-2][j]);
		}
	}
}
//ya tengo matrices logicas y se que quierer hacer
var direcciones = new Array(1);
direcciones[0]=new Array(2);
direcciones[0][0]="sopes2@192.168.122.224"
direcciones[0][1]="/home/sopes2/"
//multiplicacion
if(matArr.length==2){
  //dependiendo del numero de nodos, dividir la matriz y enviarsela a cada
  console.log(matriz1);
  console.log(matriz2);
  var total_nodos=direcciones.length+1;
  console.log("Total NodoS: "+total_nodos);
  console.log("Dimensiones A: "+matriz1.length+", "+matriz1[0].length);
  console.log("Dimensiones B: "+matriz2.length+", "+matriz2[0].length);
  var num_columnas=((matriz1[0].length)/total_nodos).toFixed(0);
  console.log("Division de A con "+num_columnas+" columnas");
  console.log("Division de B con "+num_columnas+" filas");
  var matrices=new Array(total_nodos);
  var x=0,y=0,xx=0,yy=0;
  var control=0;
  var mat1="",mat2="";
  debugger;
  for(var i=0;i<total_nodos;i++){
    matrices[i]=new Array(2);
    var m1=new Array(matriz1.length);
    var m2=new Array(num_columnas);
    mat1="[";
    for(var k=0;k<num_columnas;k++)
      m2[k]=new Array(matriz1.length);
    for(var j=0;j<matriz1.length;j++){
      m1[j]=new Array(num_columnas);
      mat1+="[";
      for(var k=0;k<num_columnas;k++){
        //console.log("x: "+xx+", y: "+yy);
        m1[x][y]=matriz1[xx][yy];
        mat1+=matriz1[xx][yy];
        m2[y][x]=matriz2[yy][xx];
        if(k+1<num_columnas){
          mat1+=",";
        }
        y++;
        yy++;
      }
      mat1+="]";
      y=0;
      yy=control*num_columnas;
      xx++;
      x++;
    }
    control++;
    x=0;
    xx=0;
    yy=num_columnas*control;
    mat1+="]";
    mat2="[";
    for(var j=0;j<m2.length;j++){
      mat2+="[";
      for(var k=0;k<m2[0].length;k++){
        mat2+=m2[j][k];
        if(k+1<m2[0].length)mat2+=",";
      }
      mat2+="]";
    }
    mat2+="]";
    console.log(mat1);
    console.log(mat2);
    matrices[i][0]=mat1;
    matrices[i][1]=mat2;
  }
  var resultante=new Array(matriz1.length);
  for(var i=0;i<matriz1.length;i++){
    resultante[i]=new Array(matriz1.length);
    for(var j=0;j<matriz1.length;j++){
      resultante[i][j]=0;
    }
  }
  //enviar a cada nodo a que opere

  var r1 = new Array(total_nodos);
  var nodos_terminaron=0;
  console.log("Respues desde nodos "+r1.length);
  for(var i=0;i<direcciones.length;i++){
    var matriz=matrices[i];
    child = exec("ssh "+direcciones[i][0]+" cd "+direcciones[i][1]+" && nodejs matrices.js multiplicacion "+matriz[0]+"*"+matriz[1], function (error, stdout, stderr) {
      sys.print(stdout);
      //
        var mat11=stdout.split("[");
        for(var i1=2;i1<mat11.length;i1++){
          var row=mat11[i1].split("]");
          var elementos=row[0].split(",");
          for(var j=0;j<elementos.length;j++){
            resultante[i1-2][j]=Number(resultante[i1-2][j])+Number(elementos[j]);
          }
        }
      //
      console.log(resultante);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
  }
  var matriz=matrices[matrices.length-1];
  child = exec( "cd /home/alan/ && nodejs matrices.js multiplicacion "+matriz[0]+"*"+matriz[1], function (error, stdout, stderr) {
    sys.print(stdout);
    //
      var mat11=stdout.split("[");
      for(var i=2;i<mat11.length;i++){
        var row=mat11[i].split("]");
        var elementos=row[0].split(",");
        for(var j=0;j<elementos.length;j++){
          resultante[i-2][j]=Number(resultante[i-2][j])+Number(elementos[j]);
        }
      }

    //console.log(resultante);
    //
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
  //leer matrices resultantes y sumarlas
}else{//determinante

}
