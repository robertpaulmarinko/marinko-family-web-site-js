/**
 * Request body for the /login API
 * @typedef Recipe
 * @type {object}
 * @property {string} id - unique ID for the recipe
 * @property {string} name - name of the recipe
 * @property {string} source - original source of the recipe
 * @property {string} instructions - additional info about the recipe
 * @property {string} imageStorageKey - unique ID of associated picture
 */

/**
 * Class for getting and updating recipe data.
 */
export class RecipeService {
    /** 
     * Reference to Global class
     * 
     * @type {GlobalClass} 
     */
    _global = null;

    /**
     * List of cached recipes loaded from the API
     * 
     * @type {Recipe[]}
     */
    _recipes = null;

    /**
     * Constructor
     * 
     * @param {GlobalClass} global 
     */
    constructor(global) {
        this._global = global;
    }

    /**
     * Get all recipes.  Will call the API if this is the first time
     * the function is being called.  Otherwise returns the
     * cached list of recipes.
     * 
     * @returns {Recipe[]}
     */
    async getRecipes() {
        if (this._recipes) {
            return this._recipes;    
        }

        const response = await fetch(`${this._global.apiUrl()}/default/recipes`, {
            method: 'GET',
            headers: this._global.authService.getAuthHeader(),
        })
        .then(response => response.json());
        this._recipes = this.sortRecipes(response.recipes);
        
        return this._recipes;
    }

    /**
     * Returns a s single recipe with the matching id
     * @param {String} id 
     * @returns {Recipe}
     */
    async getRecipeById(id) {
        const recipes = await this.getRecipes();
        return recipes.find((recipe) => recipe.id === id);
    }

    /**
     * Save or creates a recipe record.
     * 
     * @param {Recipe} recipe 
     * @returns {string} id of the record that was saved
     */
    async saveRecipe(recipe) {
        const response = await fetch(`${this._global.apiUrl()}/default/recipe`, {
            method: 'POST',
            body: JSON.stringify(recipe),
            headers: this._global.authService.getAuthHeader(),
        })
        .then(response => response.json());
        console.log(response);

        this._recipes = this.sortRecipes(response.recipes);
        return response.updateId;
    }

    /**
     * Uploads a file associated with a recipe
     * @param {*} file 
     */
    async uploadFile(file) {
        const uploadUrlResponse = await fetch(`${this._global.apiUrl()}/default/recipe/uploadurl`, {
            method: 'GET',
            headers: this._global.authService.getAuthHeader(),
        })
        .then(response => response.json());

        await fetch(uploadUrlResponse.url, {
            method: "PUT", 
            body: file,
            headers: this._global.authService.getAuthHeader('image/jpeg'),
        });

        return uploadUrlResponse.fileKey;
    }

    /**
     * Gets a URL to download a single image
     * @param {String} imageStorageKey 
     * @returns - URL for the picture
     */
    async getDownloadUrl(imageStorageKey) {
        const downloadUrlResponse = await fetch(`${this._global.apiUrl()}/default/recipe/downloadurl/${imageStorageKey}`, {
            method: 'GET',
            headers: this._global.authService.getAuthHeader(),
        })
        .then(response => response.json());

        return downloadUrlResponse.url;
    }

    /**
     * Sorts the recipes by name
     * @param {Recipe[]} recipes 
     * @returns {Recipe[]}
     */
    sortRecipes(recipes) {
        return recipes.sort((a, b) => {
            var aName = a.name.toLowerCase();
            var bName = b.name.toLowerCase();
            if (aName < bName) {
                return -1
            } else if (aName > bName) {
                return 1;
            } else {
                return 0;
            }
        });
    }
}