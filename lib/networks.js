'use strict'

let call = require('./call.js')

// NETWORK ACTIONS
module.exports = {
    /**
     * Create a new network with specified vlan ID
     * @param {Object} opts Options requires {networkName:String,vlanID:Number,annotation:String (Optional)}
     * @returns {Promise}
     */
    create: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v2.0/networks/`
        opts.method = 'POST',
        opts.body = {
            name: opts.networkName,
            vlan_id: opts.vlanID
        }
        if (opts['annotation']) {opts.body.annotation = opts.annotation}
        return call(opts)
    },
    /**
     * Deletes a new network by specified network UUID
     * @param {Object} opts Options requires {networkUUID:String}
     * @returns {Promise}
     */
    delete: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v2.0/networks/${opts.networkUUID}`
        opts.method = 'DELETE'
        return call(opts)
    },
    /**
     * Gets a list of networks on a cluster
     * @param {Object} opts Options requires no additional parameters
     * @returns {Promise}
     */
    get: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v2.0/networks/`
        opts.method = 'GET'
        return call(opts)
    },
    /**
     * Gets a network detailsby specified network UUID
     * @param {Object} opts Options requires {networkUUID:String}
     * @returns {Promise}
     */
    getByUUID: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v2.0/networks/${opts.networkUUID}`
        opts.method = 'GET'
        return call(opts)
    },
    /**
     * Creates a new IPAM network by specifying network name, vlan id, default gateway, network address, prefix length
     * and ip pool start range and end range
     * @param {Object} opts Options requires {networkName:String,vlanID:Number,defaultGateway:String,networkAddress:String,
     *      prefixLength:Number,poolRangeStart:String,poolRangeEnd:String,annotation:String (optional),dchpServerAddress:String (Optional),
     *      dnsServer:String (Optional)}
     * @returns {Promise}
     */
    createIpamNetwork: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v2.0/networks/`
        opts.method = 'POST',
        opts.body = {
            name: opts.networkName,
            vlan_id: opts.vlanID,
            ip_config: {
                default_gateway: opts.defaultGateway,
                network_address: opts.networkAddress,
                prefix_length: opts.prefixLength,
                pool: [{range: opts.poolRangeStart + " " + opts.poolRangeEnd}]
            }
        }
        if (opts['annotation']) {opts.body.annotation = opts.annotation}
        if (opts['dhcpServerAddress']) {opts.body.ip_config.dhcp_server_address = opts.dhcpServerAddress}
        if (opts['dnsServer']) {
            opts.body.ip_config.dhcp_options = {
                domain_name_servers: opts.dnsServer
            }
        }
        return call(opts)
    },
    /**
     * Gets a lit of networks on a cluster using the old v0.8 API
     * @param {Object} opts Options requires no additional parameters
     * @returns {Promise}
     */
    v08get: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v0.8/networks/`
        opts.method = 'GET'
        return call(opts)
    }
}