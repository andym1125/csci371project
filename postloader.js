//Conatins a list of all the posts for reference
var posts = [];

function makePost(args)
{
    //Creates main post
    var post = document.createElement("div");

    post.innerHTML = "<div class='picture'>" +
        "<img alt='" + args.picAlt + "' src='" + args.picSrc + "'>" +
        "</div>" +
        "<div class='comments'>" +
        "Post Comment: " + args.comment +
        "</div>";
    post.id = args.id;
    post.className = "post";

    document.getElementById(args.feedContainer).appendChild(post);
    
    //Creates the Preview objects
    
    
    posts.push(args);
    //console.log(posts.join()); //For debug purposes
}