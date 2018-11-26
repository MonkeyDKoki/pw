
var mostrarDetalles = function(){
        var url='http://museobillete.azurewebsites.net/api/Expo/';
	    fetch(url+localStorage.getItem('mostrador'))
	    .then(datos=>datos.json())
	    .then(datos=>{
            window.open(datos.mostradores[0].grupos[localStorage.getItem('grupo')].piezas[this.value].detallesUrl,"_self")
         });
}


var btnDetalles = document.getElementsByClassName('btnDetalles');

var obtenerGrupos= function(){
	var url='http://museobillete.azurewebsites.net/api/Expo/';
	fetch(url+localStorage.getItem("mostrador"))
	.then(datos=>datos.json())
	.then(datos=>{
		var foto='';
        var titulo='';
        var id='';
        document.getElementById('pieza').innerHTML='';
        grup=localStorage.getItem('grupo');
		for(let i=0;i<datos.mostradores[0].grupos[grup].piezas.length;i++)
		{
            titulo=datos.mostradores[0].grupos[grup].piezas[i].titulo;
            id=datos.mostradores[0].grupos[grup].piezas[i].id;
            descripcion=datos.mostradores[0].grupos[grup].piezas[i].descripcion;
            foto=datos.mostradores[0].grupos[grup].piezas[i].imagenFondoUrl;
            document.getElementById('pieza').innerHTML += `
                <article>
                    <span>${titulo}</span>
                    <span>${id}</span>
                    <span>${descripcion}</span>
                    <img src="${foto}">                            
                    <button class="btnDetalles" value="${i}">Ver Detalle</button>
                </article>
                <hr>
                <br>
            `;	
        }
		for(let i=0;i<btnDetalles.length;i++)
		{
			btnDetalles[i].addEventListener('click',mostrarDetalles);
		}
	})
}
obtenerGrupos();