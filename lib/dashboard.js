'use strict'

let call = require('./call.js')

// DASHBOARD ACTIONS
module.exports = {
    /**
     * Get a dashboard by identifier
     * @param {Object} opts Options requires {dashboardUUID:String}
     * @returns {Promise}
     */
    get: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v1/application/user_data/${opts.dashboardUUID}`
        opts.method = 'GET'
        return call(opts)
    },
    /**
     * Delete a dashboard by UUID
     * @param {Object} opts Options requires {dashboardUUID:String}
     * @returns {Promise}
     */
    delete: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v1/application/user_data/${opts.dashboardUUID}`
        opts.method = 'DELETE'
        return call(opts)
    }
}