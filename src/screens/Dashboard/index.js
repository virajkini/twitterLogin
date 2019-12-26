import React from 'react';
import axios from 'axios';

import { StoreContext } from '../../appContextStore';
import { getAuthHeader } from '../../metadata/utils/getAuthHeader';

import { Button, Card } from 'react-bootstrap';
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
        // const apiUrl = 'http://127.0.0.1:8000/api/v1/user-timeline/?format=json';
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

        // axios.get(apiUrl)
        //     .then(function (response) {
        //         console.log(response);
        //         // this.setState({
        //         //     data: response
        //         // })
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //         res = error;
        //     });

        this.setState({
            data: res
        })

    }

    renderItem = props => {
        return (
          <div>
            {props.data.map((item) => (
                <Card style={{ width: '100%' }}>
                    <Card.Img variant="top" src={item.user.profile_image_url_https}/>
                    <Card.Body>
                        <Card.Title>{item.user.screen_name}</Card.Title>
                        <Card.Text>
                            {item.text}
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            ))}
          </div>
        );
      };

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
                                this.renderItem(this.state.data)
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