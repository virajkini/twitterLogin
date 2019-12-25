import React from 'react';
import { Route } from 'react-router-dom';

import SignIn from './screens/SignIn/index';

const LoginRoute = ({match}) => (
    <React.Fragment>
        <Route path = {`${match.url}/signin`} component = {SignIn} />
    </React.Fragment>
)

export default LoginRoute;