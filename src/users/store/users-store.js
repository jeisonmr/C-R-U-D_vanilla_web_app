import { loadUsersByPages } from "../use-cases/load-users-by-pages";

const state = {
    currentPage: 0,
    users: [],
}

const loadNextPage = async () => {
    const users = await loadUsersByPages( state.currentPage + 1);
    if ( users.lenght === 0 ) return;

    state.currentPage += 1;
    state.users = users;
}
const LoadPreviousPage = async () => {
    const users = await loadUsersByPages(state.currentPage - 1);
    if ( users.lenght === 1 ) return;

    state.currentPage -= 1;
    state.users = users;
}
const onUsersChanged =  ( updatedUser ) => {
    
    let wasFound = false;

    state.users = state.users.map( user => {
        if( user.id === updatedUser.id){
            wasFound = true;
            // console.log(updatedUser);
            console.log(user)
            return updatedUser;
        }
        return user;
    });

    if (state.users.length < 10 && !wasFound) {
        state.users.push( updatedUser );
    }

}
const reloadPage = async () => {
    throw new Error('No implementado');
}

export default {
    loadNextPage,
    LoadPreviousPage,
    onUsersChanged,
    reloadPage,

    getCurrents: () => (state.currentPage),
    getUsers: () => ([...state.users]),
}