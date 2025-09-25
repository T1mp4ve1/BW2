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

    const trackArray = data.tracks.data;
    console.log(trackArray)

    document.getElementById("imgCard").src = data.cover_medium;
    document.getElementById("imgCardLg").src = data.cover_medium;
    document.getElementById("pCard").innerText = data.title;
    document.getElementById("pArtist").innerHTML = data.artist.name;
    document.getElementById("mobileTrack").innerText = data.title;
    document.getElementById("mobileArtist").innerText = data.artist.name;
    document.getElementById("artistIcon").src = data.cover_small;

    for (let i = 0; i < trackArray.length; i++) {
      const track = trackArray[i];

      const container = document.getElementById("trackContainer");

      const createCard = document.createElement("div");
      createCard.classList = "row text-white align-items-center py-2";
      createCard.innerHTML = `<div class="col-1 text-center">${i + 1}</div>
            <div class="col-5 d-flex flex-column">
              <span class="track-title fw-bold text-truncate">${track.title}</span>
              <span class="track-artist text-secondary">${data.artist.name}</span>
            </div>
            <div class="col-3">1.2M</div>
            <div class="col-2 text-center">3:45</div>`;


      const createCardMobile = document.createElement("div");
      const containerMobile = document.getElementById("paddingS");
      createCardMobile.classList = "track d-flex justify-content-between align-items-center";
      createCardMobile.innerHTML = `<div>
            <span class="track-title fw-bold text-white">${track.title}</span><br />
            <span class="track-artist text-secondary">${data.artist.name}</span>
          </div>
          <div class="d-flex align-items-center gap-2">
            <i class="bi bi-three-dots-vertical text-white"></i>
          </div>`;

      container.appendChild(createCard);
      containerMobile.appendChild(createCardMobile);

    }

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

