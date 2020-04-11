'use strict'

let call = require('./call.js')

// SCENARIO ACTIONS
module.exports = {
    /**
     * Creates a capacity planning scenario in Prism Central.
     * @param {Object} opts Options requires {body:Object (See Nutanix Documentation)}
     * @return {Promise}
     */
    create: (opts) => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v1/capacity_planning/scenarios`
        opts.method = 'POST'
        return call(opts)
    },
    /**
     * Deletes specified scenario by UUID
     * @param {Object} opts Options requires {scenarioUUID:String}
     * @return {Promise}
     */
    delete: (opts) => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v1/capacity_planning/scenarios/${opts.scenarioUUID}`
        opts.method = 'DELETE'
        return call(opts)
    },
    /**
     * Gets information about scenario specified by Name
     * @param {Object} opts Options requires {scenarioName:String}
     * @return {Promise}
     */
    getByName: (opts) => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v1/capacity_planning/scenarios/${opts.scenarioName}`
        opts.method = 'GET'
        return call(opts)
    }
}