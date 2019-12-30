import React from 'react';
import axios from 'axios';

import { StoreContext } from '../../appContextStore';
import { getAuthHeader } from '../../metadata/utils/getAuthHeader';

import { Button, Card,Image, Container, Row } from 'react-bootstrap';
import { TweetBody, Handle, Name, Tweet, TweetBox} from './components/tweet.js';
import Comment from '../../resources/images/comment.svg'; 

import CheckboxModal from './components/checkboxModal';
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

        this.setState({
            data: res.data
        })

    }

    fetchTweet = async (id) => {

        const apiUrl = `https://api.twitter.com/1.1/statuses/show.json?id=${id}`;
        const requestData = {
            url: apiUrl,
            method: 'GET',
        }

        const token = this.context.authData.token;
        try {
            const res = await axios.get(
                `https://cors-anywhere.herokuapp.com/${apiUrl}`,
                {
                    headers: getAuthHeader(requestData, token)
                }
            );

            return (res.data);

        } catch (err) {
            alert('Something went wrong')

            return '';
        }

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

            const updatedTweet = await this.fetchTweet(id);

            const tempData = [...this.state.data];

            tempData[key] = updatedTweet;

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

            this.setState({data: tempData})
        } catch (err) {
            alert('Something went wrong')
        }
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
                            <div className="main-body">
                                {this.state.data.map((tweet, key) => {
                                return(
                                    <div className="tweet-body">
                                        <div className="inner-body">
                                            <img src={tweet.user.profile_image_url_https} alt="Logo" className="picture"></img>
                                            <div>
                                                <div className="inner-body">
                                                    <div className="name">{tweet.user.name}</div>
                                                    <div className="handle">{`@ ${tweet.user.screen_name}`}</div>
                                                </div>
                                                <Tweet tweet_text={tweet.text}/>
                                                <div className='tw-buttons'>
                                                    <div><img className='img' src={Comment} alt='comment' /></div>
                                                    <div style= {{display: 'flex', alignItems: 'center'}}>
                                                    <i
                                                        className='material-icons icon'
                                                        onClick = {()=> {
                                                                const type = tweet.retweeted ? 'unretweet' : 'retweet'
                                                                this.retweetAction(tweet.id_str, key, type);
                                                        }}
                                                    >
                                                        {
                                                            tweet.retweeted ? 'repeat_one' : 'repeated'
                                                        }
                                                    </i>
                                                    <p className='count'>{tweet.retweet_count}</p>
                                                    </div>
                                                    <div style= {{display: 'flex', alignItems: 'center'}}>
                                                    
                                                        <i
                                                            className={"material-icons icon " + (tweet.favorited? 'red': '')}
                                                            onClick = {()=> {
                                                                const type = tweet.favorited ? 'destroy' : 'create'
                                                                this.favoritesAction(tweet.id_str, key, type);
                                                        }}
                                                        >
                                                            {
                                                                tweet.favorited? 'favorite' : 'favorite_border'
                                                            }
                                                        </i>
                                                        
                                                        <p className='count'>{tweet.favorite_count}</p>
                                                    </div>
                                                    <CheckboxModal tweetId = {tweet.id_str}/>
                                                </div>
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