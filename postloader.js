//Conatins a list of all the posts for reference
var posts = [];

function getComm(idName) {
    var num = "";
    for (var i = 4; i < idName.size; i++) {
        num += idName[i];
    }
    return num.value;
}

function makePost(args)
{
    //Creates main post
    var post = document.createElement("div");
    var test = !!args.picSrc;
    
    var image = "";
    if(!!args.picSrc)
        image = "<img alt='" + args.picAlt + "' src='" + args.picSrc + "'>";
    
    var body = "";
    if(!!args.postBody)
        body = args.postBody;

    post.innerHTML = "<div class='picture'>" +
        image +
        body +
        "</div>" +
        "<div class='comments'>" +
        "Post Comment: " + args.comment +
        "</div>";
    post.id = args.id;
    post.className = "post";

    document.getElementById(args.feedContainer).appendChild(post);
    
    //Creates the Preview objects
    var pre = document.createElement("a");
    pre.href = "#" + args.id;
    
    pre.innerHTML = "<div class='picture'>" +
        image +
        body +
        "</div>";
    
    document.getElementById(args.previewContainer).appendChild(pre);
    
    //Add to list of posts
    posts.push(args);
    
    //Notifies if post will be kept upon reload
    if(args.userGenned)
        alert("This post will not be kept if you reload the page. It is for demonstration only.");
    
    //console.log(posts.join()); //For debug purposes
}