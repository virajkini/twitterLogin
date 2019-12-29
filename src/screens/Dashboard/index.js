import React from 'react';
import axios from 'axios';

import { StoreContext } from '../../appContextStore';
import { getAuthHeader } from '../../metadata/utils/getAuthHeader';

import { Button, Card,Image, Container, Row } from 'react-bootstrap';
import { TweetBody, Handle, Name, Tweet, TweetBox} from './components/tweet.js'
import './styles.css';


class Dashboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: '',
        }
    }

    componentDidMount = async () => {

        this.fetchTimelineData()
        //setInterval(()=>{ this.fetchTimelineData() }, 80 * 1000 )
    }

    fetchTimelineData = async() => {
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
                headers: getAuthHeader(requestData, token),
                exclude_replies: false
            }
        );

        // axios.get(apiUrl)
        //     .then((response) => {
        //         console.log("success")
        //         console.log(response);
        //         this.setState({
        //             data: response
        //         })
        //     })
        //     .catch(function (error) {
        //         console.log("Error")
        //         console.log(error);
        //     });

        this.setState({
            data: res.data
        })

    }


    retweetAction = async(id, key, type) => {
        const apiUrl = `https://api.twitter.com/1.1/statuses/${type}/${id}.json`;
        const requestData = {
            url: apiUrl,
            method: 'POST',
        }

        const token = this.context.authData.token;
        try {
            const res = await axios.post(
                `https://cors-anywhere.herokuapp.com/${apiUrl}`,{},
                {
                    headers: getAuthHeader(requestData, token)
                }
            );


            const tempData = [...this.state.data];

            tempData[key]['retweet_count'] = res.data['retweet_count'];

            this.setState({data: tempData})
        } catch (err) {
            alert('Something went wrong')
        }
    }


    favoritesAction = async(id, key, type) => {

        const apiUrl = `https://api.twitter.com/1.1/favorites/${type}.json?id=${id}`;
        const requestData = {
            url: apiUrl,
            method: 'POST',
        }

        const token = this.context.authData.token;
        try {
            const res = await axios.post(
                `https://cors-anywhere.herokuapp.com/${apiUrl}`,{},
                {
                    headers: getAuthHeader(requestData, token)
                }
            );


            const tempData = [...this.state.data];

            tempData[key] = res.data;
            console.log("11111111111111111111111111111")
            console.log(tempData)

            this.setState({data: tempData})
        } catch (err) {
            alert('Something went wrong')
        }
    }


    renderItem = props => {
        return (
          <div>
            {props.map((item, key) => (
                <Card style={{ width: '100%' }} key = {key}>
                    {/* <Card.Img variant="top" src={item.user.profile_image_url_https}/> */}
                    <img src={item.user.profile_image_url_https} className="picture"></img>
                    <Card.Body>
                            <Card.Title>
                                <a href={"https://twitter.com/" + (item.user.screen_name)} target="_blank">
                                    {item.user.name}
                                </a>
                            </Card.Title>
                        <Card.Text>
                            {item.text}
                        </Card.Text>
                        <div className='tw-buttons'>
                        <div>
                                <i className='material-icons icon'>comment</i>
                            </div>
                            <div>
                                <i
                                  className='material-icons icon'
                                  onClick = {()=> {
                                        const type = item.retweeted ? 'unretweet' : 'retweet'
                                        this.retweetAction(item.id_str, key, type);
                                   }}
                                >
                                    {
                                        item.retweeted ? 'repeat_one' : 'repeated'
                                    }
                                </i>
                                {item.retweet_count}
                            </div>
                            <div>
                                <i
                                    className={"material-icons icon " + (item.favorited? 'red': '')}
                                    onClick = {()=> {
                                        const type = item.favorited ? 'destroy' : 'create'
                                        this.favoritesAction(item.id_str, key, type);
                                   }}
                                >
                                    {
                                        item.favorited? 'favorite' : 'favorite_border'
                                    }
                                </i>
                                    {item.favorite_count}
                            </div>
                            <div>
                                <i className='material-icons icon'>file_upload</i>
                            </div>
                        </div>
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
                            <div className="main-body">
                                {this.state.data.map((tweet) => {
                                return(
                                    <div className="tweet-body">
                                        <div className="inner-body">
                                            <img src={tweet.user.profile_image_url_https} alt="Logo" className="picture"></img>
                                            <div >
                                            <div className="inner-body">
                                                <div className="name">{tweet.user.name}</div>
                                                <div className="handle">{tweet.user.screen_name}</div>
                                            </div>
                                            <Tweet tweet_text={tweet.text}/>
                                            </div>
                                        </div>
                                    </div>
                                )
                                })}
                            </div>
                    </>
                }
            </div>
        )
    }
}

Dashboard.contextType = StoreContext;

export default Dashboard;