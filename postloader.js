//Conatins a list of all the posts for reference
var posts = [];

function clearAllOutput() {
    for (var i = 1; i < posts.length + 1; i++)
        document.getElementById("comm" + i + "-output").innerHTML = "";
    document.getElementById("comm-output").innerHTML = "";
}

function getComm(idName) {
    var num = "";
    for (var i = 4; i < idName.length && idName.charAt(i) != "-"; i++) {
        num += idName.charAt(i);
    }
    return parseInt(num);
}

function getPicNum(idName) {
    var num = "";
    var isPastComm = false;
    for (var i = 0; i < idName.length; i++) {
        if (idName.charAt(i) === "-") {
            isPastComm = true;
            // skip the word "pic" and go to first number
            i += 4;
        }
        if (isPastComm) {
            num += idName.charAt(i);
        }
    }
    return parseInt(num);
}

function checkPostArgs(postArgs) {
    return !!postArgs.id && !!postArgs.feedContainer && !!postArgs.previewContainer && !!postArgs.picAlt && !!postArgs.picSrc;
}

function checkCommArgs(commArgs) {
    return !!commArgs.commName;
}

function createPostArgs(button) {
    var commNum = getComm(button.parentElement.id);
    var commDiv = document.getElementById("comm" + commNum + "-right");
    
    // Make sure there's at least one post in community before doing default stuff.
    var picNum = 0;
    if (!!commDiv.childNodes[3].lastChild.id)
        picNum = getPicNum(commDiv.childNodes[3].lastChild.id) + 1;
    
    var postArgs = {
        commName : document.getElementById("comm" + commNum).innerHTML,
        id          :"comm" + commNum + "-pic" + picNum,
        feedContainer : "comm" + commNum + "-content",
        previewContainer : "comm" + commNum + "-mini",
        picAlt         : document.getElementById("comm" + commNum + "-picAlt").value,
        picSrc         : document.getElementById("comm" + commNum + "-picSrc").value,
        comment     : document.getElementById("comm" + commNum + "-comment").value,
        userGenned : true
    };
    return postArgs;
}

function createCommArgs(button) {
    var commArgs = {
        commName : document.getElementById("commName-input").value,
        userGenned : true
    };
    return commArgs;
}

function makePost(postArgs)
{
    var isPostArgsGood = checkPostArgs(postArgs);
    
    if (isPostArgsGood)
    {
        //Creates main post
        var post = document.createElement("div");

        var imageDiv = document.createElement("div");
        var image = document.createElement("img");
        imageDiv.className = "picture";

        if (!!postArgs.picSrc) {
            image.setAttribute("alt", postArgs.picAlt);
            image.setAttribute("src", postArgs.picSrc);
        }
        else
            image.setAttribute("alt", postArgs.picAlt);

        var comments = document.createElement("div");
        comments.className = "comments";
        comments.innerHTML = postArgs.comment;

        imageDiv.appendChild(image);
        post.appendChild(imageDiv);
        post.appendChild(comments);
        post.id = postArgs.id;
        post.className = "post";
        document.getElementById(postArgs.feedContainer).appendChild(post);

        //Creates the Preview objects
        var miniPost = document.createElement("a");
        miniPost.setAttribute("href", "#" + postArgs.id);
        var miniImageDiv = imageDiv.cloneNode(true);
        miniPost.appendChild(miniImageDiv);

        document.getElementById(postArgs.previewContainer).appendChild(miniPost);

        //Add to list of posts in each community
        var commIndex = getComm(postArgs.id) - 1;
        if (!!posts[commIndex])
            posts[commIndex].push(postArgs);
        else {
            posts.push([]);
            posts[commIndex].push(postArgs);
        }
        
        //Notifies if post will be kept upon reload
        if(postArgs.userGenned)
        {
            clearAllOutput();
            var commNum = getComm(postArgs.id);
            document.getElementById("comm" + commNum + "-output").innerHTML = "<b>Thanks for submitting your post to " + postArgs.commName + ".</b><br> When you reload the page posts you've created will not be saved. Sorry for the inconvienence.";
        }
        
        //console.log(posts); //For debug purposes
    }
    else {
        clearAllOutput();
        var commNum = getComm(postArgs.id);
        document.getElementById("comm" + commNum + "-output").innerHTML = "You must have an image source and alternate text to post in a community.";
    }
}

function createTableRow(commNum, displayText, idText)
{
    var tableRow = document.createElement("tr");
    var tableColumn1 = document.createElement("td");
    tableColumn1.innerHTML = displayText;
    var tableColumn2 = document.createElement("td");
    var tableInput = document.createElement("input");
    tableInput.id = "comm" + commNum + "-" + idText;
    tableInput.setAttribute("type", "text");
    
    tableRow.appendChild(tableColumn1);
    tableColumn2.appendChild(tableInput);
    tableRow.appendChild(tableColumn2);
    return tableRow;
}

