export class PictureOfTheDayPage {
    _global = null;

    title = "Pictures of the day";
    
    constructor(global) {
        this._global = global;
    }

    render(htmlElement) {
        const newContent = document.createTextNode("Pictures of the day");

        // add the text node to the newly created div
        htmlElement.appendChild(newContent);
    }
}

export function createPage(global) {
    return new PictureOfTheDayPage(global);
}