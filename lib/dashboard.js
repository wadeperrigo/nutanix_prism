'use strict'

let call = require('./call.js')

// CLUSTER ACTIONS
module.exports = {
    get: getDashboard,
    delete: deleteDashboard
}

/**
 * Get a dashboard by identifier
 * @param {Object} opts Options requires dashboardUUID
 */
function getDashboard (opts){
    opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v1/application/user_data/' + opts.dashboardUUID
    opts.method = 'GET'
    return call(opts)
}

/**
 * Delete a dashboard by UUID
 * @param {Object} opts Options requires dashboardUUID
 */
function deleteDashboard (opts){
    opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v1/application/user_data/' + opts.dashboardUUID
    opts.method = 'DELETE'
    return call(opts)
}