'use strict'

let call = require('./call.js')

// VM ACTIONS
module.exports = {
    create: createVM,
    delete: deleteVM,
    getAll: getAllVM,
    getByName: getByName,
    get: getByUUID,
    getNetwork: getNetwork,
    start: startVM
}

/**
 * See Prism documentation for VM configuration
 * @param {Object} opts Options requires an entire VM config
 */
function createVM(opts) {
    opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v2.0/vms/'
    opts.method = 'POST'
    return call(opts)
}

/**
 * Deletes a VM by UUID
 * @param {Object} opts Options requires property vmUUID
 */
function deleteVM(opts) {
    opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v2.0/vms/' + opts.vmUUID +'/?delete_snapshots=true'
    opts.method = 'DELETE'
    return call(opts)
}

/**
 * Gets a list of all VM's
 * @param {Object} opts No additional parameters accepted
 */
function getAllVM(opts) {
    opts.url = 'https://' + opts.ip + ':9440/api/nutanix/v3/vms/list'
    opts.body = {
        kind: "vm",
        sort_order: "ASCENDING",
        sort_attribute: "name"
    }
    opts.method = 'POST'
    return call(opts)
}

/**
 * Gets a list of vm's by search string provided in options
 * @param {Object} opts Options requires property vmName
 */
function getByName(opts) {
    opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v1/vms/?searchString=' + opts.vmName
    opts.method = 'GET'
    return call(opts)
}

/**
 * Gets a vm by a specific UUID
 * @param {Object} opts Options requires property vmUUID
 */
function getByUUID(opts) {
    opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v1/vms/' + opts.vmUUID
    opts.method = 'GET'
    return call(opts)
}

/**
 * Initiates a power on of a vm
 * @param {Object} opts Options requires property vmUUID
 */
function startVM(opts) {
    opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v2.0/vms/' + opts.vmUUID + '/set_power_state/'
    opts.method = 'POST'
    opts.body = { transition: 'ON' }
    return call(opts)
}

/**
 * Gets virtual NIC information from a vm
 * @param {Object} opts Options requires property vmUUID
 */
function getNetwork(opts) {
    opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v2.0/vms/' + opts.vmUUID + '/nics/?include_address_assignments=true'
    opts.method = 'GET'
    return call(opts)
}