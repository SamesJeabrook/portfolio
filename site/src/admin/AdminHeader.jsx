import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import {Link} from 'react-router-dom';

class AdminHeader extends Component {

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
                    <Link to="/admin/dashboard">Return to Dashboard</Link>
                </div>
            </div>
        )
    }
}

export default AdminHeader