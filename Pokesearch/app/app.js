const BASE_API_URL = "https://pokeapi.co/api/v2/";
const SEARCH_BAR = document.getElementById("search-field");
const CONTENT = document.getElementById("content");

document.getElementsByClassName("search-btn")[0].addEventListener("click", getPokemon);
SEARCH_BAR.addEventListener("submit", getPokemon);

function getPokemon(ev) {
    ev.preventDefault();

    let name = SEARCH_BAR.value;
    console.log(name);
    console.log(BASE_API_URL + "pokemon/" + name);
    fetch(BASE_API_URL + "pokemon/" + name)
        .then(res => {
            if (res.status == 404) {
                CONTENT.innerHTML = "<p>Pokemon not found</p>"
                return
            }
            return res.json()
        })
        .then(jsonData => {
            console.log(jsonData);
            if (jsonData != undefined) {
                displayData(jsonData);
                return;
            }
            CONTENT.innerHTML = "<p>Pokémon not found</p>";
        })
} 

function displayData(jsonData) {
    let htmlString = `
            <div style="display: grid; width: 30%;">
              <h3 style="justify-self: center;">${SEARCH_BAR.value}</h3>
              <img src="${jsonData.sprites.front_default}" style="justify-self: center;">    
    `;
    jsonData.abilities.forEach(element => {
        htmlString += `<p>Ability: ${element.ability.name}</p>`
    });
    htmlString += `<p>Species: ${jsonData.species.name}</p>`;
    htmlString += `<h5>Types</h5>`;
    jsonData.types.forEach(element => {
        htmlString += `<p>${element.type.name}</p>`
    });
    htmlString += `<h5>Base stats</h5>`;

    jsonData.stats.forEach(element => {
        htmlString += `<p>${element.stat.name}: ${element.base_stat}</p>`;
    });

    CONTENT.innerHTML = htmlString;
    console.log(htmlString);
}
