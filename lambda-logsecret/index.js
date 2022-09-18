const base32 = require('thirty-two');
const axios = require('axios');
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async(event, context) => {
    const headers = {"Access-Control-Allow-Origin": "*"}
    const API_KEY = event["queryStringParameters"]['api']
    const qrEncode = event["queryStringParameters"]['userQrURI']
    let duoResponse;
    try {
        const uri = qrEncode.split('-', 2)
        const code = uri[0];
        const buff1 = Buffer.from(uri[1], 'base64');
        const host = buff1.toString('ascii');
        console.log(host)
        console.log(code)
        const url = `https://${host}/push/v2/activation/${code}?customer_protocol=1`
        const headers = {'User-Agent': 'okhttp/2.7.5'}
        const data = {'jailbroken': 'false',
        'architecture': 'arm64',
        'region': 'US',
        'app_id': 'com.duosecurity.duomobile',
        'full_disk_encryption': 'true',
        'passcode_status': 'true',
        'platform': 'Android',
        'app_version': '3.49.0',
        'app_build_number': '323001',
        'version': '11',
        'manufacturer': 'unknown',
        'language': 'en',
        'model': 'Pixel 3a',
        'security_patch_level': '2021-02-01'}
        console.log('about to post')
        const re = await axios.post(url, data, {
            headers: headers
        })
        console.log(re)
        duoResponse = re.data.response
    }
    catch (err) {
        return {
            statusCode: 500,
            headers: headers,
            body: err
        };
    }
    const finalSecret = base32.encode(duoResponse.hotp_secret).toString()
    try {
        const res = await getValues(API_KEY)
        if (!res || res === {} || !res.Item) {
            throw 'key nonexistent in database'
        }
        const params = {
            TableName : 'UVAutomate',
            Item: {
                user: res.Item.user,
                secret: finalSecret,
                count: 0
            }
        }
        await docClient.put(params).promise();
    }
    catch(err) {
        return {
            statusCode: 500,
            headers: headers,
            body: err
        };
    }
    return {
        statusCode: 200,
        headers: headers,
        body: 'Success'
    };
};

const getValues = async( API_KEY ) => {
    const params = {
      TableName : 'UVAutomate',
      Key: {
        "user": API_KEY
      }
    }
    const data = await docClient.get(params).promise()
    return data
};