import { loadUsersByPages } from "../use-cases/load-users-by-pages";

// Objeto local que contiene las paginas  y la lista de los usuarios que llegar desde el Backend (json.server / server);
const state = {
    currentPage: 0, //Contador de paginas.
    users: [],
}

// Función asincrona que carga la siguiente pagina.
const loadNextPage = async () => {
    const users = await loadUsersByPages( state.currentPage + 1); //carga a la variable (users) la información de que recibe desde el backend.
    if ( users.length === 0 ) return; //condicional para detener la función si cantidad de usuarios es igual a 0.
    console.log(users)
    // sino se cumple la condición entonces hace lo siguiente
    state.currentPage += 1; // incrementa de 1 en 1 a la pagina,
    state.users = users; //agrega al arreglo local de usuarios los usuarios que vienen del backend en su respectiva pagina segun la cantidad.
    console.log(state.currentPage)
}

// Función asincrona que carga la pagina anterior.
const LoadPreviousPage = async () => {
    if ( state.currentPage === 1 ) return;//condicional para detener la función si cantidad de usuarios es igual a 0.
    const users = await loadUsersByPages(state.currentPage - 1); //carga a la variable (users) la información de que recibe desde el backend.


    state.users = users; //agrega al arreglo local la lista de usuarios provenientes del backend segun la pagina en la que se encuentra.
    state.currentPage -= 1; //decrementa el contador de la pagina.
}

// Función de flecha que actualiza la información del usuario.
const onUsersChanged =  ( updatedUser ) => {

    let wasFound = false;

    state.users = state.users.map( user => {
        if( user.id === updatedUser.id){
            wasFound = true;
            return updatedUser;
        }
        return user;
    });

    if (state.users.length < 10 && !wasFound) {
        state.users.push( updatedUser );
    }
}

// Función asincrona que
const reloadPage = async () => {
    const users = await loadUsersByPages( state.currentPage );
    if ( users.length === 0 ) {
        await LoadPreviousPage();
        return;
    } 
    
    state.users = users;
}

export default {
    loadNextPage,
    LoadPreviousPage,
    onUsersChanged,
    reloadPage,

    getUsers: () => ([...state.users]),
    getCurrents: () => state.currentPage,
}