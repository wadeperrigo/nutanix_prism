'use strict'

let call = require('./call.js')

// ALERT ACTIONS
module.exports = {
    get: getAlert,
    delete: deleteAlert
}

/**
 * Get a alert by identifier
 * @param {Object} opts Options requires alertUUID
 */
function getAlert (opts){
    opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v2.0/alerts/policies/' + opts.alertUUID
    opts.method = 'GET'
    return call(opts)
}

/**
 * Delete a specific alert by uuid
 * @param {Object} opts Options requires alertUUID
 */
function deleteAlert (opts){
    opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v2.0/alerts/policies/' + opts.alertUUID
    opts.method = 'DELETE'
    return call(opts)
}