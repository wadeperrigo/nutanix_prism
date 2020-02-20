'use strict'

let call = require('./call.js')

// TASK ACTIONS
module.exports = {
    get: getTask,
    getAll: getAll
}

/**
 * Returns information about a specified prism task
 * @param {Object} opts Options requires property taskUUID
 */
function getTask(opts) {
    opts.url = 'https://' + opts.ip + ':9440/PrismGateway/services/rest/v2.0/tasks/' + opts.taskUUID + '/'
    opts.method = 'GET'
    return call(opts)
}

/**
 * This will query for all tasks and additional options are available
 * @param {Object} opts Options can have optional properties of type,startTime,includeCompleted,includeSubTask
 */
function getAll(opts) {
    opts.body = { include_completed: true, include_subtasks_info: false }
    if (opts['type']) { opts.body.operation_type_list = opts.type }
    if (opts['startTime']) { opts.body.cut_off_time_usecs = opts.startTime }
    if (opts['includeCompleted']) { opts.body.include_completed = opts.includeCompleted }
    if (opts['includeSubTask']) { opts.body.include_subtasks_info = opts.includeSubTask }
    opts.url = 'https://' + opts.ip + ':9440/api/nutanix/v2.0/tasks/list'
    opts.method = 'POST'
    return call(opts)
}