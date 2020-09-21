//Variables
const listaTweets = document.getElementById('lista-tweets');




//Event Listeners
eventListeners();
function eventListeners(){
    //Cuando se envia el formulario
    document.querySelector("#formulario").addEventListener('submit', agregarTweet);

    //Borrar Tweets
    listaTweets.addEventListener('click', borrarTweet);

    //Cargar contenido desde el DOM cuando se actualiza la pagina:
    document.addEventListener('DOMContentLoaded', localStorageListo);
}



//Funciones

//Añadir tweet del formulario
function agregarTweet(e){
    e.preventDefault();
    //Leer el valor del text area
    const tweet = document.getElementById('tweet').value;
    //Crear boton para eliminar:
    const botonBorrar = document.createElement('a'); //Se crea un enlace
    botonBorrar.classList = "borrar-tweet";
    botonBorrar.innerText = "X";

    //Crear elemento y añadir el documento a la lista:
    const li = document.createElement("li");
    li.innerText = tweet;  //Añadir a la lista el contenido de tweet
    //Añade el boton de borar al tweet
    li.appendChild(botonBorrar);
    listaTweets.appendChild(li); //Agregar al DOM el li

    //Añadir al local storage
    agregarTweetLocalStorage(tweet);
}
//Eliminar el Tweet del Dom
function borrarTweet(e){
    e.preventDefault();
    if(e.target.className ==='borrar-tweet'){
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
        
    }
}

//Mostrar datos del LocalStorage en la Lista:
function localStorageListo(){
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    tweets.forEach(function(tweet){
    //Se crea el boton para eliminar:
    const botonBorrar = document.createElement('a'); //Se crea un enlace
    botonBorrar.classList = "borrar-tweet";
    botonBorrar.innerText = "X";

    //Crear elemento y añadir el documento a la lista:
    const li = document.createElement("li");
    li.innerText = tweet;  //Añadir a la lista el contenido de tweet
    //Añade el boton de borar al tweet
    li.appendChild(botonBorrar);
    listaTweets.appendChild(li); //Agregar al DOM el li
    });
}

//Agregar tweet al local storage
function agregarTweetLocalStorage(tweet){
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    //Añadir el nuevo tweet:
    tweets.push(tweet);

    //Convertir de string a arreglo para local storage:
    localStorage.setItem('tweets', JSON.stringify(tweets));
    
}

//Obtener tweets del local storage:
//Comprueba que existan elementos en el local storage
function obtenerTweetsLocalStorage(){
    let tweets;
    //Revisamos los valores del local storage
    if(localStorage.getItem('tweets') === null){
        tweets = [];
    } else{
        tweets = JSON.parse(localStorage.getItem('tweets'));  //JSON.parse regresa todo como un arreglo
    }
    return tweets;
}

//Eliminar tweet del local Storage:
function borrarTweetLocalStorage(tweet){
    //Se observa que al cargar el tweet al local storage nos regresa el string con la X
    //Se busca separar la X del tweet para tratarlos por separado
    let tweets, tweetBorrar;
    tweetBorrar = tweet.substring(0, tweet.length - 1); //".substring" corta el string, va desde 0 hasta ".length-1" para omitir la X
    tweets = obtenerTweetsLocalStorage();
    tweets.forEach(function(tweet, index){
        if(tweetBorrar === tweet){
            tweets.splice(index, 1);  //splice toma dos valores,la posicion inicial(index) y cuantos parametros despues quieres eliminar despues de ese parametro, por eso se usa 1
        }
    });
    localStorage.setItem('tweets', JSON.stringify(tweets)); //"JSONstringify" convierte de arreglo a string
}