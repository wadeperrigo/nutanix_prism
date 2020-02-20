'use strict'

let call = require('./call.js')

// MARKETPLACE ACTIONS
module.exports = {
    create: createMarketplace,
    delete: deleteMarketplace,
    get: getMarketplace
}
    
/**
 * Creates a marketplace item.
 * @param {Object} opts Options object. Passes an existing request body.
 */
function createMarketplace(opts) {
    opts.url = 'https://' + opts.ip + ':9440/api/nutanix/v3/marketplace_items/render'
    opts.method = 'POST'
    return call(opts)
}

/**
 * Deletes a marketplace item given a UUID.
 * The reason this is a batch is that the marketplace delete request doesn't return 
 * any response. This way we get a 202 if Prism received the response. The good news
 * is that it does return a specific response if the entity wasn't found, so we can
 * confidently move a catalog item to 'cleaned' if we get that response.
 * @param {Object} opts Options object. Requires a marketplace item uuid.
 */
function deleteMarketplace(opts) {
    opts.url = 'https://' + opts.ip + ':9440/api/nutanix/v3/batch'
    opts.body = {
        'action_on_failure': 'CONTINUE',
        'execution_order': 'SEQUENTIAL',
        'api_request_list': [
            {
                'operation': 'DELETE',
                'path_and_params': '/api/nutanix/v3/marketplace_items/' + opts.uuid
            }
        ],
        'api_version': '3.0'
    }
    return call(opts)
}

/**
 * Gets a list of all marketplace items from Prism Central. Be careful though, this
 * list is HUUUUGE. Like 20k+ lines huge.
 * @param {Object} opts Options object. No additional parameters required.
 */
function getMarketplace(opts) {
    opts.url = 'https://' + opts.ip + ':9440/api/nutanix/v3/marketplace_items/list'
    opts.method = 'POST'
    opts.body = {} // Will barf if no body is passed
    return call(opts)
}

/**
 * Gets a marketplace item by a given UUID.
 * @param {Object} opts Options object. Requires a marketplace item UUUID.
 */
function getMarketplaceByUUID(opts) {
    opt.url = 'https://' + opts.ip + ':9440/api/nutanix/v3/marketplace_items/' + opts.itemUUID
    opts.method = 'GET'
    return call(opts)
}