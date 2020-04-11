'use strict'

let call = require('./call.js')

// HOST ACTIONS 
module.exports = {
    /**
     * Get all hosts.
     * @param {Object} opts Prism Options no additional parameters required
     * @returns {Promise}
     */
    get: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v1/hosts/`
        opts.method = 'GET'
        return call(opts)
    },
    /**
     * Get host nic list bye hostUUID.
     * @param {Object} opts Prism Options requires {hostUUID:String}
     * @returns {Promise}
     */
    nics: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v1/hosts/${opts.hostUUID}/host_nics`
        opts.method = 'GET'
        return call(opts)
    }
}