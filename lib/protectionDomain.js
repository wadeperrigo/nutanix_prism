'use strict'

let call = require('./call.js')

// PROTECTION DOMAIN ACTIONS
module.exports = {
    /**
     * Deletes a ProtectionDomain by Name
     * @param {Object} opts Options requires {protectionDomainName:String}
     * @returns {Promise}
     */
    delete: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v1/protection_domains/${opts.protectionDomainName}`
        opts.method = 'DELETE'
        return call(opts)
    },
    /**
     * Gets a ProtectionDomain details by Name
     * @param {Object} opts Options requires {protectionDomainName:String}
     * @returns {Promise}
     */
    get: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v1/protection_domains/?names=${opts.protectionDomainName}`
        opts.method = 'GET'
        return call(opts)
    },
    /**
     * Creates a ProtectionDomain by Name
     * @param {Object} opts Options requires {protectionDomainName:String}
     * @returns {Promise}
     */
    create: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v2.0/protection_domains/`
        opts.method = 'POST'
        opts.body = {value: opts.protectionDomainName}
        return call(opts)
    },
    /**
     * Deletes a ProtectionDomain's schedules by PD Name
     * @param {Object} opts Options requires {protectionDomainName:String}
     * @returns {Promise}
     */
    schedules: {
        delete: opts => {
            opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v1/protection_domains/${opts.protectionDomainName}/schedules`
            opts.method = 'DELETE'
            return call(opts)
        }
    },
    snapshots: {
        /**
         * Clones a ProtectionDomain's vm's by PD Name and snapshotID
         * @param {Object} opts Options requires {protectionDomainName:String,snapshotID:String,prefix:String,vmUUIDs:Array}
         * @returns {Promise}
         */
        clone: opts => {
            opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v1/protection_domains/${opts.protectionDomainName}/snapshots/${opts.snapshotID}/clone`
            opts.method = 'POST'
            opts.body = {
                replace: false,
                snapshot_id: opts.snapshotID,
                vg_name_prefix: opts.prefix,
                vm_name_prefix: opts.prefix,
                vm_uuids: opts.vmUUIDs,
                snapshotId: opts.snapshotID
            }
            return call(opts)
        },
        /**
         * Creates a one-time ProtectionDomain snapshot by PD Name
         * @param {Object} opts Options requires {protectionDomainName:String}
         * @returns {Promise}
         */
        create: opts => {
            opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v1/protection_domains/${opts.protectionDomainName}/oob_schedules`
            opts.method = 'POST'
            opts.body = {
                remoteSiteNames:[],
                scheduleStartTimeUsecs:Date.now()*1000,
                snapshotRetentionTimeSecs:null,
                appConsistent:false
            }
            return call(opts)
        },
        /**
         * Deletes a ProtectionDomain's snapshot by PD Name and snapshotID
         * @param {Object} opts Options requires {protectionDomainName:String,snapshotID:String}
         * @returns {Promise}
         */
        delete: opts => {
            opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v1/protection_domains/${opts.protectionDomainName}/dr_snapshots/${opts.snapshotId}`
            opts.method = 'DELETE'
            return call(opts)
        },
        /**
         * Deletes a List of ProtectionDomain's snapshots by PD Name and snapshotList
         * @param {Object} opts Options requires {protectionDomainName:String,snapshotList:Array}
         * @returns {Promise}
         */
        deleteList: opts => {
            opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v1/protection_domains/${opts.protectionDomainName}/dr_snapshots/remove_list`
            opts.method = 'POST'
            opts.body = opts.snapshotList
            return call(opts)
        },
        /**
         * Deletes a ProtectionDomain's snapshot by PD Name and snapshotID
         * @param {Object} opts Options requires {protectionDomainName:String,snapshotID:String}
         * @returns {Promise}
         */
        deleteSnapshotID: opts => {
            opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v1/protection_domains/${opts.protectionDomainName}/dr_snapshots/${opts.snapshotId}`
            opts.method = 'DELETE'
            return call(opts)
        },
        /**
         * Gets a ProtectionDomain's snapshot(s) details by PD Name and optional oobScheduleID
         * @param {Object} opts Options requires {protectionDomainName:String,<optional>oobScheduleID:String}
         * @returns {Promise}
         */
        get: opts => {
            opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v1/protection_domains/${opts.protectionDomainName}/dr_snapshots/`
            if (opts.oobScheduleID) opts.url = `${opts.url}?oobScheduleIds=${opts.oobScheduleID}`
            opts.method = 'GET'
            return call(opts)
        }
    },
    /**
     * Unprotects all vm's from a ProtectionDomain by PD Name
     * @param {Object} opts Options requires {protectionDomainName:String}
     * @returns {Promise}
     */
    unprotectVMs: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v1/protection_domains/${opts.protectionDomainName}/unprotect_vms`
        opts.method = 'POST'
        return call(opts)
    }
}