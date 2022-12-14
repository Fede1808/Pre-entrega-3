//Tercer pre entrega proyecto

const lista_recetas = cargar_recetas();

let formulario = document.getElementById("formulario");
formulario.onsubmit=Buscador_de_recetas;  


//buscador de recetas
function Buscador_de_recetas(ev){
    ev.preventDefault()
    if (formulario.children[0].value == ""){
        ev.preventDefault();//evita que se borren los datos
        alert("Ingrese una receta")
    }else{
        let receta_a_buscar = formulario.children[0].value;
        const encontrado = lista_recetas.find((receta) => receta.nombre.toLowerCase() == receta_a_buscar.toLowerCase());
        if (encontrado != undefined){
            Swal.fire({
                title: encontrado.nombre,
                text: encontrado.pasos,
                imageUrl: encontrado.imagen,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
              }) 
        }else{
            console.log("Receta no encontrada!");
        }
    }
}

// Se carga el article donde iran las cards
let articuloCartas = document.getElementById("cartas");
let contador = 0;
let i = 0;
numero_receta = [];

//define 3 numero aleatorios que no se repitan, asi no aparecen dos recetas iguales en las recetas del dia
do {
    let num = Math.round(Math.random() * 14);
    if (numero_receta.indexOf(num) < 0){ 
        numero_receta.push(num);
        i += 1
    }    
} while (i < 5); 

//Inserta las cards de las recetas del dia
for (let i = 0; i < 4; i++) {
    contador += 1;
    let carta = document.createElement("div");
    carta.className="card col-md-3";
    carta.innerHTML = `
    <div class="card-img-top img-fluid">
    <img class="card-img-top  img-fluid" src="${lista_recetas[numero_receta[contador]].imagen}" alt=${lista_recetas[numero_receta[contador]].nombre}>
    <div class="card-block">
        <h5 class="card-title">${lista_recetas[numero_receta[contador]].nombre}</h5>
        <br></br>
        <button type="button" id ="boton${contador}" class="btn btn-primary" daa-toggle="modal" data-target="exampleModalLong${numero_receta[numero_receta[contador]]}">
        Ver mas
    </button>
    </div>
    </div>`;
    articuloCartas.append(carta)
}

// Define la funcionalidad de los botones de las cards
let boton1 = document.getElementById("boton1");
let boton2 = document.getElementById("boton2");
let boton3 = document.getElementById("boton3");

