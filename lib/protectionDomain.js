'use strict'

let call = require('./call.js')

// PROTECTION DOMAIN ACTIONS
module.exports = {
    delete: opts => {
        opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v1/protection_domains/' + opts.protectionDomainName
        opts.method = 'DELETE'
        return call(opts)
    },
    get: opts => {
        opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v1/protection_domains/?names=' + opts.protectionDomainName
        opts.method = 'GET'
        return call(opts)
    },
    create: opts => {
        opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v2.0/protection_domains/'
        opts.method = 'POST'
        opts.body = {"value": opts.protectionDomainName}
        return call(opts)
    },
    schedules: {
        delete: opts => {
            opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v1/protection_domains/' + opts.protectionDomainName + '/schedules'
            opts.method = 'DELETE'
            return call(opts)
        }
    },
    snapshots: {
        delete: opts => {
            opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v1/protection_domains/' + opts.protectionDomainName + '/dr_snapshots/' + opts.snapshotId
            opts.method = 'DELETE'
            return call(opts)
        },
        deleteList: opts => {
            opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v1/protection_domains/' + opts.protectionDomainName + '/dr_snapshots/remove_list'
            opts.method = 'POST'
            opts.body = opts.snapshotList
            return call(opts)
        },
        get: opts => {
            opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v1/protection_domains/' + opts.protectionDomainName + '/dr_snapshots/'
            opts.method = 'GET'
            return call(opts)
        }
    },
    unprotectVMs: opts => {
        opts.url = 'https://' + opts.ip + ':9440//PrismGateway/services/rest/v1/protection_domains/' + opts.protectionDomainName + '/unprotect_vms'
        opts.method = 'POST'
        return call(opts)
    }
}