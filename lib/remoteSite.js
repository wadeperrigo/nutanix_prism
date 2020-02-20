'use strict'

let call = require('./call.js')

// REMOTE SITE ACTIONS
module.exports = {
    delete: deleteRemoteSite,
    get: getRemoteSite
}

/**
 * Deletes specified remote site by ID
 * @param {Object} opts Options requires additional parameter of remoteSiteID
 */
function deleteRemoteSite(opts) {
    opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v2.0/remote_sites/' + opts.remoteSiteID
    opts.method = 'DELETE'
    return call(opts)
}

/**
 * Gets information about remote site specified by ID
 * @param {Object} opts Options requires additional parameter of remoteSiteID
 */
function getRemoteSite(opts) {
    opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v1/remote_sites/' + opts.remoteSiteID
    opts.method = 'GET'
    return call(opts)
}