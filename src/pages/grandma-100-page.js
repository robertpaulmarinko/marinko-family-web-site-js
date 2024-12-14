import '../components/picture-thumbnail-component.js';

export class Grandma100Page {
    /**
     * Reference to the global object set when class is created
     * @type {Global}
     */
    _global = null;

    /**
     * Used by the routing service to set the page title
     * @type {string}
     */
    title = "Grandma 100th Birthday";
    
    /**
     * Used by the routing service to determine if login is required
     * @type {boolean}
     */
    anonymous = true;
    
    /**
     * All of the files in the grand100 folder to display
     */
    files = [
        '_DSC0001.JPG',
        '_DSC0002.JPG',
        '_DSC0003.JPG',
        '_DSC0004.JPG',
        '_DSC0005.JPG',
        '_DSC0006.JPG',
        '_DSC0007.JPG',
        '_DSC0008.JPG',
        '_DSC0009.JPG',
        '_DSC0010.JPG',
        '_DSC0011.JPG',
        '_DSC0012.JPG',
        '_DSC0013.JPG',
        '_DSC0014.JPG',
        '_DSC0015.JPG',
        '_DSC0016.JPG',
        '_DSC0017.JPG',
        '_DSC0018.JPG',
        '_DSC0019.JPG',
        '_DSC0020.JPG',
        '_DSC0021.JPG',
        '_DSC0022.JPG',
        '_DSC0023.JPG',
        '_DSC0024.JPG',
        '_DSC0025.JPG',
        '_DSC0026.JPG',
        '_DSC0027.JPG',
        '_DSC0028.JPG',
        '_DSC0029.JPG',
        '_DSC0030.JPG',
        '_DSC0031.JPG',
        '_DSC0032.JPG',
        '_DSC0033.JPG',
        '_DSC0034.JPG',
        '_DSC0035.JPG',
        '_DSC0036.JPG',
        '_DSC0037.JPG',
        '_DSC0038.JPG',
        '_DSC0039.JPG',
        '_DSC0040.JPG',
        '_DSC0041.JPG',
        '_DSC0042.JPG',
        '_DSC0043.JPG',
        '_DSC0044.JPG',
        '_DSC0045.JPG',
        '_DSC0047.JPG',
        '_DSC0048.JPG',
        '_DSC0049.JPG',
        '_DSC0050.JPG',
        '_DSC0051.JPG',
        '_DSC0052.JPG',
        '_DSC0053.JPG',
        '_DSC0054.JPG',
        '_DSC0055.JPG',
        '_DSC0056.JPG',
        '_DSC0057.JPG',
        '_DSC0058.JPG',
        '_DSC0059.JPG',
        '_DSC0060.JPG',
        '_DSC0061.JPG',
        '_DSC0062.JPG',
        '_DSC0063.JPG',
        '_DSC0064.JPG',
        '_DSC0065.JPG',
        '_DSC0066.JPG',
        '_DSC0067.JPG',
        '_DSC0068.JPG',
        '_DSC0069.JPG',
        '_DSC0070.JPG',
        '_DSC0071.JPG',
        '_DSC0072.JPG',
        '_DSC0073.JPG',
        '_DSC0074.JPG',
        '_DSC0075.JPG',
        '_DSC0076.JPG',
        '_DSC0077.JPG',
        '_DSC0078.JPG',
        '_DSC0079.JPG',
        '_DSC0080.JPG',
        '_DSC0081.JPG',
        '_DSC0082.JPG',
        '_DSC0083.JPG',
        '_DSC0084.JPG',
        '_DSC0085.JPG',
        '_DSC0086.JPG',
        '_DSC0087.JPG',
        '_DSC0088.JPG',
        '_DSC0089.JPG',
        '_DSC0090.JPG',
        '_DSC0091.JPG',
        '_DSC0092.JPG',
        '_DSC0093.JPG',
        '_DSC0094.JPG',
        '_DSC0095.JPG',
        '_DSC0096.JPG',
        '_DSC0097.JPG',
        '_DSC0098.JPG',
        '_DSC0099.JPG',
        '_DSC0100.JPG',
        '_DSC0101.JPG',
        '_DSC0102.JPG',
        '_DSC0103.JPG',
        '_DSC0104.JPG',
        '_DSC0105.JPG',
        '_DSC0106.JPG',
        '_DSC0107.JPG',
        '_DSC0108.JPG',
        '_DSC0109.JPG',
        '_DSC0110.JPG',
        '_DSC0111.JPG',
        '_DSC0112.JPG',
        '_DSC0113.JPG',
        '_DSC0114.JPG',
        '_DSC0115.JPG',
        '_DSC0116.JPG',
        '_DSC0117.JPG',
        '_DSC0118.JPG',
        '_DSC0119.JPG',
        '_DSC0120.JPG',
        '_DSC0121.JPG',
        '_DSC0122.JPG',
        '_DSC0123.JPG',
        '_DSC0124.JPG',
        '_DSC0125.JPG',
        '_DSC0126.JPG',
        '_DSC0127.JPG',
        '_DSC0128.JPG',
        '_DSC0129.JPG',
        '_DSC0130.JPG',
        '_DSC0131.JPG',
        '_DSC0133.JPG',
        '_DSC0134.JPG',
        '_DSC0135.JPG',
        '_DSC0136.JPG',
        '_DSC0137.JPG',
        '_DSC0138.JPG',
        '_DSC0139.JPG',
        '_DSC0140.JPG',
        '_DSC0141.JPG',
        '_DSC0142.JPG',
        '_DSC0143.JPG',
        '_DSC0144.JPG',
        '_DSC0145.JPG',
        '_DSC0146.JPG',
        '_DSC0147.JPG',
        '_DSC0148.JPG',
        '_DSC0149.JPG',
        '_DSC0150.JPG',
    ];

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

        this.renderPicturesOfTheDay(pictureContainerElement);
    }


    /**
     * Creates the HTML for displaying all of the pictures
     * @param {HTMLElement} htmlElement 
     */
    renderPicturesOfTheDay(containerElement) {
        const titleElement = document.createElement('h1');
        titleElement.setAttribute('class', 'title is-4');
        titleElement.innerHTML = 'Grandma 100th Birthday';
        containerElement.appendChild(titleElement);

        const columnsElement = document.createElement('div');
        columnsElement.setAttribute('class', 'columns is-multiline');
        containerElement.appendChild(columnsElement);

        this.files.forEach((file) => {
            const columnElement = document.createElement('div');
            columnElement.setAttribute('class', 'column is-one-quarter');
            columnsElement.appendChild(columnElement);

            const pictureThumbnail = document.createElement('picture-thumbnail');
            pictureThumbnail.setAttribute('thumbnail', `/images/grandma100/thumbnails/${file}`);
            pictureThumbnail.setAttribute('fullSize', `/images/grandma100/${file}`);
            pictureThumbnail.setAttribute('caption', file);
            columnElement.appendChild(pictureThumbnail);
        });
    }
}

/**
 * Function called by routing service to create this page
 * @param {Global} global 
 * @returns Grandma100Page of the day page
 */
export function createPage(global) {
    return new Grandma100Page(global);
}