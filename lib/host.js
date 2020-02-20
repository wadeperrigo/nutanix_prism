'use strict'

let call = require('./call.js')

// HOST ACTIONS 
module.exports = {
    get: opts => {
        opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v1/hosts/'
        opts.method = 'GET'
        return call(opts)
    },
    nics: opts => {
        opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v1/hosts/' + opts.hostUUID + '/host_nics'
        opts.method = 'GET'
        return call(opts)
    }
}