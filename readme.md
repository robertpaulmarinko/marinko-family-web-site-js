# Marinko Family Website using only JS

UI for the Marinko Family website using only native JS/CSS/HTML and no (or as little) external libraries as possible

## Running on local machine

The website can be hosted locally using [http-server](https://www.npmjs.com/package/http-server)

To start run

```npm run dev```


## Deploying to AWS

Web site files are in a S3 bucket call www.marinkofamily.com.

Run the `./deploy.ps1` PowerShell file to upload files to the bucket

## AWS Hosting

The website is hosted using a CloudFront distribution.

In the CloudFront distribution, custom error responses are added for 400, 403 and 404 error codes.  The response redirects to /index.html and returns a 200 response.  That way if a url to a specific path is used, which will not exist in S3, CloudFront will redirect to the index.html page, which will handle rendering the correct content.

Not sure if 400 and 404 are really needed, this did not start working until the 403 code was added.


## Web Components Resources

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

Optionally, a page can have a "display" method that is called every time the route changes to that page, even if its already loaded

## Page life-cycle

- createPage function - Called the first time a page is viewed.  Created the page object.
- constructor - Called the first time a page is viewed.  The "global" object is passed into the constructor
- render function - Called the first time a page is viewed.  Used to output the HTML to the DOM
- display function (optional) - Called each time the page is made active. Can be used to refresh the data

## CSS Styling

https://bulma.io

Issues using a shared style sheet inside of web components

https://www.smashingmagazine.com/2016/12/styling-web-components-using-a-shared-style-sheet/

https://css-tricks.com/styling-a-web-component/

https://meowni.ca/posts/part-theme-explainer/

It seems that the best approach is to link the global stylesheet into the custom element.  Some articles mention that the elements will appear un-styled until the stylesheet is loaded.  But in testing, this doesn't seem to be an issue if the style sheet is also loaded in the main index.html file.  And it appears the browser is smart enough to not load the style sheet multiple times.



# AWS Setup

## S3 
Created a S3 bucket called www.marinkofamily.com.  Disabled all public access.

## SSL Certificate

Created a SSL certificate in us-east-1 for www.marinkofamily.com

Must be in us-east-1 to work with CloudFront

## CloudFront

Created a CloudFront distribution.

When creating the S3 origin in CloudFront, make sure to use the S3 name that includes the region, like `www.marinkofamily.com.s3.us-east-2.amazonaws.com`

Turn On the restrict bucket access option.

Set the CNAME to www.marinkofamily.com.  Must be done to allow the Route53 record to be created

## Route53

In Route53, create a DNS Alias (A) record for www.marinkofamily.com that points to the CloudFront distribution.

## mime type error

When trying to view the website, the browser was throwing errors like

```Loading module from “https://beta.marinkofamily.com/services/global-service.js” was blocked because of a disallowed MIME type (“text/plain”)```

IN S3, the mime is set to text/plain by default.  This needs to be changed to text/javascript to avoid this error.

The solution is to call the `aws s3 sync` command multiple times.  The first time uploaded all files except .js files.

The second call uploads the .js files and sets the correct mime type.

See the deploy.ps1 file
