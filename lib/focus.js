'use strict'

let call = require('./call.js')

// FOCUS ACTIONS
module.exports = {
    get: getFocus,
    delete: deleteFocus
}

/**
 * Get a focus by identifier
 * @param {Object} opts Options requires focusUUID
 */
function getFocus (opts){
    opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v1/application/user_data/' + opts.focusUUID
    opts.method = 'GET'
    return call(opts)
}

/**
 * Delete a specific focus by uuid
 * @param {Object} opts Options requires focusUUID
 */
function deleteFocus (opts){
    opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v1/application/user_data/' + opts.focusUUID
    opts.method = 'DELETE'
    return call(opts)
}