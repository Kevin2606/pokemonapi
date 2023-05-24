import { modalPokemon } from './modalPokemon.js';
export default class CardPokemon extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    static get observedAttributes() {
        return ['name', 'url', 'numberId'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
    }
    handleEvent(event) {
        if (event.type === "click") this.showDetail();
    }
    showDetail() {
        if (this.numberId === 9999) return;
        const container_modal = document.querySelector('#container_modal');
        container_modal.style.visibility = 'visible';
        document.querySelector('body').style.overflow = 'hidden';
        localStorage.clear();
        modalPokemon.setId(this.numberId);
    }
    getTemplate() {
        const template = document.createElement('template');
        template.innerHTML = `
        ${this.getStyles()}
        <div class="card_poke">
            <div class="card">
                <svg viewBox="0 0 204.54 207.46" class="pokeball"><path d="M9.57,128.66l60.57,0s.42,1.17,1.49,3.35c10.51,22.12,34.09,31.79,56.93,22.92,12.07-4.69,20.49-13.53,24.76-26.27h60.6c-3.66,40.18-40.45,85.21-95.06,88.75C60.8,221.14,15.86,177.72,9.57,128.66Z" transform="translate(-9.57 -10.14)"></path> <path d="M214.11,99.09H153.33a15.33,15.33,0,0,0-1.28-3.46c-8-16.74-21.42-25.84-39.89-25.95C93.44,69.56,80,78.77,71.65,95.58c-.77,1.53-1.51,3.51-1.51,3.51H9.79c5.15-45.56,47-89.37,102.94-88.95S209.31,54.53,214.11,99.09Z" transform="translate(-9.57 -10.14)"></path> <path d="M111.72,134.54a20.39,20.39,0,1,1,20.53-19.9A20.5,20.5,0,0,1,111.72,134.54Z" transform="translate(-9.57 -10.14)"></path></svg>
                <img src="${this.url}" alt="${this.name}" draggable="false">
                <h2>${this.name}</h2>
            </div>
        </div>
        `;
        return template;
    }
    getStyles() {
        return `
        <style>
            .card_poke{
                padding: 5px;
                background-color: rgba(255,255,255,.35);
                border-radius: .5rem;

            }
            .card_poke:hover{
                background: rgb(244,240,139);
                background: linear-gradient(180deg, rgba(244,240,139,0.7) 0%, rgba(255,224,0,0.75) 50%, rgba(244,250,14,0.8) 100%);
                cursor: pointer;
            }
            .card {
                border: 3px solid #eee;
                border-radius: .5rem;
                padding: 2rem 1rem;
                text-align: center;
                width: 8rem;

            }
            .card img {
                height: 8rem;
                width: 100%;
            }
            .card h2 {
                font-size: 1.5rem;
                margin: 0;
                text-transform: capitalize;
                font-weight: 300;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .pokeball{
                position: absolute;
                fill: white;
                opacity: 0.2;
                transition: all 0.5s ease;
                width: 8rem
            }
        </style>
        `;
    }
    render() {
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    }
    connectedCallback() {
        this.render();
        this.eventClick = this.shadowRoot.querySelector('.card_poke');
        this.eventClick.addEventListener('click', this);
    }
    disconnectedCallback() {
        this.eventClick.removeEventListener("click", this);
    }
}
customElements.define('card-pokemon', CardPokemon);