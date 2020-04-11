'use strict'

let call = require('./call.js')

// EVENT ACTIONS
module.exports = {
    /**
     * Get events since start time provided.
     * @param {Object} opts Options requires {startTime:Number(in usecs)}
     * @returns {Promise}
     */
    get: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v1/events/?startTimeInUsecs=${opts.startTime}`
        opts.method = 'GET'
        return call(opts)
    }
}