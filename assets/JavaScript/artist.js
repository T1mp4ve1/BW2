// search?q=eminem
const url = "https://deezerdevs-deezer.p.rapidapi.com";
const key = token;
const host = "deezerdevs-deezer.p.rapidapi.com";

const lastSearch = localStorage.getItem("lastSearch");
const params = new URLSearchParams(window.location.search);
const artistId = params.get("id");

const card1 = document.getElementById("card");

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": key,
    "x-rapidapi-host": host,
  },
};

async function artist() {
  const imgCard = document.getElementById("imgCard");

  try {
    // ciclo for
    const result = await fetch(`${url}/artist/${artistId}`, options);
    const data = await result.json();
    console.log(data);
    console.log(data.name);
    document.getElementById("imgCard").src = data.picture_medium;
    document.getElementById("imgCardLg").src = data.picture_big;
    document.getElementById("pCard").innerText = data.name;
    document.getElementById("visual").innerText = data.nb_fan + " " + "ascoltatori mensili";
    document.getElementById("visual1").innerText = data.nb_fan + " " + "ascoltatori mensili";
  } catch (err) {
    console.error(err);
  }
}
artist();

async function popular(query) {
  try {
    const result = await fetch(`${url}/search?q=${query}`, options);
    const data = await result.json();
    const songs = data.data;

    console.log(data);
    console.log(data.data);

    for (let i = 1; i <= 5; i++) {
      const cardPopular = document.getElementById(`cardPopular${i}`);
      if (!cardPopular) continue;
      const song = songs[i - 1];

      cardPopular.innerHTML = ` <div class="col-1 d-flex justify-content-center align-items-center">
                  <p>${i}</p>
                </div>
                <div class="col-3">
                  <img class="w-100" src="${song.album.cover_small}" alt="" />
                </div>
                <div class="col-7 d-flex flex-column justify-content-center p-0">
                  <p class="m-0 fs-4 fw-semibold text-truncate">${song.title}</p>
                  <p class="m-0 fs-5 text-secondary">${song.rank}</p>
                </div>
                <div class="col-1 d-flex justify-content-center align-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                  </svg>
                </div>`;
      console.log(song.album.cover_small);
    }
    for (let l = 1; l <= 5; l++) {
      const cardPopularLg = document.getElementById(`cardPopularLg${l}`);
      if (!cardPopularLg) continue;
      const song = songs[l - 1];

      cardPopularLg.innerHTML = `<div class="col-1 d-flex justify-content-center align-items-center">
                        <p>${l}</p>
                      </div>
                      <div class="col-2 d-flex">
                        <img class="w-100" src="${song.album.cover_small}" alt="" />
                      </div>
                      <div class="col-9 d-flex justify-content-between align-items-center p-0">
                        <p class="m-0 fs-3 fw-semibold text-truncate">${song.title}</p>
                        <p class="m-0 fs-5 text-secondary">${song.rank}</p>
                        <p class="m-0 fs-5 text-secondary">${song.duration}</p>
                      </div> `;
      console.log(song.album.cover_small);
    }
  } catch (err) {
    console.error(err);
  }
}

popular(lastSearch);

// // lg
// async function popularLg(query) {
//   try {
//     // ciclo for
//     const result = await fetch(`${url}/search?q=${query}`, options);
//     const data = await result.json();
//     const songs = data.data;

//     console.log(data);
//     console.log(data.data);
//   } catch (err) {
//     console.error(err);
// //   }
// // }

// popularLg("eminem");

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
