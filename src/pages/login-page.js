const template = document.createElement('template');
template.innerHTML = /*html*/`
<div class="container">
    <div class="field">
        <label class="label">Password</label>
        <div class="control">
            <input class="input" type="password" placeholder="Password" autofocus="true" id="loginPassword">
        </div>
    </div>

    <div class="field is-grouped">
        <div class="control">
            <button class="button is-link" id="loginButton">Login</button>
        </div>
    </div>

    <div id="failMessage" class="notification is-warning is-hidden">
        Login failed, please try again
    </div>
</div>
`;

export class LoginPage {
    /** @type {GlobalService} */
    _global = null;

    title = "Login";
    anonymous = true;

    constructor(global) {
        this._global = global;
    }

    render(htmlElement) {
        htmlElement.appendChild(template.content.cloneNode(true));

        document.getElementById('loginButton').onclick = (event) => {
            event.preventDefault();
            this.tryLogin();
        };

    }

    async tryLogin() {
        const password = document.getElementById('loginPassword').value;
        const loginOK = await this._global.authService.tryLogin(password);
        if (loginOK) {
            console.log('Login is OK');

            // check if a redirect page was specified
            const searchParams = new URLSearchParams(location.search);
            if (searchParams.has('redirect')) {
                // go to the page specified in the URL
                this._global.routingService.loadPage(searchParams.get('redirect'), true);
            } else {
                // go to a default page
                this._global.routingService.loadPage('picture-of-the-day', true);
            }
        } else {
            console.log('Login is not OK');
            document.getElementById('failMessage').classList.remove('is-hidden');
        }
    }
}

export function createPage(global) {
    return new LoginPage(global);
}