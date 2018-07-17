import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import "./styles/admin.css";

import AdminHeader from './AdminHeader';

class AdminDashboard extends Component{

    constructor(){
        super();
        this.state = {
            username: null,
            email: null
        }
    }

    retrieveUserDetails(){
        axios.get('/api/user').then((res) => {
            this.setState({
                username: res.data.userName,
                email: res.data.email,
                id: res.data._id
            })
        }, (res) => {
            this.setState({
                errorMessage: res.message
            })
        });
    }

    componentWillMount(){
        this.retrieveUserDetails();
    }
    
    render(){
        return(
            <div className="admin-dashboard">
            <AdminHeader />
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1>Admin Dashboard</h1>
                            {this.state.username ? <p>You are logged in as: {this.state.username}</p> : null}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-sm-6 col-md-3">
                            <Link to={`/admin/profile/${this.state.id}`}>
                                <div className="admin-route">
                                    <div className="icon-container">
                                        <i className="js-icon js-person-setting-2"></i>
                                    </div>
                                    <div className="admin-route__text">
                                        <span>Profile Settings</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3">
                            <Link to={'/admin/skills'}>
                                <div className="admin-route">
                                    <div className="icon-container">
                                        <i className="js-icon js-cocktail-4"></i>
                                    </div>
                                    <div className="admin-route__text">
                                        <span>Skills list</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3">
                            <Link to={'admin/projects'}>
                                <div className="admin-route">
                                    <div className="icon-container">
                                        <i className="js-icon js-presentation-code-1"></i>
                                    </div>
                                    <div className="admin-route__text">
                                        <span>Projects</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        {/* <div className="col-12 col-sm-6 col-md-3">
                            <Link to={'admin/updateCV'}>
                                <div className="admin-route">
                                    <div className="icon-container">
                                        <i className="js-icon js-file-add-2"></i>
                                    </div>
                                    <div className="admin-route__text">
                                        <span>CV</span>
                                    </div>
                                </div>
                            </Link>
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminDashboard;