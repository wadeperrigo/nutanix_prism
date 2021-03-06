'use strict'

let call = require('./call.js')

// PRISM IDEMPOTENCE IDENTIFIER
module.exports = {
    /**
     * Create new idempotentence identifier(s) (UUID)
     * @param {Object} opts Options requires {identifier:String,count:Number}
     * @returns {Promise}
     */
    create: opts => {
        opts.url = `https://${opts.ip}:9440/api/nutanix/v3/idempotence_identifiers`
        opts.method = 'POST'
        opts.body = {
            client_identifier: opts.identifier,
            count: opts.count
        }
        return call(opts)
    }
}