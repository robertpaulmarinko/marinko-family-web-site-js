const template = document.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="/styles/bulma.min.css">
<a id="edit" class="panel-block is-flex-direction-row is-flex-wrap-wrap">
    <div id="name" class="is-size-4 is-flex-grow-1 style="min-width: 300px"></div>
    <div id="source" class="is-flex-grow-1 is-align-content-end pb-3" style="min-width: 300px;border-bottom: solid 1px gray;"></div>
</a>
`;

class RecipePanelBlockComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.shadowRoot.getElementById('name').innerHTML = this.getAttribute('name');
        this.shadowRoot.getElementById('source').innerHTML = this.getAttribute('source');

        this.shadowRoot.getElementById('edit').onclick = (event) => {
          event.preventDefault();
          const searchEvent = new CustomEvent('edit');
          this.dispatchEvent(searchEvent);
      };

    }

}

customElements.define('recipe-panel-block', RecipePanelBlockComponent);
