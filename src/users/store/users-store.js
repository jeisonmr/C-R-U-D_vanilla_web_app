import { localhostUserToModel } from "../mappers/localhost-user.mapper";
import { loadUsersByPages } from "../use-cases/load-users-by-pages";

const state = {
  currentPage: 0,
  users: [],
};

const loadNextPage = async () => {
  const userList = await loadUsersByPages(state.currentPage + 1);
  const {users, pages} = userList;

  if (state.currentPage === pages) return;
  state.currentPage += 1;
  state.users = users;
};

const LoadPreviousPage = async () => {
  if (state.currentPage === 1) return;
  const userList = await loadUsersByPages(state.currentPage - 1);
  const { users } = userList;


  state.users = users;
  state.currentPage -= 1;
};

const onUsersChanged = (updatedUser) => {
  let wasFound = false;

  state.users = state.users.map((user) => {
    if (user.id === updatedUser.id) {
      wasFound = true;
      return updatedUser;
    }
    return user;
  });

  if (state.users.length < 10 && !wasFound) {
    state.users.push(updatedUser);
  }
};

const reloadPage = async () => {
  const userList = await loadUsersByPages(state.currentPage);
  console.log(userList)
  const { users, pages } = userList;
  if (users.length === 0) {
    await LoadPreviousPage();
    return;
  }

  state.users = users;
};

export default {
  loadNextPage,
  LoadPreviousPage,
  onUsersChanged,
  reloadPage,

  getUsers: () => [...state.users],
  getCurrents: () => state.currentPage,
};
