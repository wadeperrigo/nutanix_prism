'use strict'

let call = require('./call.js')

// STORAGE POOL ACTIONS
module.exports = {
    get: getPool
}

/**
 * Gets all storage pools within the cluster
 * @param {Object} opts Options requires no additional properties
 */
function getPool(opts) {
    opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v1/storage_pools/'
    opts.method = 'GET'
    return call(opts)
}