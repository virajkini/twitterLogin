import { consumer_key, consumer_secret} from '../constants';
const crypto = require('crypto');
const OAuth = require('oauth-1.0a');

const oauth = OAuth({
    consumer: { key: consumer_key, secret: consumer_secret },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
        return crypto
            .createHmac('sha1', key)
            .update(base_string)
            .digest('base64')
    },
})

export const getAuthHeader = (requestData, token) => {

    return(oauth.toHeader( oauth.authorize(requestData, token )));
}