var fs=require('fs');
var matriz="",ruta="";
process.argv.forEach(function (val, index, array) {
  if(index===2){
  	matriz=val;  	
  }else if(index===3){
  	ruta=val;
  }  
});
if(matriz=="archivo"){
	var buffer=fs.readFileSync(ruta);
	matriz=buffer.toString();
}else{
	matriz=ruta;
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
	//console.log(matriz1);
}
//MULTIPLICACION	
if(matArr.length==2){
	console.log("es multiplicacion");
	//PASAR MATRICES A OBJECTOS	
	
	console.log("f1 "+matriz1.length+" c1 "+matriz1[0].length+" f2 "+matriz1[0].length+" c2 "+matriz2[1].length);
	if(matriz1[0].length==matriz2.length){		
		var resultante = new Array(matriz1.length);
		for(var i=0;i<matriz1.length;i++){
			resultante[i]=new Array(matriz2[0].length);
		}				
		for(var i=0;i<matriz1.length;i++){
			for(var j=0;j<matriz2[0].length;j++){
				resultante[i][j]=0;
				for(var k=0;k<matriz2.length;k++){												
					resultante[i][j]+=Number(Number(matriz1[i][k])*Number(matriz2[k][j]));
				}					
			}
		}
		console.log(resultante);
	}else{
		console.log("El numero de filas de la matriz 1 no es igual a el numero de columnas de la matriz 2");
		console.log(matriz1[0].length+"!="+matriz2.length);
	}
}else{//DETERMINANTE
	console.log("es determinante");
	if(matriz1.length==matriz1[0].length){
		
	}else{
		console.log("No es matriz cuadrada");
	}
}