const url = "https://deezerdevs-deezer.p.rapidapi.com";
const key = token;
const host = "deezerdevs-deezer.p.rapidapi.com";

const params = new URLSearchParams(window.location.search);
const albumId = params.get("id");
console.log(albumId);

const card1 = document.getElementById("card");

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": key,
    "x-rapidapi-host": host,
  },
};

async function album() {
  const imgCard = document.getElementById("imgCard");

  try {
    // ciclo for
    const result = await fetch(`${url}/album/${albumId}`, options);
    const data = await result.json();
    console.log(data);
    document.getElementById("imgCard").src = data.cover_medium;
    document.getElementById("imgCardLg").src = data.cover_medium;
    /*document.getElementById("pCard").innerText = data.name; */
  } catch (err) {
    console.error(err);
  }
}

album();

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
