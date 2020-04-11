'use strict'

let call = require('./call.js')

// CHART ACTIONS
module.exports = {
    /**
     * Deletes specified chart by UUID (really key)
     * @param {Object} opts Options requires {chartUUID:String}
     * @returns {Promise}
     */
    delete: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v1/application/user_data/${opts.chartUUID}`
        opts.method = 'DELETE'
        return call(opts)
    },
    /**
     * Gets information about a chart specified by ID (really key)
     * @param {Object} opts Options requires {chartUUID:String}
     * @returns {Promise}
     */
    get: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v1/application/user_data/${opts.chartUUID}`
        opts.method = 'GET'
        return call(opts)
    }
}