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
        this._recipes = response.recipes;
        
        return this._recipes;
    }
}