const url = "https://deezerdevs-deezer.p.rapidapi.com";
const key = token;
const host = "deezerdevs-deezer.p.rapidapi.com";

const params = new URLSearchParams(window.location.search);
const albumId = params.get("id");
console.log(albumId)

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
