const {BrowserWindow}=require('electron').remote;
const app=require('electron').app;
const path=require('path');
const url= require('url');

let PantallaMostrador;

var obtenerMostradores = function(){
	localStorage.setItem("vitrina",this.value);
	/*PantallaMostrador = new BrowserWindow({width:900,height:400});
	PantallaMostrador.loadURL(url.format({
		pathname: path.join(__dirname,'mostrador.html'),
		protocol: 'file',
		slashes: true
	}));
	PantallaMostrador.show();*/
	window.location.href='mostrador.html';
	//console.log(BrowserWindow);
	//BrowserWindow.this.show();
}

var btnVitrinas = document.getElementsByClassName('btnVitrinas');
var obtenerVitrinas= function(){
	var url='http://museobillete.azurewebsites.net/api/Expo';
	fetch(url)
	.then(datos=>datos.json())
	.then(datos=>{
		var foto='';
		var nomVitrina='';
		document.getElementById('vitrina').innerHTML='';
		for(let i=0;i<datos.length;i++)
		{
			nomVitrina=datos[i].titulo;
			foto=datos[i].imagenFondoUrl;
			document.getElementById('vitrina').innerHTML += `
				<article>
					<span>${nomVitrina}</span>
					<img src="${foto}">
					<button class="btnVitrinas" value="${datos[i].id}">Ver Vitrina</button>
				</article>
				<hr>
				<br>
			`;	
		}
		for(let i=0;i<btnVitrinas.length;i++)
		{
			btnVitrinas[i].addEventListener('click',obtenerMostradores);
		}
	})
}
obtenerVitrinas();