boton1.onclick = function() {
    Swal.fire({
        title: lista_recetas[numero_receta[0]].nombre,
        text: lista_recetas[numero_receta[0]].pasos,
        imageUrl: lista_recetas[numero_receta[0]].imagen,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
}

boton2.onclick = function() {
    Swal.fire({
        title: lista_recetas[numero_receta[1]].nombre,
        text: lista_recetas[numero_receta[1]].pasos,
        imageUrl: lista_recetas[numero_receta[1]].imagen,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
}
boton3.onclick = function() {
    Swal.fire({
        title: lista_recetas[numero_receta[2]].nombre,
        text: lista_recetas[numero_receta[2]].pasos,
        imageUrl: lista_recetas[numero_receta[2]].imagen,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
}


//Boton modo oscuro/claro
let principal = document.getElementById("principal");
let boton = document.getElementById("mode");
let modo = localStorage.getItem("modo");

if(modo != null){
    if(modo == "dark"){
        document.body.className = modo;
        principal.className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center "+modo;
        boton.innerText="Modo Claro";
    }
}else{
    modo = "light";
}
boton.onclick = function() {
    if(modo == "light"){
        document.body.className="dark";
        principal.classList.remove("light");
        principal.classList.add("dark");
        boton.innerText="Modo Claro";
        modo = "dark";
    }else{
        document.body.className="light";
        principal.classList.remove("dark");
        principal.classList.add("light");
        boton.innerText="Modo Oscuro";
        modo = "light";
    }
    localStorage.setItem("modo",modo);
}


// muestra el paso a paso de una receta ingresada como parametro
function mostrar_pasos(receta){
console.log("--------------------------------------"+receta.nombre+"--------------------------------------");
console.log(receta.pasos);
}

// esta funcion se encarga de crear y cargar todas las recetas a utilizar
function cargar_recetas(){
    //creacion de el objeto receta y de la lista de recetas
    function Receta(id, nombre, lista_ingredientes, pasos, imagen){
        this.id = id;
        this.nombre = nombre;
        this.lista_ingredientes = lista_ingredientes;
        this.pasos = pasos;
        this.imagen = imagen;
    }

    //lista_recetas es una lista que contiene la informacion de todas las recetas: su id, su nombre, sus ingredientes y sus pasos.
    const lista_recetas = [];
    
    lista_recetas.push(new Receta(1,"Bifes a la portuguesa",["bife","cebolla","morron","ajo","picado","zanahora","papa","sal","pimienta","aceite","arveja"], "1. Cortar la cebolla y los morrones en tiras finas, el ajo picado, la zanahoria en rodajas finas y las papas en rodajas gruesas, m??s o menos de 1,5 cent??metros. Es importante que las papas no est??n muy finas para que no se deshagan y tus bifes a la portuguesa salgan perfectos" + 
    "\n2. Cortar los bifes en trozos medianos y salpimentar. Se pueden poner enteros pero yo lo hago as?? para que se puedan revolver durante la cocci??n."+
    "\n3. Colocar, en este orden, capas de ingredientes dentro de una olla profunda: un chorrito de aceite, cebollas y morrones, papas, zanahorias, una primera capa de carne. Repetir hasta terminar con todas las capas. La ??ltima capa sobre los bifes debe tener cebollas y morrones, sin papas ni zanahorias. Sobre esto pondremos el tomate pelado y picado, el ajo picado y el pur?? de tomates. El tomate va encima de todo ya que como largar?? bastante l??quido, la idea es que hidrate todo lo que est?? debajo."+
    "\n4. Sobre esta monta??a de alimentos ricos, pondremos el caldo, agreg??ndolo por los costados para que no mueva mucho el tomate."+
    "\n5. Tapamos y llevamos a fuego fuerte hasta que hierva. Luego bajamos a m??nimo y cocinamos as?? una media hora o hasta que la papa est?? tierna. Revolver de vez en cuando, con cuidado de no romper las papas."+
    "\n6. 5 minutos antes de retirar, agregamos las arvejas. Si le pon??s arvejas frescas, las agreg??s al inicio, con todo."+
    "\n7. Retirar tus bifes a la portuguesa del fuego y dejar reposar m??nimo unos 10 minutos, vas a ver lo linda que se pone la cosa. Servir, disfrutar y meter siesta.","images/bife_ala_portuguesa.jpg"));
    
    lista_recetas.push(new Receta(2,"Bifes a la criolla",["bife","cebolla","morron","ajo","cebolla de verdeo","zanahora","papa","sal","pimienta","aceite de oliva","perejil"],"1. Cortar los bifes en trozos del tama??o que mas nos guste, teniendo en cuenta el formato de los bifes a la criolla (lo lo corten en trocitos peque????simos, mas bien en bifes medianos). Salpimentar."+
    "\n2. Colocar en una olla con aceite de oliva capas de verdura: cebolla, morr??n, papa, zanahoria, ajo, cebolla de verdeo y carne en ese orden.La idea es administrar los ingredientes de forma tal que nos permita hacer varias capas una encima de la otra. Es importante que no agreguemos el tomate en las capas, y que solo lo agreguemos encima del todo ya que cumplir?? la funci??n de hidratar todo lo que hay debajo. A medida que armamos las capas vamos salpimentando."+
    "\n3. A??adir encima el pur?? de tomate, aceite de oliva y una taza de caldo. Recuerden que hace un tiempo publiqu?? una receta de calditos caseros que son riqu??simos y que vienen perfectos para ??ste tipo de preparaciones. "+
    "\n4. Sin revolver, colocar la olla tapada a fuego alto hasta que rompa hervor."+
    "\n5. Cuando rompa hervor abrir la olla y revolver hasta mezclar todos los ingredientes."+
    "\n6. Volver a tapar dejando una peque??a abertura y dejar cocinando a fuego medio revolviendo cada tanto. Lo vamos a dejar cocinando durante 30-40 minutos. Para saber cuando sacarlo del fuego vamos a prestar atenci??n a la cocci??n de la papa: cuando la papa est?? cocida los bifes a la criolla est??n listos."+
    "\n7. Cuando falten 5 minutos para quitarlo del fuego agregar una lata de arvejas. En el caso de que utilicen arvejas congeladas deber??an agregarlas en el paso 2 con las dem??s verduras, para que se cocinen. Tapar y cocinar durante 5 minutos m??s."+
    "\n8. Apagar el fuego y dejar reposar como m??nimo 10 minutos. Si pueden dejarlo reposar un poquito m??s mejor, pero es importante que al menos lo hagamos durante 10 minutos, ver??n como cambia."+
    "\n9. Antes de servir a??adir un poco de perejil picado.","images/bifes_a_la_criolla.jpg"));
    
    lista_recetas.push(new Receta(3, "Bifes a la plancha",["bife","sal","ajo","aceite","cebolla","provenzal"],"1. Calentar la plancha a fuego fuerte y poner el bife sobre la superficie, sin aceitar."+
    "\n2. Salar y dorar 5 minutos de cada lado. Para un bife seco y bien cocido, reducir el fuego e ir cocin??ndolo lentamente dejando que la carne exude sus jugos y la costra exterior se vaya endureciendo. Para un bife m??s jugoso o a punto, cocina a fuego m??ximo, para que se dore por fuera y quede blando y sangrante por dentro."+
    "\n3. La provenzal: mezclar el perejil, con el ajo picado, la sal y la cucharada de agua o aceite, o ambos."+
    "\n4. Pincelar con la provenzal antes de llevar a la plancha para que la carne absorba el sabor. Pero, si es un buen corte de carne, conviene servir la provenzal a un costado del plato para combinar los bocados de churrasco con la salsa a gusto de cada comensal.","images/bifes_ala_plancha.jpg"));
    
    lista_recetas.push(new Receta(4,"Milanesa a la napolitana",["milanesa","salsa","jamon cocido","queso","oregano"],"1. Vamos colocar primero, por encima de nuestra milanesa, la salsa que acabamos de hacer."+
    "\n2. Luego, colocamos unas fetas de jam??n cocido"+
    "\n3. Finalmente, por encima, ponemos nuestro queso."+
    "\n4. As??, las vamos a llevar al horno 180?? hasta que se derrita el queso y chorree por los costados generando el efecto m??s hermoso y tentador del universo."+
    "\n5. Al sacarlas podemos tirar por encima unas pizcas de or??gano y ??listo!","images/milanesa_napolitana.jpg"));
    
    lista_recetas.push(new Receta(5,"Milanesa con papas",["milanesa","papas","aceite","sal"],"1. Pelar las papas y cortarlas en bast??n, secarlas bien y fre??rlas en un recipiente profundo con abundante aceite (deben quedar sumergidas). Retirar una vez que los bordes se hayan dorado y colocar en una fuente cubierta con papel absorbente."+
    "\n2. Retirar la grasa y nervios que pueda tener la carne para preparar las milanesas. Pelar los dientes de ajo y picar. En un bol batir ligeramente los huevos con el ajo y el perejil, salpimentar. Tener una fuente con los cortes de carne para milanesas, un bol con el preparado de huevos y una fuente con el pan rallado. Pasar cada milanesa por huevo y luego por el pan rallado aplastando bien con la mano, cuidando que quede bien empanado de ambos lados. Volver a pasar por huevo y pan rallado. "+
    "\n3. Fre??r las milanesas en una sart??n con abundante aceite de girasol bien caliente. Retirar y escurrir en papel absorbente. Reservar al calor."+
    "\n4. Servir al plato y ??disfrutar!","images/milanesa_papas.jpg"));
    
    lista_recetas.push(new Receta(6,"Milanesa Frita",["milanesa","aceite","limon"],"1. En una olla poner aceite a calentar a 180?? durante 5 Minutos."+
    "\n2. Colocar la milanesa en el aceite y darla vuelta a los 7 minutos."+
    "\n3. Servir al plato y ??disfrutar!","images/milanesa.jpg"));
    
    lista_recetas.push(new Receta(7,"Risotto",["arroz","caldo","cebolla","cebolla de verdeo","hongos","aceite","sal","manteca"],"1. La base de todo buen risotto es sin dudas el caldo. As?? que lo primero que tenemos que tener listo es el caldo. Pueden hacerlo casero, de cajita o hacerlo con mis calditos caseros que siempre quedan genial. Es muy importante mantener el caldo cerca y a fuego m??nimo. Y es preferible que sobre, porque si falta???..no la contamos???"+
    "\n2. Ahora vamos a cortar los vegetales: picar bien peque??a la cebolla, cortar los hongos en rodajas y picar la cebolla de verdeo"+
    "\n3. En una olla vamos a colocar la manteca y el aceite, y vamos a cocinar la cebolla a fuego suave hasta que est?? transparente, le ponemos un poco de sal para que largue l??quido y quede bien cocida."+
    "\n4. Vamos a agregar los hongos, revolver y tapar. Lo dejamos apenas unos minutos para que se dore sin que se cocine de m??s. Subir bien fuerte el fuego y colocar vaso de vino. Dejar hasta que se evapore el alcohol (es decir, cuando ya no haya olor a alcohol)"+
    "\n5. Ahora si agregamos el arroz y movemos bien hasta que quede brillante y bien embebido en manteca, aceite y vino, sin tostarse!"+
    "\n6. A continuaci??n vamos a repetir los siguientes 3 pasos hasta que el arroz est?? al dente: Agregar caldo. Mas o menos un cuchar??n mediano; . Revolver un poco;. Esperar a que se absorba. El arroz del risotto siempre tiene que estar h??medo, con l??quido pero no hundido en caldo, si seco del todo. Es un punto muy zen."+
    "\n7. Cuando el arroz est?? al dente, lo sacamos, le agregamos un poco de manteca, y batimos en??rgicamente para integrar todo. Eso va a ser que nuestro risotto quede much??simo m??s cremoso.","images/risotto.jpg"));
    
    lista_recetas.push(new Receta(8,"Arroz con pollo",["arroz","caldo","pollo","cebolla","tomate","pimienta","sal","limon"],"1. Trocear el pollo en pedazos peque??os y saltearlo en la sart??n caliente (con un chorrito de aceite) hasta que est?? dorado de ambas partes. Retirar y reservar."+
    "\n2. Saltear en el fondo de cocci??n del pollo la cebolla, el morr??n y el ajo, todo picado peque??o. "+
    "\n3. Cuando la cebolla est?? transparente, incorporar el tomate, tambi??n picado. Sofre??r hasta que tome un color amarronado."+
    "\n4. Incorporar los trozos de pollo que hab??amos reservado. Agregar el arroz y remover, salteando a fuego medio, hasta que los granos de arroz se vean transparentes."+
    "\n5.  Agregar el doble de agua (2 tazas), salpimentar y condimentar. Agregar tambi??n el chorro de aceto o vino. Revolver una sola vez y dejar que hierva. Cuando hirvi??, bajar el fuego a medio y cocinar destapado, hasta que el arroz haya consumido toda el agua. No revolver durante la cocci??n."+
    "\n6. Servir y llover con ciboulette picado. Se puede comer con lim??n.","images/arros_pollo.jpg"));
    
    lista_recetas.push(new Receta(9,"Arroz con verduras",["arroz","ajo","cebolla","cebolla","pimienton","zanahoria","calabacin","tomate","puerro","guisantes verdes"],"1. Pica todos los vegetales en cubos peque??os. El ajo p??calo muy, muy peque??o."+
    "\n2. Calienta una sart??n profunda o una olla paellera y sofr??e los vegetales en este orden: el ajo, la cebolla, la zanahoria, el piment??n, el tomate, el calabac??n, el puerro y el ceboll??n. Agrega una cucharadita de sal y una pizca de pimienta."+
    "\n3. Deja que se sofr??a todo un par de minutos y que suelte un poco de jugo."+
    "\n4. Agrega la taza y media de arroz, mezcla bien y agrega los guisantes verdes y las 3 tazas de agua."+
    "\n5. Revuelve un poco y permite que hierva."+
    "\n6. Cuando el agua comience a secarse y s??lo queden burbujas sobre los granos de arroz, baja el fuego al m??nimo y tapa tu sart??n."+
    "\n7. Deja cocinar unos 10-15 minutos."+
    "\n8. Revisa que el grano est?? listo, y si en efecto lo est??, retira del fuego, deja reposar un par de minutos y sirve tu delicioso arroz con verduras.","images/arroz_verduras.jpg"));
    
    lista_recetas.push(new Receta(10,"Zapallo relleno",["zapallo","cebolla","aceite de oliva","langostinos","vino blanco","crema","queso cortado"],"1. Lavar el zapallo, retirarle la tapa de arriba, remover las semillas y todo el interior del zapallo."+
    "\n2. Envolver el zapallo en papel aluminio y colocar sobre una asadera."+
    "\n3. Cocinar en un horno medio de 180?? C por 45 minutos."+
    "\n4. Una vez cocido el zapallo, retirar del horno, raspar el interior y hacer un pur??."+
    "\n5. Picar la cebolla y cocinarla en una cacerola con un poco de aceite de oliva."+
    "\n6. Luego agregar los langostinos limpios y desvenados, saltear."+
    "\n7. Incorporar el vino blanco."+
    "\n8. Una vez cocidos los langostinos, incorporar la crema y el queso cortado bien chiquito a la mezcla."+
    "\n9. Rellenar el zapallo con la mezcla cremosa y llevar a la mesa con la tapa puesta a modo de fuente.","images/zapallo_relleno.jpg"))
    
    lista_recetas.push(new Receta(11,"Tarta de espinaca",["espinaca","cebolla","aceite","queso azul","queso mantecoso","crema de leche","queso untable","masa de tarta"],"1. Lavar las espinacas y ponerlas en una olla sin agua, tapada y a fuego m??nimo (solo h??medas del agua con la que se lavaron). Cuando se hayan ???desmayado??? todas, retirar del fuego. Quitar el exceso de agua y picar de forma gruesa"+
    "\n2. Picar la cebolla, saltear en un poco de aceite. Cuando est??n transparentes, agregar las espinacas picadas. Revolver y saltear por unos 5 minutos."+
    "\n3. Agregar, fuera del fuego, el queso azul y la mitad del queso mantecoso, en trocitos peque??os, la crema de leche y el queso untable. Unir bien todo. "+
    "\n4. Disponer la masa de tarta en una tartera. Echar la mezcla y repulgar los bordes. Acomodar el resto de queso mantecoso, en trocitos, sobre el relleno."+
    "\n5. Llevar tu tarta de espinaca a horno fuerte unos 15 minutos, hasta que est?? dorada.","images/tarta_espinaca.jpg"))
    
    lista_recetas.push(new Receta(12,"Wok de verduras",["aceite de oliva","sal","ajo","pimienta","cebolla","morron","zanahoria","berenjena"],"1. Cortar todas las verduras y reservarlas."+
    "\n2. Calentar un wok o un sart??n con un poco de aceite de oliva en la base, cuando est?? caliente se agregan las verduras. Comenzar a cocinar a fuego fuerte."+
    "\n3. Cada tanto mover un poco el sart??n o con una esp??tula, pero con movimientos suaves evitando que se rompan. Continuar dorando."+
    "\n4. Pasados 10 minutos, agregar un poco de agua y la tapa. Se cocina as?? por 5 minutos m??s."+
    "\n5. Pasado el tiempo, ya esta casi listo. Por ??ltimo se agrega la sal, el ajo picado y la pimienta. No volver a colocar la tapa, continuar cocinando y revolver cada tanto por 10 minutos m??s.","images/wok_verduras.jpg"))
    
    lista_recetas.push(new Receta(13,"Fideos con salsa pesto",["ajo","albahaca","sal","pimienta","queso","aceite","tallarin"],"1. A??ade en la licuadora o trituradora el ajo, la albahaca, los pi??ones y la sal y pimienta al gusto. Lic??a hasta conseguir una mezcla sin grumos."+
    "\n2. Poco a poco, ve a??adiendo el queso y el aceite hasta que tengas tu salsa de la textura deseada."+
    "\n3. Pon a hervir abundante agua en un cazo y, solo cuando ya haya hervido, echa una cucharadita de sal y aceite e introduce los tallarines."+
    "\n4. Cocina por unos 8 minutos y escurre los tallarines. ??Vierte el pesto sobre los tallarines, mezcla y disfruta de unos verdaderos tallarines al pesto! Puedes decorar colocando algunos pi??ones por encima y una ramita de albahaca.","images/fideos_pesto.jpg"))
    
    lista_recetas.push(new Receta(14,"Spaghetti con salsa bolognesa",["pasta","aceite de oliva","ajo","cebolla","zanahoria","pimenton","apio","tomate","vino tinto","laurel","costilla"],"1. Calienta el aceite de oliva en una olla mediana, a??ade el ajo con la cebolla, la zanahoria, el piment??n y el apio. Saltea durante 2 a 3 minutos revolviendo de vez en cuando hasta ablandar los vegetales. A??ade la carne molida y cocina otros 3 minutos m??s revolviendo una que otra vez para evitar la formaci??n de grumos de carne y distribuir con los otros ingredientes."+
    "\n2. Vierte de una vez el vino tinto y espera a que vuelva a hervir. Continua con los tomates molidos y la salsa de tomates, a??ade la hoja de laurel con el caldo de costilla MAGGI?? desmenuzado y el agua hirviendo, condimenta con el or??gano, comino, pimienta, y aj?? color. Cocina a fuego medio-bajo y semi-tapado durante 35 a 40 minutos revolviendo una que otra vez para evitar que la salsa se pegue. Una vez cocidos y blandos todos los ingredientes verifica su sabor, si es necesario agrega m??s agua caliente seg??n c??mo te guste la textura."+
    "\n3. Aparte, cocina los spaghetti en abundante agua hirviendo con sal seg??n las indicaciones del envase. Una vez cocidos, escurre el agua caliente y devu??lvelos a la olla con unas gotas de aceite de oliva y un toque de mantequilla. Cuando quieras s??rvelos acompa??ados de la salsa reci??n preparada.","images/fideos_bolognesa.jpg"))
    
    lista_recetas.push(new Receta(15,"Mac & cheese",["pasta","manteca","harina","leche","queso parmesano","queso cheddar","sal","pimienta"],"1. Comenzamos cociendo la pasta como indique el fabricante. En unos 10 minutos estar??s."+
    "\n2. Mientras tanto vamos haciendo la salsa de queso. Comenzamos derritiendo la mantequilla en una sart??n."+
    "\n3. Una vez derretida agregamos la harina. Lo mejor es a??adirla tamizada con un colador para no que salgan grumos y al ser una salsa en este caso es importante."+
    "\n4. Una vez cocinada la harina agregamos la leche. Si es del tiempo mejor, ayudar?? tambi??n a que no se formen grumos."+
    "\n5. Cocinamos la salsa unos 15 minutos. Debemos de obtener una bechamel suave ya que estamos acostumbrados a hacer bechamel para croquetas."+
    "\n6. Agregamos el queso rallado parmesano y el queso cheddar, cocinamos unos 15 minutos para que todo se integre. Salpimentamos y ponemos especias al gusto."+
    "\n7. A??adimos la pasta ya cocida y la ponemos en una fuente de horno."+
    "\n8. Ponemos un poco de pan rallado por encima y queso parmesano y ponemos a gratinar.","images/mac_cheese.jpg"))
    
    return lista_recetas;
}
