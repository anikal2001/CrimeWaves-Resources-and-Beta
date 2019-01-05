// Initialize Firebase
var config = {
    apiKey: "AIzaSyCp4VF3Mv1ggfGAIAmpwGw0_lTUpR_SxdY",
    authDomain: "crimewaves-cpss.firebaseapp.com",
    databaseURL: "https://crimewaves-cpss.firebaseio.com",
    projectId: "crimewaves-cpss",
    storageBucket: "crimewaves-cpss.appspot.com",
    messagingSenderId: "541219081247"
};
firebase.initializeApp(config);


//Change Nav Bar Colour On Scroll
window.onscroll = function() {menuScroll()};
function menuScroll(){
    if (document.body.scrollTop > 75 || document.documentElement.scrollTop > 75) {
        document.getElementById("topnav").className = "changeTopnav";
        var x = document.getElementById("topnav");
        var y = x.getElementsByTagName("a");
        for (var i = 0; i < y.length; i++) {
            y[i].style.fontWeight = "600";
        }

        }else {
        document.getElementById("topnav").className = "revertTopnav";
        var x = document.getElementById("topnav");
        var y = x.getElementsByTagName("a");
        var i;
        for (i = 0; i < y.length; i++) {
            y[i].style.fontWeight = "600";
        }

        }
    }

//Firebase Emailing for Contact Form
document.getElementById("cForm").addEventListener("submit", submitForm)

var messagesRef = firebase.database().ref("messages");


//Submit function
function submitForm(e){
    e.preventDefault();
//Get Values
    var firstname=getInputVal("firstname");
    var lastname=getInputVal("lastname");
    var email=getInputVal("email");
    var subject=getInputVal("subject");
    
    saveMessage(firstname,lastname, email, subject);

    //Show Alert
    document.getElementById('alert').style.display = "block";

    //Hide alert after 3 Seconds
    setTimeout(function(){
        document.getElementById('alert').style.display = "none";
    },3000);

    //clear form
    document.getElementById('cForm').reset();

}

//Function to get form values
function getInputVal(id){
    return document.getElementById(id).value;
}


function saveMessage(firstname, lastname, email, subject){
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        firstname: firstname,
        lastname: lastname,
        email: email,
        subject: subject

    });
}





 /*Another Way to Play EpisodeList from a list
 var EpisodeList =["song1.mp3","song2.mp3","song3.mp3"];

 */

