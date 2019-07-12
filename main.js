function q (sel) {
    return document.querySelector(sel)
  }


function songNode (song) {
    const songDiv = document.createElement('div')
    songDiv.classList.add
    songDiv.innerHTML = `
      <h2>${song.trackName}</h2>
      <p>Artist: ${song.artistName}</p>
      <p>Album: ${song.collectionName}</p>
      <p>Genre: ${song.primaryGenreName}</p>
      <div class="player">
        <figure>
            <audio controls src="${song.previewUrl}"></audio>
        </figure>
      </div>
      `
    return songDiv
  } 
  

  function displaySongData (previewUrl) {
    fetch(previewUrl)
      .then(res => res.json())
      .then(function (data) {
        const dataDisplay = q('#song-data')
        dataDisplay.innerHTML = `
          <h3>${data.name}</h3>
          <dl>
            <dt>Artist</dt>
            <dd>${data.artistName}</dd>
            <dt>Preview Song</dt>
            <dd>${data.previewUrl}</dd>
          </dl>
        `
      })
  }
  
  
  document.addEventListener('DOMContentLoaded', function () {
    q('#song-results').addEventListener('click', function (event) {
      console.log(event.target)
      if (event.target && event.target.matches('button.get-song-data')) {
        displaySongData(event.target.dataset['url'])
      }
    })
  
    q('form').addEventListener('submit', function (event) {
      event.preventDefault()
      const searchTerm = q('#input').value
      const url = `https://itunes-api-proxy.glitch.me/search?term=${encodeURIComponent(searchTerm)}`
  
      const resultsDiv = q('#song-results')
  
      fetch(url)
        .then(response => response.json())
        .then(function (data) {
          resultsDiv.innerHTML = ''
          for (let song of data.results) {
            resultsDiv.appendChild(songNode(song))
          }
        })
    })
  })

