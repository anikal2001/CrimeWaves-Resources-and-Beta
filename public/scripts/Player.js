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
var audio;
var filename = url.substring(url.lastIndexOf('/')+1);
if(filename=="Season1.html"){
  var EpisodeList =["/Assets/S1/Episode2.mp3","/public/Assets/S1/Episode2.mp3", "/public/Assets/S1/Episode 3.mp3", "/public/Assets/S1/Episode 4.mp3","/public/Assets/S1/Episode 5.mp3","/public/Assets/S1/Episode 6.mp3"];
}
else if (filename=="Season2.html"){
  var EpisodeList =["/Assets/S2/Episode 1.mp3","/Assets/S2/Episode 2.mp3", "/Assets/S2/Episode 3.mp3", "/Assets/S2/Episode 4.mp3","/Assets/S2/Episode 5.mp3"];
}
currentSong = 0;
audio = document.getElementById("myAudio")
audio.src= EpisodeList[currentSong];
audio.currentTime= 45;


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
   audio.currentTime += 10.0; /**tried also with audio.currentTime here. Didn't worked **/
 }

 function RewindAudio() {
   audio.currentTime -= 10.0; /**tried also with audio.currentTime here. Didn't worked **/
 }
//Update Time and Progress
function updateTrackTime(track){
  var currTimeDiv = document.getElementById('demo');
  var durationDiv = document.getElementById('duration');

  var currTime = Math.floor(track.currentTime).toString();
  var duration = Math.floor(track.duration).toString();

  var percentage = currTime / duration
  document.getElementById("fill").style.width= percentage*100+"%";
  //document.getElementById("seek-bar").value = percentage*100;

  currTimeDiv.innerHTML = formatSecondsAsTime(currTime);

  if (isNaN(duration)){
    durationDiv.innerHTML = '00:00';
    } 
  else{
    durationDiv.innerHTML = formatSecondsAsTime(duration);
    }
}

//SeekBar Code
var progressBar = document.getElementById("seek-bar");
progressBar.addEventListener("click", function seek(e) {
  var percent = (e.offsetX) / this.offsetWidth;
  var audio = document.getElementById("myAudio")
  bruh = percent*audio.currentTime;
  var fillbar = document.getElementById("fill");
  fillbar.style.width = (percent*100)+"%";
});
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

      var songName = EpisodeList[currentSong];
      var filename = songName.substring(songName.lastIndexOf('/')+1);
      songTitle =filename.substring(0, filename.lastIndexOf("."))

      var songName="Episode " + (currentSong+1) + ":"+songTitle;
      document.getElementById("audioName").innerHTML= songName;
  }
  function previous(){
      if(currentSong<=0){
          currentSong=0;
      }else{

          currentSong--;
      }
      var songName="Episode " + (currentSong+1) + ":"+songTitle;
      document.getElementById("audioName").innerHTML= songName;
      audio.src= EpisodeList[currentSong];
      var songName = EpisodeList[currentSong];
      var filename = songName.substring(songName.lastIndexOf('/')+1);
      songTitle =filename.substring(0, filename.lastIndexOf("."))
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
