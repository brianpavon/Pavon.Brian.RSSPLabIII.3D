import crearTabla from "./tabla.js";

import Anuncio_Auto from "./anuncio.js";
import {frmAnuncioAutos,divTabla,limpiarCampos, obtenerAnuncio} from "./controller/form.js";
import {traerAnuncios,altaNuevoAnuncio,cargarAnuncios,borrarAnuncio,modificarAnuncio,cargarTodos} from "./controller/peticiones.js";

const inputPromedio = document.getElementById('inputPromedio');
const filtro = document.getElementById('filtroTransaccion');
const inputMayor = document.getElementById('inputMayor');
const inputMinimo = document.getElementById('inputMinimo');
const inputPromPotencia = document.getElementById('promPotencia');

//let frmAnuncioAutos;

//let divTabla;
//let divTabla = document.getElementById("divTabla");
let divFiltro = document.getElementById('tablaFiltro');
let tablaFiltro = document.getElementById('tabla');
let tbodyFiltro = document.getElementById('tablaTbody');
let listaServer;
let checks;
let listaMapeada = traerLocal() ;
let anuncios;
window.addEventListener('load',inicializarManejadores);

async function inicializarManejadores()
{
    
    //localStorage.clear();
    listaServer = await traerAnuncios();
    divFiltro.appendChild(crearTabla(listaMapeada));
    //cargarTodos();
    
    frmAnuncioAutos.addEventListener('submit',async (e)=>{
        e.preventDefault();
        
        altaNuevoAnuncio();
        
    });
    inputPromPotencia.value = promedioPotencia(listaServer);
    botonesModificacion();
    checks = document.querySelectorAll( '.cbox' );
    checks.forEach( element  =>  { filtrarColumnas( element, listaServer ); });
    cargarChecks(checks,listaMapeada);
}

function botonesModificacion()
{
    
    let btnModificar = document.getElementById("btnModificar");
    let btnCancelar = document.getElementById("btnCancelar");
    let btnEliminar = document.getElementById("btnEliminar");
    
     
    btnModificar.addEventListener('click',e=>{
        modificarAnuncio();
        limpiarCampos()
        //cargarAnuncios();
    });
    
    btnCancelar.addEventListener('click',e=>{
        limpiarCampos();
        
    });
    btnEliminar.addEventListener('click',e=>{
        borrarAnuncio();
        limpiarCampos();
        
    });
    
}




filtro.addEventListener('change',e=>{
    
    e.preventDefault();
    
   
    //console.log(filtro.value);
    let mayor = buscarMayor(filtro.value,listaServer);
    let promedio = filtrar(filtro.value,listaServer);
    let menor = buscarMenor(filtro.value,listaServer);
    //console.log(mayor)
    //console.log(promedio);
    inputMayor.value = mayor;
    inputPromedio.value=promedio;
    inputMinimo.value = menor;
    
})



function filtrar(filtro,lista)
{
    let promedio = "N/A";
    if(filtro == "Alquiler")
    {
        const precioAlquiler = lista.filter(anun=>anun.transaccion === 'Alquiler');
        const precios = precioAlquiler.map(element => element.precio);
        const cantPrecios = precios.length;
        const total = precios.reduce((prev,actual)=>prev + actual,0);

        promedio = total / cantPrecios;
    }
    else if(filtro == "Venta")
    {
        const precioAlquiler = lista.filter(anun=>anun.transaccion === 'Venta');
        const precios = precioAlquiler.map(element => element.precio);
        const cantPrecios = precios.length;
        const total = precios.reduce((prev,actual)=>prev + actual,0);
        promedio = total / cantPrecios;
    }
    
   
    return promedio;
}

function buscarMayor(filtro,listaAnuncios)
{
    let mayor = 0;
    if(filtro != '#')
    {
        const precioAlquiler = listaAnuncios.filter(anun=>anun.transaccion === filtro);
        const precios = precioAlquiler.map(element => element.precio);

        let mayor = precios.reduce((prev,actual)=>{
        return prev > actual ? prev : actual;
        });
        return mayor;

    }
    
        return mayor;
    
    
}

