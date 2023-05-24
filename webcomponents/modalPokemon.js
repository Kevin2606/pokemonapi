import { getPokemonFetch } from '../utils/utils.js';
class ModalPokemon {
    constructor() {
        this._id = null;
        this._res = undefined;
    }
    setId(id) {
        this._id = id;
        this.getPokemon();
    }
    getId() {
        return this._id;
    }
    setRes(res) {
        this._res = res;
        this.template();
    }
    getRes() {
        return this._res;
    }
    async getPokemon() {
       const res = await getPokemonFetch(this.getId())
       this.setRes(res)
    }
    typesTemplate(){
        const {types} = this.getRes();
        let typesTemplate = '';
        types.forEach(type => {
            typesTemplate += `<p><strong>${type.type.name}</strong></p>`
        });
        return typesTemplate;
    }
    statsTemplate(){
        const statsInSpanish = {
            'hp': 'Vida',
            'attack': 'Ataque',
            'defense': 'Defensa',
            'special-attack': 'Ataque Especial',
            'special-defense': 'Defensa Especial',
            'speed': 'Velocidad'
        }
        const {stats} = this.getRes();
        let statsTemplate = '';
        stats.forEach(stat => {
            statsTemplate += `
                <div class="row">
                    <label><span><strong>${statsInSpanish[stat.stat.name]}</strong></span> <strong><span>${stat.base_stat}</span></strong></label>
                    <meter  min="0" low="45" high="80" optimum="100" max="150" value="${stat.base_stat}">${stat.base_stat}/150</meter>
                </div>
            `
        });
        return statsTemplate;
    }
    template(){
        const {name, sprites} = this.getRes();
        document.querySelector('#name_pokemon').innerText = name;
        document.querySelector('#img_pokemon_modal').src = sprites.other['official-artwork'].front_default;
        document.querySelector('#container_types').innerHTML = '';
        document.querySelector('#container_types').innerHTML = this.typesTemplate();
        document.querySelector('#container_stats').innerHTML = '';
        document.querySelector('#container_stats').innerHTML = this.statsTemplate();
    }

}
const modalPokemon = new ModalPokemon();
export { modalPokemon }