function createComm(commArgs) {
    
    if (checkCommArgs(commArgs)) {
        posts.push([]);
        var commNum = posts.length;
        
        // Dropdown content in the nav bar.
        var dropdownLink = document.createElement("a");
        dropdownLink.className = "navButton";
        dropdownLink.href = "#comm" + commNum;
        dropdownLink.innerHTML = commArgs.commName;
        
        // MINI DIV (LEFT)
        
        var miniDiv = document.createElement("div");
        miniDiv.className = "comm";

        var miniLink = document.createElement("a");
        miniLink.setAttribute("href", "#comm" + commNum);
        var miniHeader = document.createElement("h4");
        miniHeader.className = "header sticky";
        miniHeader.innerHTML = commArgs.commName;
        var miniPostLoader = document.createElement("div");
        miniPostLoader.className = "minipost";
        miniPostLoader.id = "comm" + commNum + "-mini";

        // MAIN POSTS (RIGHT)
        
        var comm = document.createElement("div");
        comm.id = "comm" + commNum + "-right";
        comm.className = "comm";
        var commHeader = document.createElement("h1");
        commHeader.id = "comm" + commNum;
        commHeader.className = "header sticky";
        commHeader.innerHTML = commArgs.commName;
        var commContent = document.createElement("div");
        commContent.id = "comm" + commNum + "-content";
        commContent.appendChild(document.createElement("text"));
        //Appending commHeader and commContent at the end
        
        
        /*Could make this a drop down menu of all communities to post to instead of at the 
        end of each community it could be at the top or bottom of the main page or both.*/
        // Creation of posts
        var commForm = document.createElement("form");
        commForm.id = "comm" + commNum + "-form";
        var commFormTable = document.createElement("table");
        commFormTable.setAttribute("align", "center");
        var commFormTableCaption = document.createElement("caption");
        commFormTableCaption.innerHTML = "<b>Post a comment to " + commArgs.commName + "</b>";
        var commFormTableRow1 = createTableRow(commNum, "Enter image url: ", "picSrc");
        var commFormTableRow2 = createTableRow(commNum, "Enter alternage text (if image can't be found): ", "picAlt");
        var commFormTableRow3 = createTableRow(commNum, "Enter your title: ", "comment");
        // Append commForm nodes together.
        commFormTable.appendChild(commFormTableCaption);
        commFormTable.appendChild(commFormTableRow1);
        commFormTable.appendChild(commFormTableRow2);
        commFormTable.appendChild(commFormTableRow3);
        commForm.appendChild(commFormTable);
        // Appending commForm at the end
        // Create button
        var commButton = document.createElement("button");
        commButton.id = "comm" + commNum + "-addPost";
        commButton.setAttribute("onclick", "makePost(createPostArgs(this))");
        commButton.innerHTML = "Add Post";
        var commOutput = document.createElement("p");
        commOutput.id = "comm" + commNum + "-output";
        commOutput.appendChild(document.createElement("text"));
        
        //Append all Nodes together for comm in document
        
        // Mini div (left)
        var miniComms = document.getElementById("minipost-left");
        miniDiv.appendChild(miniLink);
        miniLink.appendChild(miniHeader);
        miniDiv.appendChild(miniPostLoader);
        miniComms.appendChild(miniDiv);
        
        // Main Div (right)
        var commMain = document.getElementById("browsing-right-comms");
        comm.appendChild(document.createElement("text"));
        comm.appendChild(commHeader);
        comm.appendChild(document.createElement("text"));
        comm.appendChild(commContent);
        comm.appendChild(document.createElement("text"));
        comm.appendChild(commForm);
        comm.appendChild(document.createElement("text"));
        comm.appendChild(commButton);
        comm.appendChild(document.createElement("text"));
        comm.appendChild(commOutput);
        comm.appendChild(document.createElement("text"));
        commMain.appendChild(comm);
        
        var dropdown = document.getElementsByClassName("dropdown-content");
        dropdown.item(0).appendChild(dropdownLink);
        
        if (!!commArgs.userGenned) {
            clearAllOutput();
            document.getElementById("comm-output").innerHTML = "<b>Thanks for creating the community " + commArgs.commName + "!</b><br>When you reload the page communities and posts you've created will not be saved. Sorry for the inconvienence.";
        }
    }
    else {
        clearAllOutput();
        document.getElementById("comm-output").innerHTML = "Your community must have a name.";
    }
}   