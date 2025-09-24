const KEY = "140b5bbc7bmsh51c8ed9dcbd4be0p1d88b3jsn4c501496c5a1";
const HOST = "deezerdevs-deezer.p.rapidapi.com";
const BASE = "https://deezerdevs-deezer.p.rapidapi.com";

const params = new URLSearchParams(window.location.search); //prende tutto dopo '?'
const id = params.get("id"); //controlla se c'e' id dopo '?'

const headers = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": KEY,
    "X-RapidAPI-Host": HOST,
  },
};

async function fetchProva(query) {
  try {
    const res = await fetch(`${BASE}/search?q=${query}`, headers);
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error("Errore fetchProva:", err);
  }
}
fetchProva("MUSE");

// close footer-play
const playPanel = document.getElementById("footer-play");
const playPanelBtn = document.getElementById("closePlayPanel");
const minimazedPlayPannel = document.getElementById("minimazedPlayPannel");
const minimazedPlayPannelBtn = document.getElementById(
  "minimazedPlayPannelBtn"
);
console.log(
  playPanel,
  playPanelBtn,
  minimazedPlayPannel,
  minimazedPlayPannelBtn
);

playPanelBtn.addEventListener("click", () => {
  playPanel.classList.add("d-none");
  minimazedPlayPannel.classList.remove("d-none");
});

minimazedPlayPannelBtn.addEventListener("click", () => {
  playPanel.classList.remove("d-none");
  minimazedPlayPannel.classList.add("d-none");
});
