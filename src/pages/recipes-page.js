export class RecipesPage {
    _global = null;

    title = "Recipes";
    
    constructor(global) {
        this._global = global;
    }

    render(htmlElement) {
        const newContent = document.createTextNode("Recipes page");

        // add the text node to the newly created div
        htmlElement.appendChild(newContent);
    }
}

export function createPage(global) {
    return new RecipesPage(global);
}