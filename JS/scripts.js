let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Bulbasaur", height: 0.7, type: ["grass", "poison"] },
    { name: "Ivysaur", height: 1.0, type: ["grass", "poison"] },
    { name: "Venusaur", height: 2.0, type: ["grass", "poison"] },
    { name: "Charmander", height: 0.6, type: ["fire"] },
    { name: "Charmeleon", height: 1.1, type: ["fire"] },
    { name: "Charizard", height: 1.7, type: ["fire", "flying"] },
    { name: "Squirtle", height: 0.5, type: ["water"] },
    { name: "Wartortle", height: 1.0, type: ["water"] },
    { name: "Blastoise", height: 1.6, type: ["water"] },
    { name: "Caterpie", height: 0.3, type: ["bug"] },
    { name: "Metapod", height: 0.7, type: ["bug"] },
    { name: "Butterfree", height: 1.1, type: ["bug", "flying"] },
    { name: "Pidgey", height: 0.3, type: ["normal", "flying"] },
    { name: "Pidgeot", height: 1.5, type: ["normal", "flying"] },
    { name: "Rattata", height: 0.3, type: ["normal"] },
    { name: "Raticate", height: 0.7, type: ["normal"] },
    { name: "Zubat", height: 0.8, type: ["poison", "flying"] },
    { name: "Golbat", height: 1.6, type: ["poison", "flying"] },
    { name: "Oddish", height: 0.5, type: ["grass", "poison"] },
    { name: "Gloom", height: 0.8, type: ["grass", "poison"] },
    { name: "Vileplume", height: 1.2, type: ["grass", "poison"] },
    { name: "Machop", height: 0.8, type: ["fighting"] },
    { name: "Machoke", height: 1.5, type: ["fighting"] },
    { name: "Machamp", height: 1.6, type: ["fighting"] },
    { name: "Magnemite", height: 0.3, type: ["electric", "steel"] },
    { name: "Magneton", height: 1.0, type: ["electric", "steel"] }
  ];

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "type" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.error("Invalid Pokémon format");
    }
  }

  return {
    getAll: getAll,
    add: add,
  };
})();

// Select the Pokémon list container
let pokemonListContainer = document.querySelector(".pokemon-list");

// Loop through the Pokémon repository and create the list items
pokemonRepository.getAll().forEach(function (pokemon) {
  let li = document.createElement("li");
  li.classList.add("pokemon-item");

  let nameElement = document.createElement("div");
  nameElement.classList.add("pokemon-name");
  nameElement.textContent = pokemon.name;

  let heightElement = document.createElement("div");
  heightElement.classList.add("pokemon-height");
  heightElement.textContent = "Height: " + pokemon.height + " meters";

  if (pokemon.height > 1.7) {
    let noteElement = document.createElement("div");
    noteElement.classList.add("pokemon-note");
    noteElement.textContent = "Wow, that’s big!";
    li.appendChild(noteElement);
  }

  li.appendChild(nameElement);
  li.appendChild(heightElement);
  pokemonListContainer.appendChild(li);
});
