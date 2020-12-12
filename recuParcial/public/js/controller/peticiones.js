import Anuncio_Auto from "../anuncio.js";
import {obtenerAnuncio,divTabla,limpiarCampos,frmAnuncioAutos} from "./form.js";
import crearTabla from "../tabla.js";

let tablaFiltro = document.getElementById('tabla');
let tbodyFiltro = document.getElementById('tablaTbody');
let listaAnuncios;


export function cargarTodos()
{
    tbodyFiltro.innerHTML=""; 
    

    fetch('http://localhost:3000/anuncios_autos')
    .then(res =>{
        if(!res.ok) return Promise.reject(res);
        return res.json();
        
    })
    .then(data=>{

        listaAnuncios = data.map((item)=>{
            //console.log(item);
            return new new Anuncio_Auto(
                element.id,
                element.titulo,
                element.transaccion,
                element.descripcion,
                element.precio,
                element.num_puertas,
                element.num_kms,                            
                element.potencia);
        })
        

        document.getElementById('chkid').addEventListener('click',mostrarFiltro);
        document.getElementById('chkdescripcion').addEventListener('click',mostrarFiltro);
        document.getElementById('chktitulo').addEventListener('click',mostrarFiltro);
        document.getElementById('chktransaccion').addEventListener('click',mostrarFiltro);
        document.getElementById('chknum_kms').addEventListener('click',mostrarFiltro);
        document.getElementById('chknum_puertas').addEventListener('click',mostrarFiltro);
        document.getElementById('chkpotencia').addEventListener('click',mostrarFiltro);
        document.getElementById('chkprecio').addEventListener('click',mostrarFiltro);
        
        tablaFiltrada();
        
    })
    .catch(err=>{
        //console.error(err.status);
    })
    .finally(()=>{
        
       
    })

}

export function traerAnuncios()
{
    
    
    return new Promise ((resolve,reject)=>{
        const xhr = new XMLHttpRequest();
        spinner.appendChild(crearSpineer());
        xhr.addEventListener('readystatechange',()=>{
        
            if(xhr.readyState == 4)
            {
                if(xhr.status >= 200 && xhr.status < 300)
                {
                    const datosParseados = [];
                    let datos = JSON.parse(xhr.responseText);
                    datos.forEach(element => {
                        const anuncio = new Anuncio_Auto(
                            element.id,
                            element.titulo,
                            element.transaccion,
                            element.descripcion,
                            element.precio,
                            element.num_puertas,
                            element.num_kms,                            
                            element.potencia
                            )  
                        datosParseados.push(anuncio);  
                                   
                    }); 
                    //console.log(datos);
                    //console.log(datosParseados);
                    //cargar();    
                    resolve(datosParseados);           
                }
                else
                {
                    let msjError = xhr.statusText || "Ocurrio un error";
                    reject({status:xhr.status, statusText: msjError});
                    console.log("Error: "+xhr.status + "-" + xhr.statusText);
                }
                //console.log(datosParseados);
                //return datosParseados;
                spinner.innerHTML = ""; 
            }
        });
        xhr.open('GET','http://localhost:3000/anuncios_autos');
        xhr.send();
    })
}



export function altaNuevoAnuncio()
{
    return new Promise ((resolve,reject)=>{
        const nuevoAnuncio = obtenerAnuncio();
        const xhr = new XMLHttpRequest();
    
        spinner.appendChild(crearSpineer());
        xhr.addEventListener('readystatechange',()=>{
            if(xhr.readyState == 4)
            {
                if(xhr.status >= 200 && xhr.status < 300)
                {
                    let datos = JSON.parse(xhr.responseText);
                    console.log(datos);
                    resolve(true);
                }
                else
                {
                    let msjError = xhr.statusText || "Ocurrio un error";
                    reject({status:xhr.status, statusText: msjError});
                    console.log("Error: "+xhr.status + "-" + xhr.statusText);
                }
                spinner.innerHTML = "";
                limpiarCampos(); 
            }   
         });
        xhr.open('POST',"http://localhost:3000/anuncios_autos");
        xhr.setRequestHeader("Content-type","application/json;charset=utf-8");
        xhr.send(JSON.stringify(nuevoAnuncio));
    })
    
}


function crearSpineer()
{
    const img = document.createElement('img');
    img.setAttribute("src", "./images/ruedaSpinner.gif");
    img.setAttribute("alt","Imagen Spineer");

    return img;
}

function vaciarCampos(elemento)
{
    while(elemento.firstChild)
    {
        elemento.removeChild(elemento.firstChild);
    }
}

export function actualizarLista(lista)
{
   
    
        setTimeout(() => {
            while (divTabla.firstChild) {
                divTabla.removeChild(divTabla.lastChild);
              }
              divTabla.appendChild(crearTabla(lista));
        }, 2000);
    

}

