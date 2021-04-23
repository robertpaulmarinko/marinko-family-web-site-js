import '../components/picture-card-component.js';

/**
 * Information for a single picture
 * @typedef PictureOfTheDayInfo
 * @type {object}
 * @property {string} key - the name of the picture file
 * @property {string} description - description of the picture
 */
/**
 * Response from the picture of the day API
 * @typedef PictureOfTheDayResponse
 * @type {object}
 * @property {string} dateCreated - the date and time the file was last updated
 * @property {PictureOfTheDayInfo[]} pictures - description of the picture
 */


export class PictureOfTheDayPage {
    /**
     * Reference to the global object set when class is created
     * @type {Global}
     */
    _global = null;

    /**
     * Used by the routing service to set the page title
     * @type {string}
     */
    title = "Pictures of the day";
    
    /**
     * Constructor
     * @param {Global} global 
     */
    constructor(global) {
        this._global = global;
    }

    /**
     * Called when page is first loaded to render the page
     * @param {HTMLElement} htmlElement 
     */
    render(htmlElement) {
        fetch(`${this._global.apiUrl()}/default/picturesOfTheDay/data`)
        .then(response => response.json())
        .then(
            /**
             * @param {PictureOfTheDayResponse} data 
             */
            data => this.renderPicturesOfTheDay(htmlElement, data)
        );
    }

    /**
     * Creates the HTML for displaying all of the pictures
     * @param {HTMLElement} htmlElement 
     * @param {PictureOfTheDayResponse} picturesOfTheDayResponse 
     */
    renderPicturesOfTheDay(htmlElement, picturesOfTheDayResponse) {
        const containerElement = document.createElement('div');
        containerElement.setAttribute('class', 'container');
        htmlElement.appendChild(containerElement);

        const titleElement = document.createElement('h1');
        titleElement.setAttribute('class', 'title is-4');
        titleElement.innerHTML = 'Pictures for Today';
        containerElement.appendChild(titleElement);

        const columnsElement = document.createElement('div');
        columnsElement.setAttribute('class', 'columns is-multiline');
        containerElement.appendChild(columnsElement);

        picturesOfTheDayResponse.pictures.forEach((pictureOfTheDay) => {
            const columnElement = document.createElement('div');
            columnElement.setAttribute('class', 'column is-half');
            columnsElement.appendChild(columnElement);

            const pictureCard = document.createElement('picture-card');
            pictureCard.setAttribute('image', `/images/${pictureOfTheDay.key}`);
            pictureCard.setAttribute('caption', pictureOfTheDay.description);
            columnElement.appendChild(pictureCard);
        });
    }
}

/**
 * Function called by routing service to create this page
 * @param {Global} global 
 * @returns PictureOfTheDayPage of the day page
 */
export function createPage(global) {
    return new PictureOfTheDayPage(global);
}