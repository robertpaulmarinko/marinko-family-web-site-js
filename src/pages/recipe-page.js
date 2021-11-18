import '../components/input-field-component.js';
import '../components/file-upload-component.js';

export class RecipePage {
    /** @type {Global} */
    _global = null;

    title = "Recipe";
    
    /**
     * Reference to HTML elements on the form
     */
    _nameField = null;
    _sourceField = null;
    _instructionsField = null;

    // Array of fileUpload components
    _fileUpload = [];

    // Array of image fields
    _imageField = [];

    _maxImages = 3;

    _saveProgress = null;
    _saveConfirmation = null;


    /**
     * The current loaded recipe
     * @type {Recipe}
     */
    _recipe = null;

    constructor(global) {
        this._global = global;
    }

    render(htmlElement) {
        this.renderPageContent(htmlElement);
    }

    async display() {
        console.log(`in recipe-page display(), location = ${location.pathname}`);
        const searchParams = new URLSearchParams(location.search);
        if (searchParams.has('id')) {
            this._recipe = await this._global.recipeService.getRecipeById(searchParams.get('id'));
            if (this._recipe) {
                console.log(`loaded recipe record ${this._recipe.id} - ${this._recipe.name}`);
                await this.loadRecipeFields(this._recipe);
            } else {
                // id, not found
                console.log(`id of "${searchParams.get('id')}" not found in recipe list"`);
                this.goToRecipeListPage();
            }
        } else {
            // starting a new recipe
            console.log(`no 'id' parameter specified, starting a new recipe`);
            this._recipe = {
                id: '',
                name: '',
                source: '',
                instructions: '',
                imageStorageKey: null,
            };
            await this.loadRecipeFields(this._recipe);
        }

        // Reset all UI elements
        this._saveConfirmation.classList.add('is-hidden');
        this._saveProgress.classList.add('is-hidden');
    }

    /**
     * Renders the main page content.  Should only be called once.
     * @param {HTMLElement} htmlElement 
     */
    renderPageContent(htmlElement) {
        const template = document.createElement('template');
        template.innerHTML = `
        <link rel="stylesheet" href="/styles/bulma.min.css">
        <div class="container">
            <h1 class="title is-4">Recipe</h1>
            <input-field id="name" label="Name"></input-field>
            <input-field id="source" label="Source"></input-field>
            <input-field id="instructions" label="Instructions" type="textarea"></input-field>

            <file-upload id="fileUpload1" label="Picture 1"></file-upload>
            <img id="image1" class="is-hidden mt-2"></img>
            <button id="removePicture1" class="button is-warning is-hidden">Remove Picture 1</button>

            <file-upload id="fileUpload2" label="Picture 2"></file-upload>
            <img id="image2" class="is-hidden mt-2"></img>
            <button id="removePicture2" class="button is-warning is-hidden">Remove Picture 2</button>

            <file-upload id="fileUpload3" label="Picture 3"></file-upload>
            <img id="image3" class="is-hidden mt-2"></img>
            <button id="removePicture3" class="button is-warning is-hidden">Remove Picture 3</button>

            <div class="mt-2">
                <button id="saveButton" class="button is-success">Save</button>
                <button id="backButton" class="button is-info">Back</button>
            </div>
            <div class="mt-2">
                <progress id="saveProgress" class="progress is-primary is-hidden" max="100">15%</progress>
            </div>
            <article class="message is-success mt-2 is-hidden" id="saveConfirmation">
                <div class="message-body">
                    Recipe has been saved
                </div>
            </article>            
        </div>
        `;

        const shadow = htmlElement.attachShadow({ mode: 'open' });
        shadow.appendChild(template.content.cloneNode(true));

        this._nameField = shadow.getElementById('name');
        this._sourceField = shadow.getElementById('source');
        this._instructionsField = shadow.getElementById('instructions');

        for(let x = 1; x <= this._maxImages; x++) {
            this._fileUpload.push(shadow.getElementById(`fileUpload${x}`));
            this._imageField.push(shadow.getElementById(`image${x}`));
            shadow.getElementById(`removePicture${x}`).onclick = () => {
                this._recipe[this.getImageStorageKeyFieldName(x)] = null;
                this.displayPicture(x - 1, null);
            }
        }

        this._saveProgress = shadow.getElementById('saveProgress');
        this._saveConfirmation = shadow.getElementById('saveConfirmation');

        shadow.getElementById('saveButton').onclick = () => { this.saveRecipe(); };
        shadow.getElementById('backButton').onclick = () => { this._global.routingService.loadPage(`recipes`, true); };
    }

