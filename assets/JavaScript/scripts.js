//--------------------------------------------------------------------general
const KEY = token;
const HOST = "deezerdevs-deezer.p.rapidapi.com";
const BASE = "https://deezerdevs-deezer.p.rapidapi.com";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const headers = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": KEY,
    "X-RapidAPI-Host": HOST,
  },
};
//--------------------------------------------------------------------

//--------------------------------------------------------------------tracklist
async function tracklist(artistId, limite) {
  try {
    const res = await fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/top?limit=${limite}`,
      headers
    );
    const convertRes = await res.json();
    console.log("tracklist", convertRes);
  } catch (err) {
    console.log("Errore tracklist:", err);
  }
}
tracklist(13, 10);
//--------------------------------------------------------------------

//--------------------------------------------------------------------funzione esempio
function nascondo() {
  async function fetchProva(query) {
    try {
      // chiediamo i dati a un'API usando: idirizzio di base (BASE), artista (query), nostri key e fonte del'infirmazione (KEY, HOST)
      const res = await fetch(`${BASE}/search?q=${query}`, headers);
      const data = await res.json(); // converte i dati ricevuti (JSON) in un oggetto JS
      console.log(data); // qua nel console vediamo cosa abbiamo ricevuto
      const songs = data.data; // qua abbiamo un'array con prime 25 canzoni
      console.log(songs); // stampiamo quel array in console
      console.log("Titolo della prima canzone:", songs[0].title); // il titolo di primo elemento
      console.log("Album:", songs[0].album.title); // stampiamo album del primo elemento
      console.log("Copertina:", songs[0].album.cover_medium); // stampiamo la copertina del'album sopraindicato
    } catch (err) {
      console.error("Errore fetchProva:", err);
    }
  }
  fetchProva("eminem");
}
//----------------------------------------------------------------------

//----------------------------------------------------------------------Random Num
function randomNum(n) {
  return Math.floor(Math.random() * n);
}
//----------------------------------------------------------------------

//----------------------------------------------------------------------carousel
async function VIOLA(query, n) {
  const container = document.getElementById("carouselContainer");
  try {
    const res = await fetch(`${BASE}/search?q=${query}`, headers);
    const convertRes = await res.json();

    const max = convertRes.data.length;
    const used = new Set();

    function getUniqueRandom(max) {
      if (used.size >= max) {
        throw new Error("No more unique numbers available");
      }
      let num;
      do {
        num = randomNum(max);
      } while (used.has(num));
      used.add(num);
      return num;
    }

    const firstIndex = getUniqueRandom(max);
    container.innerHTML = `
      <div class="carousel-item active">
        <div class="card border-0 w-100 mb-3 text-light p-3 position-relative cardCarousel">
          <div class="row g-0">
            <div class="col-md-3">
              <img src="${convertRes.data[firstIndex].album.cover_medium}" class="img-fluid" alt="">
            </div>
            <div class="col-md-9 d-flex align-items-center">
              <div class="card-body p-0 ms-3">
                <p><small>ALBUM</small></p>
                <a href="album.html?id=${convertRes.data[firstIndex].album.id}" class="link-light d-flex align-items-center">
                  <h5 class="card-title text-truncate fw-bold fs-1" style="overflow: hidden;">
                    ${convertRes.data[firstIndex].album.title}
                  </h5>
                </a>
                <a href="artist.html?id=${convertRes.data[firstIndex].artist.id}" class="link-light d-flex align-items-center">
                <p class="card-text mb-2">${convertRes.data[firstIndex].artist.name}, ${convertRes.data[firstIndex].title}</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>`;

    for (let i = 0; i < n; i++) {
      if (used.size >= max) break;

      const idx = getUniqueRandom(max);
      container.innerHTML += `
        <div class="carousel-item">
          <div class="card border-0 w-100 mb-3 text-light p-3 position-relative cardCarousel">
            <div class="row g-0">
              <div class="col-md-3">
                <img src="${convertRes.data[idx].album.cover_medium}" class="img-fluid" alt="">
              </div>
              <div class="col-md-9 d-flex align-items-center">
                <div class="card-body p-0 ms-3">
                  <p><small>ALBUM</small></p>
                  <a href="album.html?id=${convertRes.data[idx].album.id}" class="link-light d-flex align-items-center">
                    <h5 class="card-title text-truncate fw-bold fs-1" style="overflow: hidden;">
                      ${convertRes.data[idx].album.title}
                    </h5>
                  </a>
                  <a href="artist.html?id=${convertRes.data[idx].artist.id}" class="link-light d-flex align-items-center">
                  <p class="card-text mb-2">${convertRes.data[idx].artist.name}, ${convertRes.data[idx].title}</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>`;
    }
  } catch (err) {
    console.log("Errore VIOLA:", err);
  }
}

VIOLA("soul music", 3);
//----------------------------------------------------------------------

//----------------------------------------------------------------------buonasera musica podcast
const marginRow = document.getElementById("marginRow");
async function cardsBuonasera(query, container) {
  try {
    const res = await fetch(`${BASE}/search?q=${query}`, headers);
    const convertRes = await res.json();
    // console.log("BUONASERA", convertRes);
    container.innerHTML = "";
    for (let i = 0; i < 24; i += 4) {
      const img1 = i;
      const img2 = i + 1;
      const img3 = i + 2;
      const img4 = i + 3;
      container.innerHTML += `
                        <div class="col-12 col-sm-6 col-xl-4 position-relative cardPlay">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-play-circle-fill posPlay rounded-5" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"/>
</svg>
                            <div class="card text-light shadow border-0 overflow-hidden cardBuonasera">
                                <div class="row d-flex">
                                <a href="album.html?id=${convertRes.data[img1].album.id}" class="stretched-link"></a>
                                    <div class="col-4 shadow-black">
                                        <div class="d-grid p-0"
                                            style="grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr">
                                            <img src="${convertRes.data[img1].album.cover_small}" class="img-fluid" alt="" />
                                            <img src="${convertRes.data[img2].album.cover_small}" class="img-fluid" alt="" />
                                            <img src="${convertRes.data[img3].album.cover_small}" class="img-fluid" alt="" />
                                            <img src="${convertRes.data[img4].album.cover_small}" class="img-fluid" alt="..." />
                                        </div>
                                    </div>
                                    <div class="col-8 d-flex align-items-center ps-0">
                                        <p class="card-title text-truncate fw-semibold">${convertRes.data[i].album.title}</p>
                                    </div>
                                </div>
                            </div>
                        </div>`;
    }
  } catch (err) {
    console.log("Errore cardsBuonasera:", err);
  }
}
cardsBuonasera("juzz music", marginRow);
//----------------------------------------------------------------------

//----------------------------------------------------------------------Altro di cio'
const AltroRow = document.getElementById("AltroRow");
async function cardsAltro(query, container) {
  try {
    const res = await fetch(`${BASE}/search?q=${query}`, headers);
    const convertRes = await res.json();
    const songs = convertRes.data;
    container.innerHTML = "";
    for (let i = 0; i < 10; i++) {
      container.innerHTML += `<div class="col mb-4">
                                <div class="card text-light p-2 border-0 shadow-sm colCard">
                                  <img src="${songs[i].album.cover_medium}" class="card-img-top mb-2" alt="img">
                                  <a href="artist.html?id=${songs[i].artist.id}" class="stretched-link"></a>
                                    <div class="row card-body p-0">
                                      <h6 class="card-title fw-bold text-truncate">${songs[i].album.title}</h6>
                                      <p class="card-text text-secondary text-truncate">${songs[i].title}</p>
                                      <!-- <i id="cardpPayIcon" class="bi bi-play-circle-fill text-success fs-3"></i> -->
                                    </div>
                                </div>
                              </div>`;
    }
  } catch (err) {
    console.error("Errore cardsAltro:", err);
  }
}
cardsAltro("soul music", AltroRow);
//----------------------------------------------------------------------

//----------------------------------------------------------------------playlistLove
const playlistLove = document.getElementById("playlistLove");
async function playlistLoveFunc(query, container) {
  try {
    const res = await fetch(`${BASE}/search?q=${query}`, headers);
    const convertRes = await res.json();
    // console.log("Playlist!", convertRes);
    container.innerHTML = "";
    for (let i = 0; i < 8; i += 4) {
      const img1 = i;
      const img2 = i + 1;
      const img3 = i + 2;
      const img4 = i + 3;
      container.innerHTML += `<div class="container-fluid my-3">
                        <div class="card border-0 p-4 cardBuonasera">
                            <div class="row">
                                <div id="shadow-white" class="col-6 d-grid p-0"
                                    style="grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr">
                                    <img src="${convertRes.data[img1].album.cover_medium}" class="img-fluid" alt="" />
                                    <img src="${convertRes.data[img2].album.cover_medium}" class="img-fluid" alt="" />
                                    <img src="${convertRes.data[img3].album.cover_medium}" class="img-fluid" alt="" />
                                    <img src="${convertRes.data[img4].album.cover_medium}" class="img-fluid" alt="..." />
                                </div>
                                <div class="col-6">
                                    <p class="text-secondary">Playlist</p>
                                    <h3 class="text-light fw-bold">${query}</h3>
                                </div>
                                <div
                                    class="col-12 mt-4 text-light d-flex justify-content-between align-items-center p-0">
                                    <div class="d-flex align-items-center gap-3">
                                        <i class="bi bi-heart-fill text-success display-5"></i>
                                        <i class="bi bi-three-dots-vertical display-5"></i>
                                    </div>

                                    <div class="d-flex align-items-center gap-3">
                                        <p class="text-secondary m-0">16 brani</p>
                                        <i class="bi bi-play-circle display-5 ali"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
    }
  } catch (err) {
    console.log("Errore cardsBuonasera:", err);
  }
}
playlistLoveFunc("juzz music", playlistLove);
//----------------------------------------------------------------------

