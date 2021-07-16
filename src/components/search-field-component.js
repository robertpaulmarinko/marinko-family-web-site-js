const template = document.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="/styles/bulma.min.css">
<div class="field">
  <label class="label">Search</label>
  <div class="control">
    <input id="search" class="input" type="text" placeholder="recipe name">
  </div>
</div>
`;

class SearchFieldComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        const searchTextBox = this.shadowRoot.getElementById('search');
        searchTextBox.onkeyup = (event) => {
            // https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events
            // note that "detail" is a key word
            const searchEvent = new CustomEvent('search', { detail: searchTextBox.value });
            this.dispatchEvent(searchEvent);
        };
    }

}

customElements.define('search-field', SearchFieldComponent);
