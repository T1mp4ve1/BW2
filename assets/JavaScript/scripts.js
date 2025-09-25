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

//----------------------------------------------------------------------VIOLA
async function VIOLA(query) {
  const container = document.getElementById("cardCenter");
  try {
    const res = await fetch(`${BASE}/search?q=${query}`, headers);
    const convertRes = await res.json();
    // console.log("VIOLA", convertRes);
    const rundomNum = randomNum(25);
    container.innerHTML = `<p id="annunci" class="btn position-absolute text-secondary end-0 me-3  p-2 rounded-5 shadow">
                            NASCONDI ANNUNCI</p>
                        <div class="row g-0">
                            <div class="col-md-3">
                                <img src="${convertRes.data[rundomNum].album.cover_medium}" class="img-fluid" alt="...">
                            </div>
                            <div class="col-md-9 d-flex align-items-center">
                                <div class="card-body p-0 ms-3">
                                    <p><small>ALBUM</small></p>
                                    <a href="album.html?id=${convertRes.data[rundomNum].album.id}" class="link-light d-flex align-items-center">
                                    <h5 class="card-title fw-bold display-3">${convertRes.data[rundomNum].album.title}</h5>
                                    </a>
                                    <a href="artist.html?id=${convertRes.data[rundomNum].artist.id}" class="link-light d-flex align-items-center">
                                    <p class="card-text mb-2">${convertRes.data[rundomNum].artist.name}, ${convertRes.data[rundomNum].title}</p>
                                    </a>
                                    <div class="d-flex justify-content-start">
                                        <button class="btn btn-success rounded-5 px-4 me-3">Play</button>
                                        <button
                                            class="btn btn-black rounded-5  px-4  me-3 text-light border">Salva</button>
                                        <i class="bi bi-three-dots fs-3 d-flex align-items-center"></i>
                                    </div>
                                </div>
                            </div>
                        </div>`;
  } catch (err) {
    console.log("Errore VIOLA:", err);
  }
}
VIOLA("popular music");
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
                        <div class="col-6 col-lg-4">
                            <div class="card text-light bg-dark shadow border-0 overflow-hidden">
                                <div class="row d-flex">
                                <a href="album.html?id=${convertRes.data[img1].album.id}" class="stretched-link"></a>
                                    <div class="col-4 pe-0 pe-lg-2 pe-xl-4 shadow-black">
                                        <div class="d-grid p-0"
                                            style="grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr">
                                            <img src="${convertRes.data[img1].album.cover_small}" class="img-fluid" alt="" />
                                            <img src="${convertRes.data[img2].album.cover_small}" class="img-fluid" alt="" />
                                            <img src="${convertRes.data[img3].album.cover_small}" class="img-fluid" alt="" />
                                            <img src="${convertRes.data[img4].album.cover_small}" class="img-fluid" alt="..." />
                                        </div>
                                    </div>
                                    <div class="col-8 d-flex align-items-center">
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
cardsBuonasera("house music", marginRow);
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
                                <div class="card text-light p-2 bg-dark border-0 shadow-sm">
                                  <img src="${songs[i].album.cover_medium}" class="card-img-top mb-2" alt="img">
                                  <a href="artist.html?id=${songs[i].artist.id}" class="stretched-link"></a>
                                    <div class="card-body p-0">
                                      <h6 class="card-title fw-bold text-truncate">${songs[i].album.title}</h6>
                                      <p class="card-text text-secondary text-truncate">${songs[i].title}</p>
                                    </div>
                                </div>
                              </div>`;
    }
  } catch (err) {
    console.error("Errore cardsAltro:", err);
  }
}
cardsAltro("pop music", AltroRow);
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
                        <div class="card bg-dark  border-0 p-4">
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
      container.innerHTML += `<a href="artist.html?id=${b.artist.id}" class="link-secondary d-flex align-items-center">
      <li class="list-group-item bg-black border-0 text-secondary text-truncate">${b.title}</li>
      </a>`;
    });
  } catch (err) {
    console.error("Errore scrollBarLeft:", err);
  }
}
scrollBarLeft("pop music", scrollable);
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
    titleArtist.innerHTML = `<p class="m-0 fw-semibold">${convertRes.data[randomNumVar].title}</p>
                            <p class="m-0 fs-6">${convertRes.data[randomNumVar].artist.name}</p>`;
  } catch (err) {
    console.log("Errore playBarSong:", err);
  }
}
playBarSong("best songs");
//----------------------------------------------------------------------