export function modificarAnuncio()
{
    const nuevoAnuncio = obtenerAnuncio();
    const xhr = new XMLHttpRequest();
    let idSeleccionado = frmAnuncioAutos.id.value;
    //spinner.appendChild(crearSpineer());
    xhr.addEventListener('readystatechange',()=>{
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                let datos = JSON.parse(xhr.responseText);
                console.log(datos);
            }
            else
            {
                console.log("Error: "+xhr.status + "-" + xhr.statusText);
            }
            //spinner.innerHTML = ""; 
        }
    });
    xhr.open('PUT',"http://localhost:3000/anuncios_autos/"+idSeleccionado);
    xhr.setRequestHeader("Content-type","application/json;charset=utf-8");
    xhr.send(JSON.stringify(nuevoAnuncio));   
    
}

export function borrarAnuncio()
{
    divTabla.innerHTML = "";
    spinner.appendChild(crearSpineer());
    let idSeleccionado = frmAnuncioAutos.id.value;
    const config = {
        method : "DELETE",
        headers : {
            "Content-type" : "application/json;charset=utf-8"
        },
        
    }
    fetch('http://localhost:3000/anuncios_autos/'+ idSeleccionado,config)
    .then(res=>{
        if(!res.ok) return Promise.reject(res);
        return res.json();
    })
    .then(anuncio_auto=>{
        console.log("Baja exitosa",anuncio_auto);        
        cargarAnuncios();
    })
    .catch(err=>{
        console.error(err.status);
    })
    .finally(()=>{
        spinner.innerHTML = "";
    });
}

//PARA CARGAR AUTOMATICAMENTE LA TABLA
export function cargarAnuncios()
{
    const xhr = new XMLHttpRequest();
    
    divTabla.innerHTML = "";
    spinner.appendChild(crearSpineer());

    xhr.addEventListener('readystatechange',()=>{
        
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                
                let datos = JSON.parse(xhr.responseText);
                

                divTabla.appendChild(crearTabla(datos));
            }
            else
            {
                
                console.log("Error: "+xhr.status + "-" + xhr.statusText);
            }
            
            spinner.innerHTML = ""; 
        }
    });
    xhr.open('GET','http://localhost:3000/anuncios_autos');
    xhr.send();
}



function tablaFiltrada()
{

    document.getElementById('chkid').checked = false;
    document.getElementById('chkdescripcion').checked = false;
    document.getElementById('chktitulo').checked = false;
    document.getElementById('chktransaccion').checked = false;
    document.getElementById('chknum_kms').checked = false;
    document.getElementById('chknum_puertas').checked = false;
    document.getElementById('chkpotencia').checked = false;
    document.getElementById('chkprecio').checked = false;
             
    let losAnuncios;
    let objeto;
                
    losAnuncios = traerLocal();
    objeto =losAnuncios[0];

    for (const property in objeto) 
    {
                    
        if(property)
        //console.log(property);
        document.getElementById(property).checked = true;
    }
                


        let nuevasLista = traerLocal(); 
        tablaFiltro.appendChild(crearCabecera(nuevasLista[0]));
        //filtroSelect();

        tbodyFiltro.appendChild(crearTr(filtrarLista(nuevasLista)));
        tablaFiltro.appendChild(tbodyFiltro);
        divFiltro.appendChild(tablaFiltro);
        //promedioTodos();
}

function mostrarFiltro()
{
    
    tablaFiltro.innerHTML = "";
    tbodyFiltro.innerHTML = "";
    
    tablaFiltro.appendChild(crearCabecera(datos[0]));
    tbodyFiltro.appendChild(crearTr(filtrarLista(datos)));
    tablaFiltro.appendChild(tbodyFiltro);
    divFiltro.appendChild(tablaFiltro);
    guardarLocal(datos);

    
}

function guardarLocal(lista)
{
    localStorage.setItem("anuncio_autos",JSON.stringify(filtrarLista(lista)));
}

function traerLocal()
{

    return JSON.parse(localStorage.getItem("anuncio_autos")) || [];
    
}

function crearCabecera(item){
    //const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    const thead = document.createElement('thead');
    //thead.classList.add('bg-primary');
    for(const key in item){

        const th = document.createElement('th');
        const texto = document.createTextNode(key);
        th.appendChild(texto);
        let checkBox = document.getElementById('chk'+key);
        if(checkBox.checked){
            tr.appendChild(th);

        }else if(key == "id"){
            th.remove();
        }
        
    }
    thead.appendChild(tr);
    return thead;
}

function crearTr (data)
{

    anuncios = [...data];
    //console.log(anuncios);
    const fragmento = document.createDocumentFragment();


    data.forEach(element => {
    
        const tr = document.createElement('tr');
    
        for(const key in element){
            const td = document.createElement('td');
            const texto = document.createTextNode(element[key]);
            td.appendChild(texto);
            tr.appendChild(td);
        
        }
    
        if( element.hasOwnProperty('id')){
            
            tr.setAttribute('id',element['id']);
            
        }   
        // mostrarBotones(tr);
        fragmento.appendChild(tr);
        });


    return fragmento;
}

function filtrarLista(lista)
{

    let retorno = [];
    //console.log(lista);
    retorno = lista.map(row => {
        let fila = {};

        for (const key in row) {
        
            let checkBox = document.getElementById('chk'+key);
            
                if(checkBox.checked){
                    fila[key] = row[key];

                }
                
        }
        return fila;        
    });
    return retorno;
}