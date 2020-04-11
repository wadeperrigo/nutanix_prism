'use strict'

let call = require('./call.js')

// CATEGORY ACTIONS
module.exports = {
    /**
     * Deletes a list of categories and it's values
     * @param {Object} opts Options requires {categories:Array[{name:String,value:String}] array of objects.
     * @return {Promise}
     */
    delete: opts => {
        opts.url = `https://${opts.ip}:9440/api/nutanix/v3/batch`
        opts.method = 'POST'
        opts.body = {
            action_on_failure:'CONTINUE',
            execution_order:'SEQUENTIAL',
            api_request_list:[],
            api_version:'3.0'
        }
        opts.categories.forEach(c => {
            c.values.forEach(v => {
                opts.body.api_request_list.push({operation:'DELETE',path_and_params:`/api/nutanix/v3/categories/${c.name}/${v}`})
            })
            opts.body.api_request_list.push({operation:'DELETE',path_and_params:`/api/nutanix/v3/categories/${c.name}`})
        })
        return call(opts)
    }
}