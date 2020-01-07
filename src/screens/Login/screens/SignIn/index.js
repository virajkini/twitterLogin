import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import { StoreContext } from '../../../../appContextStore';
import apiBaseUrl  from '../../../../metadata/constants';

import './styles.css';

class SignIn extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount = async() => {
        const query = new URLSearchParams(this.props.location.search);
        const verifier = query.get('oauth_verifier');
        const oauth_token = query.get('oauth_token');

        if (verifier && oauth_token) {
            const apiUrl = apiBaseUrl + `/api/v1/access-token/?oauth_token=${oauth_token}&oauth_verifier=${verifier}`;
            const res = await axios.get(apiUrl);
            console.log(res);

            const token = (res && res.data && res.data.token) ? res.data.token : '';
            const user = (res && res.data && res.data.user) ? res.data.user : '';
            const UID = (res && res.data && res.data.twitter_user_id) ? res.data.twitter_user_id : '';
            
            localStorage.setItem('token',token);
            localStorage.setItem('email',user.email);
            localStorage.setItem('UID', UID);

            this.context.updateStore('email', user.email);
            this.context.updateStore('UID', UID);
            this.context.updateStore('token', token);
            this.context.updateStore('isAuthenticated', true);
        }
    }

    onClickLogin = async () => {
        const apiUrl = apiBaseUrl + '/api/v1/request-token';
        const res = await axios.get(apiUrl);

        const { request_oauth_token: token } = res.data;
        if (token) {
            const callBackUrl = apiBaseUrl + '/login/signin'
            window.location.replace(`https://api.twitter.com/oauth/authenticate?oauth_token=${token}&callback_url=${callBackUrl}`);
        };

    }

    render() {
        return (
            <button className='login-wrapper' onClick = {this.onClickLogin}>
                Twitter Login
            </button>
        )
    }
}

SignIn.contextType = StoreContext;

export default withRouter(SignIn);