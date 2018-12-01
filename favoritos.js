


var btnDetalles = document.getElementsByClassName('btnDetalles');
var btnEliminar = document.getElementsByClassName('btnEliminar');
var mostrarDetalles = function(){
    //var url='http://museobillete.azurewebsites.net/api/Expo/';
    var id=this.id;
    console.log(id);
    const data= new FormData();
    data.append('id',id);
    fetch('http://localhost/ProyectoPW/consultarURL.php',{
        method: 'post',
        body:data})
    .then(datos=>datos.json())
    .then(datos=>{
        window.open(datos[0].url,"_self")
     });
}

var quitarFavorito = function(){
        var id=this.id;
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
                this.value='0';
                mostrarFavoritos();
            }
            else
            {
                alert('No se pudieron eliminar los datos');
                //return '-1';
            }
        })
}
var mostrarFavoritos= function(){
var url='http://localhost/ProyectoPW/mostrarFavoritos.php';
fetch(url)
.then(datos=>datos.json())
.then(datos=>{
    var foto='';
    var titulo='';
    var id='';
    document.getElementById('favoritos').innerHTML='';
    //grup=localStorage.getItem('grupo');
    for(let i=0;i<datos.length;i++)
    {
        titulo=datos[i].titulo;
        id=datos[i].id;
        //descripcion=datos.mostradores[0].grupos[grup].piezas[i].descripcion;
        foto=datos[i].foto;
        detalle=datos[i].url;
        console.log(id);
        document.getElementById('favoritos').innerHTML += `
            <article>
                <span>${titulo}</span>
                <span>${id}</span>
                <img src="${foto}">  
                <span>${detalle}</span>
                <button class="btnDetalles" id="${id}" value="${i}">Ver Detalle</button>
                <button class="btnEliminar" id="${id}">Eliminar</button>                          
            </article>
            <hr>
            <br>
        `;	
    }
    for(let i=0;i<btnEliminar.length;i++)
	{
        btnDetalles[i].addEventListener('click',mostrarDetalles);
        btnEliminar[i].addEventListener('click',quitarFavorito);
    }
})
}
mostrarFavoritos();