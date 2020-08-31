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
function showData(data){

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