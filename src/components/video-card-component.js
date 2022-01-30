const template = document.createElement('template');
template.innerHTML = /*html*/`
<link rel="stylesheet" href="/styles/bulma.min.css">
<article class="panel is-info">
  <p class="panel-heading"></p>
  <div class="panel-block">
    <video controls class="card-img-top">
        <source />
        No Support
    </video>
  </div>
</article>
`;

class VideoCardComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.shadowRoot.querySelector('source').setAttribute('src',this.getAttribute('video'));
        this.shadowRoot.querySelector('.panel-heading').innerHTML = this.getAttribute('caption');
    }

}

customElements.define('video-card', VideoCardComponent);
