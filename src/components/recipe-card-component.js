const template = document.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="/styles/bulma.min.css">
<div class="card">
  <div class="card-content">
    <p class="title"></p>
    <p class="content"></p>
  </div>
  <footer class="card-footer">
    <a href="#" class="card-footer-item">View</a>
    <a href="#" class="card-footer-item">Edit</a>
  </footer>
</div>
`;

class RecipeCardComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.shadowRoot.querySelector('.title').innerHTML = this.getAttribute('name');
        this.shadowRoot.querySelector('.content').innerHTML = this.getAttribute('source');
    }

}

customElements.define('recipe-card', RecipeCardComponent);
