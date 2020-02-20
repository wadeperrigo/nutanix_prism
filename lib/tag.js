'use strict'

let call = require('./call.js')

// TAG ACTIONS
module.exports = {
    delete: deleteTag,
    get: getTag
}

/**
 * Deletes a tag by UUID
 * @param {Object} opts Options requires parameter tagUUID
 */
function deleteTag(opts) {
    opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v1/tags/' + opts.tagUUID
    opts.method = 'DELETE'
    console.log(opts)
    return call(opts)
}

/**
 * Gets a tag by UUID
 * @param {Object} opts Options requires parameter tagUUID
 */
function getTag(opts) {
    opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v1/tags/' + opts.tagUUID
    opts.method = 'GET'
    return call(opts)
}