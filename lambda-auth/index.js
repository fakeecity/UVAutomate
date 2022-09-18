const { hotp } = require('otplib');
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async(event, context) => {
    const headers = {"Access-Control-Allow-Origin": "*"}
    const API_KEY = event["queryStringParameters"]['api']
    let res;
    let code;
    let body;
    try {
        res = await getValues(API_KEY)
        if (!res || res === {} || !res.Item) {
            throw 'key nonexistent in database'
        }
        if (!res.Item.secret || res.Item.secret === '') {
            throw 'secret not generated'
        }
        code = hotp.generate(res.Item.secret, res.Item.count)
        body = [code, res.Item.count]
        res.Item.count += 1;
    }
    catch (err) {
        return {
            statusCode: 500,
            headers: headers,
            body: err
        };
    }
    try {
        const params = {
            TableName : 'UVAutomate',
            Item: {
                user: res.Item.user,
                secret: res.Item.secret,
                count: res.Item.count
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
        body: JSON.stringify(body)
    };
}

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