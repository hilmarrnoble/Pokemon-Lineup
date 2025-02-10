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

  function addListItem(pokemon) {
      let pokemonListContainer = document.querySelector(".pokemon-list");
      let listItem = document.createElement("li");
      listItem.classList.add("pokemon-item");

      let button = document.createElement("button");
      button.textContent = pokemon.name;
      button.classList.add("pokemon-button");
      
      // Event listener for the button
      button.addEventListener("click", function () {
          showDetails(pokemon);
      });

      listItem.appendChild(button);
      pokemonListContainer.appendChild(listItem);
  }

  function showDetails(pokemon) {
      console.log(pokemon);
  }

  return {
      getAll: getAll,
      add: add,
      addListItem: addListItem
  };
})();

// Loop through the Pokémon repository and create buttons for each
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
