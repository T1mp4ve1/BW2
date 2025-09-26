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
// header artista
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

async function popular(id, limite) {
  try {
    const result = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${id}/top?limit=${limite}`, options);
    const data = await result.json();
    console.log("tracks", data.data);
    if (data.data.length < 1) {
      const cardPopular = document.getElementById(`cardPopular1`);
      cardPopular.innerHTML = `<p class="m-0 fs-4 fw-semibold text-truncate">Nessun brano trovato
                    </p>`;
      return;
    }
    // card mobile
    if (data.data.lenght > 0) {
      for (let i = 1; i <= data.data.length; i++) {
        const cardPopular = document.getElementById(`cardPopular${i}`);
        if (!cardPopular) continue;

        cardPopular.innerHTML = ` <div class="col-1 d-flex justify-content-center align-items-center ">
                  <p>${i}</p>
                </div>
                <div class="col-3">
                  <img class="w-100" src="${data.data[i - 1].album.cover_xl}" alt="" />
                </div>
                <div class="col-7 d-flex flex-column justify-content-center p-0">
                  <p class="m-0 fs-4 fw-semibold text-truncate">${data.data[i - 1].title}</p>
                  <p class="m-0 fs-5 text-secondary">${data.data[i - 1].rank}</p>
                </div>
                <div class="col-1 d-flex justify-content-center align-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                  </svg>
                </div>`;
      }
    } else {
      console.log("nessun brano trovato");
    }

    // card lg
    if (data.data.lenght > 0) {
      for (let l = 1; l <= data.data.length; l++) {
        const cardPopularLg = document.getElementById(`cardPopularLg${l}`);
        cardPopularLg.innerHTML = `<div  class=" col-1 d-flex justify-content-center align-items-center number">
                        <p>${l}</p>
                      </div>
                      <div class="col-2 d-flex">
                        <img  class="w-100" src="${data.data[l - 1].album.cover_small}" alt="" />
                          </div>
                    
                    <div class="col-5 d-flex justify-content-start align-items-center">
                       
                    <p class="m-0 fs-5  fw-semibold text-truncate">${data.data[l - 1].title}</p>
                    </div>
                        <div class="col-3 d-flex justify-content-center align-items-center">
                    <p class="m-0 fs-5 text-secondary">${data.data[l - 1].rank}</p>
                    </div>

                     <div class="col-1 d-flex justify-content-center align-items-center">  
                    <p class="m-0 fs-5 text-secondary">${data.data[l - 1].duration}</p>
                    </div> `;

        // over card
        const numberDiv = cardPopularLg.querySelector(".number");

        cardPopularLg.addEventListener("mouseenter", () => {
          cardPopularLg.style.backgroundColor = "#2a2a2a";

          numberDiv.innerHTML = `<i class="bi bi-play-fill"></i>`;
        });
        cardPopularLg.addEventListener("mouseleave", () => {
          cardPopularLg.style.backgroundColor = "#121212";

          numberDiv.innerHTML = `<p>${l}</p> `;
        });
      }
    } else {
      console.log("nessun brano trovato");
    }
  } catch (err) {
    console.error(err);
  }
}

popular(artistId, 5);
// carosello
async function carusel(id, limite) {
  try {
    const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${id}/top?limit=${limite}`, options);
    const data = await response.json();
    const songs = data.data;

    const carouselInner = document.getElementById("carouselInner");
    carouselInner.innerHTML = "";

    for (let i = 0; i < songs.length; i++) {
      const cover = songs[i].album.cover_big;
      const item = document.createElement("div");
      const titleAlbum = songs[i].album.title;
      item.classList.add("carousel-item");
      if (i === 0) item.classList.add("active");
      item.innerHTML = `<img src="${cover}" class="d-block w-100" alt="..."> <p class="text-center mt-1 fs-3">${titleAlbum} </p>`;
      //   item.innerText = titleAlbum;
      carouselInner.appendChild(item);
    }
  } catch (err) {
    console.error(err);
  }
}

carusel(artistId, 5);

// arrowBack
const arrowBack = document.getElementById("arrowBack");
arrowBack.addEventListener("click", () => {
  history.back();
});

const arrowBack2 = document.getElementById("arrowBack2");
arrowBack2.addEventListener("click", () => {
  history.back();
});

// lista sx
const scrollable = document.getElementById("scrollable");
async function scrollBarLeft(query, container) {
  try {
    container.innerHTML = "";
    const res = await fetch(`${url}/search?q=${query}`, options);
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
scrollBarLeft("Soul music", scrollable);

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
