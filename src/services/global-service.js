import  { RoutingService } from './routing-service.js';

/**
 * Class is used to bootstrap the application and hold any global application state.
 */
export class Global {
    routingService = null;

    /**
     * Create Global
     * 
     * @param {HTMLElement} rootElement 
     */
    constructor(rootElement) {
        this.routingService = new RoutingService(this, rootElement);
    }

    /**
     * Start the application
     */
    startApplication() {
        console.log('in Global.startApplication');
        this.routingService.loadInitialPage();
        
        // init menu bar
        const menuBar = document.getElementById('menuBar');
        menuBar.global = this;
    }
}