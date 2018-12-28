window.onscroll = function() {menuScroll()};
function menuScroll(){
    if (document.body.scrollTop > 75 || document.documentElement.scrollTop > 75) {
        document.getElementById("topnav").className = "test";
        var x = document.getElementById("topnav");
        var y = x.getElementsByTagName("a");
        for (var i = 0; i < y.length; i++) {
            y[i].style.fontWeight = "600";
        }

        }else {
        document.getElementById("topnav").className = "test1";
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
//Getting the song by id
var songs =["/Assets/Difference.mp3","/Assets/Palazzo.mp3","/Assets/Collarbone.mp3"];
var currentSong = 0;
var audio = document.getElementById("myAudio")
audio.src= songs[currentSong];

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
     var percent = e.offsetX / this.offsetWidth;
     player.currentTime = percent * player.duration;
     progressBar.value = percent / 100;
   }
//Next Episode Code
    function next(){
        if (currentSong==songs.length-1){
            currentSong=0;
        }
        else{
            currentSong++;
        }
        audio.src= songs[currentSong];
        audio.play();
    }
    function previous(){
        if(currentSong<0){
            currentSong=0;
        }else{

            currentSong--;
        }
        audio.src= songs[currentSong];
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
   function showPlayer() {
    document.getElementById("player").style.display = "block";
    playAudio();
 }


 /*Another Way to Play songs from a list
 var songs =["song1.mp3","song2.mp3","song3.mp3"];

 */