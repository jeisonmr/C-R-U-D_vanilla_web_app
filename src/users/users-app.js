import { renderAddButton } from "./presentation/render-add-button/render-add-button";
import { renderButtons } from "./presentation/render-buttons/render-buttons";
import { renderModal } from "./presentation/render-modal/render-modal";
import { renderTable } from "./presentation/render-table/render-table";
import usersStore from "./store/users-store";
import { saveUser } from "./use-cases/save-user";

/**
 * 
 * @param {HTMLElement} element 
 */

// Componente donde se concentran todas las partes de la aplicación que se necesitan renderizar en pantalla.
export const UsersApp = async ( element ) => {
  // Renderización de un Loading sencillo como vista previa a la carga de la información a renderizar.
  element.innerHTML = 'Loading...';
  await usersStore.loadNextPage();

  // setTimeout(() => {
    
    element.innerHTML = ''
    renderTable( element ); //Tabla de contenido con la data obtenida.
    renderButtons( element ); // Botones Anterior y Siguiente.
    renderAddButton( element ); // Boton flotante activa el modal.

    // Modal para agregar o actulizar los usuarios.
    renderModal( element, async( userLike ) => {
      const user = await saveUser( userLike );
      usersStore.onUsersChanged( user );
      renderTable();
    });
  // }, 1000);
  
  // console.log(usersStore.getUsers());
}
