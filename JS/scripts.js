let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
    let pokemonListContainer = document.querySelector(".pokemon-list");
    let loadingMessage = document.getElementById('loading-message');
    let modal = document.getElementById('pokemon-modal');
    let closeModalButton = document.getElementById('close-modal');
    let modalName = document.getElementById('modal-pokemon-name');
    let modalHeight = document.getElementById('modal-pokemon-height');
    let modalImg = document.getElementById('modal-pokemon-img');
    let currentIndex = 0;

    // Utility function to show all Pokémon
    function getAll() {
        return pokemonList;
    }

    // Function to add a Pokémon to the list
    function add(pokemon) {
        if (typeof pokemon === "object" && "name" in pokemon && "detailsUrl" in pokemon && !pokemonList.find(p => p.name === pokemon.name)) {
            pokemonList.push(pokemon);
        } else {
            console.error("Invalid or duplicate Pokémon");
        }
    }

    // Function to create and add list item (button) for each Pokémon
    function addListItem(pokemon) {
        let listItem = document.createElement("li");
        listItem.classList.add("pokemon-item");

        let button = document.createElement("button");
        button.textContent = pokemon.name;
        button.classList.add("pokemon-button");
        button.setAttribute('aria-label', `View details of ${pokemon.name}`);

        // Event delegation to handle dynamic event listeners
        pokemonListContainer.addEventListener("click", function (event) {
            if (event.target && event.target.matches("button.pokemon-button")) {
                let pokemonName = event.target.textContent;
                let selectedPokemon = pokemonList.find(pokemon => pokemon.name === pokemonName);
                showDetails(selectedPokemon);
            }
        });

        listItem.appendChild(button);
        pokemonListContainer.appendChild(listItem);
    }

    // Function to show loading message
    function showLoadingMessage() {
        loadingMessage.style.display = 'block';
    }

    // Function to hide loading message
    function hideLoadingMessage() {
        loadingMessage.style.display = 'none';
    }

    // Function to load list of Pokémon
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
                let errorMessage = document.createElement('li');
                errorMessage.textContent = "Error loading Pokémon. Please try again later.";
                pokemonListContainer.appendChild(errorMessage);
            });
    }

    // Function to load Pokémon details (height and image)
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
            .catch(e => {
                console.error("Error loading Pokémon details:", e);
                hideLoadingMessage();
                alert("Error loading details for " + pokemon.name + ". Please try again.");
            });
    }

    // Function to show Pokémon details in modal
    function showDetails(pokemon) {
        loadDetails(pokemon).then(() => {
            modalName.textContent = pokemon.name;
            modalHeight.textContent = `Height: ${pokemon.height / 10} m`;
            modalImg.src = pokemon.imgUrl;
            modalImg.alt = `${pokemon.name} Image`;
            modal.classList.add("show"); // Show the modal with a smooth fade-in
            currentIndex = pokemonList.indexOf(pokemon); // Update current index for swiping
        });
    }

    // Function to close the modal
    closeModalButton.addEventListener("click", function () {
        modal.classList.remove("show"); // Hide the modal with a fade-out
    });

    // Allow closing modal with the "Escape" key
    window.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            modal.classList.remove("show");
        }
    });

    // Function to handle swiping between Pokémon using pointer events
    function handleSwipe(event) {
        let startX = event.clientX;

        function handlePointerMove(moveEvent) {
            let deltaX = moveEvent.clientX - startX;
            if (Math.abs(deltaX) > 100) {
                currentIndex = deltaX > 0 ? currentIndex - 1 : currentIndex + 1;
                currentIndex = Math.max(0, Math.min(pokemonList.length - 1, currentIndex));
                showDetails(pokemonList[currentIndex]);
            }
        }

        modal.addEventListener('pointermove', handlePointerMove);
        modal.addEventListener('pointerup', function () {
            modal.removeEventListener('pointermove', handlePointerMove);
        });
    }

    modal.addEventListener('pointerdown', handleSwipe);

    // Load the Pokémon list and display it
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
