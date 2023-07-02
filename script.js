const postIdInput = document.getElementById('input');
const searchButton = document.querySelector('.btn');

function validationId(value){
    if (isNaN(value) || value < 1 || value > 100) {
        alert('Невірне значення id. Введіть число в діапазоні від 1 до 100.');
        return false;
      }
      return true;
}

function addPostToPage(element) {
    const postsList = document.getElementById('postsList');
    postsList.innerHTML = '';

    const postsComments = document.getElementById('postsComments');
    postsComments.innerHTML = '';

    const newBlock = document.createElement('div');
    newBlock.style.backgroundColor = '#800000';
    newBlock.style.color = 'white';
    newBlock.style.display = 'flex';
    newBlock.style.flexDirection = 'column';
    newBlock.style.alignItems = 'center';
    newBlock.innerHTML = `
        <h1>${element.title}</h1>
        <p>${element.body}</p>
        <button id="get-comments">Отримати коментарі</button>`;
    postsList.appendChild(newBlock); 

    const getComBtn = document.getElementById('get-comments');
    getComBtn.style.padding = '10px';
    getComBtn.style.width = '100%';
    getComBtn.addEventListener('click', getComments);
}

function addCommentToPage(element) {
    const commentList = document.getElementById('postsComments');
    commentList.innerHTML = '';

    element.forEach((comment) => {
        const commentElement = document.createElement('div');
        commentElement.style.backgroundColor = 'grey';
        commentElement.style.color = 'white';
        commentElement.innerHTML = `<h3>${comment.name}</h3>
                                    <p>${comment.email}</p>
                                    <p>${comment.body}</p>`;
        commentList.appendChild(commentElement);
    })
       
}

async function FindPostById() {
    const postId = postIdInput.value;

    if(validationId(postId)){
        try{
            let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            let user = await response.json();
            addPostToPage(user);
        }catch(error) {
            console.log(error)
        }
    }

}

async function getComments() {
    const postId = postIdInput.value;

    if(validationId(postId)){
        try{
            let response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
            let comments = await response.json();
            addCommentToPage(comments);
        }catch(error){
            console.log(error);
        }
    }
}

searchButton.addEventListener('click', FindPostById);




