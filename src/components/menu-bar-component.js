const template = document.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="/styles/bulma.min.css">
<nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <a class="navbar-item" href="/picture-of-the-day">
            <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
        </a>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
    </div>
    <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
            <a class="navbar-item" id="pictureOfDay">Home</a>
            <a class="navbar-item" id="recipes">Recipes</a>
        </div>
    </div>    
</nav>
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
