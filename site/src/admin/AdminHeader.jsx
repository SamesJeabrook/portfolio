import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import {withRouter} from 'react-router-dom';

class AdminHeader extends Component {

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e){
        e.preventDefault();
        Axios.get('/api/logout').then((res) => {
            window.location.href = "/"
        });
    }

    render(){
        return(
            <div className="admin-header">
                <div className="col-12">
                    <a href="#" onClick={this.handleClick}>Logout</a>
                </div>
            </div>
        )
    }
}

export default AdminHeader