import React from 'react';

const token = JSON.parse(localStorage.getItem('authData'));
const authData = token || '';
const isAuthenticated = token ? true : false;
const user_id = JSON.parse(localStorage.getItem('user_id')) || '';

export const StoreContext = React.createContext('default');

class Store extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated:isAuthenticated,
            authData: authData,
            user_id: user_id
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