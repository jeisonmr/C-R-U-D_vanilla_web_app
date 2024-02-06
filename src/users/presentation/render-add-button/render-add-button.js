import { showModal } from '../render-modal/render-modal';
import './render-add-button.css';


export const renderAddButton = ( element ) =>{

    const addButton = document.createElement('button');
    addButton.innerText =  ' + ';
    addButton.classList.add('btn-add');

    element.append(addButton);

    addButton.addEventListener('click', ()=>{
        
        showModal();
    });



}