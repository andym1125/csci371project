
var numComms = 2;
var numPosts = [3, 1];

function getComm(idName) {
    var num = "";
    for (var i = 4; i < idName.size; i++) {
        num += idName[i];
    }
    return num.value;
}


function addComm() {
    numComms += 1;
}

function addPost(idName) {
    var community = document.getElementById(idName);
    var post = document.createElement("div");
    post.className("post");
    var commNum = getComm(idName) - 1;
    numPosts[commNum] += 1;
    post.id = idName + "pic" + numPost[commNum];
    var pic = document.createElement("div");
    pic.className("picture");
    var comment = document.createElement("div");
    comment.className("comments");
    
    community.append(post);
}

//makePost([
//            "id"        = "comm1pic3"
//            "container" = Document.getElementById("browsing-right"),
//            "alt"       = "Cat sleeping",
//            "src"       = "https://www.purina.co.uk/sites/g/files/mcldtz2481/files/2019-09/How%20long%20do%20cats%20sleep_0.jpg" alt="cat sleeping",
//            "comment"   = "zzzzzzzzzzzzzz"
//])



function removeButtons() {
    for (var i = 1; i <= numComms; i++) {
        var button = document.getElementById("buttoncomm" + i);
        document.removeChild(button);
    }
}

function createButtons() {
    removeButtons();
    for (var i = 1; i <= numComms; i++) {
        var comm = document.getElementById("comm" + i);
        var button = document.createElement("button");
        button.id = "button" + comm.id;
        comm.append(button);
        
        if (button.addEventListener) {
            
        }
    }
}

window.onload = createButtons;