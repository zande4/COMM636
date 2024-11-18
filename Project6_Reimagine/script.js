/*function buttonToggle(){

}

function upvote(){

}*/

//fill divs with icons
const comments = document.getElementsByClassName('comment');
const dots = document.getElementsByClassName('dot');
const downvotes = document.getElementsByClassName('downvote');

for(let comment of comments){
    comment.innerHTML += '<img src="./Graphics/comment.svg">';
}
for(let dot of dots){
    dot.innerHTML += `<img src="./Graphics/dots.svg">`;
}
for(let downvote of downvotes){
    downvote.style.transform = "rotate(180deg)";
}