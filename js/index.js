import { getPokemonesFetch, getPokemonFetch } from "../utils/utils.js";
import CardPokemon from "../webcomponents/cardPokemones.js";

new CardPokemon();
let timeoutId = null, nextURL = null, previousURL = null;

const center_on_page = document.querySelector('.center-on-page');
setTimeout(() => {
    center_on_page.style.display = 'none';
}, 4500);

const getAllPokeomnes = async (limit) => {
    const { results, next, previous } = await getPokemonesFetch(limit);
    nextURL = next;
    previousURL = previous;
    document.querySelector('#container_pokemones').innerHTML = '';
    results.forEach(pokemon => {
        listCardPokemon(pokemon.name);
    });
}
const listCardPokemon = (pokemon_name) => {
    getPokemonFetch(pokemon_name).then(
        (pokemon) => {
            if (pokemon === undefined) {
                pokemon = {
                    id: 9999,
                    name: 'Poke 404',
                    sprites: {
                        other: {
                            'official-artwork': {
                                front_default: '../img/404pokemon.png'
                            }
                        }
                    }
                }
            };
            const containerPokemones = document.querySelector('#container_pokemones');
            const card = document.createElement('card-pokemon');
            card.numberId = pokemon.id;
            card.name = pokemon.name;
            card.url = pokemon.sprites.other['official-artwork'].front_default;
            containerPokemones.insertAdjacentElement("beforeend", card);
        }
    )
}
//Buscador de pokemones
const searchPokemon = (search) => {
    document.querySelector('#container_pokemones').innerHTML = '';
    listCardPokemon(search);
}
const debounce = (callback, delay, timeoutId) => {
    if (timeoutId) clearTimeout(timeoutId);
    return setTimeout(() => callback(), delay);
}
const addEventListenerSearch = () => {
    const input_search_pokemon = document.querySelector('#input_search_pokemon');
    input_search_pokemon.addEventListener('keyup', (e) => {
        let value = e.target.value.trim().toLowerCase();
        if (value.length === 0) {
            getAllPokeomnes();
            return;
        }
        timeoutId = debounce(() => searchPokemon(value), 1000, timeoutId)
    });
}
const addEventListenerButtons = () => {
    const previous_btn = document.querySelector('#previous_btn');
    const next_btn = document.querySelector('#next_btn');
    previous_btn.addEventListener('click', () => {
        if (previousURL === null) return;
        previousURL = previousURL.replace('https://pokeapi.co/api/v2/pokemon', '');
        getAllPokeomnes(previousURL);
    });
    next_btn.addEventListener('click', () => {
        nextURL = nextURL.replace('https://pokeapi.co/api/v2/pokemon', '');
        getAllPokeomnes(nextURL);
    });
}
const addEventListenerBtnAtras = () => {
    const atras_btn = document.querySelector('#atras_btn');
    atras_btn.addEventListener('click', () => {
        const container_modal = document.querySelector('#container_modal');
        container_modal.style.visibility = 'hidden';
        document.querySelector('body').style.overflow = 'auto';
    })
}

const main = () => {
    addEventListenerSearch();
    addEventListenerButtons();
    addEventListenerBtnAtras()
    getAllPokeomnes();
}
main();