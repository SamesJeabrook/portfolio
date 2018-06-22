import React, {Component} from 'react';
import { Alert } from 'reactstrap';

const Feedback = (props) => {

    return(
        <Alert color={props.type}>{props.message}</Alert>
    )
}

export default Feedback