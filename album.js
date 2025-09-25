const url = "https://deezerdevs-deezer.p.rapidapi.com";
const key = "20561f7cfb1f3663e64640399d4f0b842af705dc851769ecf4dee26d6dc0b27f";
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

async function album() {
    const imgCard = document.getElementById("imgCard");

    try {
        // ciclo for
        const result = await fetch(`${url}/album/${albumId}`, options);
        const data = await result.json();
        console.log(data);
        console.log(data.name);
        document.getElementById("imgCard").src = data.picture_medium;
        document.getElementById("imgCardLg").src = data.picture_medium;
        document.getElementById("pCard").innerText = data.name;
    } catch (err) {
        console.error(err);
    }
}

album();
