let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
    let pokemonListContainer = document.querySelector(".pokemon-list");
    let loadingMessage = document.getElementById('loading-message');

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        if (typeof pokemon === "object" && "name" in pokemon && "detailsUrl" in pokemon && !pokemonList.find(p => p.name === pokemon.name)) {
            pokemonList.push(pokemon);
        } else if (pokemonList.find(p => p.name === pokemon.name)){
          console.error("Duplicate Pokemon");
        } else {
            console.error("Invalid Pokémon format");
        }
    }

    function addListItem(pokemon) {
        let listItem = document.createElement("li");
        listItem.classList.add("pokemon-item");

        let button = document.createElement("button");
        button.textContent = pokemon.name;
        button.classList.add("pokemon-button");

        button.addEventListener("click", function () {
            showDetails(pokemon);
        });

        listItem.appendChild(button);
        pokemonListContainer.appendChild(listItem);
    }

    function showLoadingMessage() {
        loadingMessage.style.display = 'block';
    }

    function hideLoadingMessage() {
        loadingMessage.style.display = 'none';
    }

    function loadList() {
        showLoadingMessage();
        return fetch(apiUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    add(pokemon);
                });
                hideLoadingMessage();
            })
            .catch(function (err) {
                console.error("Error loading Pokémon list:", err);
                hideLoadingMessage();
                // Optional: Display an error message to the user
                let errorMessage = document.createElement('li');
                errorMessage.textContent = "Error loading Pokémon. Please try again later.";
                pokemonListContainer.appendChild(errorMessage);

            });
    }

    function loadDetails(pokemon) {
        showLoadingMessage();
        let url = pokemon.detailsUrl;

        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (details) {
                pokemon.imgUrl = details.sprites.front_default;
                pokemon.height = details.height;
                hideLoadingMessage();
            })
            .catch(function (e) {
                console.error("Error loading Pokémon details:", e);
                hideLoadingMessage();
                // Optional: Display an error message to the user (e.g., in a modal)
                alert("Error loading details for " + pokemon.name + ". Please try again.");
            });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});