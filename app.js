const form = document.getElementById("form")
const search = document.getElementById("search")
const result = document.getElementById("result")
const more = document.getElementById("more")


const API_URL = "https://api.lyrics.ovh"

async function searchSongs(term) {
    const res = await fetch(`${API_URL}/suggest/${term}`)
    const data = await res.json();
    showData(data);  
}

//  Display Song Info in DOM
function showData(data) {
    result.innerHTML = `
    <ul class="songs">
      ${data.data
        .map(
          song => `<li>
      <span><strong>${song.artist.name}</strong> - ${song.title}</span>
      <button class="btn" data-artist='${song.artist.name}' data-songtitle='${song.title}'>Get Lyrics</button>
    </li>`
        )
        .join('')}
    </ul>
  `;

    if (data.prev || data.next) {
        console.log(data)
        more.innerHTML = `
            ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Previous</button>` : ""}
            ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>` : ""}
        `
    } else {
        more.innerHTML = ""
    }
}

// Get next/previous batch of songs
async function getMoreSongs(url) {
    // const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();
    showData(data);
}

async function getLyrics(artist, songTitle) {
    const res = await fetch(`${API_URL}/v1/${artist}/${songTitle}`)
    const data = await res.json();
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");
    result.innerHTML = `
    <h2><strong>${artist}</strong> - ${songTitle}</h2>
    <span>${lyrics}</span>
    `
    more.innerHTML = ""
}

// Event Listeners
form.addEventListener("submit", e => {
    e.preventDefault();

    const term = search.value.trim();
    if (term) {
        searchSongs(term);
    } else {
        alert("Can't search for nothing 🤔");
    }
})


result.addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") {
        const clickedElement = e.target;
        const artist = clickedElement.getAttribute("data-artist")
        const songTitle = clickedElement.getAttribute("data-songtitle")
        getLyrics(artist, songTitle)
    }
});