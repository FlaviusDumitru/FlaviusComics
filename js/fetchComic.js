window.onload = function () {
    document.maxComic = -1;
    getComic("latest");

    // Ordningsknapparna

    // Första-knappen visar den första comic: en i listan då man klickar på knappen
    document.getElementById('forsta').addEventListener('click', function () {
        if (!this.disabled) {
            getComic(1);
        }
    })

    // Visar sista comic: en
    document.getElementById('sista').addEventListener('click', function () {
        if (!this.disabled) {
            getComic('latest');
        }
    })
    // Tar det nuvaranda comic: en som visas och flyttar ett steg framåt i listan
    document.getElementById('nasta').addEventListener('click', function () {
        if (!this.disabled) {
            getComic(document.currentComic + 1);
        }
    })

    // Tar det nuvaranda comic: en som visas och flyttar ett steg bakåt i listan
    document.getElementById('forra').addEventListener('click', function () {
        if (!this.disabled) {
            getComic(document.currentComic - 1)
        }
    })


    // Visar slumpmässig comic
    document.getElementById('slumpa').addEventListener('click', function () {
        if (!this.disabled) {
            getComic(Math.floor((Math.random() * document.maxComic)))
        }
    })


}

// Fetch: ar comic: en från comic API:et 
function getComic(which) {
    fetch('https://xkcd.vercel.app/?comic=' + which)
        .then(function (response) {
            if (response.status == 200) {
                return response.json();
            }
        })
        .then(function (data) {
            if (document.maxComic < data.num) {
                document.maxComic = data.num;
            }
            appendComic(data);
            // kollar att alla buttons är på
            document.getElementById("forsta").disabled = false;
            document.getElementById("sista").disabled = false;
            document.getElementById("forra").disabled = false;
            document.getElementById("nasta").disabled = false;

            if (data.num === 1) {
                document.getElementById("forsta").disabled = true;
                document.getElementById("forra").disabled = true;
            }
            if (data.num === document.maxComic) {
                document.getElementById("sista").disabled = true;
                document.getElementById("nasta").disabled = true;
            }
                })
}

function appendComic(data) {


    let mainComic = document.getElementById('mainComic');
    mainComic.innerHTML = "";

    // Hämtar information om comic: ens rubrik och visar den 
    let text = document.createElement('h2');
    text.innerHTML = data.title;
    mainComic.appendChild(text);

    // Hämtar information om comic: ens datum och visar den
    let datum = new Date(data.year, data.month, data.day);
    let dateName = document.createElement('p');
    dateName.innerHTML = datum.toLocaleDateString();
    // Visar datumet
    mainComic.appendChild(dateName);

    // Hämtar comic: ens bild-information
    let figure = document.createElement("figure");
    let image = document.createElement("img");
    image.src = data.img;
    // Visar bilden
    figure.appendChild(image);

    let figcaption = document.createElement("figcaption");
    figcaption.innerHTML = "Serie nummer: " + data.num;
    // Visar numret på serien
    figure.appendChild(figcaption);

    mainComic.appendChild(figure);

    document.currentComic = data.num;
}