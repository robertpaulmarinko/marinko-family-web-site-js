const template = document.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="/styles/bulma.min.css">
<nav class="navbar is-info" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <a class="navbar-item" href="/picture-of-the-day">
            <img src="/images/nav-page-icon.png">
        </a>
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
    </div>
    <div class="navbar-menu">
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
            this.hideNavbarMenu();
            this.global.routingService.loadPage("picture-of-the-day", true);
        };
        this.shadowRoot.getElementById('recipes').onclick = (event) => {
            event.preventDefault();
            this.hideNavbarMenu();
            this.global.routingService.loadPage("recipes", true);
        };

        const navbarBurger = this.shadowRoot.querySelector('.navbar-burger');
        navbarBurger.onclick = (event) => {
            event.preventDefault();
            navbarBurger.classList.toggle('is-active');
            this.shadowRoot.querySelector('.navbar-menu').classList.toggle('is-active');
        };
    }

    hideNavbarMenu() {
        this.shadowRoot.querySelector('.navbar-burger').classList.remove('is-active');
        this.shadowRoot.querySelector('.navbar-menu').classList.remove('is-active');
    }
}

customElements.define('menu-bar', MenuBarComponent);
