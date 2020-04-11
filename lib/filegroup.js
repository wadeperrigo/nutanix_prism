'use strict'

let call = require('./call.js')

// FILE_GROUP_PROTECTION DOMAIN ACTIONS
module.exports = {
    /**
     * @param {Object} opts Options requires {fileGroupUUID:String}
     * @returns {Promise}
     */
    delete: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v2.0/file_groups/${opts.fileGroupUUID}/delete_files`
        opts.method = 'POST'
        return call(opts)
    },
    /**
     * Get data for a filegroup based upon UUID
     * @param {Object} opts Options requires {fileGroupUUID:String}
     * @returns {Promise}
     */
    get: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v2.0/file_groups/?uuid=${opts.fileGroupUUID}`
        opts.method = 'GET'
        return call(opts)
    }
}