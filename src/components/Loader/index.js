import React from 'react';

import LoaderPng from '../../resources/images/loading.png';

import './style.css';

const Loader = () => {

    return(
        <img className='rotate' src = {LoaderPng} />
    )
}

export default Loader;
