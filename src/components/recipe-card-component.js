const template = document.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="/styles/bulma.min.css">
<div class="card">
  <header class="card-header">
    <p class="card-header-title"></p>
  </header>
  <div class="card-content">
    <p class="content"></p>
  </div>
  <footer class="card-footer">
    <a href="#" class="card-footer-item">View</a>
    <a id="editButton" href="#" class="card-footer-item">Edit</a>
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

        this.shadowRoot.querySelector('.card-header-title').innerHTML = this.getAttribute('name');
        this.shadowRoot.querySelector('.content').innerHTML = this.getAttribute('source');

        this.shadowRoot.getElementById('editButton').onclick = (event) => {
          event.preventDefault();
          const searchEvent = new CustomEvent('edit');
          this.dispatchEvent(searchEvent);
      };

    }

}

customElements.define('recipe-card', RecipeCardComponent);
