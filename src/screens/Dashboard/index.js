import React from 'react';
import axios from 'axios';

import { StoreContext } from '../../appContextStore';

import { Tweet } from './components/tweet.js';
import Loader from '../../components/Loader/index';

import Comment from '../../resources/images/comment.svg';
import apiBaseUrl from '../../metadata/constants';

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
        axios.defaults.headers.common['Authorization'] = `Token ${this.context.token}`;
        this.fetchTimelineData()
        setInterval(()=>{ this.fetchTimelineData() }, 80 * 1000 )
    }

    fetchTimelineData = async() => {
        const apiUrl = apiBaseUrl + '/api/v1/user-timeline/';
        try {
            const res = await axios.get(apiUrl);
    
            if (!res.data.errors) {
                this.setState({
                    data: res.data
                })
            }
        } catch (err) {
            const errMsg = err.message ? err.message : 'Something went wrong';
            this.context.updateStore('errMsg', errMsg);
        }
       
    }

    retweetAction = async(id, key) => {

        const apiUrl = apiBaseUrl + '/api/v1/retweet/';
        const payload = {
            tweet_id : id, 
        }; 

        try {
            const res = await axios.post(apiUrl,payload);
                
            const tempData = [...this.state.data];

            tempData[key] = res.data;

            this.setState({data: tempData})
        } catch (err) {
            const errMsg = err.message ? err.message : 'Something went wrong';
            this.context.updateStore('errMsg', errMsg);
        }
    }


    favoritesAction = async(id, key) => {

        const apiUrl = apiBaseUrl + '/api/v1/like-tweet/';
        const payload = {
            tweet_id : id, 
        }; 

        try {
            const res = await axios.post(apiUrl,payload);
                
            const tempData = [...this.state.data];

            tempData[key] = res.data;

            this.setState({data: tempData})
        } catch (err) {
            const errMsg = err.message ? err.message : 'Something went wrong';
            this.context.updateStore('errMsg', errMsg);
        }
    }


    render() {
        const renderContent = () => (
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
                                                className={"material-icons icon " + (tweet.retweeted? 'disable': '')}
                                                onClick = {()=> { this.retweetAction(tweet.id_str, key); }}
                                            >
                                                {
                                                    tweet.retweeted ? 'repeat_one' : 'repeated'
                                                }
                                            </i>
                                            <p className='count'>{tweet.retweet_count}</p>
                                            </div>
                                            <div style= {{display: 'flex', alignItems: 'center'}}>

                                                <i
                                                    className={"material-icons icon " + (tweet.favorited? 'red disable': '')}
                                                    onClick = {()=> { this.favoritesAction(tweet.id_str, key); }}
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
        )
        return(
            <div>
                <h1>
                    Welcome!
                </h1>
                {
                    this.state.data ? renderContent() : <Loader />
                }
            </div>
        )
    }
}

Dashboard.contextType = StoreContext;

export default Dashboard;