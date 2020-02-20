'use strict'

let call = require('./call.js')

// CONTAINER ACTIONS
module.exports = {
    create: opts => {
        opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v1/containers/'
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
        create: opts => {
            opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v2.0/storage_containers/datastores/add_datastore'
            opts.method = 'POST'
            opts.body = {
                containerName: opts.containerName,
                datastoreName: opts.containerName,
                nodeIds: opts.nodeIds,
                readOnly: false
            }
            return call(opts)
        },
        delete: opts => {
            opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v2.0/storage_containers/datastores/remove_datastore'
            opts.method = 'POST'
            opts.body = {
                datastore_name: opts.containerName,
                node_ids: opts.nodeIds
            }
            return call(opts)
        },
        get: opts => {
            opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v2.0/storage_containers/datastores'
            opts.method = 'GET'
            return call(opts)
        }
    },
    delete: opts => {
        opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v2.0/storage_containers/' + opts.containerUUID + '?ignoreSmallFiles=true'
        opts.method = 'DELETE'
        return call(opts)
    },
    get: opts => {
        opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v2.0/storage_containers/'
        opts.method = 'GET'
        return call(opts)
    },
    getByName: opts => {
        opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v2.0/storage_containers/?searchString=' + opts.containerName
        opts.method = 'GET'
        return call(opts)
    },
    getByUUID: opts => {
        opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v2.0/storage_containers/' + opts.containerUUID
        opts.method = 'GET'
        return call(opts)
    }
}