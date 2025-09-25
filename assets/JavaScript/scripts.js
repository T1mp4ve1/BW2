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

//--------------------------------------------------------------------funzione esempio
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
//----------------------------------------------------------------------

//----------------------------------------------------------------------Random Num
function randomNum() {
  return Math.floor(Math.random() * 25);
}
//----------------------------------------------------------------------

//----------------------------------------------------------------------VIOLA
async function VIOLA(query) {
  const container = document.getElementById("cardCenter");
  try {
    const res = await fetch(`${BASE}/search?q=${query}`, headers);
    const convertRes = await res.json();
    console.log("VIOLA", convertRes);
    const rundomNum = randomNum();
    container.innerHTML = `<p id="annunci" class="btn position-absolute text-secondary end-0 me-3  p-2 rounded-5 shadow">
                            NASCONDI ANNUNCI</p>
                        <div class="row g-0">
                            <div class="col-md-3">
                                <img src="${convertRes.data[rundomNum].album.cover_medium}" class="img-fluid" alt="...">
                            </div>
                            <div class="col-md-9 d-flex align-items-center">
                                <div class="card-body p-0 ms-3">
                                    <p><small>ALBUM</small></p>
                                    <h5 class="card-title fw-bold display-3">${convertRes.data[rundomNum].album.title}</h5>
                                    <p class="card-text mb-2">${convertRes.data[rundomNum].artist.name}, ${convertRes.data[rundomNum].title}</p>
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
VIOLA("Metalcore");
//----------------------------------------------------------------------

//----------------------------------------------------------------------buonasera musica podcast
async function cardsBuonasera(query, container) {
  const marginRow = document.getElementById("marginRow");
  try {
    const res = await fetch(`${BASE}/search?q=${query}`, headers);
    const convertRes = await res.json();
    console.log("BUONASERA", convertRes);
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
cardsBuonasera("pop", marginRow);
//----------------------------------------------------------------------

//----------------------------------------------------------------------add card Altro di cio'
async function cardsAltro(query, container) {
  const AltroRow = document.getElementById("AltroRow");
  try {
    container.innerHTML = "";
    for (let i = 0; i < 10; i++) {
      const res = await fetch(`${BASE}/search?q=${query}`, headers);
      const convertRes = await res.json();
      const songs = convertRes.data;
      // console.log("NUOVO!!!!!:", songs);
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
cardsAltro("metal", AltroRow);
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
