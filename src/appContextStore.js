import React from 'react';

const authData = localStorage.getItem('authData');

export const StoreContext = React.createContext('default');

class Store extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated:false,
            authData: authData,
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