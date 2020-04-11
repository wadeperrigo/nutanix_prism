'use strict'
let rp = require('request-promise-native')
module.exports = call

/**
 * Calls The Prism API with provided options
 * @param {Object} opts Options minimally must have properties creds, method, url
 * @returns {Promise} Returns a promise
 */
function call (opts) {
    return new Promise ((resolve,reject) => {
        let options = {
            auth: opts.creds,
            timeout: 30000,
            method: opts.method,
            uri: opts.url,
            json: true,
            strictSSL: false,
            gzip: true,
            resolveWithFullResponse: true,
            body: opts.body
        }
        rp(options)
        .then(response => {
            if (response['statusCode'] >= 200 && response['statusCode'] < 300) resolve(handleJsonParse(response.body))
            else if (response['statusCode'] == 'Unauthorized' || response['statusCode'] > 400) {
                let rejectData = handleJsonParse(response['body'])
                (rejectData['message']) ? reject(rejectData.message) : reject(`Prism Failure: ${response['statusCode']} : ${rejectData}`)
            }
            else resolve(handleJsonParse(response.body))
        }).catch(err => { dlog(err); reject(err) })
    })
}

/**
 * Simple function that tries to convert body data to an object
 * otherwise it will return it as a String or the parsing error
 * @param {String} jsonData JSON body data
 * @returns Object or String from input data else returns parseErr string
 */
function handleJsonParse(jsonData) {
    let data
    try { data = JSON.parse(jsonData) }
    catch (parseErr) { data = jsonData }
    return data
}