const template = document.createElement('template');
template.innerHTML = `
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
</div>
`;

export class LoginPage {
    /** @type {GlobalService} */
    _global = null;

    title = "Login";
    
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

        } else {
            
        }
    }
}

export function createPage(global) {
    return new LoginPage(global);
}