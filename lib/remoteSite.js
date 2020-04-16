'use strict'

let call = require('./call.js')

// REMOTE SITE ACTIONS
module.exports = {
    /**
     * Deletes specified remote site by ID
     * @param {Object} opts Options requires {remoteSiteID:String}
     * @returns {Promise}
     */
    delete: (opts) => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v2.0/remote_sites/${opts.remoteSiteID}`
        opts.method = 'DELETE'
        return call(opts)
    },
    /**
     * Gets information about remote site(s) by optionally specifying by ID
     * @param {Object} opts Options requires {remoteSiteID:String (optional)}
     * @returns {Promise}
     */
    get: (opts) => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v2.0/remote_sites/`
        if (opts.remoiteSiteID) opts.url += `?names=${opts.remoteSiteID}&full_details=false&include_deleted=false`
        else opts.url += `?full_details=false&include_deleted=false`
        opts.method = 'GET'
        return call(opts)
    }
}