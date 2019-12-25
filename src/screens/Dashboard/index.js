import React from 'react';
import axios from 'axios';

import { StoreContext } from '../../appContextStore';
import { getAuthHeader } from '../../metadata/utils/getAuthHeader';

import './styles.css';

class Dashboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: '',
        }
    }

    componentDidMount = async () => {
        const apiUrl = 'https://api.twitter.com/1.1/statuses/home_timeline.json';
        const requestData = {
            url: apiUrl,
            method: 'GET',
        }

        const token = this.context.authData.token;
        
        const res = await axios.get(
            `https://cors-anywhere.herokuapp.com/${apiUrl}`,
            {
                headers: getAuthHeader(requestData, token)
            }
        );

        this.setState({
            data: res
        })

    }

    render() {
        return(
            <div>
                <h1>
                    Welcome!
                </h1>
                {
                    this.state.data && 
                    <>
                        <h4>https://api.twitter.com/1.1/statuses/home_timeline.json</h4>
                        <p className='api-response'>
                            {
                                JSON.stringify(this.state.data)
                            }
                        </p>
                    </>
                }
            </div>
        )
    }
}

Dashboard.contextType = StoreContext;

export default Dashboard;