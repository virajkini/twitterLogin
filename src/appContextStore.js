import React from 'react';
import axios from 'axios';

import ErrorPage from './components/ErrorPage/index';

const token = localStorage.getItem('token');
const email = localStorage.getItem('email');

const isAuthenticated = token && token.length;

export const StoreContext = React.createContext('default');

class Store extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated:isAuthenticated,
            email: email,
            token: token,
            errMsg: ''
        }
    }

    updateStore = (key, value) => {
        this.setState((prevState) => ({
            ...prevState,
            [key]: value,
        }))
    }

    render() {
        return(
            <StoreContext.Provider
                value= {{
                    ...this.state,
                    updateStore: this.updateStore
                }}
            >
                {
                    this.state.errMsg ? <ErrorPage /> : this.props.children 
                
                }
             </StoreContext.Provider>
        )
    }

}

export const StoreProvider = Store;