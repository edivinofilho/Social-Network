import { users, posts, suggestUsers } from "./database.js"

import { openModal, closeModal } from "./modal.js"

function clearInput(){
    const button = document.querySelector('#submit')

    const inputElementTitle = document.querySelector('.post__input-title');
    
    const inputElementText = document.querySelector('.post__description')

    button.addEventListener('click', () => {
        inputElementTitle.value = ' ';

        inputElementText.value = ' ';
    })
};

function followButton() {
    const buttonsList = document.getElementsByClassName('follow-button')

    for(let i = 0; i < buttonsList.length; i++) {
        buttonsList[i].addEventListener('click', () => {
            
            
            buttonsList[i].classList.toggle('following-button');
            
            if(buttonsList[i].classList.contains('following-button')){
                
                buttonsList[i].innerText = 'Seguindo';

            } else {
                buttonsList[i].innerText = 'Seguir';
            }

        })
    }

}

function countLikes() {

    const heartsList = document.getElementsByClassName('heart');

    let add = document.getElementsByClassName('post__count-likes');
    
    let count = document.getElementsByClassName('post__count-likes');
    
    for(let i = 0; i < heartsList.length; i++){

        let button = heartsList[i];
        button.addEventListener('click', () => {
             button.src='./src/assets/img/Vectorheart.svg'
             let addNumber = Number(add[i].innerText) + 1;
             count[i].innerText = addNumber   
             ;
        })
    }
} 

function renderUsersToFollow(array) {
    const usersList = document.querySelector('.toFollow__container');

    usersList.innerHTML = ' ';

    for(let i = 0; i < array.length; i++){
        const usersToFollow = array[i];

        const card = createCardUsersToFollow(usersToFollow)
        usersList.appendChild(card);
    }

}


function createCardUsersToFollow(suggestedUsers) {
    const container = document.createElement('ul');

    const imgContainer = document.createElement('figure');

    const image = document.createElement('img');
    
    const userDetails = document.createElement('li');
    const userName = document.createElement('h2');
    const userDescription = document.createElement('p');
    const button = document.createElement('button');

    container.classList.add('post__user');
    image.src = suggestedUsers.img;
    image.alt = "User's Picture";
    image.dataset.userId = suggestedUsers.id;

    userDetails.classList.add('post__user-details');
    userName.innerText = suggestedUsers.user;

    userDescription.innerText = suggestedUsers.stack;

    button.classList.add('follow-button');

    button.id = suggestedUsers.id;

    button.innerText = 'Seguir'

    userDetails.append(userName, userDescription);
    imgContainer.appendChild(image);
    container.append(imgContainer, userDetails, button);

    return container;
}

function renderPostCard(array) {
    const posts = document.querySelector('.published-post');

    posts.innerHTML = ' ';

    for(let i = 0; i < array.length; i++){
        const postContent = array[i];

        const postCard = createPostCard(postContent);

        posts.appendChild(postCard);
    }
}

function createPostCard(posts) {
    const mainContainer = document.createElement('section');
    
    const userDetailsContainer = document.createElement('ul');
    
    const imgContainer = document.createElement('figure');
    
    const img = document.createElement('img');
    
    
    const userDataContainer = document.createElement('li');
    
    userDataContainer.classList.add('post__user-details')
    
    const userName = document.createElement('h2');
    
    const userDetails = document.createElement('p');
    
    const postContainer = document.createElement('article');
    
    const postTitle = document.createElement('h2');
    
    const postContent = document.createElement('p');
    
    const postButtonContainer = document.createElement('div');
    
    const openPostButton = document.createElement('button');
    
    const likeImg = document.createElement('img'); 
    
    const countLikes = document.createElement('span');
    
    mainContainer.classList.add('published-post');
    
    userDetailsContainer.classList.add('post__user');
    
    countLikes.classList.add('post__count-likes');
    
    countLikes.innerText = posts.likes;
    
    likeImg.classList.add('heart');
    
    likeImg.src = './src/assets/img/Vectorheart-gray.svg'
    openPostButton.innerText = 'Abrir Post';
    
    openPostButton.classList.add('post__button');

    openPostButton.id = posts.id;
    
    postButtonContainer.classList.add('post__button-container');
    
    postContent.classList.add('post__content')
    
    postContent.innerText = posts.text.substring(0, 100) + '...';
    
    postTitle.innerText = posts.title;
    
    postContainer.classList.add('post')
    
    userDetails.innerText = posts.stack;
    
    img.src = posts.img;
    
    userName.innerText = posts.user;

    postButtonContainer.append(openPostButton, likeImg, countLikes);
    
    postContainer.append(postTitle, postContent)
    
    userDataContainer.append(userName, userDetails);

    imgContainer.appendChild(img);
    
    userDetailsContainer.append(imgContainer, userDataContainer);

    mainContainer.append(userDetailsContainer, postContainer, postButtonContainer);

    return mainContainer;
}

function openPosts(posts) {
    let btnList = document.getElementsByClassName('post__button');
    let btnArray = [];
  
    for(let i = 0; i < btnList.length; i++) {
      btnArray.push(btnList[i]);
      
      btnArray[i].addEventListener('click', () => {   
        openModal(btnArray[i], posts[i]);
  
        const dialog = document.querySelector('#modal__controller')
  
        if(dialog.hasAttribute('open')){
            dialog.removeAttribute('open');  
        }
        dialog.showModal();

      })
    }
}
  
renderUsersToFollow(suggestUsers);
renderPostCard(posts)
followButton();
countLikes();
openPosts(posts);
clearInput();