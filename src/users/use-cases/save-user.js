import { userModalToLocalhost } from "../mappers/user-to-localhost.mappers";
import { User } from "../models/users";

export const saveUser = async ( userLike ) =>{

    const user = new User( userLike );
    const userToSave = userModalToLocalhost( user );

    if (!user.firstName || !user.lastName)
    throw 'Se requere información en los campos!';

    if (user.id) {
        return await updateUser( userToSave );
    }

    const updatedUser = await createUser( userToSave );
    console.log(updatedUser)
    return updatedUser;

}

const createUser = async ( user ) =>{

    const url = `${ import.meta.env.VITE_BASE_URL }/users`;
    const res = await fetch(url,{
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const newUser = await res.json();
    console.log({newUser});

    return newUser;
}


export const updateUser = async ( user ) =>{

    const url = `${ import.meta.env.VITE_BASE_URL }/users/${user.id}`;
    const res = await fetch(url,{
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const updatedUser = await res.json();
    // console.log({updatedUser});

    return updatedUser;
}