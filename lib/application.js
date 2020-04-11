'use strict'

let call = require('./call.js')

// APPLICATION ACTIONS
module.exports = {
    /**
     * Gets application info from Prism Central given an opts.appUUID.
     * @param {Object} opts Options requires {appUUID:String}
     * @return {Promise}
     */
    get: opts => {
        opts.url = `https://${opts.ip}:9440/api/nutanix/v3/apps/${opts.appUUID}`
        opts.method = 'GET'
        return call(opts)
    },
    /**
     * Gets application info from Prism Central given an appName.
     * @param {Object} opts Options requires {appName:String}
     * @return {Promise}
     */
    getAppByName: opts => {
        opts.url = `https://${opts.ip}:9440/api/nutanix/v3/apps/${opts.appName}`
        opts.method = 'GET'
        return call(opts)
    },
    /**
     * Gets an application UUID from Prism Central given a bpUUID (blueprintUUID) and a requestID.
     * @param {Object} opts Options requires {bpUUID:String,requestID:String}
     * @returns {Promise}
     */
    getUUID: opts => {
        opts.url = `https://${opts.ip}:9440/api/nutanix/v3/blueprints/${opts.bpUUID}/pending_launches/${opts.requestID}`
        opts.method = 'GET'
        return call(opts)
    },
    /**
     * Deletes application from Prism Central given an appUUID and actionUUID.
     * @param {Object} opts Options requires {appUUID:String,actionUUID:String}
     * @returns {Promise}
     */
    delete: opts => {
        opts.url = `https://${opts.ip}:9440/api/nutanix/v3/apps/${opts.appUUID}/actions/${opts.actionUUID}/run`
        opts.method = 'GET'
        return call(opts)
    }
}