	$(document).ready(function(){
		//inicialmente oculto, solo es visible cuando seleccionamos un contacto a editar
		 $('#btnSave').hide();
		 //al momento que el docuento está listo, ponemos foco en el input nombre
		  $('#txtnombre').focus();   
		  //inicializamos la variable en -1
		var fila_borrar=-1;
		//intentamos obtener la información almacenada MiAgenda
		var MiAgenda = localStorage.getItem("MiAgenda");//RETRIEVE THE STORED DATA
		//convertimos la info en un objeto JSON
    	MiAgenda = JSON.parse(MiAgenda);
    	//si  MiAgenda no existe,  la inicializamos como array vacío
    	if(MiAgenda == null){ 
    		MiAgenda = [];
    	}else{
    		//mostramos la agenda en la tabla contactos
    		MostrarAgenda();
    	}



		//cuando se hace click en el boton agregar contato, llamamos la función AddContacto();
		$('#btnAdd').click(function(){
				AddContacto();
		});

		//borrar fila/contacto		
			$(document).on('click','#btnBorrar',function(){  						
							fila_borrar = parseInt($(this).attr("alt")); //obtenemos el indice del atributo alt del botón seleccionado
							MiAgenda.splice(fila_borrar, 1); //eliminamos del array MiAgenda el índice guardado en fila_borrar
							localStorage.setItem("MiAgenda", JSON.stringify(MiAgenda));//guardamos los contactos restantes en formato json
							alert("CONTACTO ELIMINADO");									
							MostrarAgenda(); //mostramos los contactos					
			});
			//obtenemosla info del contacto seleccionado
			$(document).on('click','#btnEditar',function(){ 
						$('#btnAdd').hide();
						//obtenemos el número de índice almacenado en al atributo alt del botón
						fila_borrar=parseInt($(this).attr('alt'));
						//buscamos en MiAgenda el contacto de la fila seleccionada y lo convertimos a un objeto JSON
						var contacto = JSON.parse(MiAgenda[fila_borrar]); 
						//llenamos los inputs con el objeto parseado(contacto)
						 $("#txtnombre").val(contacto.nombre);
       					 $("#txtedad").val(contacto.edad);
        				 $("#txttel").val(contacto.tel);
        				 $('#btnSave').show();        				        				 
				
			});
			//guardar contacto editado
			$('#btnSave').click(function(){
				$('#btnAdd').show();
				//creamos un nuevo json para actualizar el contacto seleccionado (fila_borrar)
							MiAgenda [fila_borrar]= JSON.stringify({       
						        nombre : $("#txtnombre").val(),
						        edad : $("#txtedad").val(),
						        tel : $("#txttel").val()
						    });
							localStorage.setItem("MiAgenda", JSON.stringify(MiAgenda)); //guardamos los datos actualizados en formato json
							alert("CONTACTO ACTUALIZADO");
							 $('#btnSave').hide(); //ocultamos el boton guardar
							 $('input').val(''); //limpiamos todos los inputs
   							 $('#txtnombre').focus(); //ponemos el foco en el input nombre						
							MostrarAgenda();//mostramos en la tabla contactos nuestra agenda
			});





	//fucion agregar contactos
	function AddContacto(){
		//validar ingreso de datos en los 3 inputs
	if ($.trim($('#txtnombre').val())==''){			
					alert('Ingresa el nombre');
					$('#txtnombre').focus();
				    return false;
		}
		if ($.trim($('#txtedad').val())==''){			
					alert('Ingresa la edad');
					$('#txtedad').focus();
				    return false;
		}
		if ($.trim($('#txttel').val())==''){			
					alert('Ingresa el teléfono');
					$('#txttel').focus();
				    return false;
		}
		
    //creamos el objeto JSON con la info de los inputs
    var contacto = JSON.stringify({       
        nombre : $("#txtnombre").val(),
        edad : $("#txtedad").val(),
        tel : $("#txttel").val()
    });
//agregamos a MiAgenda el json contacto
    MiAgenda.push(contacto);
    localStorage.setItem("MiAgenda", JSON.stringify(MiAgenda));//guardamos el contacto  en formato json
    alert("CONTACTO AGREGADO");
    $('input').val('');//limpiamos  los inputs
    $('#txtnombre').focus();//ponemos foco en el input nombre
    MostrarAgenda();//mostramos en la tabla contactos nuestra agenda
	}

	//funcion mostrar contactos
	function MostrarAgenda()	{
	//borramos  todas las filas de la tabla excepto los encabezados
	$('#tblContactos tr:not(:first)').remove();
			for(var i in MiAgenda)//iteramos los contactos guardados en MiAgenda
			{
		        var con = JSON.parse(MiAgenda[i]);//obtenemos un objeto json por c/contacto y lo guardamos en  la variable con
		      
		      //agregamos la fila en la tabla contactos con la info del objeto json(con) y   en la columna Acciones, 2 botones para eliminar y seleccionar los contactos, agregándole en su atributo alt el índice del ciclo (for) que almacena en cada iteración la variable (i)
			$('#tblContactos tr:last').after('<tr><td>'+con.nombre+'</td><td>'+con.edad+'</td><td>'+con.tel+'</td><td>'+'<button id="btnBorrar" alt="'+i+'" class="btn btn-danger btn-sm">Borrar</button>   <button id="btnEditar" alt="'+ i +'" class="btn btn-info btn-sm">Seleccionar</button>'+'</td></tr>');

			
		    }
	}

	
});
