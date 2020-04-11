'use strict'

let call = require('./call.js')

// VM ACTIONS
module.exports = {
    /**
     * Creates a new snapshot based upon vm uuid, snapshotType, and name of given snapshot
     * @param {Object} opts Options required {uuid:String,snapshotType:String<APPLICATION_CONSISTENT/CRASH_CONSISTENT>,
     * nameOfSnapshot:String}
     * @returns {Promise}
     */
    create: (opts) => {
        opts.url = `https://${opts.ip}:9440/api/nutanix/v3/vm_snapshots`
        opts.body = {
            spec: {
                resources: {
                    entity_uuid: opts.uuid
                },
                snapshot_type: opts.snapshotType,
                name: opts.nameOfSnapshot
            },
            api_version: '3.0',
            metadata: {
                kind: 'vm_snapshot'
            }
        }
        opts.method = 'POST'
        return call(opts)
    },
    /**
     * Deletes a snapshot for a particular VM based upon vm uuid and snapshotUUID
     * @param {Object} opts Options required {uuid:String,snapshotUUID:String}
     * @returns {Promise}
     */
    delete: (opts) => {
        opts.method = 'DELETE'
        opts.url = `https://${opts.ip}:9440/api/nutanix/v3/vm_snapshots/${opts.uuid}`
        return call(opts)
    },
    /**
     * Retrieves information about a specific snapshot by UUID
     * @param {Object} opts Options required {snapshotUUID:String}
     * @returns {Promise}
     */
    getByUUID: (opts) => {
        opts.method = 'GET'
        opts.snapshotUUID = opts.uuid || opts.snapshotUUID
        opts.url = `https://${opts.ip}:9440/api/nutanix/v3/vm_snapshots/${opts.snapshotUUID}`
        return call(opts)
    },
    /**
     * Get All snapshots available
     * @param {Object} opts requires nothing extra
     * @returns {Promise}
     */
    getAllSnapshots: (opts) => {
        opts.method = 'POST'
        opts.body = {
            kind: 'vm_snapshot'
        }
        opts.url = `https://${opts.ip}:9440/api/nutanix/v3/vm_snapshots/list`
        return call(opts)
    },

    /**
     * Get all snapshots available to a particular VM By UUID
     * @param {Object} opts Options required {vmUUID:String}
     * @returns {Promise}
     */
    getAllSnapshotsByVMUUID: (opts) => {
        opts.method = 'GET'
        opts.url = `https://${opts.ip}:9440/api/nutanix/v0.8/vms/${opts.vmUUID}/snapshots?includeSnapshots=true`
        return call(opts)
    },
    /**
     * Gets changed regions for a given 1 or 2 snapshot paths
     * @param {Object} opts Options required {snapshotPath1:String,snapshotPath2(optional)}
     * @return {Promise}
     */
    getChangedRegions: (opts) => {
        opts.url = `https://${opts.ip}:9440/api/nutanix/v3/data/changed_regions`
        opts.body = {
            end_offset: 10737418240,
            snapshot_file_path: opts.snapshotPath1,
            start_offset: 0,
            reference_snapshot_file_path: opts.snapshotPath2 || ''
        }
        opts.method = 'POST'
        return call(opts)
    },
    /**
     * Gets changed Regions by a snapshot UUID
     * @param {Object} opts Options required {snapshotUUID:String}
     * @returns {Promise}
     */
    getChangedRegionsBySnapshotUUID: (opts) => {
        return new Promise (( resolve, reject ) => {
            this.getByUUID(opts)
            .then(response => {
                if (response['status']['snapshot_file_list'].length) {
                    opts.snapshotPath = response.status.snapshot_file_list[0].snapshot_file_path
                    this.getChangedRegions(opts)
                    .then(changedRegions => {
                        resolve(changedRegions)
                    })
                    .catch(err => reject('Failed to get snapshot changed regions by file path with err: ' + err))
                }
                else reject('Did not receive snapshot_file_list in api response')
            })
            .catch(reject)
        })
    },

    /**
     * Gets changed Regions between two snapshot UUID
     * @param {Object} opts Options required {snapshotUUID1:String,snapshotUUID2:String}
     * @returns {Promise}
     */
    getChangedRegionsBetweenSnapshotUUIDs: (opts) => {
        return new Promise ((resolve, reject) => {
            opts.snapshotUUID = opts.snapshotUUID1
            this.getByUUID(opts)
            .then(snap1 => {
                opts.snapshotUUID = opts.snapshotUUID2
                this.getByUUID(opts)
                .then(snap2 => {
                    if (snap1['status']['snapshot_file_list'].length && snap2['status']['snapshot_file_list'].length) {
                        opts.snapshotPath1 = snap1.status.snapshot_file_list[0].snapshot_file_path
                        opts.snapshotPath2 = snap2.status.snapshot_file_list[0].snapshot_file_path
                        this.getChangedRegions(opts)
                        .then(changedRegions => {
                            resolve(changedRegions)
                        })
                        .catch(err => reject('Failed to get snapshot changed regions by file path with err: ' + err))
                    }
                    else {
                        reject ('Did not receive snapshot_file_list in one of the api responses')
                    }
                }).catch(err => reject('Error getting second snapshot: ' + JSON.stringify(err)))
            }).catch(err => reject('Error getting first snapshot: ' + JSON.stringify(err)))
        })
    }
}