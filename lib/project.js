'use strict'

let call = require('./call.js')

module.exports = {
    get: getByUUID,
    delete: deleteProject,
    getByName: getProjectByName
}

/**
 * Gets a project by UUID.
 * @param {Object} opts Options object. Requries a project UUID.
 */
function getByUUID(opts) {
    opts.url = 'https://' + opts.ip + ':9440/api/nutanix/v3/projects/' + opts.projectUUID
    opts.method = "GET"
    return call(opts)
}

/**
 * Deletes specified project by ID
 * @param {Object} opts Options requires additional parameter of projectUUID
 */
function deleteProject(opts) {
    opts.url = 'https://' + opts.ip + ':9440/api/nutanix/v3/projects/' + opts.projectUUID,
    opts.method = 'DELETE'
    return call(opts)
}

/**
 * Gets specified project by name
 * @param {Object} opts Options requires additional parameter of projectName
 */
function getProjectByName(opts) {
    opts.url = 'https://' + opts.ip + ':9440/api/nutanix/v3/projects/list'
    opts.method = 'POST'
    opts.body = { filter: 'name==' + opts.projectName }
    return call(opts)
}