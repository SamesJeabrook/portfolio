import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import Axios from 'axios';
import {withRouter} from 'react-router-dom';

import "./styles/admin.css";

class AdminHome extends Component{

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    constructor(){
        super();
        this.state = {
            errorMessage: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        const {username, password} = this.state;
        if (!username){
            this.setState({
                errorMessage: "Username is empty"
            })
        }else if(!password){
            this.setState({
                errorMessage: "Password is empty"
            })
        }else{
            this.setState({
                errorMessage: null
            });
            const UserObj = {
                userName: this.state.username,
                password: this.state.password
            }
            Axios.post('/api/user/login', UserObj).then((res) => {
                localStorage.setItem("jsToken", res.data.token);
                this.props.toggleAuth();
                this.props.history.push('/admin/dashboard')
            }, (res) => {
                this.setState({
                    errorMessage: res.message
                })
;            })   
        }
        
    }

    handleOnChange(e){
        if(e.target.value < 1){
            e.target.classList.add('error');
            console.log('Not complete')
            this.setState({
                [e.target.name]: null,
                errorMessage: `Field ${e.target.name} can not be empty`
            });
        }else{
            e.target.classList.remove('error');
            this.setState({
                [e.target.name]: e.target.value,
                errorMessage: null
            });
        }
    }

    render(){
        let {errorMessage} = this.state;
        const showError = () => {
            return(
                errorMessage ? <Alert color="danger">{errorMessage}</Alert> : null
            )
        }
        return(
            <div className="login-wrapper">
                <span className="vertical-align"></span>
                <div className="container-wrapper">
                    <div className="container">
                        <div className="admin-heading-block">
                            <h1>Admin Home</h1>
                            {showError()}
                        </div>
                        <div className="admin-login-block">
                            <h3>Please login to access this section</h3>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Input type="text" name="username" placeholder="Username" onChange={this.handleOnChange}></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Input type="password" name="password" placeholder="password" onChange={this.handleOnChange}></Input>
                                </FormGroup>
                                <Button color="primary" type="submit">Submit</Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(AdminHome);