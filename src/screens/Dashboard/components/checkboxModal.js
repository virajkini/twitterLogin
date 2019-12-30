import React, { userContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Button, Form, Modal} from 'react-bootstrap';

import { StoreContext } from '../../../appContextStore';

const CheckboxModal = (props) => {

    const [show, setShow] = useState(false);
    const [option, setOption] = useState(0);
    const [pk, setPk] = useState(null);

    const context = useContext(StoreContext);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (show) {
            fetchUserOptions();
        }
    }, [show]);

    const fetchUserOptions = async() => {

        try {
            const res = await axios.get(`https://tfeed.herokuapp.com/api/v1/tweetoptions/?user_id=${context.user_id}&tweet_id=${props.tweetId}`);
            if (res.data.length && res.data[0].option && res.data[0].pk ) {
                setOption(res.data[0].option);
                setPk(res.data[0].pk);
            }
            
        } catch (err) {
            console.log(err)
            alert('Something went wrong')
            return '';
        }
    }

    const onSave = async() => {

        let payload = {
            user_id: context.user_id,
            option: option,
            tweet_id: props.tweetId
        };

        try {

            if (pk === null) {
                const res = await axios.post('https://tfeed.herokuapp.com/api/v1/tweetoptions/', payload);
            } else {
                payload = {
                    ...payload,
                    pk,
                }
                const res = await axios.patch(`https://tfeed.herokuapp.com/api/v1/tweetoptions/${pk}/`, payload);
            }
            

            setShow(false);

        } catch (err) {
            alert('Something went wrong')

            return '';
        }
    }

    return(
        <>
            <Button variant="primary" onClick={handleShow}>
                Select Options
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Select an option</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    {['radio'].map(type => (
                        <div key={`inline-${type}`} className="mb-3">
                            {
                                [1,2,3].map(item => (
                                    <Form.Check
                                        inline label={item}
                                        type={type}
                                        id={`inline-${type}-${item}`}
                                        checked = {option === item}
                                        onChange = {()=>{setOption(item)}}
                                    />
                                ))
                            }
                        </div>
                    ))}
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={onSave}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default CheckboxModal;
