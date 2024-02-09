import { localhostUserToModel } from "../mappers/localhost-user.mapper";

/**
 *
 * @param { Number } page
 * @returns { Promise<User[]> }
 */

export const loadUsersByPages = async (page = 1) => {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/users?_page=${page}`;
    const res = await fetch(url);
    const data = await res.json();

    // const { data , pages} = datos;
    const users = data.data.map(localhostUserToModel);
    const pages = data.pages;

    // console.log(users);

    return {users, pages};
  } catch (error) {
    console.log(error);
  }
};
