import './style.css'
import { UsersApp } from './src/users/users-app.js'

document.querySelector('#app').innerHTML = `
  <div>
    <h1>C-R-U-D</h1>
    <h5>Create - Read - Update - Delete</h5>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
  </div>
`


// Se guarda en la variable (ELEMENT) el elemento html en el cual se renderizara toda la aplicación.
const element = document.querySelector('.card');

// Ejecución de la función y se manda como argument la variable donde se renderiza la aplicación.
UsersApp( element );

