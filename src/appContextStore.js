import React from 'react';

import cookieParser from './metadata/utils/cookieParser';

const cookieObj = cookieParser();

const isAuthenticated = cookieObj.hasOwnProperty('Authorization') && cookieObj.Authorization.length > 0;
const userEmail = cookieObj.hasOwnProperty('user')? cookieObj.user : '';
const token = cookieObj.hasOwnProperty('Authorization') ? cookieObj.Authorization : '';


export const StoreContext = React.createContext('default');

class Store extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated:isAuthenticated,
            email: userEmail,
            token: token,
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
                {this.props.children}
             </StoreContext.Provider>
        )
    }

}

export const StoreProvider = Store;