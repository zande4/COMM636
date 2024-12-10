let isMember = false;
let username = "";
let pfpSrc = "";
let karma = 0;
let sort = "top";
let numPosts = 0;
const DEFAULT_COLORS = ["rgb(255, 255, 255)", "rgb(0, 0, 0)", "rgb(94, 88, 69)", "rgb(69, 78, 94)"];
let style = {
    colors: DEFAULT_COLORS, 
}
//each post has an id, title, number of upvotes, array of comments, and bodyText

class Post {
    constructor(user, title, bodyText, color, textColor, numUpvotes) {
        this.id = numPosts;
        numPosts++;
        this.user = user;
        this.title = title;
        this.bodyText = bodyText;
        this.numUpvotes = numUpvotes;
        this.comments = [];
        this.color = color;
        this.textColor = getComplementaryColor(style.colors[(textColor)]);;
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
        rv.style.color = this.textColor;
        rv.style.backgroundColor = style.colors[this.color];
        const user = quickCreate('div', 'post-content');
        user.innerText = "u/" + this.user;
        const title = quickCreate('div', 'post-title');
        title.innerText = this.title;
        const content = quickCreate('div', 'post-content');
        content.innerText = this.bodyText;
        const footer = quickCreate('div', 'post-footer');
        const commentPrev = quickCreate('div', 'comment-preview');

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
        comment.addEventListener('click', (event) => {
            showComments(this);
        });

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
        rv.appendChild(commentPrev);
        rv.setAttribute('id', this.id);
        return rv;
    }

    upvote(){
        if (!this.upvoted && !this.downvoted){
            this.numUpvotes++;
            karma++;
            localStorage.setItem('karma', karma);
            console.log("karma +1");
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

    addComment(user, text){
        const rv = new Comment(user, text);
        this.comments.push(rv);
        return rv;
    }
}

let posts = [
    new Post("Zoe", "Don't you guys think our subreddit is super boring looking?", 
        "I mean what's even the point of visiting a subreddit that looks so dull and uninteresting? It makes me wan't to stop using reddit all together.", "0", "0", "700"),
    new Post("anonymous_user", "Why you need to be paying attention to your Karma", 
        "Assuming you've never used reddit before (why are you here if you don't use reddit), Karma is a measure of how active you are on the platform. " + 
        "More important than that, on this subreddit you can start to change the way the page looks once you gain enough Karma. " +
        "I've even heard that you can change the subreddit's profile image if you get enough Karma.", "0", "0", "10"),
    new Post("beige_lover", "To those of you who think we need more variety", 
        "People seem to forget that we have more than two colors on this page. Isn't this blue vibrant enough?", "3", "3", "5"),
    new Post("csmajor", "I think there should be more customization features in the future!", 
        "Right now we can only influence the way our subreddit looks a little bit. Imagine how things could be if there were even more opportunities for customization!" +
        "What if we could change the upvote symbol, the post border style, or add more images? Each subreddit on reddit would have a very distinct feel and they would become distinguishable beyond just their content." +
        "I think it would create a very collaborative atmosphere.", "1", "1", "2")
];

class Comment {
    constructor(user, commentText){
        this.user = user;
        this.commentText = commentText;
        this.div = this.toDiv();
    }

    toDiv(){
        const rv = document.createElement('div');
        rv.classList.add('comment');
        rv.innerText += ("u/" + this.user);
        const content = document.createElement('p');
        content.innerText = this.commentText;
        rv.appendChild(content);
        return rv;
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
                document.body.style.overflow = "visible";
            }
        }
    });
    document.getElementById('new-color-some').addEventListener('change', function() {
        handleColorSelect(document.getElementById('new-color-some'));
    });
    const colorPicker = document.getElementById('new-color-all');
    colorPicker.addEventListener('change', function() {
        handleColorSelect(colorPicker);
    });
    const textArea = document.getElementById('new-post-text');
    document.querySelectorAll('input[name="color"]').forEach(radio => {
        radio.addEventListener('change', function () {
            textArea.style.backgroundColor = style.colors[this.value];
        });
    });
    document.querySelectorAll('input[name="text-color"]').forEach(radio => {
        radio.addEventListener('change', function () {
            textArea.style.color = getComplementaryColor(style.colors[this.value]);
        });
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
        karma = parseInt(localStorage.getItem('karma'), 10);
    }
    if(localStorage.getItem('isMember')){
        //ChatGPT provided this solution for retrieving booleans from localStorage which only stores strings
        isMember = (localStorage.getItem('isMember') === 'true');
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

    //adding default comments
    posts[0].addComment('redditor4ever', "I totally agree with you! But if you want to change the way the subreddit looks just raise yor Karma a bit so you can make edits.");
    posts[0].addComment('user3456432', "Idk I think it looks cool.");
    posts[0].addComment('helpfulhand', 'To add on to another comment, I saw another thread earlier that explains how Karma works in more depth. You should read it for more info.');
    posts[1].addComment('tireduninspired', 'To name one of the customization options, you can change the colors that other users get to pick from when making a post.');
    posts[1].addComment('cyndaquil5', 'Really? It will affect the decisions other users get to make?');
    posts[1].addComment('lostr4dit0r', "I'm a bit confused. How do you change the way the site looks? Like where do I go...?");
    posts[1].addComment('helpfulhand', 'You just need to click the pencil at the top of the page. It will look different depending on how much Karma you have.');
    posts[2].addComment('meanguy', `why don't you go join a different subreddit?`);
    posts[3].addComment('Zoe', `I agree. One of the features I was thinking of adding was reaction stickers. Reddit currently has an awards system where you can react to posts ` + 
        `with unique reaction images, but they cost real world money to use and they blend in with the rest of the UI at the bottom of each post. `+
        `I imagined stickers as being free reaction images that are customizable by subreddit that can be placed and resized freely across the white space of a post. ` +
        `This ended up not being possible during the time frame.`
    )
    render();

});

