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
//Turning JS time into regular time
function formatSecondsAsTime(secs, format) {
    var hr  = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600))/60);
    var sec = Math.floor(secs - (hr * 3600) -  (min * 60));
    if (min < 10){ 
       min = "0" + min; 
       }
       if (sec < 10){ 
         sec  = "0" + sec;
          }
          return min + ':' + sec;
          }
//Getting the episode list by id
var url = window.location.pathname;
var filename = url.substring(url.lastIndexOf('/')+1);
if(filename=="Season1.html"){
    var EpisodeList =["/Assets/Season1/Eyeofthetiger.mp3","/Assets/Season1/DontStopBelievin.mp3", "/Assets/Season1/BohemianRhapsody.mp3", "/Assets/Season1/SweetChildOMine.mp3","/Assets/Season1/SweetHomeAlabama.mp3","/Assets/Season1/Hotlinebling.mp3"];
}
else if (filename=="Season2.html"){
    var EpisodeList =["/Assets/Difference.mp3","/Assets/Palazzo.mp3","/Assets/Collarbone.mp3"];
}
var currentSong = 0;
var audio = document.getElementById("myAudio")
audio.src= EpisodeList[currentSong];

//Play and Pause Audio
  function playAudio() { 
   audio.play();
   document.getElementById("monkey-play").style.display = "none";
   document.getElementById("monkey-pause").style.display="inline-block";
   //document.getElementById("monkey-pause").onclick= function(){ pauseAudio(); }
   } 

    function pauseAudio(){
   audio.pause();
   document.getElementById("monkey-play").style.display = "inline-block";
   document.getElementById("monkey-pause").style.display="none";
   //document.getElementById("monkey-pause").onclick= function(){ playAudio(); }
    }
//Mute and Unmute function
    function mute(){
     document.getElementById("muteIcon").className = "fa fa-volume-mute";
     audio.muted=true;
     document.getElementById("monkey-mute").onclick= function(){unmute();};
   }

   function unmute(){
     document.getElementById("muteIcon").className = "fa fa-volume-up";
     audio.muted=false;
     document.getElementById("monkey-mute").onclick= function(){mute();};
   }
//Forward Audio Function
   function forwardAudio() {
     audio.currentTime += 30.0; /**tried also with audio.currentTime here. Didn't worked **/
   }

   function RewindAudio() {
     audio.currentTime -= 30.0; /**tried also with audio.currentTime here. Didn't worked **/
   }
//Update Time and Progress
   function updateTrackTime(track){
     var currTimeDiv = document.getElementById('demo');
     var durationDiv = document.getElementById('duration');

     var currTime = Math.floor(track.currentTime).toString();
     var duration = Math.floor(track.duration).toString();

     var percentage = currTime / duration
     document.getElementById("progress").value = percentage;

     currTimeDiv.innerHTML = formatSecondsAsTime(currTime);

     if (isNaN(duration)){
       durationDiv.innerHTML = '00:00';
       } 
     else{
       durationDiv.innerHTML = formatSecondsAsTime(duration);
       }
   }
//Skip Forward Code
   var player = document.querySelector("audio");
   var progressBar = document.querySelector("progress");
   progressBar.addEventListener("click", seek);
   
   function seek(e) {
     var percent = (e.offsetX+6) / this.offsetWidth;
     player.currentTime = percent * player.duration;
     progressBar.value = percent / 100;
   }
//Next Episode Code
    function next(){
        if (currentSong==EpisodeList.length-1){
            currentSong=0;
        }
        else{
            currentSong++;
        }
        audio.src= EpisodeList[currentSong];
        audio.play();

        var songName="Episode " + (currentSong+1)
        document.getElementById("audioName").innerHTML= songName;
    }
    function previous(){
        if(currentSong<0){
            currentSong=0;
        }else{

            currentSong--;
        }
        audio.src= EpisodeList[currentSong];
        audio.play();
    }
//Accordion Code
   var acc = document.getElementsByClassName("accordion");
   var i;

   for (i = 0; i < acc.length; i++) {
     acc[i].addEventListener("click", function() {
       this.classList.toggle("active");
       var panel = this.nextElementSibling;
       if (panel.style.maxHeight){
         panel.style.maxHeight = null;
       } else {
         panel.style.maxHeight = panel.scrollHeight + "px";
       } 
     });
   }
//Show player on click
   function showPlayer(clicked_id) {
    document.getElementById("player").style.display = "block";
    document.getElementById("playerFill").style.display = "block";
    var idName = clicked_id.toString()
    var num = idName[2] -1;
    var currentSong = num;


    songName="Episode " + (num+1);
    document.getElementById("audioName").innerHTML= songName;

    var audio = document.getElementById("myAudio")
    audio.src= EpisodeList[currentSong];
    playAudio();

 }
 //Hide Player on Click
 function removePlayer(){
     document.getElementById("player").style.display= "none";
     document.getElementById("playerFill").style.display = "none";
     pauseAudio();
 }

//Firebase Emailing for Contact Form
document.getElementById("cForm").addEventListener("submit", submitForm)

var messageRef = firebase.database().ref("messages");

function submitForm(e){
    e.preventDefault();
//Get Values
    var firstName=getInputVal("firstname");
    var lastName=getInputVal("lastname");
    var email=getInputVal("email");
    var subject=getInputVal("subject");
    
    saveMessage(firstname, lastname, email, subject);
}

//Function to get form values
function getInputVal(id){
    return document.getElementById(id).value;
}


function saveMessage(firstname, lastname, email, subject){
    var newMessageref = messageRef.push;
    newMessageref.set({
        firstname: firstname,
        lastname: lastname,
        email: email,
        subject: subject

    })
}



 /*Another Way to Play EpisodeList from a list
 var EpisodeList =["song1.mp3","song2.mp3","song3.mp3"];

 */

