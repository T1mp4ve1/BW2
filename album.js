const url = "https://deezerdevs-deezer.p.rapidapi.com";
const key = "20561f7cfb1f3663e64640399d4f0b842af705dc851769ecf4dee26d6dc0b27f";
const host = "deezerdevs-deezer.p.rapidapi.com";

const options = {
    method: "GET",
    headers: {
        "x-rapidapi-key": key,
        "x-rapidapi-host": host,
    },
};

async function album(query) {
    try {
        const res = await fetch(`${url}/search?q=${query}`, options);
        const data = await res.json();
        console.log(data);

        const array = data.data;
        console.log(array);

        if (array.length > 0) {
            document.getElementById("imgCard").src = array[0].album.cover_medium;
        }
    } catch (err) {
        console.error(err);
    }
}

album("shortnsweet");
