import '../components/recipe-card-component.js';
import '../components/search-field-component.js';

export class RecipesPage {
    /** @type {Global} */
    _global = null;

    title = "Recipes";
    
    /** 
     * HTML element that contains the list of recipes
     * @type {HTMLElement} 
     **/
    _recipeListHTMLElement = null;

    /**
     * Last search text entered by the user
     */
    _lastSearchText = '';

    constructor(global) {
        this._global = global;
    }

    async render(htmlElement) {
        this.renderPageContent(htmlElement);
    }

    async display() {
        await this.filterRecipes(this._lastSearchText);
    }

    /**
     * Renders the main page content.  Should only be called once/
     * @param {HTMLElement} htmlElement 
     */
    renderPageContent(htmlElement) {
        const template = document.createElement('template');
        template.innerHTML = `
        <div class="container">
            <link rel="stylesheet" href="/styles/bulma.min.css">
            <h1 class="title is-4">Recipes</h1>
            <div>
                <button id="addButton" class="button is-info">Add Recipe</button>
            </div>
            <search-field></search-field>
            <div id="recipeList" class="columns is-multiline mt-2"></div>
        </div>
        `;
        
        const shadow = htmlElement.attachShadow({ mode: 'open' });
        shadow.appendChild(template.content.cloneNode(true));

        shadow.querySelector("search-field").addEventListener('search', (event) => {
            this._lastSearchText = event.detail;
            this.filterRecipes(this._lastSearchText);
        });
        shadow.getElementById('addButton').onclick = () => { this._global.routingService.loadPage(`recipe`, true); };

        this._recipeListHTMLElement = shadow.querySelector("#recipeList");
    }

    /**
     * Creates the HTML for displaying all of the recipes
     * @param {Recipe[]} recipes 
     */
     renderRecipes(recipes) {
        const columnElements = [];
        recipes.forEach((recipe) => {
            const columnElement = document.createElement('div');
            columnElement.setAttribute('class', 'column is-half');
            columnElements.push(columnElement);

            const recipeCard = document.createElement('recipe-card');
            recipeCard.setAttribute('name', recipe.name);
            recipeCard.setAttribute('source', recipe.source);
            recipeCard.addEventListener('edit', () => {
                console.log(`Opening recipe page for id = ${recipe.id}`);
                this._global.routingService.loadPage(`recipe?id=${recipe.id}`, true);
            });
            columnElement.appendChild(recipeCard);
        });
        this._recipeListHTMLElement.replaceChildren(...columnElements);
    }

    /**
     * Filters the recipes based on the search string entered
     * @param {String} searchText 
     */
    async filterRecipes(searchText) {
        const searchTextLower = searchText.toLowerCase();
        const allRecipes = await this._global.recipeService.getRecipes();
        const filteredRecipes = allRecipes.filter((recipe) => {
            return recipe.name.toLowerCase().indexOf(searchTextLower) >= 0 ||
                   recipe.source.toLowerCase().indexOf(searchTextLower) >= 0;
        });
        this.renderRecipes(filteredRecipes);
    }
}

export function createPage(global) {
    return new RecipesPage(global);
}