    goToRecipeListPage() {
        this._global.routingService.loadPage('recipes', true);
    }

    /**
     * Loads recipe data into the HTML input fields
     * @param {Recipe} recipe 
     */
    async loadRecipeFields(recipe) {
        this._nameField.value = recipe.name;
        this._sourceField.value = recipe.source;
        this._instructionsField.value = recipe.instructions;
        await this.displayPictures(recipe);
    }

    /**
     * Displays all of the pictures
     * @param {Recipe} recipe 
     */
    async displayPictures(recipe) {
        const promises = [];
        for (let x = 1; x <= this._maxImages; x++) {
            promises.push(this.displayPicture(x - 1, recipe[this.getImageStorageKeyFieldName(x)]));
        }
        await Promise.all(promises);
    }

    /**
     * Displays the picture if there is one loaded
     * @param {Number} index - the index of the picture to show
     * @param {String} imageStorageKey - unique ID of the picture
     */
    async displayPicture(index, imageStorageKey) {
        const imageField = this._imageField[index];
        imageField.classList.add("is-hidden");
        if (imageStorageKey) {
            imageField.src = await this._global.recipeService.getDownloadUrl(imageStorageKey);
            imageField.classList.remove("is-hidden");
        } else {
            imageField.src = '';
        }
    }

    /**
     * Updates the _recipe object with the user entered values
     * in the HTML fields.
     */
    updateRecipeObjectWithFieldValues() {
        this._recipe.name = this._nameField.value;
        this._recipe.source = this._sourceField.value;
        this._recipe.instructions = this._instructionsField.value;
    }

    /**
     * If a file has been selected, uploads the file to the server
     */
    async uploadFiles() {
        for(let x = 1; x <= this._maxImages; x++) {
            const file = this._fileUpload[x - 1].file;
            if (file) {
                let fileStorageKey = await this._global.recipeService.uploadFile(file);
                this._recipe[this.getImageStorageKeyFieldName(x)] = fileStorageKey;
            }
        }
    }

    /**
     * Returns the field name of an imageStorageKey field
     * @param {Number} index 
     * @returns Name of field
     */
    getImageStorageKeyFieldName(index) {
        if (index === 1) {
            return 'imageStorageKey';
        } else {
            return `imageStorageKey${index}`;
        }
    }

    /**
     * Save the recipe changes by calling the API
     */
    async saveRecipe() {
        this._saveProgress.classList.remove('is-hidden');
        this._saveConfirmation.classList.add('is-hidden');
        await this.uploadFiles();
        this.updateRecipeObjectWithFieldValues();
        const recipeId = await this._global.recipeService.saveRecipe(this._recipe);
        if (this._recipe.id !== recipeId) {
            // Created a new recipe, so save id and update URL
            this._recipe.id = recipeId;
            history.replaceState({}, '', `/recipe?id=${recipeId}`);
        }
        this._saveProgress.classList.add('is-hidden');
        this._saveConfirmation.classList.remove('is-hidden');
        await this.resetPictures();
    }

    /**
     * Clears any uploaded pictures and reloads the picture controls
     */
    async resetPictures() {
        for(let x = 0; x < this._maxImages; x++) {
            this._fileUpload[x].clearUpload();
            await this.displayPictures(this._recipe);
        }
    }
}

export function createPage(global) {
    return new RecipePage(global);
}