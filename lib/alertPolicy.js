'use strict'

let call = require('./call.js')

// ALERT ACTIONS
module.exports = {
    /**
     * Get a alert by identifier alertUUID
     * @param {Object} opts Options requires {alertUUID:String}
     * @returns {Promise}
     */
    get: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v2.0/alerts/policies/${opts.alertUUID}`
        opts.method = 'GET'
        return call(opts)
    },
    /**
     * Delete a specific alertUUID
     * @param {Object} opts Options requires {alertUUID:String}
     * @returns {Promise}
     */
    delete: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v2.0/alerts/policies/${opts.alertUUID}`
        opts.method = 'DELETE'
        return call(opts)
    }
}