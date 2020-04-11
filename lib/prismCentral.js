'use strict'

let call = require('./call.js')

// PRISM CENTRAL DEPLOY FUNCTIONS
module.exports = {
    /**
     * Deploys a Prism Central to a cluster.
     * @param {Object} opts Options requires {pcVersion:String,containerUUID:String,nameserver:String,
     *      pcIP:String,networkUUID:String,subnet_mask:String,defaultGateway:String}
     * @returns {Promise}
     */
    deploy: opts => {
        opts.url = `https://${opts.ip}:9440/api/nutanix/v3/prism_central`
        opts.method = 'POST'
        opts.body = {
            "resources": {
                "version": opts.pcVersion,
                "should_auto_register": false,
                "pc_vm_list": [
                    {
                        "vm_name": "RXAutomationPC",
                        "container_uuid": opts.containerUUID,
                        "num_sockets": 4,
                        "data_disk_size_bytes": 536870912000,
                        "memory_size_bytes": 17179869184,
                        "dns_server_ip_list": [opts.nameserver],
                        "nic_list": [
                            {
                                "ip_list": [
                                    opts.pcIP
                                ],
                                "network_configuration": {
                                    "network_uuid": opts.networkUUID,
                                    "subnet_mask": opts.subnet_mask,
                                    "default_gateway": opts.defaultGateway
                                }
                            }
                        ]
                    }
                ]
            }
        }
        return call(opts)
    },
    /**
     * Gets a compatible version of Prism Central by calling the cluster RestAPI
     * @param {Object} opts Options requires no additional parameters
     * @returns {Promise}
     */
    getCompatibleVersions: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v1/upgrade/prism_central_deploy/softwares`
        opts.method = 'GET'
        return call(opts)
    },
    /**
    * Registers a cluster to the prism central.
    * @param {Object} opts Options requires {pcIP:String,pcPassword}
    * @returns {Promise}
    */
    register: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v1/multicluster/prism_central/register`
        opts.method = 'POST'
        opts.body = {
            "ipAddresses":[opts.pcIP],
            "username":"admin",
            "password": opts.pcPassword,
            "port": 9440
        }
        return call(opts)
    }
}