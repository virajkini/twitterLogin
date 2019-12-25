import React from 'react';
import TwitterLogin from "react-twitter-login";
import { StoreContext } from '../../../../appContextStore';

import { consumer_key, consumer_secret} from '../../../../metadata/constants';

import './styles.css';

export default class SignIn extends React.Component {

    authHandler = async (err, data) => {
        if (!err) {

            const authData = {
               token : {
                key: data.oauth_token,
                secret: data.oauth_token_secret
               } 
            }
            this.context.updateStore('authData', authData)
            this.context.updateStore('isAuthenticated', true)
        }
    };

    render() {
        return (
            <div className='login-wrapper'>
                <TwitterLogin
                    authCallback={this.authHandler}
                    consumerKey={consumer_key}
                    consumerSecret={consumer_secret}
                    callbackUrl={'http://localhost:3000/login/signin'}
                />
            </div>
        )
    }
}

SignIn.contextType = StoreContext;