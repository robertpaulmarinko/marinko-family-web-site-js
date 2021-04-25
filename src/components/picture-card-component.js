const template = document.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="/styles/bulma.min.css">
<article class="panel is-info">
  <p class="panel-heading"></p>
  <div class="panel-block">
    <img alt="Image" />
  </div>
</article>
`;

class PictureCardComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.shadowRoot.querySelector('img').setAttribute('src',this.getAttribute('image'));
        this.shadowRoot.querySelector('.panel-heading').innerHTML = this.getAttribute('caption');
    }

}

customElements.define('picture-card', PictureCardComponent);
