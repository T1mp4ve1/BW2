// selezione input
const searchInput = document.querySelector("input[type='search']"); // barra desktop
const searchInputMobile = document.querySelector(".search-bar input[type='text']"); // barra mobile

// API Deezer
const url = "https://deezerdevs-deezer.p.rapidapi.com";
const key = token;
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": key,
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

    // --- ARTIST CARD (prende dal primo risultato) ---
    const artist = songs[0].artist;
    const artistCardContainer = document.getElementById("artist-card-container");
    if (artist && artistCardContainer) {
      artistCardContainer.innerHTML = "";

      artistCardContainer.innerHTML = `
  <div class="d-flex align-items-center bg-black text-light p-2 rounded artist-card" style="cursor:pointer;">
    <img src="${artist.picture_medium}" 
         class="rounded-circle me-3" 
         alt="${artist.name}" 
         style="width:150px; height:150px; object-fit:cover;">
    <div>
      <h6 class="mb-0">${artist.name}</h6>
      <small class="text-secondary">Artista</small>
    </div>
  </div>
`;

      artistCardContainer.onclick = () => {
        const params = new URLSearchParams();
        params.set("id", artist.id);
        window.location.href = `artist.html?${params.toString()}`;
      };
    }

    // --- CICLO SULLE 16 CARD ALBUM ---
    for (let i = 1; i <= 16; i++) {
      const card = document.getElementById(`card${i}`);
      if (!card) continue;

      card.innerHTML = ""; // svuota il contenuto predefinito

      const song = songs[i - 1];

      if (song) {
        // genera un numero random da 1 a 9
        const randomBg = Math.floor(Math.random() * 9) + 1;

        card.innerHTML = `
      <div class="card position-relative text-light bg-color-${randomBg} overflow-hidden">
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
    const query = searchInput.value;
    localStorage.setItem("lastSearch", query); // <-- salvo il valore
    const params = new URLSearchParams();
    params.set("q", searchInput.value);
    window.location.href = `search.html?${params.toString()}`;
  }
});

searchInputMobile.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const query = searchInputMobile.value;
    localStorage.setItem("lastSearch", query); // <-- salvo il valore
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
