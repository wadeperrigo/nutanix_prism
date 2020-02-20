'use strict'

let call = require('./call.js')

// FOCUS ACTIONS
module.exports = {
    get: getFilter,
    delete: deleteFilter
}

/**
 * Get a filter by identifier
 * @param {Object} opts Options requires filterUUID
 */
function getFilter (opts){
    opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v1/application/user_data/' + opts.filterUUID
    opts.method = 'GET'
    return call(opts)
}

/**
 * Delete a specific filter by uuid
 * @param {Object} opts Options requires filterUUID
 */
function deleteFilter (opts){
    opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v1/application/user_data/' + opts.filterUUID
    opts.method = 'DELETE'
    return call(opts)
}