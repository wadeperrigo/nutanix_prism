'use strict'

let call = require('./call.js')

// NETWORK ACTIONS
module.exports = {
    create: opts => {
        opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v2.0/networks/'
        opts.method = 'POST',
        opts.body = {
            name: opts.networkName,
            vlan_id: opts.vlanID
        }
        if (opts['annotation']) {opts.body.annotation = opts.annotation}
        return call(opts)
    },
    delete: opts => {
        opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v2.0/networks/' + opts.networkUUID
        opts.method = 'DELETE'
        return call(opts)
    },
    get: opts => {
        opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v2.0/networks/'
        opts.method = 'GET'
        return call(opts)
    },
    getByUUID: opts => {
        opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v2.0/networks/' + opts.networkUUID
        opts.method = 'GET'
        return call(opts)
    }
}