/**
 * Class is used to control what page is displayed and routing
 * to different pages.
 */
export class RoutingService {
    /** 
     * Reference to Global class, injected into any new pages
     * 
     * @type {GlobalClass} 
     */
    _global = null;

    /**
     * HTML element to render the pages into
     * 
     * @type {HTMLElement}
     */
    _rootHTMLElement = null;

    /**
     * @typedef PageInfo
     * @type {object}
     * @property {HTMLElement} pageContainer - reference to HTML element that contains the page
     * @property {Object} page - reference to a page object
     * @property {string} url - url shown in the browser
     */

    /**
     * A list of open pages, with the current page being the
     * last item in the array. 
     * @type {PageInfo[]} 
     */
    _pageStack = [];

    /**
     * Constructor
     * 
     * @param {GlobalClass} global 
     * @param {HTMLElement} rootHTMLElement 
     */
    constructor(global, rootHTMLElement) {
        this._global = global;
        this._rootHTMLElement = rootHTMLElement;

        window.addEventListener('popstate', (event) => {
            console.log(`in popstate, loading ${event.state.url}`);
            this.loadPage(event.state.url, false);
        });
    }

    /**
     * Handle showing the initial page when the application first loads
     */
    async loadInitialPage() {
        console.log('in routingService.loadInitialPage');

        await this.loadPage(document.location.pathname, false);
    }

    async loadPage(url, addToHistory) {
        let urlToLoad = url;
        if (url === '' || url === '/') {
            // Default page
            urlToLoad = 'picture-of-the-day'
        }
        if (urlToLoad[0] === '/') {
            urlToLoad = urlToLoad.substring(1);
        }

        let urlSearch = '';
        const urlSearchCharIndex = urlToLoad.indexOf('?');
        if (urlSearchCharIndex >= 0) {
            urlSearch = urlToLoad.substring(urlSearchCharIndex);
            urlToLoad = urlToLoad.substring(0, urlSearchCharIndex);
        }

        console.log(`in RoutingService.loadPage, loading URL ${urlToLoad}`);
        /** @type {PageInfo} */
        let pageInfo = this._pageStack.find(x => x.url === urlToLoad);

        if (pageInfo) {
            // Page already loaded in memory, so show it
            console.log(`${urlToLoad} already loaded, so showing it`)
            this.showExistingPage(urlToLoad);
        } else {
            console.log(`creating ${urlToLoad}`)
            this.hideAllPages();
            const page = await this.createPageClassForURL(urlToLoad);

            if (!page.anonymous && !this._global.authService.isLoggedIn()) {
                // User is not logged in and page required login
                // Redirect to the login page
                await this.loadPage(`/login?redirect=${encodeURIComponent(urlToLoad)}`, true);
                return;
            }

            const pageContainer = document.createElement('div');
            this._rootHTMLElement.appendChild(pageContainer);

            pageInfo = {
                pageContainer: pageContainer,
                page: page,
                url: urlToLoad,
            };
            this._pageStack.push(pageInfo);

            page.render(pageContainer);
        }

        if (addToHistory) {
            history.pushState(
                { url: urlToLoad }, 
                `Marinko Family - ${pageInfo.page.title}`, 
                `${urlToLoad}${urlSearch}`);
        }

        // Note that calling display must be done after doing "pushState", in
        // case the page needs to inspect any URL parameter.
        if (pageInfo.page.display) {
            pageInfo.page.display();
        }
    }

    /**
     * Makes the page with the specified url visible and hides
     * all other pages
     * @param {*} url - url of page to show
     */
    showExistingPage(url) {
        this._pageStack.forEach(page => {
            if (page.url === url) {
                page.pageContainer.style.display = 'block';
            } else {
                page.pageContainer.style.display = 'none';
            }
        });
    }

    hideAllPages() {
        this._pageStack.forEach(page => {
             page.pageContainer.style.display = 'none';
        });
    }

    async createPageClassForURL(url) {
        let pageModuleFile = '';
        const urlParts = url.split('/')
        pageModuleFile = urlParts[0];

        let pageModule = await import(`../pages/${pageModuleFile}-page.js`);
        return pageModule.createPage(this._global);
    }
}