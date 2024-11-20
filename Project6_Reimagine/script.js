//TO DO:
//main features:
// -sort
// -upvote/downvote
// -comment
// -report
// -customize
// -create posts

let isMember = false;
let username = "";
let karma = 0;
//each post has an id, title, and bodyText
let posts = [];

class Post {
    constructor(id, title, bodyText) {
        this.title = title;
        this.bodyText = bodyText;
        this.numUpvotes = 0;
        this.numDownvotes = 0;
        this.comments = [];
    }
}

class Comment {
    constructor(user, commentText){
        this.user = user;
        this.commentText = commentText;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if(!localStorage.getItem('username')){
        const welcome = document.getElementById('welcome');
        welcome.style.display = "block";
        //method for detecting that user has finished entering username provided by chatGPT
        const userInput = document.getElementById('username-input');
        userInput.addEventListener('keydown', function(event){
            if (event.key === 'Enter') {
                username = userInput.value;
                welcome.style.display = 'none';
            }
        });
    }
});

function joinLeaveSubreddit(){
    if(isMember){
        document.getElementById('join-button').innerText = 'Join';
        isMember = false;
    }
    else{
        document.getElementById('join-button').innerText = 'Joined';
        isMember = true;
    }
}

function upvote(){

}

function downvote(){

}

function report(){

}

function checkAccessibility(){

}

//fill divs with icons
const comments = document.getElementsByClassName('comment');
const dots = document.getElementsByClassName('dot');
const downvotes = document.getElementsByClassName('downvote');
const upvotes = document.getElementsByClassName('upvote');

for(let comment of comments){
    comment.innerHTML += '<img src="./Graphics/comment.svg">';
}
for(let dot of dots){
    dot.innerHTML += `<img src="./Graphics/dots.svg">`;
}
let vote;
for(let upvote of upvotes){
    vote = document.createElement('img');
    vote.setAttribute('src', './Graphics/arrow-up.png');
    upvote.appendChild(vote);
}
for(let downvote of downvotes){
    vote = document.createElement('img');
    vote.setAttribute('src', './Graphics/arrow-up.png');
    vote.style.transform = "rotate(180deg)";
    downvote.appendChild(vote);
}

//get user data
if(isMember){
    document.getElementById('join-button').innerText = 'Joined';
}