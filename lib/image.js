'use strict'

let call = require('./call.js')

// IMAGE ACTIONS
module.exports = {
    createDisk: opts => {
        opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v2.0/images/'
        opts.method = 'POST'
        opts.body = {
            image_import_spec: {
                storage_container_name: opts.containerName,
                url: opts.imageUrl
            },
            image_type: 'DISK_IMAGE',
            name: opts.imageName
        }
        if (opts['annotation']) { opts.body.annotation = opts['annotation']}
        return call(opts)
    },
    createIso: opts => {
        opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v2.0/images/'
        opts.method = 'POST'
        opts.body = {
            image_import_spec: {
                storage_container_name: opts.containerName,
                url: opts.imageUrl
            },
            image_type: 'ISO_IMAGE',
            name: opts.imageName
        }
        if (opts['annotation']) { opts.body.annotation = opts['annotation']}
        return call(opts)
    },
    get: opts => {
        opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v2.0/images/' + opts.imageID + '/'
        opts.method = 'GET'
        return call(opts)
    }
}
/* FROM SSP - NOT SURE IF NEEDED

images: {
        delete: opts => {
            opts.url = 'https://' + opts.ip + ':9440/api/nutanix/v3/images/' + opts.imageUUID
            opts.method = 'DELETE'
            return call(opts)
        },
        getByName: opts => {
            opts.url = 'https://' + opts.ip + ':9440/api/nutanix/v3/images/list'
            opts.method = 'POST'
            opts.body = {
                filter: 'name==' + opts.imageName
            }
            return call(opts)
        }
    },

*/