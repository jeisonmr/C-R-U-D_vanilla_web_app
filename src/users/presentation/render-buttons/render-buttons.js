import usersStore from '../../store/users-store';
import { renderTable } from '../render-table/render-table';
import './render-buttons.css';

export const renderButtons = ( element ) =>{

    const nextButton = document.createElement('button');
    const prevButton = document.createElement('button');
    const currentPageLabel = document.createElement('span');
    const btnContainer = document.createElement('div');

    btnContainer.classList.add('btnContainer')

    nextButton.innerText = 'Next >';
    prevButton.innerText = '< Prev';

    currentPageLabel.id = 'current-page';
    currentPageLabel.innerText = usersStore.getCurrents();

    btnContainer.append(prevButton, currentPageLabel, nextButton);
    element.append(btnContainer);


    nextButton.addEventListener('click', async ()=>{
        await usersStore.loadNextPage();
        currentPageLabel.innerText = usersStore.getCurrents();
        renderTable( element );
    });

    prevButton.addEventListener('click', async ()=>{
        await usersStore.LoadPreviousPage();
        currentPageLabel.innerText = usersStore.getCurrents();
        renderTable( element );
    });

}