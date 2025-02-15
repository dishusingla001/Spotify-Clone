console.log("Welcome to Spotify");

let songIndex = 0 ;
let AudioElement = new Audio("songs/1.mp3");
let masterplay = document.getElementById('masterplay');
let myProgressbar = document.getElementById('myProgressbar');
let gifplay = document.getElementById('gif');
let songItem = document.getElementsByClassName('songitem');   
let masterSongName= document.getElementById('masterSongName');                                                                                                              
let songs = [
    {songName: "Warriyo - Mortals ", filePath : 'songs/1.mp3', coverPath : "covers/1.jpg"},
    {songName:"Cielo - Huma-Huma", filePath : 'songs/2.mp3' ,coverPath : "covers/2.jpg"},
    {songName:"DEAF KEV - Invincible ", filePath : 'songs/3.mp3', coverPath : "covers/3.jpg"},
    {songName:"Different Heaven & EH!DE - My Heart", filePath : 'songs/4.mp3', coverPath : "covers/4.jpg"},
    {songName:"Janji-Heroes-Tonight-feat-Johnning", filePath : 'songs/5.mp3', coverPath : "covers/5.jpg"},
    {songName:"Rabba - Salam-e-Ishq", filePath : 'songs/6.mp3', coverPath : "covers/6.jpg"},
    {songName:"Sakhiyaan - Salam-e-Ishq", filePath : 'songs/7.mp3', coverPath : "covers/7.jpg"}
]

let songItems = Array.from(songItem);  // Convert HTMLCollection to an array

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("SongName")[0].innerText = songs[i].songName;
})



// handle play - pause click
masterplay.addEventListener('click', ()=>{
    if(AudioElement.paused || AudioElement.currentTime<=0){
        AudioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gifplay.style.opacity = 1;
    }
    else{
        AudioElement.pause();
        masterplay.classList.add('fa-circle-play');
        masterplay.classList.remove('fa-circle-pause');
        gifplay.style.opacity = 0;
    }
})

// listen to events 
AudioElement.addEventListener('timeupdate', ()=> {
    console.log("timeupdate");
    // .update seekbar
    progress = parseInt((AudioElement.currentTime/AudioElement.duration)*100);
    console.log(progress);
    myProgressbar.value = progress;
})

myProgressbar.addEventListener('change',()=>{
    AudioElement.currentTime = myProgressbar.value * AudioElement.duration /100
})

const makeallPlay = ()=>{
    Array.from(document.getElementsByClassName('songItemplay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemplay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeallPlay();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        AudioElement.src = `songs/${songIndex+1}.mp3`;
        AudioElement.currentTime = 0;
        AudioElement.play();
        gifplay.style.opacity = 1;
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=6){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    AudioElement.src = `songs/${songIndex+1}.mp3`;
    AudioElement.currentTime = 0;
    AudioElement.play();
    gifplay.style.opacity = 1;
    masterSongName.innerText = songs[songIndex].songName;
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
})

document.getElementById('back').addEventListener('click',()=>{
    if(songIndex==0){
        songIndex = 6;
    }
    else{
        songIndex -= 1;
    }
    AudioElement.src = `songs/${songIndex+1}.mp3`;
    AudioElement.currentTime = 0;
    AudioElement.play();
    gifplay.style.opacity = 1;
    masterSongName.innerText = songs[songIndex].songName;
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
})