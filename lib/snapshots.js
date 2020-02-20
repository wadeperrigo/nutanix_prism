'use strict'

let call = require('./call.js')

// VM ACTIONS
module.exports = {
    create: createForVM,
    delete: deleteForVM,
    getByUUID: getBySnapshotUUID,
    getAllSnapshots: getAllSnapshots,
    getChangedRegions: getChangedRegions,
    getChangedRegionsBySnapshotUUID: getChangedRegionsBySnapshotUUID,
    getChangedRegionsBetweenSnapshotUUIDs: getChangedRegionsBetweenSnapshotUUIDs
}

/**
 * Opts requires uuid (vmUUID), snapshotType(<APPLICATION_CONSISTENT/CRASH_CONSISTENT>),
 * and nameOfSnapshot, creds: { username:'admin', password:'EXAMPLE_PW'}, ip: 'EXAMPLE_IP'
 * @param {Object} opts Options required for a vm snapshot
 */
function createForVM(opts) {
    opts.url = 'https://' + opts.ip + ':9440/api/nutanix/v3/vm_snapshots'
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
}

/**
 * Opts requires uuid (of VM), snapshotUUID, and creds: { username:'admin', password:'EXAMPLE_PW'}, ip: 'EXAMPLE_IP'
 * @param {Object} opts Options required for deleting a vm snapshot
 */
function deleteForVM(opts) {
    opts.method = 'DELETE'
    opts.url = 'https://' + opts.ip + ':9440/api/nutanix/v3/vm_snapshots/' + opts.uuid
    return call(opts)
}

/**
 * Opts requires opts.uuid (snapshotUUID), as well as opts.creds: { username:'admin', password:'EXAMPLE_PW'}, ip: 'EXAMPLE_IP'
 * @param {Object} opts Options required for a vm snapshot
 */
function getBySnapshotUUID(opts) {
    opts.method = 'GET'
    opts.url = 'https://' + opts.ip + ':9440/api/nutanix/v3/vm_snapshots/' + opts.uuid
    return call(opts)
}

function getAllSnapshots(opts) {
    opts.method = 'POST'
    opts.body = {
        kind: 'vm_snapshot'
    }
    opts.url = 'https://' + opts.ip + ':9440/api/nutanix/v3/vm_snapshots/list'
    return call(opts)
}

/**
 * Opts requires opts.snapshotPath (snapshotPath), as well as opts.creds: { username:'admin', password:'EXAMPLE_PW'}, ip: 'EXAMPLE_IP'
 * @param {Object} opts Options required for a vm snapshot
 */
function getChangedRegions(opts) {
    opts.url = 'https://' + opts.ip + ':9440/api/nutanix/v3/data/changed_regions'
    opts.body = {
        end_offset: 10737418240,
        snapshot_file_path: opts.snapshotPath,
        start_offset: 0,
        reference_snapshot_file_path: opts.snapshotPath2 || ''
    }
    opts.method = 'POST'
    return call(opts)
}

/**
 * Opts requires opts.uuid (snapshotUUID), as well as opts.creds: { username:'admin', password:'EXAMPLE_PW'}, ip: 'EXAMPLE_IP'
 * @param {Object} opts Options required for a vm snapshot
 */
function getChangedRegionsBySnapshotUUID(opts) {
    return new Promise (( resolve, reject ) => {
        getBySnapshotUUID(opts)
        .then(response => {
            if (response['status']['snapshot_file_list'].length) {
                opts.snapshotPath = response.status.snapshot_file_list[0].snapshot_file_path
                getChangedRegions(opts)
                .then(changedRegions => {
                    resolve(changedRegions)
                })
                .catch(err => reject('Failed to get snapshot changed regions by file path with err: ' + err))
            }
            else reject('Did not receive snapshot_file_list in api response')
        })
        .catch(reject)
    })
}

function getChangedRegionsBetweenSnapshotUUIDs(opts) {
    return new Promise ((resolve, reject) => {
        getBySnapshotUUID(opts)
        .then(snap1 => {
            opts.uuid = opts.uuid2
            getBySnapshotUUID(opts)
            .then(snap2 => {
                if (snap1['status']['snapshot_file_list'].length && snap2['status']['snapshot_file_list'].length) {
                    opts.snapshotPath = snap1.status.snapshot_file_list[0].snapshot_file_path
                    opts.snapshotPath2 = snap2.status.snapshot_file_list[0].snapshot_file_path
                    getChangedRegions(opts)
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