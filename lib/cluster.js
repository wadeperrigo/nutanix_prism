'use strict'

let call = require('./call.js')

// CLUSTER ACTIONS
module.exports = {
    get: getCluster
}

/**
 * Get information about a particular cluster
 * @param {Object} opts Options requires no additional parameters
 */
function getCluster (opts){
    opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v1/cluster/'
    opts.method = 'GET'
    return call(opts)
}