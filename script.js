async function getArtist(){
    const userInput = document.querySelector("#userInput");
    const userInputValue = userInput.value;

    const apiURL = `https://itunes.apple.com/search?term=${userInputValue}`

    let artistData = null;
    try{
        const response = await fetch(apiURL);
        artistData = await response.json();
        console.log(artistData.results[0]);
    }
    catch(error){
        console.log("error", error)
        alert('Artist not found. Please try again.')
        
    }

    setInformation(artistData);
}

function setInformation(artistData) {
    const artistName = document.querySelector("#artistName");
    artistName.textContent = artistData.results[0].artistName;

    const artistLink = document.querySelector("#artistLink");
    artistLink.textContent = "Link to Artist";
    artistLink.href = artistData.results[0].artistViewUrl
    
    const songLink = document.querySelector("#songLink");
    songLink.textContent = "Link to Song";
    songLink.href = artistData.results[0].trackViewUrl

    const songName = document.querySelector("#songName");
    songName.textContent = artistData.results[0].trackName;
    

    const albumName = document.querySelector("#albumName");
    albumName.textContent = artistData.results[0].collectionName;

    const songCover = document.querySelector("#songCover");
    songCover.src = artistData.results[0].artworkUrl100;

    const trackTime = document.querySelector("#trackTime");
    let trackTimeMillis = artistData.results[0].trackTimeMillis;
    let trackTimeMinutes = Math.floor(trackTimeMillis/1000/60);
    let trackTimeSeconds = Math.floor((trackTimeMillis/1000)%60);
    trackTime.textContent = `${trackTimeMinutes}:${trackTimeSeconds}`
    
    const audioPreview = document.querySelector("#audioPreview");
    audioPreview.src = artistData.results[0].previewUrl;
}

function runProgram(){
    console.log('runProgram');
    let submitButton = document.querySelector("#submitButton");
    submitButton.addEventListener('click', getArtist)
}
document.addEventListener('DOMContentLoaded', runProgram);