let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
    let pokemonListContainer = document.querySelector(".pokemon-list");
    let loadingMessage = document.getElementById('loading-message');

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        if (typeof pokemon === "object" && "name" in pokemon && "detailsUrl" in pokemon) {
            pokemonList.push(pokemon);
        } else {
            console.error("Invalid Pokémon format.");
        }
    }

    function addListItem(pokemon) {
        let listItem = document.createElement("div");
        listItem.classList.add("col-sm-6", "col-md-4", "col-lg-3");

        let button = document.createElement("button");
        button.textContent = pokemon.name;
        button.classList.add("btn", "btn-primary", "btn-block", "pokemon-button");
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#pokemon-modal');
        button.setAttribute('aria-label', `View details of ${pokemon.name}`);

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
            .then(response => response.json())
            .then(json => {
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    add(pokemon);
                });
                hideLoadingMessage();
            })
            .catch(err => {
                console.error("Error loading Pokémon list:", err);
                hideLoadingMessage();
            });
    }

    function loadDetails(pokemon) {
        showLoadingMessage();
        let url = pokemon.detailsUrl;

        return fetch(url)
            .then(response => response.json())
            .then(details => {
                pokemon.imgUrl = details.sprites.front_default;
                pokemon.height = details.height;
                hideLoadingMessage();
            })
            .catch(err => {
                console.error("Error loading Pokémon details:", err);
                hideLoadingMessage();
            });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(() => {
            document.getElementById('modal-title').textContent = pokemon.name;
            document.getElementById('modal-pokemon-height').textContent = `Height: ${pokemon.height / 10} m`;
            document.getElementById('modal-pokemon-img').src = pokemon.imgUrl;
            document.getElementById('modal-pokemon-img').alt = `${pokemon.name} Image`;
        });
    }

    loadList().then(() => {
        pokemonList.forEach(pokemon => addListItem(pokemon));
    });

    return {
        getAll,
        add,
        addListItem,
        loadList,
        loadDetails
    };
})();
