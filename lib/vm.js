'use strict'

let call = require('./call.js')

// VM ACTIONS
module.exports = {
    /**
     * See Prism documentation for VM configuration
     * @param {Object} opts Options requires {body:Object (entire VM config -- see nutanix documentation)}
     * @returns {Promise}
     */
    create: (opts) => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v2.0/vms/`
        opts.method = 'POST'
        return call(opts)
    },
    /**
     * Deletes a VM by UUID
     * @param {Object} opts Options requires {vmName:String}
     * @returns {Promise}
     */
    delete: (opts) => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v2.0/vms/${opts.vmUUID}/?delete_snapshots=true`
        opts.method = 'DELETE'
        return call(opts)
    },
    /**
     * Remove a NIC from a vm.
     * @param {Object} opts Options requires {vmUUID:String,macAddress:String} to be deleted
     * @returns {Promise}
     */
    deleteNIC: (opts) => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v2.0/vms/${opts.vmUUID}/nics/${opts.macAddress}`
        opts.method = 'DELETE'
        return call(opts)
    },
    /**
     * Attach a Disk to a vm by UUID.
     * @param {Object} opts Options requires {vmUUID:String,storageContainerUUID:String,diskSizeInBytes:Number,diskCount:Number (optional: Default: 1)}
     * @returns {Promise}
     */
    diskAttach: opts => {
        opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v2.0/vms/' + opts.vmUUID + '/disks/attach'
        opts.method = 'POST'
        let diskCount = 1
        if (opts['diskCount']) { diskCount = opts['diskCount'] }
        let vmDisks = []
        for (let i = 0; i < diskCount; i++) {
            let thisDisk = {
                is_cdrom: false,
                disk_address: {
                    device_bus: "scsi"
                },
                vm_disk_create: {
                    storage_container_uuid: opts.storageContainerUUID,
                    size: opts.diskSizeInBytes
                }
            }
            vmDisks.push(thisDisk)
        }
        opts.body = { vm_disks: vmDisks }
        return call(opts)
    },
    /**
     * Gets a vm by a specific UUID
     * @param {Object} opts Options requires {vmUUID:String}
     * @returns {Promise}
     */
    get: (opts) => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v2.0/vms/${opts.vmUUID}?include_vm_disk_config=true&include_vm_nic_config=true`
        opts.method = 'GET'
        return call(opts)
    },
    /**
     * Gets a list of all VM's
     * @param {Object} opts No additional parameters accepted
     * @returns {Promise}
     */
    getAll: (opts) => {
        opts.url = `https://${opts.ip}:9440/api/nutanix/v3/vms/list`
        opts.body = {
            kind: "vm",
            sort_order: "ASCENDING",
            sort_attribute: "name"
        }
        opts.method = 'POST'
        return call(opts)
    },
    /**
     * Gets a list of vm's by search string provided in options
     * @param {Object} opts Options requires {vmName:String}
     * @returns {Promise}
     */
    getByName: (opts) => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v2.0/vms/?filter=vm_name%3D%3D${opts.vmName}&include_vm_disk_config=true&include_vm_nic_config=true`
        opts.method = 'GET'
        return call(opts)
    },
    /**
     * Gets virtual NIC information from a vm
     * @param {Object} opts Options requires {vmUUID:String}
     * @returns {Promise}
     */
    getNetwork: (opts) => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v2.0/vms/${opts.vmUUID}/nics/?include_address_assignments=true`
        opts.method = 'GET'
        return call(opts)
    },
    /**
     * Restarts a vm by a given UUID
     * @param {Object} opts Options requires {vmUUID:String,hostUUID:String (Optional)}
     * @returns {Promise}
     */
    restart: opts => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v2.0/vms/${opts.vmUUID}/set_power_state/`
        opts.method = 'POST'
        opts.body = { transition: 'ACPI_REBOOT' }
        if (opts['hostUUID']) { opts.body.host_uuid = opts['hostUUID'] }
        return call(opts)
    },
    /**
    * Restore vm by vmUUID and snapshotUUID
    * @param {Object} opts Options required {vmUUID:String,snapshotUUID:String}
    * @returns {Promise}
    */
    restoreByVMUUIDAndSnapshotUUID: (opts) => {
        opts.method = 'POST'
        opts.url = `https://${opts.ip}:9440/api/nutanix/v0.8/vms/${opts.vmUUID}/restore`
        opts.body = { "snapshotUuid": `${opts.snapshotUUID}`, "restoreNetworkConfiguration": true }
        return call(opts)
    },
    /**
     * Initiates a power on of a vm
     * @param {Object} opts Options requires {vmUUID:String,hostUUID:String (Optional)}
     * @returns {Promise}
     */
    start: (opts) => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v2.0/vms/${opts.vmUUID}/set_power_state/`
        opts.method = 'POST'
        opts.body = { transition: 'ON' }
        if (opts['hostUUID']) { opts.body.host_uuid = opts['hostUUID'] }
        return call(opts)
    },
    /**
     * Update VM with the vmConfig provided
     * @param {Object} opts Options requires {vmUUID:String,vmConfig:Object (see Nutanix documentation)}
     * @returns {Promise}
     */
    update: (opts) => {
        opts.url = `https://${opts.ip}:9440/PrismGateway/services/rest/v2.0/vms/${opts.vmUUID}/`
        opts.method = 'PUT'
        opts.body = opts.vmConfig
        return call(opts)
    }
}