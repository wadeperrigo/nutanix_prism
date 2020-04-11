'use strict'

let call = require('./call.js')

// IMAGE ACTIONS
module.exports = {
    /**
     * Creates a new image disk
     * @param {Object} opts Options Requires {containerName:String,imageUrl:String,ImageName:String}
     * @returns {Promise}
     */
    createDisk: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v2.0/images/`
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
    /**
     * Creates a new image iso.
     * @param {Object} opts Options Requires {containerName:String,imageUrl:String,imageName:String}
     * @returns {Promise}
     */
    createIso: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v2.0/images/`
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
    /**
     * Get prism Image.
     * @param {Object} opts Options Requires {imageID:String}
     * @returns {Promise}
     */
    get: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v2.0/images/${opts.imageID}/`
        opts.method = 'GET'
        return call(opts)
    },
    ssp: {
        images: {
            /**
             * Deletes prism Image by imageUUID.
             * @param {Object} opts Options Requires {imageUUID:String}
             * @returns {Promise}
             */
            delete: opts => {
                opts.url = `https://${opts.ip}:9440/api/nutanix/v3/images/${opts.imageUUID}`
                opts.method = 'DELETE'
                return call(opts)
            },
            /**
             * Get prism Image by Name.
             * @param {Object} opts Options Requires {imageName:String}
             * @returns {Promise}
             */
            getByName: opts => {
                opts.url = `https://${opts.ip}:9440/api/nutanix/v3/images/list`
                opts.method = 'POST'
                opts.body = {
                    filter: `name==${opts.imageName}`
                }
                return call(opts)
            }
        },
    }
}