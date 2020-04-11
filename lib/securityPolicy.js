'use strict'

let call = require('./call.js')

// SECURITY POLICY ACTIONS
module.exports = {
    /**
     * Deletes a list of policies
     * @param {Object} opts Options requires {entityIds:Array}
     * @returns {Promise} SAMPLE RESPONSE: {'api_response_list': [{'status': '202', 'api_response': '',
     *      'path_and_params': '/api/nutanix/v3/network_security_rules/6a460c35-91ce-4164-9366-718a1b925d11'}]}
     */
    delete: (opts) => {
        opts.url = `https://${opts.ip}:9440/api/nutanix/v3/batch`
        opts.method = 'POST'
        opts.body = {
            action_on_failure:'CONTINUE',
            execution_order:'SEQUENTIAL',
            api_request_list:[],
            api_version:'3.0'
        }
        opts.entityIds.forEach(e => {
            opts.body.api_request_list.push({
                operation:'DELETE',
                path_and_params:'/api/nutanix/v3/network_security_rules/' + e
            })
        })
        return call(opts)
    },
    /**
     * Get an object containing a list of security policies / network rules 
     * containing name string specified
     * @param {Object} opts Options requires {securityPolicyName:String}
     * @returns {Promise} // SAMPLE RESPONSE: {'entity_type': 'network_security_rule', 'filtered_group_count': 1, 
     *      'total_entity_count': 3, 'filtered_entity_count': 1, 'group_results': [{'entity_results': [
     *      {'entity_id': '6a460c35-91ce-4164-9366-718a1b925d11', 'data': [{'values': [{'values': ['MyBadassApp'],
     *      'time': 1522780302780999}], 'name': 'name'}, {'values': [{'values': ['DemoNutanix'], 'time': 1522780302780999}],
     *      'name': 'annotation'}, {'values': [{'values': ['kApp'], 'time': 1522780302780999}], 'name': 'rule_type'},
     *      {'values': [{'values': ['kApply'], 'time': 1522780302780999}], 'name': 'mode'}, {'values': [
     *      {'values': ['{\'inbound_list\': [{\'ip_subnet\': \'10.21.249.101/32\', \'tcp_port_range_list\': [
     *      {\'end_port\': 8443, \'start_port\': 8443}, {\'end_port\': 443, \'start_port\': 443}], \'protocol\': 3,
     *      \'peer_specification_type\': 3}], \'target_group\': {\'categories\': [{\'name\': \'AppType\', \'value\': \'Default\'}],
     *      \'peer_specification_type\': 2, \'category_uuid_list\': [\'774e0ea4-fe43-4926-b73b-6cf3cca5e8dd\']},
     *      \'outbound_list\': [{\'ip_subnet\': \'10.0.0.0/8\', \'tcp_port_range_list\': [{\'end_port\': 8443, \'start_port\': 8443}],
     *      \'protocol\': 3, \'peer_specification_type\': 3}]}'], 'time': 1522780546795033}], 'name': 'rule'}, {'values': [
     *      {'values': ['1522780302780999'], 'time': 1522780302780999}], 'name': '_modified_timestamp_usecs_'}, {'values': [
     *      {'values': ['0'], 'time': 1522780546794661}], 'name': 'spec_version'}]}], 'group_by_column_value': '', 'total_entity_count': 1,
     *      'group_summaries': {}}], 'total_group_count': 1}
     */
    getByName: (opts) => {
        opts.url = `https://${opts.ip}:9440/api/nutanix/v3/groups`
        opts.method = 'POST'
        opts.body = {
            entity_type:'network_security_rule',
            group_member_sort_attribute:'_modified_timestamp_usecs_',
            group_member_attributes:[
                {attribute:'spec_version'},
                {attribute:'name'},
                {attribute:'annotation'},
                {attribute:'rule_type'},
                {attribute:'mode'},
                {attribute:'rule'},
                {attribute:'_modified_timestamp_usecs_'},
                {attribute:'categories'}
            ],
            query_name:'prism:NetworkSecurityQueryModel',
            filter_criteria:`name==${opts.securityPolicyName}`
        }
        return call(opts)
    }
}