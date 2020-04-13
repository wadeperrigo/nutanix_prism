'use strict'

let call = require('./call.js')

// CLUSTER ACTIONS
module.exports = {
    /**
     * Get information about a particular cluster.
     * @param {Object} opts Options requires no additional parameters
     * @returns {Promise}
     */
    get: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v1/cluster/`
        opts.method = 'GET'
        return call(opts)
    },
    management_servers: {
        /**
         * Registers a vcenter to a particular cluster.
         * @param {Object} opts Options requires {creds.password:String,vcsaIP:String}
         * @returns {Promise}
         */
        register: opts=> {
            opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v1/management_servers/register`
            opts.method = 'POST',
            opts.body = {
                "adminUsername":"administrator@vsphere.local",
                "adminPassword": opts.creds.password,
                "ipAddress": opts.vcsaIP,
                "port": "443"
            }
            return call(opts)
        }
    },
    /**
     * Update information about a particular cluster
     * @param {Object} opts Options requires {body:{See Nutanix Documentation}}
     * @returns {Promise}
     */
    patch: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v2.0/cluster`
        opts.method = 'PATCH'
        return call(opts)
    },
    /**
     * Update information about a particular cluster
     * @param {Object} opts Options requires {dataServicesIP:String}
     * @returns {Promise}
     */
    setDataServicesIPv2: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v2.0/cluster`
        opts.method = 'PATCH'
        opts.body = {
            cluster_external_data_services_ipaddress: opts.dataServicesIP
        }
        return call(opts)
    },
    /**
     * Update information about a particular cluster using v1 API's
     * @param {Object} opts Options requires {dataServicesIP:String}
     * @returns {Promise}
     */
    setDataServicesIPv1: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v1/cluster`
        opts.method = 'PATCH'
        opts.body = {
            clusterExternalDataServicesIPAddress: opts.dataServicesIP
        }
        return call(opts)
    },
    util: {
        /**
         * Change cluster_default_password
         * @param {Object} opts Options requires {newPassword:String}
         * @returns {Promise}
         */
        change_default_password: opts => {
            opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v1/utils/change_default_system_password`
            opts.method = 'POST'
            opts.creds = {
                username: 'admin',
                password: 'Nutanix/4u'
            }
            opts.body = {
                oldPassword: 'Nutanix/4u',
                newPassword: opts.newPassword
            }
            return call(opts)
        }
    }
}