function joinLeaveSubreddit(){
    if(isMember){
        if(confirm("Are you sure you want to leave this subreddit? You will lose all your Karma!")){
            document.getElementById('join-button').innerText = 'Join';
            isMember = false;
            karma = 0;
        }        
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
    const nonEdit = document.getElementById('edit-not-allowed');
    if(isMember){
        if (karma < 50){
            none.style.display = 'block';
            some.style.display = 'none';
            all.style.display = 'none';
            nonEdit.style.display = 'none';
        }
        else if (karma < 200){
            some.style.display = 'block';
            none.style.display = 'none';
            all.style.display = 'none';
            nonEdit.style.display = 'none';
            let colors = some.querySelectorAll('.color');
            colors.forEach((color, i) => {
                color.style.backgroundColor = style.colors[i];
            });
        }
        else{
            all.style.display = 'block';
            none.style.display = 'none';
            some.style.display = 'none';
            nonEdit.style.display = 'none';
            let colors = all.querySelectorAll('.color');
            colors.forEach((color, i) => {
                color.style.backgroundColor = style.colors[i];
            });

        }
    }
    else{
        nonEdit.style.display = 'block';
        all.style.display = 'none';
        none.style.display = 'none';
        some.style.display = 'none';
    }
    edit.style.display = 'block';
}

function showComments(postObject){
    document.body.style.overflow = "hidden";
    const comments = document.getElementById('comments');
    commentContainer = document.getElementById("comments-container");
    commentContainer.innerHTML = "";
    comments.style.display = "block";
    postObject.comments.forEach((comment) =>{
        commentContainer.appendChild(comment.div);
    });
    document.getElementById('comment-button').onclick = () => postComment(postObject);
}

function postComment(postObject){
    const text = document.getElementById('comment-input');
    const newComment = postObject.addComment(username, text.value);
    document.getElementById("comments-container").appendChild(newComment.div);
    text.value = " ";
    karma +=5;
    localStorage.setItem('karma', 'karma');
}

function handleColorSelect(colorPicker){
    console.log("running");
    let selection = colorPicker.parentNode.children;
    let selections;
    Array.from(selection).forEach((elem) =>{
        if (elem.classList.contains("selected")){
            selections = elem;
        }
    });
    if (selections){
        selections.style.backgroundColor = colorPicker.value;
    }
}

function select(element){
    const elements = element.parentNode.children;
    Array.from(elements).forEach((elem) => {
        elem.classList.remove('selected');
    });
    element.classList.add('selected');
    return element;
}

function showMakePost(){
    const makePost = document.getElementById('make-post');
    const postAllow = document.getElementById('post-allowed');
    const disallow = document.getElementById('post-not-allowed');
    if (isMember){
        colors = makePost.querySelectorAll('.bg');
        colors.forEach((color, i) => {
            console.log(style.colors[i]);
            color.style.backgroundColor = style.colors[i];
        });
        textColors = makePost.querySelectorAll('.text');
        textColors.forEach((color, i) => {
            color.style.backgroundColor = getComplementaryColor(style.colors[i]);
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
    const pfp = document.getElementById('pfp-overview');
    const pfpUser = document.getElementById('pfp-user');
    if (pfpSrc){
        pfp.setAttribute('src', pfpSrc);
        pfpUser.setAttribute('src', pfpSrc);
    }
    
    karmaCount.innerText = karma;
    console.log(karma);
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

function switchSort(type){
    sort = type;
    render();
}

//function by ChatGPT, converts the hex into RGB and inverts each color channel.
function getComplementaryColor(rgb) {
    const match = rgb.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/);
    const r = 255 - parseInt(match[1], 10);
    const g = 255 - parseInt(match[2], 10);
    const b = 255 - parseInt(match[3], 10);

    // Return the complementary color in RGB format
    return `rgb(${r}, ${g}, ${b})`
  }

function makePost(){
    const makePost = document.getElementById('make-post');
    const title = document.getElementById('new-post-title').value;
    const text = document.getElementById('new-post-text').value;
    let color = 1;
    const radios = document.querySelectorAll('input[name="color"]');
    radios.forEach(radio => {
        if (radio.checked) {
            color = radio.value;
        }
    });

    let textColor = color;
    const textRadios = document.querySelectorAll('input[name="text-color"]');
    textRadios.forEach(radio => {
        if (radio.checked) {
            textColor = radio.value;
        }
    });

    const post = new Post(username, title, text, color, textColor, "0");
    posts.push(post);
    karma += 10;
    console.log("karma +5");
    localStorage.setItem('karma', karma);
    render();
    makePost.style.display = 'none';
    document.getElementById('new-post-title').value = "";
    document.getElementById('new-post-text').value = "";
}

function writeComment(){

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

function applyEdit(editDialogNodeId){
    console.log("edits applied!");
    const parent = document.getElementById(editDialogNodeId);
    const colors = parent.querySelectorAll('.color');
    Array.from(colors).forEach((col, i) => {
        console.log("print", col.style.backgroundColor);
        style.colors[i] = col.style.backgroundColor;
    });
    parent.parentNode.style.display = "none";
    render();
}

//get user data
if(isMember){
    document.getElementById('join-button').innerText = 'Joined';
}