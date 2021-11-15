/**
 * Request body for the /login API
 * @typedef LoginRequest
 * @type {object}
 * @property {string} password - the password entered by the user
 */

/**
 * Response body for the /login API
 * @typedef LoginResponse
 * @type {object}
 * @property {Boolean} success - true if the password is valid
 * @property {string} token - token to be passed when making secure API calls
 */

/*
 * This class is used to authenticate a user and remember
 * the auth token that is used for API requests
 */
export class AuthService {
    /** 
     * Reference to Global class, injected into any new pages
     * 
     * @type {GlobalClass} 
     */
    _global = null;

    /**
     * Auth token from a valid login, used to call secure APIs
     * 
     * @type {string}
     */
    get authToken() {
        return window.sessionStorage.getItem('authToken');
    }
    set authToken(authToken) {
        window.sessionStorage.setItem('authToken', authToken)
    }

    /**
     * Constructor
     * 
     * @param {GlobalClass} global 
     */
    constructor(global) {
        this._global = global;
    }

    /**
     * Validates the password.  If password is good, returns true and remembers
     * the auth token.  Otherwise returns false,
     * @param {string} password 
     * @returns {Boolean} true if password is valid
     */
    async tryLogin(password) {
        /** @type {LoginRequest} */
        const request = {
            password: password,
        };

        /** @type {LoginResponse} */
        const response = await fetch(`${this._global.apiUrl()}/default/login`, {
            method: 'POST',
            body: JSON.stringify(request),
        })
        .then(response => response.json());

        if (response.success) {
            this.authToken = response.token;
        }

        return response.success;
    }

    /**
     * Returns if the user is logged in
     * @returns {boolean}
     */
    isLoggedIn() {
        if (this.authToken) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Gets the headers needed to make an authenticated web service call
     * contentType - string - optional, default to 'application/json' if not given.
     * @returns An object with the 'x-auth-token' property
     */
    getAuthHeader(contentType) {
        if (this.authToken) {
            return {
                'Content-Type': contentType || 'application/json',
                'x-auth-token': this.authToken,
            }
        } else {
            return null;
        }
    }
}