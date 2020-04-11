'use strict'

let call = require('./call.js')

// ROLE ACTIONS
module.exports = {
    /**
     * Deletes a role by UUID
     * @param {Object} opts Options requires {roleUUID:String}
     * @returns {Promise}
     */
    delete: (opts) => {
        opts.url = `https://${opts.ip}:9440/api/nutanix/v3/roles/${opts.roleUUID}`
        opts.method = 'DELETE'
        return call(opts)
    },
    /**
     * Get a role by UUID
     * @param {Object} opts Options requires {roleUUID:String}
     * @returns {Promise}
     */
    get: (opts) => {
        opts.url = `https://${opts.ip}:9440/api/nutanix/v3/roles/${opts.roleUUID}`
        opts.method = 'GET'
        return call(opts)
    },
    /**
     * Get a role by Name
     * @param {Object} opts Options requires {roleName:String}
     * @returns {Promise}
     */
    getByName: opts => {
        opts.passValue = opts.roleName
        opts.body = {
            filter: 'name==' + opts.roleName
        }
        opts.url = `https://${opts.ip}:9440/api/nutanix/v3/roles/list`
        opts.method = 'POST'
        return call(opts)
    }
}