//----------------------------------------------------------------------close footer-play
const playPanel = document.getElementById("footer-play");
const playPanelBtn = document.getElementById("closePlayPanel");
const minimazedPlayPannel = document.getElementById("minimazedPlayPannel");
const minimazedPlayPannelBtn = document.getElementById(
  "minimazedPlayPannelBtn"
);

playPanelBtn.addEventListener("click", () => {
  playPanel.classList.remove("d-lg-block");
  minimazedPlayPannel.classList.remove("d-none");
});

minimazedPlayPannelBtn.addEventListener("click", () => {
  playPanel.classList.add("d-lg-block");
  minimazedPlayPannel.classList.add("d-none");
});
//----------------------------------------------------------------------

//----------------------------------------------------------------------scrollable
const scrollable = document.getElementById("scrollable");
async function scrollBarLeft(query, container) {
  try {
    container.innerHTML = "";
    const res = await fetch(`${BASE}/search?q=${query}`, headers);
    const convertRes = await res.json();
    const songs = convertRes.data;
    // console.log("Brani laterali:", songs);
    songs.forEach((b) => {
      container.innerHTML += `<a href="artist.html?id=${b.artist.id}" class="text-decoration-none d-flex align-items-center myLinkHover">
      <li class="list-group-item border-0 text-truncate myList">${b.title}</li>
      </a>`;
    });
  } catch (err) {
    console.error("Errore scrollBarLeft:", err);
  }
}
scrollBarLeft("popular songs", scrollable);
//----------------------------------------------------------------------

//----------------------------------------------------------------------play bar Titolo canzone
const playSongTitle = document.getElementById("playSongTitle");
const playImg = document.getElementById("playImg");
const titleArtist = document.getElementById("playTitleArtist");
async function playBarSong(query) {
  try {
    const res = await fetch(`${BASE}/search?q=${query}`, headers);
    const convertRes = await res.json();
    const randomNumVar = randomNum(convertRes.data.length);
    // console.log("best songs", convertRes);
    titleArtist.innerHTML = "";
    playSongTitle.innerText = convertRes.data[randomNumVar].title;
    playImg.src = convertRes.data[randomNumVar].album.cover_small;
    titleArtist.innerHTML = `<a href="album.html?id=${convertRes.data[randomNumVar].album.id}" class="link-light d-flex align-items-center">
    <p class="m-0 fw-semibold">${convertRes.data[randomNumVar].title}</p></a>
                            <a href="artist.html?id=${convertRes.data[randomNumVar].artist.id}" class="link-light d-flex align-items-center"><p class="m-0 fs-6">${convertRes.data[randomNumVar].artist.name}</p></a>`;
  } catch (err) {
    console.log("Errore playBarSong:", err);
  }
}
playBarSong("best songs");
//----------------------------------------------------------------------
