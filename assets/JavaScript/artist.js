// search?q=eminem
const url = "https://deezerdevs-deezer.p.rapidapi.com";
const key = token;
const host = "deezerdevs-deezer.p.rapidapi.com";

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
    document.getElementById("imgCardLg").src = data.picture_medium;
    document.getElementById("pCard").innerText = data.name;
    document.getElementById("visual").innerText = data.nb_fan + " " + "ascoltatori mensili";
    document.getElementById("visual1").innerText = data.nb_fan + " " + "ascoltatori mensili";
  } catch (err) {
    console.error(err);
  }
}
artist();
