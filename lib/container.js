'use strict'

let call = require('./call.js')

// CONTAINER ACTIONS
module.exports = {
    /**
     * Create a new container with specified containerName and storagePool UUID
     * @param {Object} opts Options requires {containerName:String,storagePoolUUID:String,
     *      compressionEnabled:Boolean (Optional),compressionDelayInSecs:Number (Optional),
     *      fingerPrintOnWrite:Boolean (Optional), onDiskDedup:Boolean (Optional)}
     * @returns {Promise}
     */
    create: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v1/containers/`
        opts.method = 'POST'
        opts.body = {
            name: opts.containerName,
            storagePoolUuid: opts.storagePoolUUID
        }
        if(opts.compressionEnabled) {opts.body.compressionEnabled = true}
        if(opts.compressionDelayInSecs) {opts.body.compressionDelayInSecs = opts.compressionDelayInSecs}
        if(opts.fingerPrintOnWrite) {opts.body.fingerPrintOnWrite = 'ON'}
        if(opts.onDiskDedup) {opts.body.onDiskDedup = 'POST_PROCESS'}
        return call(opts)
    },
    datastores: {
        /**
         * Create a new datastore with the specified containerName and mount to specified nodeIDs
         * @param {Object} opts Options requires {containerName:String,nodeIds:Array}
         * @returns {Promise}
         */
        create: opts => {
            opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v2.0/storage_containers/datastores/add_datastore`
            opts.method = 'POST'
            opts.body = {
                containerName: opts.containerName,
                datastoreName: opts.containerName,
                nodeIds: opts.nodeIds,
                readOnly: false
            }
            return call(opts)
        },
        /**
         * Delete a datastore from specified nodeIds that has containerName specified
         * @param {Object} opts Options requires {containerName:String,nodeIds:Array}
         * @returns {Promise}
         */
        delete: opts => {
            opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v2.0/storage_containers/datastores/remove_datastore`
            opts.method = 'POST'
            opts.body = {
                datastore_name: opts.containerName,
                node_ids: opts.nodeIds
            }
            return call(opts)
        },
        /**
         * Get a list of datastores
         * @param {Object} opts Options requires no extra parameters
         * @returns {Promise}
         */
        get: opts => {
            opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v2.0/storage_containers/datastores`
            opts.method = 'GET'
            return call(opts)
        }
    },
    /**
     * Delete a container with the specified containerUUID
     * @param {Object} opts Options requires {containerUUID:String}
     * @returns {Promise}
     */
    delete: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v2.0/storage_containers/${opts.containerUUID}?ignoreSmallFiles=true`
        opts.method = 'DELETE'
        return call(opts)
    },
    /**
     * Get a list of all containers on a cluster.
     * @param {Object} opts Options requires no additional parameters
     * @returns {Promise}
     */
    get: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v2.0/storage_containers/`
        opts.method = 'GET'
        return call(opts)
    },
    /**
     * Get a container by the specified containerName
     * @param {Object} opts Options requires {containerName:String}
     * @returns {Promise}
     */
    getByName: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v1/containers/?searchString=${opts.containerName}`
        opts.method = 'GET'
        return call(opts)
    },
    /**
     * Gets a containers details with specified container UUID
     * @param {Object} opts Options requires {containerUUID:String}
     * @returns {Promise}
     */
    getByUUID: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v2.0/storage_containers/${opts.containerUUID}`
        opts.method = 'GET'
        return call(opts)
    }
}