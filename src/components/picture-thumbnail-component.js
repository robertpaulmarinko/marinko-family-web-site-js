const template = document.createElement('template');
template.innerHTML = /*html*/`
<link rel="stylesheet" href="/styles/bulma.min.css">
<div class="card">
    <div class="card-image">
    <a title='Download full size picture' download>
        <figure class="image">
            <img alt="Image" />
        </figure>
    </a>
  </div>
</div>
`;

class PictureThumbnailComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.shadowRoot.querySelector('img').setAttribute('src',this.getAttribute('thumbnail'));
        this.shadowRoot.querySelector('a').setAttribute('href',this.getAttribute('fullSize'));
    }

}

customElements.define('picture-thumbnail', PictureThumbnailComponent);
