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
    const datos = await res.json();

    const { data } = datos;

    const users = data.map(localhostUserToModel);

    console.log(users);

    return users;
  } catch (error) {
    console.log(error);
  }
};