function buscarMenor(filtro,listaAnuncios)
{
    let menor = 0;
    if(filtro != '#')
    {
        const precioAlquiler = listaAnuncios.filter(anun=>anun.transaccion === filtro);
        const precios = precioAlquiler.map(element => element.precio);

        let menor = precios.reduce((prev,actual)=>{
            return prev < actual ? prev : actual;
        });
        return menor;
    }
    else
    {
        return menor;
    }
}

function promedioPotencia(listaAnuncios)
{
    let promedio = 0;
    //const precioAlquiler = listaAnuncios.filter(anun=>anun.transaccion === 'Venta');
    const potencia = listaAnuncios.map(element => element.potencia);
    //console.log(potencia);
    const cantDeAnuncios = potencia.length;
    //console.log(cantDeAnuncios);
    const total = potencia.reduce((prev,actual)=>prev + actual,0);
    //console.log(total);
    return promedio = total / cantDeAnuncios;

}

function cargarChecks( check, listaAnuncios )
{
   
    check.forEach(element => {
        listaAnuncios.forEach(element => {
            
        });
        
    });
    
}


async function filtrarColumnas( check, listaAnuncios ) 
{
    
   
    check.addEventListener( 'click', async() => { 
        let listaMapeada = listaAnuncios.map( row => { 
            
            let fila = {};
            for (const key in row) {
                //console.log(key);
                //console.log(row);
                if ( document.getElementById('chk'+key).checked ) 
                {
                    //console.log('chk'+key);
                    fila[key] = row[key];
                    
                    //console.log(key);
                }

            }
            
            //console.log(row);
            return fila;
            
        })

        
        divFiltro.innerHTML = "";
        
        //localStorage.setItem('anuncio_autos',JSON.stringify(listaMapeada));
        guardarLocal(listaMapeada);
        divFiltro.appendChild(crearTabla(listaMapeada));       

    });
};

function actualizarLista(){
    
    while(divFiltro.hasChildNodes()){
        divFiltro.removeChild(divFiltro.firstChild);
    }
    

    setTimeout(() => {
        while(divFiltro.hasChildNodes()){
            divFiltro.removeChild(divFiltro.firstChild);
        }
        
        traerAnuncios();
    }, 3000);

}

function guardarLocal(lista)
{
    
    localStorage.setItem('anuncio_autos',JSON.stringify(lista));
}

function traerLocal()
{

    return JSON.parse(localStorage.getItem("anuncio_autos")) || [];
    
}






/*function manejarCheck()
{
    let checks = document.querySelectorAll('.cbox');

    traerAnuncios()
    .then(function(res){
        let listaTotal = res;
        let checkeados = [];
        let checkFiltrado = listaTotal.map(function(item){
            checks.forEach(elemento => {
                if(!elemento.checked)
                {
                    delete item[elemento.value];
                }
            });
            return item;
        });
        checks.forEach(elemento => {
            if(elemento.checked)
            {
                checkeados.push(elemento.value);
            }
        });
        localStorage.setItem('anuncio_autos',JSON.stringify(checkeados));
        divTabla.innerHTML = "";
        divTabla.appendChild(crearTabla(checkFiltrado));
    });
}

function cargarTablaLocal()
{
    let checked = JSON.parse(localStorage.getItem("anuncio_autos"));
    let checkBoxes = document.querySelectorAll(".cbox");

    checkBoxes.forEach(element => {

        let isChecked = false;


        checked.forEach(item => {

           if(item == element.name){
               isChecked = true;
           }
        });

        if(!isChecked){
            element.checked = false;
        }

    });
    manejarCheck();
}

function filtroThead(item)
{
    const theadFiltro = document.getElementById('filtroThead');
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    //let checks = document.querySelectorAll('.cbox');
    //console.log(checks);
    for(const key in item)
    {
        
        let th = document.createElement('th');
        let texto = document.createTextNode(key);
        //checks.addEventListener('change',manejarCheck());
        th.appendChild(texto);
        //th.appendChild(checks);

        tr.appendChild(th);
    }
    thead.appendChild(tr);
    theadFiltro.appendChild(thead);
}*/