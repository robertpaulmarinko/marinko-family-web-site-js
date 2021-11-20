import '../components/recipe-panel-block-component.js';
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

    /**
     * The search field component
     */
    _searchField = null;

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
        <link rel="stylesheet" href="/styles/bulma.min.css">
        <div class="container">
        <nav class="panel is-link">
            <p class="panel-heading is-flex is-flex-direction-row">
                <span class="is-flex-grow-1">Recipes</span>
                <button id="addButton" class="button is-success is-flex-grow-1 mr-2">Add Recipe</button>
                <button id="randomButton" class="button is-primary is-flex-grow-1">Random</button>
            </p>
            <div class="panel-block">
                <search-field></search-field>
                <button id="clearButton" class="button is-warning ml-2">Clear</button>
            </div>
            <div id="recipeList""></div>
        </nav>
        </div>
        `;
        
        const shadow = htmlElement.attachShadow({ mode: 'open' });
        shadow.appendChild(template.content.cloneNode(true));

        this._searchField = shadow.querySelector("search-field");
        this._searchField.addEventListener('search', (event) => {
            this._lastSearchText = event.detail;
            this.filterRecipes(this._lastSearchText);
        });
        shadow.getElementById('addButton').onclick = () => { this._global.routingService.loadPage(`recipe`, true); };
        shadow.getElementById('randomButton').onclick = () => { this.randomRecipes(); };
        shadow.getElementById('clearButton').onclick = () => { 
            this._searchField.clear(); 
            this.filterRecipes('');
        };

        this._recipeListHTMLElement = shadow.querySelector("#recipeList");
    }

    /**
     * Creates the HTML for displaying all of the recipes
     * @param {Recipe[]} recipes 
     */
     renderRecipes(recipes) {
        const panelBlockElements = [];
        recipes.forEach((recipe) => {
            const panelBlockElement = document.createElement('recipe-panel-block');
            panelBlockElement.setAttribute('name', recipe.name);
            panelBlockElement.setAttribute('source', recipe.source);
            panelBlockElement.addEventListener('edit', () => {
                console.log(`Opening recipe page for id = ${recipe.id}`);
                this._global.routingService.loadPage(`recipe?id=${recipe.id}`, true);
            });

            panelBlockElements.push(panelBlockElement);
        });
        this._recipeListHTMLElement.replaceChildren(...panelBlockElements);
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

    /**
     * Picks 5 Random Recipes
     */
     async randomRecipes() {
        const randomRecipes = [];
        const randomRecipeIndexes = [];

        const allRecipes = await this._global.recipeService.getRecipes();
        let randomIndex;
        while(randomRecipeIndexes.length < 5) {
            do {
                randomIndex = this.getRandomInt(0, allRecipes.length);
            } while(randomRecipeIndexes.includes(randomIndex));
            randomRecipeIndexes.push(randomIndex);
        }
        for( const index of randomRecipeIndexes) {
            randomRecipes.push(allRecipes[index]);
        }

        this.renderRecipes(this._global.recipeService.sortRecipes(randomRecipes));
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
      
}

export function createPage(global) {
    return new RecipesPage(global);
}