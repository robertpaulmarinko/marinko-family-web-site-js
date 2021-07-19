export class RecipePage {
    /** @type {Global} */
    _global = null;

    title = "Recipe";
    
    constructor(global) {
        this._global = global;
    }

    render(htmlElement) {
        this.renderPageContent(htmlElement);
    }

    display() {
        const searchParams = new URLSearchParams(location.search);
        if (searchParams.has('id')) {
            const recipe = this._global.recipeService.getRecipeById(searchParams.get('id'));
            if (recipe) {
                // TODO - load data into HTML
            } else {
                // id, not found
                this.goToRecipeListPage();
            }
        } else {
            // an id must be passed, go back to recipe list page
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
        <h1 class="title is-4">Recipe</h1>
        `;
        // TODO - add form field
        const shadow = htmlElement.attachShadow({ mode: 'open' });
        shadow.appendChild(template.content.cloneNode(true));
    }

    goToRecipeListPage() {
        this._global.routingService.loadPage('recipes', true);
    }
}

export function createPage(global) {
    return new RecipePage(global);
}