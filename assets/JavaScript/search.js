// selezione input
const searchInput = document.querySelector("input[type='search']"); // barra desktop
const searchInputMobile = document.querySelector(".search-bar input[type='text']"); // barra mobile

// API Deezer
const url = "https://deezerdevs-deezer.p.rapidapi.com";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "a21438c3b5msh049a71445767d80p13e0eajsn1fd0d870e5a2",
    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

// funzione per aggiornare le card
async function searchAndRender(query) {
  try {
    const res = await fetch(`${url}/search?q=${query}`, options);
    const data = await res.json();

    if (!data || !data.data || data.data.length === 0) {
      console.log("Nessun risultato trovato");
      return; // le card restano con il contenuto default
    }

    const songs = data.data;

    // ciclo sulle 16 card predefinite
    for (let i = 1; i <= 16; i++) {
      const card = document.getElementById(`card${i}`);
      if (!card) continue;

      card.innerHTML = ""; // svuota il contenuto predefinito

      // prendi il risultato corrispondente, se esiste
      const song = songs[i - 1];

      if (song) {
        card.innerHTML = `
      <div class="card position-relative text-light bg-warning overflow-hidden">
        <div class="card-body">
          <h5 class="card-title text-truncate mb-5 mia-classe-xl">${song.album.title}</h5>
          <p class="card-text">${song.artist.name}</p>
        </div>
        <img class="card-image" src="${song.album.cover_medium}" alt="copertina playlist">
      </div>
    `;

        card.onclick = () => {
          const params = new URLSearchParams();
          params.set("id", song.album.id);
          window.location.href = `album.html?${params.toString()}`;
        };
      } else {
        // se non c’è più nessun risultato, lascia la card vuota
        card.innerHTML = "";
        card.onclick = null;
      }
    }
  } catch (err) {
    console.error("Errore fetch:", err);
  }
}

// Eventi Enter
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("q", searchInput.value);
    window.location.href = `search.html?${params.toString()}`;
  }
});

searchInputMobile.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("q", searchInputMobile.value);
    window.location.href = `search.html?${params.toString()}`;
  }
});

// all'apertura della pagina, leggere query dalla URL e popolare card
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const query = params.get("q");
  if (query) searchAndRender(query);
});

// Footer player
const playPanel = document.getElementById("footer-play");
const playPanelBtn = document.getElementById("closePlayPanel");
const minimazedPlayPannel = document.getElementById("minimazedPlayPannel");
const minimazedPlayPannelBtn = document.getElementById("minimazedPlayPannelBtn");

playPanelBtn.addEventListener("click", () => {
  playPanel.classList.remove("d-lg-block");
  minimazedPlayPannel.classList.remove("d-none");
});

minimazedPlayPannelBtn.addEventListener("click", () => {
  playPanel.classList.add("d-lg-block");
  minimazedPlayPannel.classList.add("d-none");
});

// funzione CLOSE
function MyClose() {
  playPanel.classList.add("d-none");
  minimazedPlayPannel.classList.remove("d-none");
}
