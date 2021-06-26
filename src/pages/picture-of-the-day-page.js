import '../components/picture-card-component.js';
import '../components/video-card-component.js';

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

/**
 * Response from the video of the day API
 * @typedef VideoInfo
 * @type {object}
 * @property {string} originalKey - key to full size file
 * @property {string} streamKey - key to reduced file
 * @property {string} description - description
 */

/**
 * Response from the video of the day API
 * @typedef VideoOfTheDayResponse
 * @type {object}
 * @property {VideoInfo[]} videos - description of the videos
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
     * Used by the routing service to determine if login is required
     * @type {boolean}
     */
    anonymous = true;
    
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
        const pictureContainerElement = document.createElement('div');
        pictureContainerElement.setAttribute('class', 'container');
        htmlElement.appendChild(pictureContainerElement);

        const videoContainerElement = document.createElement('div');
        videoContainerElement.setAttribute('class', 'container');
        htmlElement.appendChild(videoContainerElement);

        this.loadPicturesOfTheDay(pictureContainerElement);
        this.loadVideoOfTheDay(videoContainerElement);
    }

    /**
     * Loads and displays pictures of the day
     * @param {HTMLElement} htmlElement 
     */
    loadPicturesOfTheDay(htmlElement) {
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
    renderPicturesOfTheDay(containerElement, picturesOfTheDayResponse) {
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
            pictureCard.setAttribute('image', `/images/${pictureOfTheDay.key}?v=${picturesOfTheDayResponse.dateCreated}`);
            pictureCard.setAttribute('caption', pictureOfTheDay.description);
            columnElement.appendChild(pictureCard);
        });
    }

    /**
     * Loads and displays the video of the day
     * @param {HTMLElement} htmlElement 
     */
     loadVideoOfTheDay(htmlElement) {
        fetch(`${this._global.apiUrl()}/default/videoOfTheDay/data`)
        .then(response => response.json())
        .then(
            /**
             * @param {VideoOfTheDayResponse} data 
             */
            data => this.renderVideoOfTheDay(htmlElement, data)
        );
    }

    /**
     * Creates the HTML for displaying the video
     * @param {HTMLElement} htmlElement 
     * @param {VideoOfTheDayResponse} videoOfTheDayResponse 
     */
    renderVideoOfTheDay(containerElement, videoOfTheDayResponse) {
        const titleElement = document.createElement('h1');
        titleElement.setAttribute('class', 'title is-4');
        titleElement.innerHTML = 'Video for Today';
        containerElement.appendChild(titleElement);

        videoOfTheDayResponse.videos.forEach((videoOfTheDay) => {
            const videoCard = document.createElement('video-card');
            videoCard.setAttribute('video', `https://d2ovun8sk9llvq.cloudfront.net/${videoOfTheDay.streamKey}`);
            videoCard.setAttribute('caption', videoOfTheDay.description);
            containerElement.appendChild(videoCard);
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