'use strict'

let call = require('./call.js')

// REPORT ACTIONS
module.exports = {
    delete: deleteReport,
    get: getReport
}

/**
 * Deletes specified report by ID
 * @param {Object} opts Options requires additional parameter of reportUUID
 */
function deleteReport(opts) {
    opts.url = 'https://' + opts.ip + ':9440/api/nutanix/v3/report_configs/' + opts.reportUUID
    opts.method = 'DELETE'
    return call(opts)
}

/**
 * Gets information about report specified by ID
 * @param {Object} opts Options requires additional parameter of reportUUID
 */
function getReport(opts) {
    opts.url = 'https://' + opts.ip + ':9440/api/nutanix/v3/report_configs/' + opts.reportUUID
    opts.method = 'GET'
    return call(opts)
}