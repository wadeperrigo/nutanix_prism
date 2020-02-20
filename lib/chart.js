'use strict'

let call = require('./call.js')

// CHART ACTIONS
module.exports = {
    delete: deleteChart,
    get: getChart
}

/**
 * Deletes specified chart by UUID (really key)
 * @param {Object} opts Options requires additional parameter of chartUUID
 */
function deleteChart(opts) {
    opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v1/application/user_data/' + opts.chartUUID
    opts.method = 'DELETE'
    return call(opts)
}

/**
 * Gets information about a chart specified by ID (really key)
 * @param {Object} opts Options requires additional parameter of chartUUID
 */
function getChart(opts) {
    opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v1/application/user_data/' + opts.chartUUID
    opts.method = 'GET'
    return call(opts)
}