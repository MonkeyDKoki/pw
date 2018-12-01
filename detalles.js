var asignarFavorito = function(){
    var id=this.id;
    var url='http://museobillete.azurewebsites.net/api/Expo/';
	fetch(url+localStorage.getItem("mostrador"))
	.then(datos=>datos.json())
	.then(datos=>{
        var foto='';
        var titulo='';
        var idComparacion='';
        //var esFavorito=0;
		for(let i=0;i<datos.mostradores[0].grupos.length;i++)
		{
            
            if(datos.mostradores[0].grupos[i].unico===true)
            {
                titulo=datos.mostradores[0].grupos[i].titulo;
                idComparacion=datos.mostradores[0].grupos[i].id;
                foto=datos.mostradores[0].grupos[i].imagenFondoUrl;
                if(idComparacion==id)
                {
                    var url='http://museobillete.azurewebsites.net/api/Expo/';
	                fetch(url+localStorage.getItem('mostrador'))
	                .then(datos=>datos.json())
	                .then(datos=>{
                        url=datos.mostradores[0].grupos[i].piezas[0].detallesUrl;
                        foto=datos.mostradores[0].grupos[i].piezas[0].imagenFondoUrl;
                        titulo=datos.mostradores[0].grupos[i].piezas[0].titulo;
                        idComparacion=datos.mostradores[0].grupos[i].piezas[0].id;
                        console.log(foto);
                        a(idComparacion,titulo,foto,url,this);
                    })
                }
            }
            else 
            {
                grup=localStorage.getItem('grupo');
		        for(let i=0;i<datos.mostradores[0].grupos[grup].piezas.length;i++)
		        {
                    titulo=datos.mostradores[0].grupos[grup].piezas[i].titulo;
                    idComparacion=datos.mostradores[0].grupos[grup].piezas[i].id;
                    descripcion=datos.mostradores[0].grupos[grup].piezas[i].descripcion;
                    foto=datos.mostradores[0].grupos[grup].piezas[i].imagenFondoUrl;
                    if(idComparacion==id)
                    {
                        var url='http://museobillete.azurewebsites.net/api/Expo/';
	                    fetch(url+localStorage.getItem('mostrador'))
	                    .then(datos=>datos.json())
	                    .then(datos=>{
                            url=datos.mostradores[0].grupos[localStorage.getItem('grupo')].piezas[i].detallesUrl;
                            a(id,titulo,foto,url,this);
                            return;
                        })
                       return;
                        
                    }
                }
            }
        }
    })
 }
 var a = function(id,titulo,foto,url,boton){
    if(boton.value==='0')
    {
        
        //console.log(foto);
        const data= new FormData();
        data.append('id',id);
        data.append('foto',foto);
        data.append('titulo',titulo);
        data.append('url',url);
        fetch('http://localhost/ProyectoPW/agregarFavorito.php',{
            method: 'post',
            body:data
        })
        .then(datos=>datos.json())
        .then(datos=>{
            if(datos.respuesta == true)
            {
                alert('Datos guardados con exito');
                boton.value='1';
                //console.log(this);
            }
            else
            {
                alert('No se pudieron guardar los datos');
                //return '-1';
            }
        })
    }
    else
    {
        const data= new FormData();
        data.append('id',id);
        fetch('http://localhost/ProyectoPW/eliminarFavorito.php',{
            method: 'post',
            body:data
        })
        .then(datos=>datos.json())
        .then(datos=>{
            if(datos.respuesta == true)
            {
                alert('Datos eliminados con exito');
                boton.value='0';
                console.log(this);
            }
            else
            {
                alert('No se pudieron eliminar los datos');
                //return '-1';
            }
        })
    }
 }
 var consultarId = function(id)
 {
    const data= new FormData();
    data.append('id',id);
    var request = new XMLHttpRequest();
    request.open('POST','http://localhost/ProyectoPW/consultarIdFavorito.php', false);
    request.send(data);
    var resp=request.responseText;
    var jsonResponse = JSON.parse(resp);
    if(jsonResponse.respuesta == true)
        esFavorito=1;
    else
        esFavorito=0;
    return esFavorito;
 }