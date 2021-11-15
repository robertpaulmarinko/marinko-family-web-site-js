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
    _fileUpload = null;
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
                this.loadRecipeFields(this._recipe);
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
            this.loadRecipeFields(this._recipe);
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
            <file-upload id="fileUpload" label="Picture"></file-upload>
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
        this._fileUpload = shadow.getElementById('fileUpload');
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
    loadRecipeFields(recipe) {
        this._nameField.value = recipe.name;
        this._sourceField.value = recipe.source;
        this._instructionsField.value = recipe.instructions;
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

    async uploadFiles() {
        const file = this._fileUpload.file;
        if (file) {
            this._recipe.imageStorageKey = await this._global.recipeService.uploadFile(file);
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
    }
}

export function createPage(global) {
    return new RecipePage(global);
}