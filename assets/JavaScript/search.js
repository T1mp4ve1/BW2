// INPUT DESKTOP E MOBILE
const searchInput = document.querySelector("input[type='search']");
const searchInputMobile = document.querySelector(".search-bar input[type='text']");

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

// ARRAY DI PLAYLIST/ARTISTI INIZIALI
const defaultSearches = [
  "TOOL",
  "METALLICA",
  "PINK FLOYD",
  "RADIOHEAD",
  "NIRVANA",
  "QUEEN",
  "COLDPLAY",
  "LINKIN PARK",
  "GREEN DAY",
  "RED HOT CHILI PEPPERS",
  "PEARL JAM",
  "LED ZEPPELIN",
  "THE BEATLES",
  "OASIS",
  "FOO FIGHTERS",
  "MUSE",
];

// FUNZIONE PER POPOLARE LE 16 CARD CON CONTENUTO PREDEFINITO
async function populateDefaultCards() {
  for (let i = 0; i < 16; i++) {
    const card = document.getElementById(`card${i + 1}`);
    if (!card) continue;

    try {
      const res = await fetch(`${url}/search?q=${defaultSearches[i]}`, options);
      const data = await res.json();
      const song = data.data[0]; // prendo il primo risultato

      const randomBg = Math.floor(Math.random() * 9) + 1;

      if (song) {
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
          window.location.href = `album.html?id=${song.album.id}`;
        };
      } else {
        card.innerHTML = "";
        card.onclick = null;
      }
    } catch (err) {
      console.error("Errore fetch default card:", err);
    }
  }
}

// FUNZIONE PER RICERCA E POPOLAMENTO CARDS
async function searchAndRender(query) {
  try {
    const res = await fetch(`${url}/search?q=${query}`, options);
    const data = await res.json();
    if (!data?.data?.length) return;

    const songs = data.data;

    // ARTIST CARD
    const artist = songs[0]?.artist;
    const artistCardContainer = document.getElementById("artist-card-container");
    if (artist && artistCardContainer) {
      artistCardContainer.innerHTML = `
        <div class="d-flex align-items-center bg-black text-light p-2 rounded artist-card" style="cursor:pointer;">
          <img src="${artist.picture_medium}" class="rounded-circle me-3" alt="${artist.name}" style="width:150px; height:150px; object-fit:cover;">
          <div>
            <h6 class="mb-0">${artist.name}</h6>
            <small class="text-secondary">Artista</small>
          </div>
        </div>`;
      artistCardContainer.onclick = () => (window.location.href = `artist.html?id=${artist.id}`);
    }

    // POPOLA LE 16 CARD CON RISULTATI DELLA RICERCA
    for (let i = 1; i <= 16; i++) {
      const card = document.getElementById(`card${i}`);
      card.innerHTML = "";
      const song = songs[i - 1];
      if (!song) continue;

      const randomBg = Math.floor(Math.random() * 9) + 1;
      card.innerHTML = `
        <div class="card position-relative text-light bg-color-${randomBg} overflow-hidden">
          <div class="card-body">
            <h5 class="card-title text-truncate mb-5 mia-classe-xl">${song.album.title}</h5>
            <p class="card-text">${song.artist.name}</p>
          </div>
          <img class="card-image" src="${song.album.cover_medium}" alt="copertina playlist">
        </div>`;
      card.onclick = () => (window.location.href = `album.html?id=${song.album.id}`);
    }
  } catch (err) {
    console.error("Errore fetch:", err);
  }
}

// EVENTO ENTER DESKTOP
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const query = searchInput.value;
    localStorage.setItem("lastSearch", query);
    searchAndRender(query);
  }
});

// EVENTO ENTER MOBILE
searchInputMobile.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const query = searchInputMobile.value;
    localStorage.setItem("lastSearch", query);
    searchAndRender(query);
  }
});

// CARICA ALL'APERTURA
window.addEventListener("DOMContentLoaded", () => {
  populateDefaultCards();

  const params = new URLSearchParams(window.location.search);
  const query = params.get("q") || localStorage.getItem("lastSearch");
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
