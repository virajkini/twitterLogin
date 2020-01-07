import React, {useContext} from 'react';
import { Button } from 'react-bootstrap';

import { StoreContext } from '../../appContextStore';

import ErrorSvg from '../../resources/images/error.svg';
import './styles.css';

const ErrorPage = () => {

    const context = useContext(StoreContext);

    const handleOnClick = () => {
        localStorage.clear();
        context.updateStore('email', null);
        context.updateStore('token', null);
        context.updateStore('UID', null);
        context.updateStore('isAuthenticated', false);
        context.updateStore('errMsg', '');
    }

    return(
        <main className='err-container'>
            <img className='img' src={ErrorSvg} />
            <p>{context.ErrMsg}</p>
            <Button variant="primary" onClick={handleOnClick}>Go to Login</Button>
        </main>
    )
}

export default ErrorPage;
