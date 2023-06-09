/*Obtener con getElementById para manipular */
const CALCULAR = document.getElementById('calcular');
const ERROR = document.getElementById('error');
const FLUJO= document.getElementById('flu');
const MANTENIMIENTO = document.getElementById('man');
const MEDIOMANTENIMIENTO= document.getElementById('medio');
const ENTRADA= document.getElementById('peso');

//Hacer que al presionar el boton se ejecuta una funcion-- usa una funcion anonima
CALCULAR.addEventListener('click', () => {
    calculoTotal(); 
    //Borra el input al ingresar
    ENTRADA.value='';
})
ENTRADA.addEventListener('keydown', (event) =>{
    if (event.key === 'Enter') {
    calculoTotal();
    ENTRADA.value='';
 }})
/*Calculo total para poder llamar en los dos eventos del click al boton y al presionar el enter */
function calculoTotal(){
    const PESO = document.getElementById('peso').value;
    if (PESO >0){
        ERROR.style.display = 'none';
        let flujo= calcFlujo(PESO);
        FLUJO.innerHTML = 'Volumen diario: '+ flujo + ' cc';
        FLUJO.style.display = 'block';
        /*Verificar si el peso es mayor a 30 antes de mostrar el mantenimiento
        Al pasar los 30 kilos solo imorime los volumnes diarios posibles en cc */
        if (PESO > 30) {
        MANTENIMIENTO.style.display = 'none';
        MEDIOMANTENIMIENTO.style.display= 'none';
        } else {
        let mantenimiento = (flujo/24);
        MANTENIMIENTO.innerHTML = 'Mantenimiento: ' +Math.round(mantenimiento) + 'cc/hr';
        MANTENIMIENTO.style.display = 'block';
        let medio= flujo/24*1.5;
        MEDIOMANTENIMIENTO.innerHTML= 'm+m/2: '+ Math.round(medio)+ 'cc/hr';
        MEDIOMANTENIMIENTO.style.display= 'block';
        }
    } else {
        ERROR.style.display = 'block';
        FLUJO.style.display = 'none';
        MANTENIMIENTO.style.display = 'none';
        MEDIOMANTENIMIENTO.style.display = 'none';
    }
   
}

/*Funcion que calcula la hidratacion segun el peso */
function calcFlujo(peso){
    if(peso<=30){
        return calculoHoliday(peso);     
    } 
    else {
     //Calcular con la formula
    let formula= (( (peso * 4) + 7) / (peso + 90));
    let volumeDiario1=formula* 1500;
    let volumeDiario2=formula* 2000;
    //la informacion acerca del volumen diario cuando pasa 30
    let info= `Entre ${volumeDiario1} cc y ${volumeDiario2} `;
    return info;
    }
}
/*Funcion que se ejecuta cuando el peso es menor a 30*/
function calculoHoliday(peso){
    let pesoRestante=0;
    let resultado=0;
    //FLUJO 1 es una constante que guarda lo que se necesita de cc para 20kilos
    const FLUJO1= 1500;
    //FLUJO2 es una constante que guarda lo que se necesita de cc para 10kilos
    const FLUJO2= 1000;
    if (peso>20){
         pesoRestante= peso-20;
        resultado= FLUJO1 + (pesoRestante*20); 
        return resultado;  
    }
    else if (peso>10){
        pesoRestante= peso-10;
        resultado= FLUJO2+ (pesoRestante*50);
        return resultado;
    }
    else{
        return resultado= peso* 100;
    }

}
