import '../components/recipe-card-component.js';
import '../components/search-field-component.js';

export class RecipesPage {
    /** @type {Global} */
    _global = null;

    title = "Recipes";
    
    constructor(global) {
        this._global = global;
    }

    async render(htmlElement) {
        const recipes = await this._global.recipeService.getRecipes();

        const pageContainerElement = document.createElement('div');
        pageContainerElement.setAttribute('class', 'container');
        htmlElement.appendChild(pageContainerElement);

        this.renderRecipes(pageContainerElement, recipes);
    }

    /**
     * Creates the HTML for displaying all of the recipes
     * @param {HTMLElement} containerElement 
     * @param {Recipe[]} recipes 
     */
     renderRecipes(containerElement, recipes) {
        const titleElement = document.createElement('h1');
        titleElement.setAttribute('class', 'title is-4');
        titleElement.innerHTML = 'Recipes';
        containerElement.appendChild(titleElement);

        const searchField = document.createElement('search-field');
        containerElement.appendChild(searchField);
        searchField.addEventListener('search', (event) => {
            console.log(`search event - ${event.detail}`);
        });
        const columnsElement = document.createElement('div');
        columnsElement.setAttribute('class', 'columns is-multiline');
        containerElement.appendChild(columnsElement);

        recipes.forEach((recipe) => {
            const columnElement = document.createElement('div');
            columnElement.setAttribute('class', 'column is-half');
            columnsElement.appendChild(columnElement);

            const recipeCard = document.createElement('recipe-card');
            recipeCard.setAttribute('name', recipe.name);
            recipeCard.setAttribute('source', recipe.source);
            columnElement.appendChild(recipeCard);
        });
    }
}

export function createPage(global) {
    return new RecipesPage(global);
}