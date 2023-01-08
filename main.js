// LOAD SONG ON REFRESH
window.onload = function() {

    httpGetAsync("https://api.spotify.com/v1/me/player/currently-playing", httpGetAsyncResponse, httpGetAsyncResponseError)
    
    setInterval(function() { 
        httpGetAsync("https://api.spotify.com/v1/me/player/currently-playing", httpGetAsyncResponse, httpGetAsyncResponseError)
    }, 60000);

}

// MAIN GRABBER
function httpGetAsync(theUrl, callback, callbackError)
{
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
          callback(xmlHttp.response);
        } 
        if (xmlHttp.readyState == 4 && xmlHttp.status != 200) {
          httpGetAsyncResponseError()
        }
    }

    xmlHttp.open("GET", theUrl, true);
    xmlHttp.responseType = "json"
    xmlHttp.setRequestHeader("Accept", "application/json")
    xmlHttp.setRequestHeader("Content-Type", "application/json")
    xmlHttp.setRequestHeader("Authorization", "Bearer -----TOKEN-----")
    xmlHttp.send(null);
}

function httpGetAsyncResponseError() {
  var spotifyNameHolder = document.getElementById("spotify-name")
  spotifyNameHolder.innerText = "Error"

  var spotifyArtistHolder = document.getElementById("spotify-artists")
  spotifyArtistHolder.innerText = "Error"

}

function httpGetAsyncResponse(response)
{

  console.log(response)
  var spotifyName = response.item.name
  var spotifyNameHolder = document.getElementById("spotify-name")
  spotifyNameHolder.innerText = spotifyName

  var spotifyArtist = response.item.artists[0].name
  var spotifyArtistHolder = document.getElementById("spotify-artists")
  spotifyArtistHolder.innerText = spotifyArtist

}