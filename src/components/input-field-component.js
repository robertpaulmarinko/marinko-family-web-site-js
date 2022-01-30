const template = document.createElement('template');
template.innerHTML = /*html*/`
<link rel="stylesheet" href="/styles/bulma.min.css">
<div class="field">
  <label class="label"></label>
  <div class="control"></div>
</div>
`;
/**
 * Used to create an "input" field with a label
 */
class InputFieldComponent extends HTMLElement {
    /**
     * Reference to the input element control
     * @type {HTMLElement}
     */
    _inputElement = null;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.shadowRoot.querySelector('.label').innerHTML = this.getAttribute('label') || '';

        const inputType = this.getAttribute('type') || 'text';
        if (inputType === "textarea") {
            this._inputElement = document.createElement('textarea');
            this._inputElement.setAttribute("class", "textarea");
        } else {
            this._inputElement = document.createElement('input');
            this._inputElement.setAttribute("class", "input");
            this._inputElement.setAttribute("type", inputType);
        }
        this.shadowRoot.querySelector('.control').appendChild(this._inputElement);
    }

    set value(newValue) {
        this._inputElement.value = newValue;
    }

    get value() {
        return this._inputElement.value;
    }
}

customElements.define('input-field', InputFieldComponent);
