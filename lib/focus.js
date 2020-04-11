'use strict'

let call = require('./call.js')

// FOCUS ACTIONS
module.exports = {
    /**
     * Get a focus by identifier
     * @param {Object} opts Options requires {focusUUID:String}
     * @returns {Promise}
     */
    get: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v1/application/user_data/${opts.focusUUID}`
        opts.method = 'GET'
        return call(opts)
    },
    /**
     * Delete a specific focus by uuid
     * @param {Object} opts Options requires {focusUUID:String}
     * @returns {Promise}
     */
    delete: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v1/application/user_data/${opts.focusUUID}`
        opts.method = 'DELETE'
        return call(opts)
    }
}