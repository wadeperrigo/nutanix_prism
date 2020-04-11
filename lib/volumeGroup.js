'use strict'

let call = require('./call.js')

// VOLUME GROUP ACTIONS
module.exports = {
    /**
     * Deletes a volume group by UUID
     * @param {Object} opts Options requires {volumeGroupUUID:String}
     * @returns {Promise}
     */
    delete: (opts) => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v2.0/volume_groups/${opts.volumeGroupUUID}`
        opts.method = 'DELETE'
        return call(opts)
    },
    /**
     * Gets all volume groups
     * @param {Object} opts Options requires no additonal parameters
     * @returns {Promise}
     */
    get: (opts) => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v2.0/volume_groups/`
        opts.method = 'GET'
        return call(opts)
    },
    /**
     * Gets a volume group by a UUID
     * @param {Object} opts Options requires {volumeGroupUUID:String}
     * @returns {Promise}
     */
    getByUUID: (opts) => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v2.0/volume_groups/${opts.volumeGroupUUID}`
        opts.method = 'GET'
        return call(opts)
    }
}