const template = document.createElement('template');
template.innerHTML = `
    <style>
    </style>
    <a href='#' id='pictureOfDay'>Home</a>
    <a href='#' id='recipes'>Recipes</a>
  `;

class MenuBarComponent extends HTMLElement {
    /** 
     * Reference to Global class, injected when application loads
     * 
     * @type {GlobalClass} 
     */
    global = null;

    constructor() {
        super();
        this.count = 0;
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.getElementById('pictureOfDay').onclick = (event) => {
            event.preventDefault();
            this.global.routingService.loadPage("picture-of-the-day", true);
        };
        this.shadowRoot.getElementById('recipes').onclick = (event) => {
            event.preventDefault();
            this.global.routingService.loadPage("recipes", true);
        };
    }
}

customElements.define('menu-bar', MenuBarComponent);
