'use strict'

let request = require('request')

module.exports = call

/**
 * Calls The Prism API with provided options
 * @param {Object} opts Options minimally must have properties creds, method, url
 * @returns {Promise} Returns a promise
 */
function call (opts) {
    return new Promise (( resolve, reject ) => {
        let options = {
            auth: opts.creds,
            timeout: 30000,
            time: 30000,
            method: opts.method,
            uri: opts.url,
            json: true,
            rejectUnauthorized: false,
            body: opts.body
        }
        request(options, function(err, response, body) {
            if (err) {
                let errData = ''
                try {
                    errData = JSON.parse(err)
                }
                catch (parseErr) {
                    errData = err
                }
                reject('Prism Error: ' + errData)
            }
            else if (response['statusMessage'] == 'Unauthorized' || response.statusCode > 202) {
                let rejectData = ''
                try {
                    rejectData = JSON.parse(body)
                }
                catch (err) {
                    if (body) { rejectData = body }
                    else { rejectData = 'emptyResponse' }
                }
                if (rejectData['message']) {
                    reject(rejectData.message)
                } else {
                    reject('Prism Failure: ' + response['statusMessage'] + ' : ' + rejectData)
                }
            }
            else {
                let sendData = ''
                try {
                    sendData = JSON.parse(response.body)
                }
                catch (err) {
                    sendData = response.body
                }
                resolve(sendData)
            }
        })
    })
}