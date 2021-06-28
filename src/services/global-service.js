import { RoutingService } from './routing-service.js';
import { AuthService} from './auth-service.js';
import { RecipeService } from './recipe-service.js';
/**
 * Class is used to bootstrap the application and hold any global application state.
 */
export class Global {
    /** @type {RoutingService} */
    routingService = null;
    /** @type {AuthService} */
    authService = null;
    /** @type {RecipeService} */
    recipeService = null;

    /**
     * Create Global
     * 
     * @param {HTMLElement} rootElement 
     */
    constructor(rootElement) {
        this.routingService = new RoutingService(this, rootElement);
        this.authService = new AuthService(this);
        this.recipeService = new RecipeService(this);
    }

    /**
     * Start the application
     */
    startApplication() {
        console.log('running Global.startApplication');
        this.routingService.loadInitialPage();
        
        // init menu bar
        const menuBar = document.getElementById('menuBar');
        menuBar.global = this;
    }

    /**
     * 
     * @returns the base URL of the api service
     */
    apiUrl() {
        return "https://p89uuc2375.execute-api.us-east-2.amazonaws.com";
    }
}