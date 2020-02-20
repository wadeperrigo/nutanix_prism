'use strict'

let call = require('./call.js')

// SCENARIO ACTIONS
module.exports = {
    create: create,
    delete: deleteScenario,
    getByName: getScenarioByName
}

/**
 * Creates a capacity planning scenario in Prism Central.
 * @param {Object} opts Options requires the full request body to be passed
 */
function create(opts) {
    opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v1/capacity_planning/scenarios'
    opts.method = 'POST'
    return call(opts)
}

/**
 * Deletes specified scenario by ID
 * @param {Object} opts Options requires additional parameter of scenarioUUID
 */
function deleteScenario(opts) {
    opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v1/capacity_planning/scenarios/' + opts.scenarioUUID
    opts.method = 'DELETE'
    return call(opts)
}

/**
 * Gets information about scenario specified by Name
 * @param {Object} opts Options requires additional parameter of scenarioName
 */
function getScenarioByName(opts) {
    opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v1/capacity_planning/scenarios/' + opts.scenarioName
    opts.method = 'GET'
    return call(opts)
}