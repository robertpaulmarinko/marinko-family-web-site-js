import '../components/input-field-component.js';

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
            const recipe = await this._global.recipeService.getRecipeById(searchParams.get('id'));
            if (recipe) {
                console.log(`loaded recipe record ${recipe.id} - ${recipe.name}`);
                this.loadRecipeFields(recipe);
            } else {
                // id, not found
                console.log(`id of "${searchParams.get('id')}" not found in recipe list"`);
                this.goToRecipeListPage();
            }
        } else {
            // an id must be passed, go back to recipe list page
            console.log(`no 'id' parameter specified, returning to recipes list page`);
            this.goToRecipeListPage();
        }
    }

    /**
     * Renders the main page content.  Should only be called once/
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
        </div>
        `;
        // TODO - add form field
        const shadow = htmlElement.attachShadow({ mode: 'open' });
        shadow.appendChild(template.content.cloneNode(true));

        this._nameField = shadow.getElementById('name');
        this._sourceField = shadow.getElementById('source');
        this._instructionsField = shadow.getElementById('instructions');
        
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
}

export function createPage(global) {
    return new RecipePage(global);
}