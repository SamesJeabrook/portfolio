import React, {Component} from 'react';
import {Table, Form, FormGroup, Button, Label, Input} from 'reactstrap';
import axios from 'axios';

import './styles/projects.css';

// components
import AdminHeader from './AdminHeader';
import Feedback from './Feedback';

import AdminProjectDesc from './AdminProjectDesc';
import AdminProjectDetail from './AdminProjectDetail';
import AdminProjectChallenges from './AdminProjectsChallenges';
import AdminProjectLikes from './AdminProjectLikes';
import AdminProjectImprov from './AdminProjectImprov';

class AdminProjects extends Component {
    constructor(){
        super();
        this.state = {
            feedbackType: null,
            feedbackMsg: null,
            projectDescValue: localStorage.getItem('projectDesc'),
            projectDetailValue: localStorage.getItem('projectDetail'),
            projectChallengesValue: localStorage.getItem('projectChallenges'),
            projectLikesValue: localStorage.getItem('projectLikes'),
            projectImprovementsValue: localStorage.getItem('projectImprovements')
        }
        this.handleProjectDescChange = this.handleProjectDescChange.bind(this);
        this.handleProjectDetailChange = this.handleProjectDetailChange.bind(this);
        this.handleProjectChallengesChange = this.handleProjectChallengesChange.bind(this);
        this.handleProjectLikesChange = this.handleProjectLikesChange.bind(this);
        this.handleProjectImprovementsChange = this.handleProjectImprovementsChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleProjectDescChange({value}){
        if(this.state.projectDescValue && value.document != this.state.projectDescValue.document){
            const content = JSON.stringify(value.toJSON())
            localStorage.setItem('projectDesc', content)
            this.setState({
                projectDescValue: content
            });
        }
    }

    handleProjectDetailChange({value}){
        if(this.state.projectDetailValue && value.document != this.state.projectDetailValue.document){
            const content = JSON.stringify(value.toJSON())
            localStorage.setItem('projectDetail', content)
            this.setState({
                projectDetailValue: content
            });
        }
    }

    handleProjectChallengesChange({value}){
        if(this.state.projectChallengesValue && value.document != this.state.projectChallengesValue.document){
            const content = JSON.stringify(value.toJSON())
            localStorage.setItem('projectChallenges', content)
            this.setState({
                projectChallengesValue: content
            });
        }
    }

    handleProjectLikesChange({value}){
        if(this.state.projectLikesValue && value.document != this.state.projectLikesValue.document){
            const content = JSON.stringify(value.toJSON())
            localStorage.setItem('projectLikes', content)
            this.setState({
                projectLikesValue: content
            });
        }
    }

    handleProjectImprovementsChange({value}){
        if(this.state.projectImprovementsValue && value.document != this.state.projectImprovementsValue.document){
            const content = JSON.stringify(value.toJSON())
            localStorage.setItem('projectImprovements', content)
            this.setState({
                projectImprovementsValue: content
            });
        }
    }

    handleFileChange(e){
        this.setState({
            [e.target.name]: e.target.files[0]
        });
    }

    handleTextChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e){
        e.preventDefault();
        console.log(this.state);
        const {
            projectTitle,
            projectDescValue,
            projectDetailValue,
            projectChallengesValue,
            projectLikesValue,
            projectImprovements,
            projectLinkTo,
            projectImageDesktop,
            projectImageMobile,
            projectScreenshot1,
            projectScreenshot2,
            projectScreenshot3
        } = this.state;

        let formData = new FormData();

        formData.append('projectTitle', projectTitle);
        formData.append('projectDesc', projectDescValue);
        formData.append('projectDetail', projectDetailValue);
        formData.append('projectChalleges', projectChallengesValue);
        formData.append('projectLikes', projectLikesValue);
        formData.append('projectImprovements', projectImprovements);
        formData.append('projectLinkTo', projectLinkTo);
        formData.append('projectImageDesktop', projectImageDesktop);
        formData.append('projectImageMobile', projectImageMobile);
        formData.append('projectScreenshot1', projectScreenshot1);
        formData.append('projectScreenshot2', projectScreenshot2);
        formData.append('projectScreenshot3', projectScreenshot3);

        axios.post('/api/projects/update', formData, {headers: {'Authorization' : localStorage.jsToken, 'Content-Type': 'multipart/form-data'}}).then((res) =>{
            this.setState({
                feedbackType: "success",
                feedbackMsg: "Project Saved"
            });
            setTimeout(() => {
                this.setState({
                    feedbackType: null
                })
            }, 3000);

        },(res) => {
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

    render(){
        const {feedbackType, feedbackMsg} = this.state;
        return(
            <div className="admin-projects">
                <AdminHeader />
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                        { feedbackType ? <Feedback type={feedbackType} message={feedbackMsg} /> : null }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h1>Projects page</h1>
                            <p>This area is reserved for adding, removing and editing projects that have been completed</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Form onSubmit={this.handleSubmit} entype="multipart/form-data">
                                <FormGroup>
                                    <Label for="projectTitle">Title</Label>
                                    <Input type="text" onChange={this.handleTextChange} id="projectTitle" name="projectTitle" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="projectLinkto">Link to project</Label>
                                    <Input type="text" onChange={this.handleTextChange} id="projectLinkTo" placeholder="Link to actual project or company project was for" />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Project Descriptions</Label>
                                    <AdminProjectDesc onChange={this.handleProjectDescChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Project Detail</Label>
                                    <AdminProjectDetail onChange={this.handleProjectDetailChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Project Challenges</Label>
                                    <AdminProjectChallenges onChange={this.handleProjectChallengesChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Project Likes</Label>
                                    <AdminProjectLikes onChange={this.handleProjectLikesChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Project Improvements</Label>
                                    <AdminProjectImprov onChange={this.handleProjectImprovementsChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Desktop Screen shot</Label>
                                    <Input type="file" onChange={this.handleFileChange} name="projectImageDesktop"/>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Mobile Screen shot</Label>
                                    <Input type="file" onChange={this.handleFileChange} name="projectImageMobile"/>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Additional Screen shot 1</Label>
                                    <Input type="file" onChange={this.handleFileChange} name="projectScreenshot1"/>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Additional Screen shot 2</Label>
                                    <Input type="file" onChange={this.handleFileChange} name="projectScreenshot2"/>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Additional Screen shot 3</Label>
                                    <Input type="file" onChange={this.handleFileChange} name="projectScreenshot3"/>
                                </FormGroup>
                                <Button type="submit" >Submit</Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminProjects