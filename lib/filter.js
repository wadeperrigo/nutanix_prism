'use strict'

let call = require('./call.js')

// FILTER ACTIONS
module.exports = {
    /**
     * Get a filter by uuid
     * @param {Object} opts Options requires {filterUUID:String}
     * @returns {Promise}
     */
    get: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v1/application/user_data/${opts.filterUUID}`
        opts.method = 'GET'
        return call(opts)
    },
    /**
     * Delete a specific filter by uuid
     * @param {Object} opts Options requires {filterUUID:String}
     * @returns {Promise}
     */
    delete: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v1/application/user_data/${opts.filterUUID}`
        opts.method = 'DELETE'
        return call(opts)
    }
}