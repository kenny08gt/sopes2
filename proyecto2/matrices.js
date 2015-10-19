var matriz="";
process.argv.forEach(function (val, index, array) {
  if(index===2){
  	matriz=val;
  	return;
  }
});
var matArr=matriz.split("*");
if(matArr.length==2){
	var matriz1,matriz2;	
	console.log("es multiplicacion");
	var mat1=matArr[0].split("[");	
	matriz1=new Array(mat1.length-2);
	console.log("num filas "+matriz1.length);
	for(var i=2;i<mat1.length;i++){	
		var row=mat1[i].split("]");	
		var elementos=row[0].split(",");
		matriz1[i-2]=new Array(elementos.length);
		for(var j=0;j<elementos.length;j++){
			matriz1[i-2][j]=elementos[j];
			console.log("-"+matriz1[i-2][j]);			
		}
		console.log("---");
	}
	console.log("###########");
	//segunda matriz	
	matriz2=new Array(mat1.length-2);
	var mat1=matArr[1].split("[");
	for(var i=2;i<mat1.length;i++){	
		var row=mat1[i].split("]");	
		var elementos=row[0].split(",");
		matriz2[i-2]=new Array(elementos.length);
		for(var j=0;j<elementos.length;j++){
			matriz2[i-2][j]=elementos[j];	
			console.log("-"+matriz2[i-2][j]);		
		}				
		console.log("---");		
	}		
	console.log("f1 "+matriz1.length+" c1 "+matriz1[0].length+" f2 "+matriz1[0].length+" c2 "+matriz2[1].length);
	if(matriz1[0].length==matriz2.length){
		var limite=matriz1[0].length;
		var resultante = new Array(limite);
		for(var i=0;i<limite;i++){
			resultante[i]=new Array(limite);					
		}
		var ri=0;
		for(var i=0;i<limite;i++){
			for(var j=0;j<limite;j++){			
				ri= matriz1[i][j]*matriz2[j][i];
			}
			resultante[i][j]=ri;
			ri=0;
		}
		console.log(resultante);
	}else{
		console.log("El numero de filas de la matriz 1 no es igual a el numero de columnas de la matriz 2");
		console.log(matriz1[0].length+"!="+matriz2.length);
	}
}else{
	console.log("es determinante");
}