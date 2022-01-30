const template = document.createElement('template');
template.innerHTML = /*html*/`
<link rel="stylesheet" href="/styles/bulma.min.css">
<div class="field">
  <div class="control">
    <input id="search" class="input" type="text" placeholder="recipe name">
  </div>
</div>
`;

class SearchFieldComponent extends HTMLElement {
    _searchTextBox = null;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this._searchTextBox = this.shadowRoot.getElementById('search');
        this._searchTextBox.onkeyup = (event) => {
            // https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events
            // note that "detail" is a key word
            const searchEvent = new CustomEvent('search', { detail: this._searchTextBox.value });
            this.dispatchEvent(searchEvent);
        };
    }

    clear() {
      this._searchTextBox.value = '';
    }
}

customElements.define('search-field', SearchFieldComponent);
