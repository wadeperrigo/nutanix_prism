'use strict'

let call = require('./call.js')

// PROTECTION DOMAIN ACTIONS
module.exports = {
    /**
     * Creates a ProtectionDomain by Name
     * @param {Object} opts Options requires {protectionDomainName:String}
     * @returns {Promise}
     */
    create: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v2.0/protection_domains/`
        opts.method = 'POST'
        opts.body = { value: opts.protectionDomainName }
        return call(opts)
    },
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
    protectVMs: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v1/protection_domains/${opts.protectionDomainName}/protect_vms`
        opts.method = 'POST'
        opts.body = {
            app_consistent_snapshots: false,
            ignore_dup_or_missing_vms: true,
            uuids: opts.vmUUIDs
        }
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
         * @param {Object} opts Options requires {protectionDomainName:String,snapshotID:String,prefix:String,vmNameArray:Array,vmUUIDs:Array (must specify vmNameArray, vmUUIDs, or volumeGroupUUIDs)}
         * @returns {Promise}
         */
        clone: opts => {
            opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v2.0/protection_domains/${opts.protectionDomainName}/restore_entities`
            opts.method = 'POST'
            opts.body = {
                replace: false,
                snapshot_id: opts.snapshotID,
                vg_name_prefix: opts.prefix,
                vm_name_prefix: opts.prefix,
                snapshotId: opts.snapshotID
            }
            if (opts['vmNameArray']) opts.body.vm_names = opts.vmNameArray
            if (opts['vmUUIDs']) opts.body.vm_uuids = opts.vmUUIDs
            if (opts['volumeGroupUUIDs']) opts.body.volume_group_uuids = opts.volumeGroupUUIDs
            if (opts['replace']) opts.body.replace = true
            return call(opts)
        },
        /**
         * Creates a one-time ProtectionDomain snapshot by PD Name
         * @param {Object} opts Options requires {protectionDomainName:String,remoteSiteNames:Array (Optional)}
         * @returns {Promise}
         */
        create: opts => {
            opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v1/protection_domains/${opts.protectionDomainName}/oob_schedules`
            opts.method = 'POST'
            opts.body = {
                remoteSiteNames: [],
                scheduleStartTimeUsecs: Date.now() * 1000,
                snapshotRetentionTimeSecs: null,
                appConsistent: false
            }
            if (opts.remoteSiteNames) opts.body.remoteSiteNames = opts.remoteSiteNames
            return call(opts)
        },
        /**
         * Deletes a ProtectionDomain's snapshot by PD Name and snapshotID
         * @param {Object} opts Options requires {protectionDomainName:String,snapshotId:String}
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
         * @param {Object} opts Options requires {protectionDomainName:String,snapshotId:String}
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
        },
        /**
         * Restores existing VM's to their last known state based upon snapshotID
         * @param {Object} opts Options requires {protectionDomainName:String,snapshotId,namePrefix:String,vmNameArray:Array,vmUUIDs:Array,volumeGroupUUIDs:Array (must specify vmNameArray, vmUUIDs, or volumeGroupUUIDs)}
         */
        restore: opts => {
            opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v2.0/protection_domains/${opts.protectionDomainName}/restore_entities`
            opts.method = 'POST'
            opts.body = {
                snapshotId: opts.snapshotId,
                pathPrefix: null,
                vgNamePrefix: opts.namePrefix,
                vmNamePrefix: opts.namePrefix
            }
            if (opts['vmNameArray']) opts.body.vm_names = opts.vmNameArray
            if (opts['vmUUIDs']) opts.body.vm_uuids = opts.vmUUIDs
            if (opts['volumeGroupUUIDs']) opts.body.volume_group_uuids = opts.volumeGroupUUIDs
            if (opts['replace']) opts.body.replace = true
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