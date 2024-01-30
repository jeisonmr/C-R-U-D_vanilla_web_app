import { localhostUserToModel } from "../mappers/localhost-user.mapper";

export const loadUsersByPages = async ( page  ) =>{
    try {
        const url = `${import.meta.env.VITE_BASE_URL}/users?_page=${page}`;
        const res =  await fetch(url);
        const datos = await res.json();

        const { data } = datos;
        
        const users = data.map( userLike => localhostUserToModel( userLike ) );
        
        
        console.log(datos)
        console.log(users);
        
        return users;
    } catch (error) {
        console.log(error)
    }
}
