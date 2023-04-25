export function openModal(button, posts){
    const  modalController = document.querySelector('#modal__controller');

    modalController.innerHTML = ' ';

    const modalContainer = document.createElement('div');

    modalContainer.classList.add('modal__container');

    const closeModalButton = document.createElement('button');

    closeModalButton.id = 'close__modal';
    
    closeModalButton.innerText = 'X';

    const userDescriptionContainer = document.createElement('div');

    userDescriptionContainer.classList.add('post__user')

    const img = document.createElement('img');

    img.src = posts.img;

    const userDetails = document.createElement('div');

    userDetails.classList.add('post__user-details');

    const userName = document.createElement('h2');

    userName.innerText = posts.user;

    const userDescription = document.createElement('p');

    userDescription.innerText = posts.stack;

    const postTitle = document.createElement('h2');

    postTitle.innerText = posts.title;

    const postText = document.createElement('p');

    postText.innerText = posts.text;

    userDetails.append(userName, userDescription)

    userDescriptionContainer.append(img, userDetails)

    modalContainer.append(closeModalButton, userDescriptionContainer, postTitle, postText)

    modalController.appendChild(modalContainer);

    button.addEventListener('click', () => {
        
        if(modalController.hasAttribute('open')){
            modalController.removeAttribute('open');  
        }
               
        modalController.showModal();
        
    })

    closeModal();
};

export function closeModal(){
    const buttonClosePost = document.querySelector('#close__modal');
    
    const modalContainer = document.querySelector('#modal__controller');
    
    buttonClosePost.addEventListener('click', () => {
        modalContainer.close();
    });
};