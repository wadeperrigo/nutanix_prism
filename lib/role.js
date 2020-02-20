'use strict'

let call = require('./call.js')

// ROLE ACTIONS
module.exports = {
    delete: deleteRole,
    get: getRole
}

/**
 * Deletes a role by UUID
 * @param {Object} opts Options requires parameter roleUUID
 */
function deleteRole(opts) {
    opts.url = 'https://' + opts.ip + ':9440/api/nutanix/v3/roles/' + opts.roleUUID
    opts.method = 'DELETE'
    return call(opts)
}

/**
 * Get a role by UUID
 * @param {Object} opts Options requires parameter roleUUID
 */
function getRole(opts) {
    opts.url = 'https://' + opts.ip + ':9440/api/nutanix/v3/roles/' + opts.roleUUID
    opts.method = 'GET'
    return call(opts)
}