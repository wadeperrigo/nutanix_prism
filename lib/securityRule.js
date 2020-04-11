'use strict'

let call = require('./call.js')

// SECURITY RULE ACTIONS
module.exports = {
    /**
     * Deletes a security rule by UUID
     * @param {Object} opts Options requires {ruleUUID:String}
     * @returns {Promise}
     */
    delete: (opts) => {
        opts.url = `https://${opts.ip}:9440/network_security_rules/${opts.ruleUUID}`
        opts.method = 'DELETE'
        return call(opts)
    },
    /**
     * Gets a security rule by UUID
     * @param {Object} opts Options requires {ruleUUID:String}
     * @returns {Promise}
     */
    get: (opts) => {
        opts.url = `https://${opts.ip}:9440/network_security_rules/${opts.ruleUUID}`
        opts.method = 'GET'
        return call(opts)
}
}