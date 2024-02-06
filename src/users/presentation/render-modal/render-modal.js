import { getUserById } from "../../use-cases/get-user-by-id";
import { saveUser } from "../../use-cases/save-user";
import "./render-modal.css";
import modalHtml from "./render-modal.html?raw";

let modal, form, loaderUser = {};

export const showModal = async ( id ) => {
  modal?.classList.remove("hide-modal");
  if (!id ) return;
  const user = await getUserById( id )
  setFormValues( user)
};

export const hieModal = () => {
  modal?.classList.add("hide-modal");
  form?.reset();
};

const setFormValues = ( user ) =>{
  form.querySelector('[name="firstName"]').value = user.firstName
  form.querySelector('[name="lastName"]').value = user.lastName
  form.querySelector('[name="balance"]').value = user.balance
  form.querySelector('[name="isActive"]').check = user.isActive
  loaderUser = user;
}

export const renderModal = (element, callback) => {
  if (modal) return;

  modal = document.createElement("div");
  modal.innerHTML = modalHtml;
  modal.className = "modal-container hide-modal";

  form = modal.querySelector("form");

  modal.addEventListener("click", (e) => {
    if (e.target.className === "modal-container") {
      hieModal();
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData( form );
    const userLike = {...loaderUser};

    for ( const [key, value] of formData ) {
        if (key === 'balance') {
            userLike[key] = +value;
            continue;
        }

        if ( key === 'isActive' ) {
            userLike[key] = (value === 'on') ? true : false;
            continue;
        }
        userLike[key] = value;
    }
    await callback( userLike );
    hieModal()
  });
  element.append(modal);
};
