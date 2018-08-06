import React, {Component} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import axios from 'axios';

// styles
import './styles/bio.css';

// components

import AboutMe from './AdminBioAboutMe';
import AboutWork from './AdminBioAboutWork';
import AdminHeader from './AdminHeader';

import Feedback from './Feedback';

const DocumentSet = {
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        leaves: [
                            {
                                text: ''
                            }
                        ]
                    }
                ]
            }
        ]
    }
}

class AdminBio extends Component{

    constructor(props){
        super(props);
        this.state = {
            aboutMeValue : localStorage.getItem('aboutMe')=== null ? JSON.stringify(DocumentSet) : JSON.parse(localStorage.getItem('aboutMe')),
            aboutWorkValue : localStorage.getItem('aboutWork') === null ? JSON.stringify(DocumentSet) : JSON.parse(localStorage.getItem('aboutWork')),
            profileId: props.match.params.id,
        }
        this.handleAboutMeChange = this.handleAboutMeChange.bind(this);
        this.handleAboutWorkChange = this.handleAboutWorkChange.bind(this);
        this.handleTaglineChange = this.handleTaglineChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        this.postForm();
    }

    postForm(){
        const {aboutMeValue, aboutWorkValue, profileId, tagLine} = this.state;
        const postObj = {
            "id" : profileId,
            "aboutMe" : aboutMeValue,
            "aboutWork" : aboutWorkValue,
            "tagLine" : tagLine
        }
        axios.post('/api/user/bio/update', postObj, {headers: {'Authorization' : localStorage.jsToken}}).then((res) => {
            this.setState({
                feedbackType: "success",
                feedbackMsg: "Profile updated"
            });
            setTimeout(() => {
                this.setState({
                    feedbackType: null
                })
            }, 3000);
        }, (res) => {
            this.setState({
                feedbackType: "danger",
                feedbackMsg: res.message
            });
            setTimeout(() => {
                this.setState({
                    feedbackType: null
                })
            }, 4000);
        });
    }

    retrieveBio(){
        axios.get('/api/user/bio/samesJeabrook').then((res) => {
            if(res.data.data.aboutMe){
                this.setState({
                    aboutMeValue: res.data.data.aboutMe
                });
            }
            if(res.data.data.aboutWork){
                this.setState({
                    aboutWorkValue: res.data.data.aboutWork
                });
            }
            if(res.data.data.tagLine){
                this.setState({
                    tagLine: res.data.data.tagLine
                });
            }
        }, (res) => {
            this.setState({
                feedbackType: "danger",
                feedbackMsg: res.message
            });
            setTimeout(() => {
                this.setState({
                    feedbackType: null
                })
            }, 4000);
        })
    }

    handleAboutMeChange({value}){
        if(value.document != this.state.aboutMeValue.document){
            const content = JSON.stringify(value.toJSON())
            localStorage.setItem('aboutMe', content)
            this.setState({
                aboutMeValue: content
            });
        }
    }

    handleAboutWorkChange({value}){
        if(value.document != this.state.aboutWorkValue.document){
            const content = JSON.stringify(value.toJSON())
            localStorage.setItem('aboutWork', content)
            this.setState({
                aboutWorkValue: content
            });
        }
    }

    handleTaglineChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    componentWillMount(){
        this.retrieveBio();
    }

    render(){
        let {aboutMeValue, aboutWorkValue, tagLine, feedbackType, feedbackMsg} = this.state;
        return(
            <div className="admin-bio">
                <AdminHeader />
                <div className="container admin-bio">
                    <div className="row">
                        <div className="col-12">
                        { feedbackType ? <Feedback type={feedbackType} message={feedbackMsg} /> : null }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h1>Admin Bio</h1>
                            <p>This is where you can update your on screen Bio.</p>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label for="tagLine">Tag Line</Label>
                                    <Input type="text" id="tagLine" value={tagLine} name="tagLine" onChange={this.handleTaglineChange}></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>About Me</Label>
                                    <AboutMe onChange={this.handleAboutMeChange} value={aboutMeValue}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label>About My Work</Label>
                                    <AboutWork onChange={this.handleAboutWorkChange} value={aboutWorkValue} />
                                </FormGroup>
                                <Button color="primary">Save</Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminBio