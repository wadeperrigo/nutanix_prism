'use strict'

let call = require('./call.js')

// EVENT ACTIONS
module.exports = {
    get: getEvents
}

/**
 * Get events since start time provided.
 * @param {Object} opts Options requires additional parameter 'startTime' in uSecs
 */
function getEvents(opts) {
    opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v1/events/?startTimeInUsecs=' + opts.startTime
    opts.method = 'GET'
    return call(opts)
}