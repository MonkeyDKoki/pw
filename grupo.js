const {BrowserWindow}=require('electron').remote;
const app=require('electron').app;
const path=require('path');
const url= require('url');

let PantallaPieza;

var mostrarPiezas= function(){
    localStorage.setItem("grupo",this.value);
    window.location.href='pieza.html';
	/*PantallaPieza = new BrowserWindow({width:900,height:400});
	PantallaPieza.loadURL(url.format({
		pathname: path.join(__dirname,'pieza.html'),
		protocol: 'file',
		slashes: true
	}));
    PantallaPieza.show();
    */
}

var mostrarDetalles = function(){
        var url='http://museobillete.azurewebsites.net/api/Expo/';
	    fetch(url+localStorage.getItem('mostrador'))
	    .then(datos=>datos.json())
	    .then(datos=>{
            window.open(datos.mostradores[0].grupos[this.value].piezas[0].detallesUrl,"_self");
            //location.href=datos.mostradores[0].grupos[this.value].piezas[0].detallesUrl;
         });
}


var btnDetalles = document.getElementsByClassName('btnDetalles');
var btnGrupos = document.getElementsByClassName('btnGrupos');
var btnFavoritos = document.getElementsByClassName('btnFavoritos');
var obtenerGrupos= function(){
	var url='http://museobillete.azurewebsites.net/api/Expo/';
	fetch(url+localStorage.getItem("mostrador"))
	.then(datos=>datos.json())
	.then(datos=>{
		var foto='';
        var titulo='';
        var id='';
        var esFavorito=0;
		document.getElementById('grupo').innerHTML='';
		for(let i=0;i<datos.mostradores[0].grupos.length;i++)
		{
            titulo=datos.mostradores[0].grupos[i].titulo;
            id=datos.mostradores[0].grupos[i].id;
            descripcion=datos.mostradores[0].grupos[i].descripcion;
            foto=datos.mostradores[0].grupos[i].imagenFondoUrl;
            esFavorito=0;
            if(datos.mostradores[0].grupos[i].unico===true)
            {
                esFavorito=consultarId(id);
                document.getElementById('grupo').innerHTML += `
                <article>
                    <span>${titulo}</span>
                    <span>${id}</span>
                    <span>${descripcion}</span>
                    <img src="${foto}">                            
                    <button class="btnDetalles" value="${i}">Ver Detalle</button>
                    <button class="btnFavoritos" id="${id}" value="${esFavorito}">Favorito</button>
                </article>
                <hr>
                <br>
            `;	
            }
            else
            {
                document.getElementById('grupo').innerHTML += `
                <article>
                    <span>${titulo}</span>
                    <span>${id}</span>
                    <span>${descripcion}</span>
                    <img src="${foto}">
                <button class="btnGrupos" value="${i}">Ver Piezas</button>
                </article>
                <hr>
                <br>`;
            }
        }
        for(let i=0;i<btnGrupos.length;i++)
        {
            btnGrupos[i].addEventListener('click',mostrarPiezas);
        }
        for(let i=0;i<btnDetalles.length;i++)
        {
            btnDetalles[i].addEventListener('click',mostrarDetalles);
            btnFavoritos[i].addEventListener('click',asignarFavorito);
        }
        /*for(let i=0;i<datos.mostradores[0].grupos.length;i++)
        {
            if(datos.mostradores[0].grupos[i].unico===true)
            {
                j++;
                titulo=datos.mostradores[0].grupos[i].titulo;
                id=datos.mostradores[0].grupos[i].id;
                descripcion=datos.mostradores[0].grupos[i].descripcion;
                foto=datos.mostradores[0].grupos[i].imagenFondoUrl;
                console.log(foto);
                btnDetalles[j].addEventListener('click',mostrarDetalles);
                btnFavoritos[j].addEventListener('click',function(){asignarFavorito(foto)},false);
            }
        }*/
	})
}
obtenerGrupos();