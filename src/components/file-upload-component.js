const template = document.createElement('template');
template.innerHTML = /*html*/`
<link rel="stylesheet" href="/styles/bulma.min.css">

<label class="label">Recipe</label>
<div class="file is-normal has-name">
  <label class="file-label">
    <input class="file-input" type="file">
    <span class="file-cta">
      <span class="file-label">Select File</span>
    </span>
    <span class="file-name is-hidden"></span>
    <button id="remove" class="button is-warning is-hidden">Remove</button>
  </label>
</div>
`;
/**
 * Used to create an file upload field with a label
 */
class FileUploadComponent extends HTMLElement {
    /**
     * Reference to the input element control
     * @type {HTMLElement}
     */
    _inputElement = null;

    /**
     * Reference to the element use to display the file name
     * @type {HTMLElement}
     */
    _fileNameElement = null;

    /**
     * Reference to the remove button
     * @type {HTMLElement}
     */
    _removeButton = null;

    /**
     * Contents of file uploaded by the user
     */
    _uploadedFile = null;


    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.shadowRoot.querySelector('.label').innerHTML = this.getAttribute('label') || 'Upload File';

        this._fileNameElement = this.shadowRoot.querySelector('.file-name'); 
        this._removeButton = this.shadowRoot.getElementById('remove');

        this._inputElement = this.shadowRoot.querySelector('input');
        this._inputElement.addEventListener('change', () => {
            const fr = new FileReader();
            fr.readAsArrayBuffer(this._inputElement.files[0]);
            fr.onload = () => {
                this._uploadedFile = fr.result;
                this._fileNameElement.innerHTML = this._inputElement.files[0].name;
                this._fileNameElement.classList.remove('is-hidden');
                this._removeButton.classList.remove('is-hidden');
            }
        });
       
        this._removeButton.onclick = () => {
            this.clearUpload();
        };
    }

    get file() {
        return this._uploadedFile;
    }

    clearUpload() {
        this._uploadedFile = null;
        this._fileNameElement.innerHTML = "";
        this._fileNameElement.classList.add('is-hidden');
        this._removeButton.classList.add('is-hidden');
    }
}

customElements.define('file-upload', FileUploadComponent);
