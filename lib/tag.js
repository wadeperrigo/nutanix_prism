'use strict'

let call = require('./call.js')

// TAG ACTIONS
module.exports = {
    /**
     * Deletes a tag by UUID
     * @param {Object} opts Options requires {tagUUID:String}
     * @returns {Promise}
     */
    delete: (opts) => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v1/tags/${opts.tagUUID}`
        opts.method = 'DELETE'
        console.log(opts)
        return call(opts)
    },
    /**
     * Gets a tag by UUID
     * @param {Object} opts Options requires {tagUUID:String}
     * @returns {Promise}
     */
    get: (opts) => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v1/tags/${opts.tagUUID}`
        opts.method = 'GET'
        return call(opts)
    }
}