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
    //debugger;
    var determinante=1;
		var limite=matriz1.length;
    var matSust;
    //INICIALIZANDO NUEVA MATRIZ
    matSust=new Array(limite);
    for(var r=0;r<limite;r++)
      matSust[r]=new Array(limite);
		for(var i=0;i<limite;i++){
			for(var j=0;j<limite;j++){
        j=j+i;
        if(j>=limite)j=limite-1;
        if(i+1==limite && j+1==limite)
          break;
        else{
          if(i==j ){
            debugger;
            console.log("j==i "+j+", "+i);
  					var val=matriz1[j][i];
  					if(Number(val)!=1){//buscar si hay algun 1 en la misma columna
  						var pos=0;
  						for(var k=Number(j)+1;k<limite;k++){
  							if(Number(matriz1[k][i])===1){
  								pos=k;
                  console.log("pos encontradi en cambia1 "+k+", "+i);
  								break;
  							}
  						}
  						if(pos!=0){
                //cambiar filas y multiplicar por -1 el D
                //INICIALIZANDO NUEVA MATRIZ
                console.log("cambia filas 1");
                for(var k=0;k<limite;k++){
                  //console.log(pos);
                  for(var l=0;l<limite;l++){
                    //debugger;
                    //console.log(k+","+l+" "+matriz1[k][l]);
                    //console.log(pos+","+j);
                    if(k===pos){
                      matSust[j][l]=matriz1[k][l];
                    }else if(k===j){
                      matSust[pos][l]=matriz1[k][l];
                    }else{
                      matSust[k][l]=matriz1[k][l];
                    }
                  }
                }
                determinante=Number(determinante)*(-1);
  						}else{//no hay un 1 abajo
  							//dividir la fila por el coeficiente cambiado y multiplar el D por él
                //console.log("j==i "+j+", "+i);
                if(i==0 && j==0){
                  for(var k=0;k<limite;k++){
                    for(var l=0;l<limite;l++)
                        matSust[k][l]=matriz1[k][l];
                  }
                }
                var v1=matSust[j][i];
                console.log(matSust);
                if(Number(v1)===0){//cambiar por alguna fila
                  console.log("i=j es cero");
                  var pos2=0;
                  for(var k=j;k<limite;k++){
                    v1=matSust[k][i];
                    if(Number(v1)!=0){
                      pos2=k;
                      break;
                    }
                  }
                  if(pos2!=0){//encontro una por quien reemplazar
                    //INICIALIZANDO NUEVA MATRIZ
                    var matSust2=new Array(limite);
                    for(var r=0;r<limite;r++)
                      matSust2[r]=new Array(limite);
                    //cambiar filas y multiplicar por -1 el D
                    for(var k=0;k<limite;k++){
                      //console.log(pos);
                      for(var l=0;l<limite;l++){
                        //console.log(k+","+l+" "+matSust[k][l]);
                        //console.log(pos+","+j);
                        if(k===pos2){
                          matSust2[j][l]=matSust[k][l];
                        }else if(k===j){
                          matSust2[pos2][l]=matSust[k][l];
                        }else{
                          matSust2[k][l]=matSust[k][l];
                        }
                      }
                    }
                    determinante=Number(determinante)*(-1);
                    matSust=matSust2;
                    console.log("cambio por una que no tenga 0")
                    console.log(matSust);
                    //ahora dividir
                    for(var k=0;k<limite;k++){
                      console.log("val "+i+"="+j+": "+v1);
                      var v2=matSust[j][k];
                      console.log("val2: "+v2);
                      v2=Number(v2)/Number(v1);
                      matSust[j][k]=v2;
                      console.log("val dividido: "+matSust[j][k]);
                    }
                  //  debugger;
                    determinante =Number(determinante)*Number(v1);
                    console.log(matSust);
                  }else{//FALTA

                  }
                  //dividir la fila por el coeficiente cambiado y multiplar el D por él
                }else{
                  for(var k=0;k<limite;k++){
                    //console.log("val "+i+"="+j+": "+v1);
                    var v2=matSust[j][k];
                    //console.log("val2: "+v2);
                    v2=Number(v2)/Number(v1);
                    matSust[j][k]=v2;
                    console.log("val dividido: "+matSust[j][k]);
                  }
                //  debugger;
                  determinante =Number(determinante)*Number(v1);
                }
  						}
  					}
  				}else{//convertir a 0 lo de abajo en la columna
            pos=0;
            //primero buscar si existe un 0 abajo
            for(var k= Number(j)+1;k<limite;k++){
              if(Number(matSust[k][i])===0){
                pos=k;
                console.log("Se encontron un 0 en "+k+", "+i);
                break;
              }
            }
            if(pos!=0){
              //INICIALIZANDO NUEVA MATRIZ
              var matSust2=new Array(limite);
              for(var r=0;r<limite;r++)
                matSust2[r]=new Array(limite);
              //cambiar filas y multiplicar por -1 el D
              for(var k=0;k<limite;k++){
                //console.log(pos);
                for(var l=0;l<limite;l++){
                  //console.log(k+","+l+" "+matSust[k][l]);
                  //console.log(pos+","+j);
                  if(k===pos){
                    matSust2[j][l]=matSust[k][l];
                  }else if(k===j){
                    matSust2[pos][l]=matSust[k][l];
                  }else{
                    matSust2[k][l]=matSust[k][l];
                  }
                }
              }
              determinante=Number(determinante)*(-1);
              matSust=matSust2;
            }else{//sino empezar a multiplar y sumar
              //debugger;
              if(j>i){
                var val=matSust[j][i];
                for(var k=0;k<limite;k++){
                  var val_previo=matSust[i][k];
                  var val2=matSust[j][k];
                  //console.log("val "+val+", val previo "+val_previo);
                  val2=((Number(val)* (-1))*Number(val_previo))+Number(val2);
                  //console.log("val_nuevo "+val2);
                  matSust[j][k]=val2;
                }
                console.log(matSust);
              }else{
                //console.log("j>i "+j+", "+i);
              }
            }
  				}

        }
        matriz1=matSust;
			}
      matriz1=matSust;
			// console.log(matriz1);
		}
    console.log("Matriz original");
    console.log(matriz1);
    console.log("Matriz Final");
    console.log(matSust);
    console.log("determinante");
    determinante=Number(determinante)*Number(matSust[limite-1][limite-1]);
    console.log(determinante);
	}else{
		console.log("No es matriz cuadrada");
	}
}
