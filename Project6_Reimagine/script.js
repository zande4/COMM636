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
let numPosts = 0;
//each post has an id, title, number of upvotes, array of comments, and bodyText

class Post {
    constructor(user, title, bodyText) {
        this.id = numPosts;
        numPosts++;
        this.user = user;
        this.title = title;
        this.bodyText = bodyText;
        this.numUpvotes = 0;
        this.comments = [];
    }

    toDiv(){
        function quickCreate(element, className){
            const rvDiv = document.createElement(element);
            rvDiv.classList.add(className);
            return rvDiv;
        }

        const rv = quickCreate('section', 'post');

        const title = quickCreate('div', 'post-title');
        title.innerText = this.title;
        const content = quickCreate('div', 'post-content');
        content.innerText = this.bodyText;
        const footer = quickCreate('div', 'post-footer');

        const upvote = quickCreate('div', 'upvote');
        upvote.classList.add('react');
        const vote = document.createElement('img');
        vote.setAttribute('src', './Graphics/arrow-up.png');
        upvote.appendChild(vote);
        //special syntax provided by chatGPT
        //upvote.onclick = function(){this.upvote()} is not viable because 'this' no longer
        //refers the the original object but the one that triggered the event
        upvote.onclick = () => this.upvote();

        const upvoteCount = quickCreate('div', 'upvote-count');
        upvoteCount.innerText = this.numUpvotes;
        upvoteCount.classList.add('react');

        const vote2 = document.createElement('img');
        vote2.setAttribute('src', './Graphics/arrow-up.png');
        vote2.style.transform = "rotate(180deg)";
        const downvoteDiv = quickCreate('div', 'downvote');
        downvoteDiv.appendChild(vote2);
        downvoteDiv.classList.add('react');
        downvoteDiv.onclick = () => this.downvote();

        const commentImg = document.createElement('img');
        commentImg.setAttribute('src', './Graphics/comment.svg');
        const comment = quickCreate('div', 'comment')
        comment.classList.add('react');
        comment.appendChild(commentImg);

        const dot = quickCreate('div', 'dot');
        dot.classList.add('react');
        const dotImg = document.createElement('img');
        dotImg.setAttribute('src', './Graphics/dots.svg');
        dot.appendChild(dotImg);

        footer.appendChild(upvote);
        footer.appendChild(upvoteCount);
        footer.appendChild(downvoteDiv);
        footer.appendChild(comment);
        footer.appendChild(dot);

        rv.appendChild(title);
        rv.appendChild(content);
        rv.appendChild(footer);
        rv.setAttribute('id', this.id);
        return rv;
    }

    upvote(){
        this.numUpvotes++;
    }

    downvote(){
        this.numUpvotes--;
    }
}

let posts = [
    new Post("Zoe", "My first post", ""),
    new Post("Kelsey", "my second post", "")
];

class Comment {
    constructor(user, commentText){
        this.user = user;
        this.commentText = commentText;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    //Load page
    const main = document.querySelector('main');
    for (let post of posts){
        if (post != null){
            main.appendChild(post.toDiv());
        }
    }

    //User setup
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