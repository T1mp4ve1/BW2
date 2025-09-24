// search?q=eminem
const url = "https://deezerdevs-deezer.p.rapidapi.com";
const key = token;
const host = "deezerdevs-deezer.p.rapidapi.com";

const params = new URLSearchParams(window.location.search);
const artistId = params.get("id");

const res = await fetch(`${url}/artist/${artistId}`, options);
const card1 = document.getElementById("card");

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": key,
    "x-rapidapi-host": host,
  },
};

async function artist(query) {
  const imgCard = document.getElementById("imgCard");

  try {
    // ciclo for
    const result = await fetch(`${url}/search?q=${query}`, options);
    const data = await result.json();
    console.log(data);
    const array = data.data;
    console.log(array);
    document.getElementById("imgCard").src = array[0].artist.picture_medium;
    document.getElementById("imgCardLg").src = array[0].artist.picture_medium;
    document.getElementById("pCard").innerText = array[0].artist.name;
    document.getElementById("visual").innerText = array[0].rank + " " + "ascoltatori mensili";
    document.getElementById("visual1").innerText = array[0].rank + " " + "ascoltatori mensili";
  } catch (err) {
    console.error(err);
  }
}
artist("eminem");
