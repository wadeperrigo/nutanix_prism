'use strict'

let call = require('./call.js')

// REPORT ACTIONS
module.exports = {
    /**
     * Deletes specified report by UUIID
     * @param {Object} opts Options requires {reportUUID:String}
     * @returns {Promise}
     */
    delete: (opts) => {
        opts.url = `https://${opts.ip}:9440/api/nutanix/v3/report_configs/${opts.reportUUID}`
        opts.method = 'DELETE'
        return call(opts)
    },
    /**
     * Gets information about report specified by UUID
     * @param {Object} opts Options requires {reportUUID:String}
     * @returns {Promise}
     */
    get: (opts) => {
        opts.url = `https://${opts.ip}:9440/api/nutanix/v3/report_configs/${opts.reportUUID}`
        opts.method = 'GET'
        return call(opts)
    }
}