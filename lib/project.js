'use strict'

let call = require('./call.js')

module.exports = {
    /**
     * Gets a project by UUID.
     * @param {Object} opts Options requires {projectUUID:String}
     * @returns {Promise}
     */
    get: (opts) => {
        opts.url = `https://${opts.ip}:9440/api/nutanix/v3/projects/${opts.projectUUID}`
        opts.method = "GET"
        return call(opts)
    },
    /**
     * Deletes specified project by ID
     * @param {Object} opts Options requires {projectUUID:String}
     * @returns {Promise}
     */
    delete: (opts) => {
        opts.url = `https://${opts.ip}:9440/api/nutanix/v3/projects/${opts.projectUUID}`
        opts.method = 'DELETE'
        return call(opts)
    },
    /**
     * Gets specified project by name
     * @param {Object} opts Options requires {projectName:String}
     * @returns {Promise}
     */
    getByName: (opts) => {
        opts.url = `https://${opts.ip}:9440/api/nutanix/v3/projects/list`
        opts.method = 'POST'
        opts.body = { filter: 'name==' + opts.projectName }
        return call(opts)
    }
}