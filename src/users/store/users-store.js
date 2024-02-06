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
const onUsersChanged =  () => {
    throw new Error('No implementado');
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