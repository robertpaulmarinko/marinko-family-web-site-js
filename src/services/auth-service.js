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
    _authToken = null;

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
            this._authToken = response.token;
        }

        return response.success;
    }

    /**
     * Returns if the user is logged in
     * @returns {boolean}
     */
    isLoggedIn() {
        if (this._authToken) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Gets the headers needed to make an authenticated web service call
     * @returns An object with the 'x-auth-token' property
     */
    getAuthHeader() {
        if (this._authToken) {
            return {
                'Content-Type': 'application/json',
                'x-auth-token': this._authToken,
            }
        } else {
            return null;
        }
    }
}