'use strict'

let call = require('./call.js')

// APPLICATION ACTIONS
module.exports = {
    get: getApp,
    getAppByName: getAppByName,
    getUUID: getUUID,
    delete: deleteApp
}

/**
 * Gets an application UUID from Prism Central given a blueprint UUID and a request ID.
 * @param {Object} opts Required options for communicating with Prism
 * Opts must contain opts.bpUUID and opts.requestID as properties.
 */
function getUUID (opts) {
    opts.url = 'https://' + opts.ip + ':9440/api/nutanix/v3/blueprints/' + opts.bpUUID + '/pending_launches/' + opts.requestID
    opts.method = 'GET'
    return call(opts)
}
/**
 * Gets application info from Prism Central given an app UUID.
 * @param {Object} opts Required options for communicating with Prism
 * Opts must contain an app UUID.
 */
function getApp (opts) {
    opts.url = 'https://' + opts.ip + ':9440/api/nutanix/v3/apps/' + opts.appUUID
    opts.method = 'GET'
    return call(opts)
}
/**
 * Gets application info from Prism Central given an app name.
 * @param {Object} opts Required options for communicating with Prism
 * Opts must contain an appName property
 */
function getAppByName (opts) {
    opts.url = 'https://' + opts.ip + ':9440/api/nutanix/v3/apps/' + opts.appName
    opts.method = 'GET'
    return call(opts)
}
/**
 * Deletes application from Prism Central given an app action.
 * @param {Object} opts Required options for communicating with Prism
 * Opts must contain an appUUID and actionUUID properties
 */
function deleteApp (opts) {
    opts.url = 'https://' + opts.ip + ':9440/api/nutanix/v3/apps/' + opts.appUUID + '/actions/' + opts.actionUUID + '/run'
    opts.method = 'GET'
    return call(opts)
}