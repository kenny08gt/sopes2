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
		//encontrar primer pivote
		var limite=matriz1.length;
		var j=0;
		var determinante=1;
		for(var i=0;i<limite;i++){
			if(matriz1[i][0]==1){
				j=i;
				//console.log("Uno encontrado en 0,"+j);
			}
		}
		if(j!=0){//CAMBIAR LAS FILAS
			//console.log("limite "+limite);
			var matSust=new Array(limite);
			for(var i=0;i<limite;i++)
				matSust[i]=new Array(limite);
			for(var i=limite-1;i>=0;i--){				
				for(var k=0;k<limite;k++){
					if(i===j){
						matSust[0][k]=matriz1[i][k];
					}else if(i==0){
						matSust[j][k]=matriz1[i][k];
					}else{
						matSust[i][k]=matriz1[i][k];
					}
				}
			}
			determinante*=-1;			
			console.log("Fila ya cambiada");
			console.log(matSust);
			console.log("Filas "+matSust.length+", columnas "+matSust[0].length);
			//IR HACIENDO 0 TODO LO DEBAJO DE LA DIAGONAL?
			//PRIMERO BUSCAR ALGUN 0 ABAJO			
			var contador=-1;
			for(var i=0;i<limite;i++){
				debugger;
				for(var j=0;j<limite;j++){
					if(i==j){	//VERIFICAR SI ES UNO, SINO DIVIDIR TODA LA FILA POR SU VALOR Y MULTIPLICAR EL DETERMINANTE
						contador++;
						var val=matSust[i][j];
						console.log("val i=j "+val);
						if(val!=1){
							for(var k=0;k<limite;k++){
								matSust[i][k]=Number(matSust[i][k])/Number(matSust[i][k]);								
							}
							determinante*=Number(val);
						}
					}else{
						if(j>0){	//Solo por debajo de la diagonal
							console.log((j-1)+","+contador);
							var val=matSust[j-1][contador];							
							var val2=matSust[j][i];
							//console.log("val  "+val2);
							if(val2!=0){
								for(var k=0;k<limite && j>0;k++){											
									val=matSust[j-1][k];				
									console.log("val arriba "+val);									
									val2=matSust[j][k];									
									val2=(Number(val2)*(-1))*Number(val);
									console.log(val2);		
									matSust[j][k]=Number(matSust[j][k])+val2;
									console.log("nuevo i,j "+j+", "+k+" - "+matSust[j][k]);		
								}
							}
						}
					}					
				}				
			}
			console.log("deberia sacar la diagonal 1 y 0 abajo");
			console.log(matSust);
		}else{//YA ESTA EN LA FILA 1 O NO HAY NINGUN 1

		}
	}else{
		console.log("No es matriz cuadrada");
	}
}