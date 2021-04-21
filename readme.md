# Marinko Family Website using only JS

UI for the Marinko Family website using only native JS/CSS/HTML and no (or as little) external libraries as possible

## Running on local machine

The website can be hosted locally using [http-server](https://www.npmjs.com/package/http-server)

To start run

```npm run dev```

## Web Components

[Mozilla Web Component Documentation](https://developer.mozilla.org/en-US/docs/Web/Web_Components)

[Mozilla Web Component Examples](https://github.com/mdn/web-components-examples)

[Web Component Org Documentation](https://www.webcomponents.org/introduction)

[Google Web Component Docs](https://developers.google.com/web/fundamentals/web-components/customelements)

[Component Example](https://webcomponents.dev/edit/tgikBxxcjvhia7ZjRvxG/src/index.js)

[Web Component Tutorial](https://www.thinktecture.com/en/web-components/native-web-components-without-framework/)

[Make component in one HTML file](https://ckeditor.com/blog/implementing-single-file-web-components/)

Note the some sources say putting a component into a HTML file is not a good idea

## HTML in JS

I don't like having HTML imbedded in JS scripts, because then there is no color coding/syntax help from the editor.
It does not look like VS Code recognize HTML that is imbedded in JS.

## Handling URL changes and displaying pages

https://gomakethings.com/how-to-detect-when-the-browser-url-changes-with-vanilla-js/

https://gomakethings.com/how-to-update-the-browser-url-without-refreshing-the-page-using-the-vanilla-js-history-api/

The routing-service.js file handles route management.  Pages are kept in memory unless explicitly closed.  This allows the state of the page to be maintained if the user returns to the page.

Browser location history changes are tracked, so that loaded pages can be displayed.

My convention all pages are in the "/pages" folder.  If the URL is set to "/my-content", the routing-service will try to load the file "/pages/my-content-page.js"

Each page file must export a function that creates the page, like this:

```
export function createPage(global) {
    return new RecipesPage(global);
}
```

Each Page class must have a public "render" method like this

```
    render(htmlElement) {
        const newContent = document.createTextNode("Recipes page");

        // add the text node to the newly created div
        htmlElement.appendChild(newContent);
    }
```

## CSS Styling

https://bulma.io

Issues using a shared style sheet inside of web components

https://www.smashingmagazine.com/2016/12/styling-web-components-using-a-shared-style-sheet/

https://css-tricks.com/styling-a-web-component/

https://meowni.ca/posts/part-theme-explainer/

It seems that the best approach is to link the global stylesheet into the custom element.  Some articles mention that the elements will appear un-styled until the stylesheet is loaded.  But in testing, this doesn't seem to be an issue if the style sheet is also loaded in the main index.html file.  And it appears the browser is smart enough to not load the style sheet multiple times.