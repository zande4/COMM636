//TO DO:
//main features:
// -sort
// -comment
// -report
// -customize
// -create posts

let isMember = false;
let username = "";
let pfpSrc = "";
let karma = 0;
let sort = "new";
let numPosts = 0;
const DEFAULT_COLORS = ["#FFFFFF", "#000000", "#CCCCCC", "#333333"];
let style = {
    colors: DEFAULT_COLORS, 
}
//each post has an id, title, number of upvotes, array of comments, and bodyText

class Post {
    constructor(user, title, bodyText, color) {
        this.id = numPosts;
        numPosts++;
        this.user = user;
        this.title = title;
        this.bodyText = bodyText;
        this.numUpvotes = 0;
        this.comments = [];
        this.color = color;
        this.div = this.toDiv();
        this.upvoted = false;
        this.downvoted = false;
    }

    toDiv(){
        function quickCreate(element, className){
            const rvDiv = document.createElement(element);
            rvDiv.classList.add(className);
            return rvDiv;
        }

        const rv = quickCreate('section', 'post');
        rv.style.backgroundColor = style.colors[this.color];
        const user = quickCreate('div', 'post-user');
        user.innerText = "u/" + this.user;
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

        rv.appendChild(user);
        rv.appendChild(title);
        rv.appendChild(content);
        rv.appendChild(footer);
        rv.setAttribute('id', this.id);
        return rv;
    }

    upvote(){
        if (!this.upvoted && !this.downvoted){
            this.numUpvotes++;
            karma++;
            this.upvoted = true;
        }
        else if (!this.upvoted){
            //if post is already downvoted
            this.numUpvotes++;
            this.downvoted = false;
        }
        const counter = this.div.querySelector('.upvote-count');
        counter.innerText = this.numUpvotes;
        render();
    }

    downvote(){
        if (!this.downvoted && !this.upvoted){
            this.numUpvotes--;
            this.downvoted = true;
        }
        else if (!this.downvoted){
            //if post is already upvoted
            this.numUpvotes--;
            this.upvoted = false;
        }
        const counter = this.div.querySelector('.upvote-count');
        counter.innerText = this.numUpvotes;
        render();
    }
}

let posts = [
    new Post("Zoe", "Don't you guys think our subreddit is super boring looking?", 
        "I mean what's even the point of visiting a subreddit that looks so dull and uninteresting?", "0"),
    new Post("Kelsey", "my second post", "", "0")
];

class Comment {
    constructor(user, commentText){
        this.user = user;
        this.commentText = commentText;
    }

    toDiv(){

    }
}

document.addEventListener('DOMContentLoaded', function() {
    if(localStorage.getItem('posts')){
        //USE JSON
        posts = localStorage.getItem('posts');
    }

    //Load page
    render();

    //Event Listeners
    //data-action global event listener strategy provided by ChatGPT
    //basically checks every click to see if its on an element that is tagged as having the following behavior
    document.addEventListener('click', function (event) {
        if (event.target.matches('[data-action="close"]')) {
            const parent = event.target.closest('.target-parent');
            if (parent) {
                parent.style.display = 'none';
            }
        }
    });

    //User setup
    if(!localStorage.getItem('username')){
        const welcome = document.getElementById('welcome');
        welcome.style.display = "block";
        document.body.style.overflow = "hidden";
        //method for detecting that user has finished entering username provided by chatGPT
        const userInput = document.getElementById('username-input');
        userInput.addEventListener('keydown', function(event){
            if (event.key === 'Enter') {
                username = userInput.value;
                localStorage.setItem('username', username);
                welcome.style.display = 'none';
                document.body.style.overflow = "visible";
                document.getElementById('username').innerText = username;
            }
        });
    }
    else{
        username = localStorage.getItem('username');
    }
    if(localStorage.getItem('pfpSrc')){
        pfpSrc = localStorage.getItem('pfpSrc');
    }
    if(localStorage.getItem('karma')){
        karma = localStorage.getItem('karma');
    }
    if(localStorage.getItem('isMember')){
        isMember = localStorage.getItem('isMember');
        if(isMember){
            console.log("I just set isMember to true by reading local storage!");
        }
    }
    if(localStorage.getItem('style')){
        style = localStorage.getItem('style');
    }
    const usernameSpan = document.getElementById('username');
    usernameSpan.innerText = username;

    const join = document.getElementById('join-button');
    if(isMember){
        console.log("the boolean expression which triggered this block is: ",  isMember);
        console.log("I am setting the joined text at render");
        join.innerText = 'Joined';
    }
    else{
        join.innerText = 'Join';
    }
    render();

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
    localStorage.setItem('isMember', isMember);
}

function showEditDialog(){
    const edit = document.getElementById('edit');
    const none = document.getElementById('edit-none');
    const some = document.getElementById('edit-some');
    const all = document.getElementById('edit-all');
    if (karma < 50){
        none.style.display = 'block';
        some.style.display = 'none';
        all.style.display = 'none';
    }
    else if (karma < 200){
        some.style.display = 'block';
        none.style.display = 'none';
        all.style.display = 'none';
    }
    else{
        all.style.display = 'block';
        none.style.display = 'none';
        some.style.display = 'none';
    }
    edit.style.display = 'block';
}

function showMakePost(){
    const makePost = document.getElementById('make-post');
    const postAllow = document.getElementById('post-allowed');
    const disallow = document.getElementById('post-not-allowed');
    if (isMember){
        colors = makePost.querySelectorAll('.color');
        colors.forEach((color, i) => {
            color.style.backgroundColor = style.colors[i];
        });
        postAllow.style.display = 'block';
        disallow.style.display = 'none';
    }
    else{
        postAllow.style.display = 'none';
        disallow.style.display = 'block';
    }
    makePost.style.display = 'block';
}

function render(){
    const main = document.querySelector('main');
    const karmaCount = document.getElementById('karma');
    karmaCount.innerText = karma;
    if (sort == "new"){
        posts.sort((a, b) => b.id - a.id);
    }
    if (sort == "top"){
        posts.sort((a, b) => b.numUpvotes - a.numUpvotes);
    }
    for (let post of posts){
        if (post != null){
            main.appendChild(post.div);
        }
    }
}

function makePost(){
    const makePost = document.getElementById('make-post');
    const title = document.getElementById('new-post-title').value;
    const text = document.getElementById('new-post-text').value;
    let color;
    const radios = document.querySelectorAll('input[name="color"]');
    radios.forEach(radio => {
        if (radio.checked) {
            color = radio.value;
        }
    });

    const post = new Post(username, title, text, color);
    posts.push(post);
    karma += 5;
    localStorage.setItem('karma', karma);
    render();
    makePost.style.display = 'none';
    document.getElementById('new-post-title').value = "";
    document.getElementById('new-post-text').value = "";
}

function writeComment(){

}

function postComment(){

}

function fileUpload(triggerElementId, parentDivId){
    const parent = document.getElementById(parentDivId);
    const input = document.getElementById(triggerElementId).files[0];
    //FileReader explaination provided by ChatGPT
    if (input) {
        const reader = new FileReader(); // Create a FileReader

        // When the file is read, display it as an image
        reader.onload = (e) => {
          parent.src = e.target.result; // Set the image source
          parent.alt = 'Uploaded Image';
        };

        reader.readAsDataURL(input); // Read the file as a data URL
      }
      console.log("complete!");
}

function applyEdit(){
    
}

function report(){

}

function checkAccessibility(){

}

//get user data
if(isMember){
    document.getElementById('join-button').innerText = 'Joined';
}