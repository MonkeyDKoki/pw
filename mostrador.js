const {BrowserWindow}=require('electron').remote;
const app=require('electron').app;
const path=require('path');
const url= require('url');

let PantallaGrupo;

var mostrarGrupos = function(){
    localStorage.setItem("mostrador",this.value);
    window.location.href='grupo.html';
	/*PantallaGrupo = new BrowserWindow({width:900,height:400});
	PantallaGrupo.loadURL(url.format({
		pathname: path.join(__dirname,'grupo.html'),
		protocol: 'file',
		slashes: true
	}));
	PantallaGrupo.show();*/
}

var btnMostradores = document.getElementsByClassName('btnMostradores');
var obtenerMostradores= function(){
	var url='http://museobillete.azurewebsites.net/api/Expo/'+localStorage.getItem('vitrina');
	fetch(url)
	.then(datos=>datos.json())
	.then(datos=>{
		var foto='';
        var titulo='';
        var id='';
        document.getElementById('mostrador').innerHTML='';
		for(let i=0;i<datos.mostradores.length;i++)
		{
            titulo=datos.mostradores[i].titulo;
            id=datos.mostradores[i].id;
            descripcion=datos.mostradores[i].descripcion;
            foto=datos.mostradores[i].imagenFondoUrl;
            document.getElementById('mostrador').innerHTML += `
                    <article>
                            <span>${titulo}</span>
                            <span>${id}</span>
                            <img src="${foto}">
                            <button href=""class="btnMostradores" value="${id}" >Ver Mostrador</button>
                    </article>
                    <hr>
                    <br>`;
        }
        for(let i=0;i<btnMostradores.length;i++)
        {
            btnMostradores[i].addEventListener('click',mostrarGrupos);
        }
	})
}
obtenerMostradores();