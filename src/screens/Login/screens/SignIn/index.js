import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import { StoreContext } from '../../../../appContextStore';

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
            const res = await axios.get(`https://tfeed.herokuapp.com/api/v1/access-token/?oauth_token=${oauth_token}&oauth_verifier=${verifier}`);

            const token = (res && res.data && res.data.token) ? res.data.token : '';
            const user = (res && res.data && res.data.user) ? res.data.user : '';
        
            document.cookie = `Authorization=${token}`;
            document.cookie =  `email=${user.email}`;

            this.context.updateStore('email', user.email);
            this.context.updateStore('token', token);
            this.context.updateStore('isAuthenticated', true);

        
        }
    }

    onClickLogin = async () => {

       const res = await axios.get('https://tfeed.herokuapp.com/api/v1/request-token');

       const { request_oauth_token: token } = res.data;
       if (token) {
         window.location.replace(`https://api.twitter.com/oauth/authenticate?oauth_token=${token}`);
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