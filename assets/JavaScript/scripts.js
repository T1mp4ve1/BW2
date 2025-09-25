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

//----------------------------------------------------------------------buonasera musica podcast
async function cardsBuonasera(query, container) {
  const marginRow = document.getElementById("marginRow");
  try {
    container.innerHTML = "";
    for (let i = 0; i < 6; i++) {
      const res = await fetch(`${BASE}/search?q=${query}`, headers);
    }
  } catch (err) {
    console.log("Errore cardsBuonasera:", err);
  }
}
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
      console.log("NUOVO!!!!!:", songs);
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
cardsAltro("rock", AltroRow);
