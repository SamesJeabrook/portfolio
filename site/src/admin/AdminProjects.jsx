import React, {Component} from 'react';
import {Table, Form, FormGroup, Button, Label, Input} from 'reactstrap';
import axios from 'axios';
import {Value} from 'slate';

import './styles/projects.css';

// components
import AdminHeader from './AdminHeader';
import Feedback from './Feedback';

import AdminProjectDesc from './AdminProjectDesc';
import AdminProjectDetail from './AdminProjectDetail';
import AdminProjectChallenges from './AdminProjectsChallenges';
import AdminProjectLikes from './AdminProjectLikes';
import AdminProjectImprov from './AdminProjectImprov';
import AdminProjectsList from './AdminProjectsList';

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

class AdminProjects extends Component {
    constructor(props){
        super(props);
        this.state = {
            feedbackType: null,
            feedbackMsg: null,
            projectId: props.match.params.id,
            projectDescValue:  JSON.stringify(DocumentSet),
            projectDetailValue:  JSON.stringify(DocumentSet),
            projectChallengesValue:  JSON.stringify(DocumentSet),
            projectLikesValue:  JSON.stringify(DocumentSet),
            projectImprovementsValue:  JSON.stringify(DocumentSet),
            projectTitle: '',
            projectLinkTo: ''
        }
        this.handleProjectDescChange = this.handleProjectDescChange.bind(this);
        this.handleProjectDetailChange = this.handleProjectDetailChange.bind(this);
        this.handleProjectChallengesChange = this.handleProjectChallengesChange.bind(this);
        this.handleProjectLikesChange = this.handleProjectLikesChange.bind(this);
        this.handleProjectImprovementsChange = this.handleProjectImprovementsChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleProjectDelete = this.handleProjectDelete.bind(this);
        this.setStaticImagePath = this.setStaticImagePath.bind(this);
        this.handleSetProjectId = this.handleSetProjectId.bind(this);
    }

    handleProjectDescChange({value}){
        if(value.document != this.state.projectDescValue.document){
            const content = JSON.stringify(value.toJSON())
            localStorage.setItem('projectDesc', content)
            this.setState({
                projectDescValue: content
            });
        }
    }

    handleProjectDetailChange({value}){
        if(value.document != this.state.projectDetailValue.document){
            const content = JSON.stringify(value.toJSON())
            localStorage.setItem('projectDetail', content)
            this.setState({
                projectDetailValue: content
            });
        }
    }

    handleProjectChallengesChange({value}){
        if(value.document != this.state.projectChallengesValue.document){
            const content = JSON.stringify(value.toJSON())
            localStorage.setItem('projectChallenges', content)
            this.setState({
                projectChallengesValue: content
            });
        }
    }

    handleProjectLikesChange({value}){
        if(value.document != this.state.projectLikesValue.document){
            const content = JSON.stringify(value.toJSON())
            localStorage.setItem('projectLikes', content)
            this.setState({
                projectLikesValue: content
            });
        }
    }

    handleProjectImprovementsChange({value}){
        if(value.document != this.state.projectImprovementsValue.document){
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

    handleSetProjectId(e){
        const id = e.target.parentElement.dataset.id;
        this.setState({
            projectId: id
        })
        this.retrieveProjectItem(id);
    }

    handleSubmit(e){
        e.preventDefault();
        console.log(this.state);
        const {
            projectTitle,
            projectDescValue,
            projectDescShort,
            projectDetailValue,
            projectChallengesValue,
            projectLikesValue,
            projectImprovements,
            projectLinkTo,
            projectHeroImage,
            projectImageDesktop,
            projectImageMobile,
            projectScreenshot1,
            projectScreenshot2,
            projectScreenshot3,
            projectId
        } = this.state;

        let formData = new FormData();

        if(projectId) formData.append('id', projectId)

        formData.append('projectTitle', projectTitle);
        formData.append('projectDesc', projectDescValue);
        formData.append('projectDescShort', projectDescShort);
        formData.append('projectDetail', projectDetailValue);
        formData.append('projectChalleges', projectChallengesValue);
        formData.append('projectLikes', projectLikesValue);
        formData.append('projectImprovements', projectImprovements);
        formData.append('projectLinkTo', projectLinkTo);
        formData.append('projectHeroImage', projectHeroImage);
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



    handleProjectDelete(e){
        e.preventDefault();
        const id = e.target.parentElement.dataset.id;
        axios.post('/api/projects/delete', {id: id}, {headers: {'Authorization' : localStorage.jsToken}}).then((res) => {
            this.setState({
                feedbackType: "info",
                feedbackMsg: "Skill successfully deleted"
            });
            setTimeout(() => {
                this.setState({
                    feedbackType: null
                })
            }, 4000);
            this.retreiveProjectsList();
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

    retreiveProjectsList(){
        axios.get('/api/projects/list').then((res) => {
            this.setState({
                projectsList: res.data.data
            });
        }, (e) => {
            this.setState({
                feedbackType: 'danger',
                feedbackMsg: e.message
            });
            setTimeout(() => {
                this.setState({
                    feedbackType: null
                })
            }, 4000);
        });
    }

    retrieveProjectItem(id){
        axios.get(`/api/projects/item/${id}`).then((res) => {
            const data = res.data.data;
            this.setState({
                projectDescValue: data.projectDesc && data.projectDesc !== "undefined" ? data.projectDesc : JSON.stringify(DocumentSet),
                projectDetailValue: data.projectDetail && data.projectDetail !== "undefined" ? data.projectDetail : JSON.stringify(DocumentSet),
                projectChallengesValue: data.projectChallenges && data.projectChallenges !== "undefined" ? data.projectChallenges : JSON.stringify(DocumentSet),
                projectLikesValue: data.projectLikes && data.projectLikes !== "undefined" ? data.projectLikes : JSON.stringify(DocumentSet),
                projectImprovementsValue: data.projectImprovements && data.projectImprovements !== "undefined" ? data.projectImprovements : JSON.stringify(DocumentSet),
                projectTitle: data.projectTitle && data.projectTitle !== "undefined" ? data.projectTitle : null,
                projectLinkTo: data.projectLinkTo && data.projectLinkTo !== "undefined" ? data.projectLinkTo : null,
                projectDescShort: data.projectDescShort && data.projectDescShort !== "undefined" ? data.projectDescShort : null,
                projectHeroImage: data.projectHeroImage && data.projectHeroImage !== "undefined" ? data.projectHeroImage : null,
                projectImageDesktop: data.projectImageDesktop && data.projectImageDesktop !== "undefined" ? data.projectImageDesktop : null,
                projectImageMobile: data.projectImageMobile && data.projectImageMobile !== "undefined" ? data.projectImageMobile : null,
                projectImageScreenshot1: data.projectImageScreenshot1 && data.projectImageScreenshot1 !== "undefined" ? data.projectImageScreenshot1 : null,
                projectImageScreenshot2: data.projectImageScreenshot2 && data.projectImageScreenshot2 !== "undefined" ? data.projectImageScreenshot2 : null,
                projectImageScreenshot3: data.projectImageScreenshot3 && data.projectImageScreenshot3 !== "undefined" ? data.projectImageScreenshot3 : null
            });
        }, (e) => {
            this.setState({
                feedbackType: 'danger',
                feedbackMsg: e.message
            });
            setTimeout(() => {
                this.setState({
                    feedbackType: null
                })
            }, 4000);
        });
    }

    setStaticImagePath(path){
        if(typeof path === 'string'){
            return path.replace("public", "")
        }else{
            return null
        }
    }

    componentWillMount(){
        this.retreiveProjectsList();
    }

    render(){
        const {
            feedbackType,
            feedbackMsg,
            projectDescValue,
            projectDescShort,
            projectDetailValue,
            projectChallengesValue,
            projectLikesValue,
            projectImprovementsValue,
            projectTitle,
            projectLinkTo,
            projectsList,
            projectHeroImage,
            projectImageDesktop,
            projectImageMobile,
            projectImageScreenshot1,
            projectImageScreenshot2,
            projectImageScreenshot3} = this.state;
        return(
            <div className="admin-projects">
                <AdminHeader />, 
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
                        <div className="col-12 col-md-6">
                            <h3>Add / Edtit project</h3>
                            <Form onSubmit={this.handleSubmit} entype="multipart/form-data">
                                <FormGroup>
                                    <Label for="projectTitle">Title</Label>
                                    <Input type="text" onChange={this.handleTextChange} id="projectTitle" name="projectTitle" value={projectTitle}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="projectLinkTo">Link to project</Label>
                                    <Input type="text" onChange={this.handleTextChange} id="projectLinkTo" name="projectLinkTo" placeholder="Link to actual project or company project was for" value={projectLinkTo} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="projectDescShort">Short project description</Label>
                                    <Input type="text" onChange={this.handleTextChange} id="projectDescShort" name="projectDescShort" placeholder="Short one line description of project" value={projectDescShort} />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Project Descriptions</Label>
                                    <AdminProjectDesc onChange={this.handleProjectDescChange} value={projectDescValue}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Project Detail</Label>
                                    <AdminProjectDetail onChange={this.handleProjectDetailChange} value={projectDetailValue} />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Project Challenges</Label>
                                    <AdminProjectChallenges onChange={this.handleProjectChallengesChange} value={projectChallengesValue} />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Project Likes</Label>
                                    <AdminProjectLikes onChange={this.handleProjectLikesChange} value={projectLikesValue} />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Project Improvements</Label>
                                    <AdminProjectImprov onChange={this.handleProjectImprovementsChange} value={projectImprovementsValue} />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Hero Image</Label>
                                    <Input type="file" onChange={this.handleFileChange} name="projectHeroImage"/>
                                    {projectHeroImage ? <img src={this.setStaticImagePath(projectHeroImage)} alt="Hero Image"/> : null }
                                </FormGroup>
                                <FormGroup>
                                    <Label>Desktop Screen shot</Label>
                                    <Input type="file" onChange={this.handleFileChange} name="projectImageDesktop"/>
                                    {projectImageDesktop ? <img src={this.setStaticImagePath(projectImageDesktop)} alt="Desktop Image"/> : null }
                                </FormGroup>
                                <FormGroup>
                                    <Label>Mobile Screen shot</Label>
                                    <Input type="file" onChange={this.handleFileChange} name="projectImageMobile"/>
                                    {projectImageMobile ? <img src={this.setStaticImagePath(projectImageMobile)} alt="Desktop Image"/> : null }
                                </FormGroup>
                                <FormGroup>
                                    <Label>Additional Screen shot 1</Label>
                                    <Input type="file" onChange={this.handleFileChange} name="projectScreenshot1"/>
                                    {projectImageScreenshot1 ? <img src={this.setStaticImagePath(projectImageScreenshot1)} alt="Desktop Image"/> : null }
                                </FormGroup>
                                <FormGroup>
                                    <Label>Additional Screen shot 2</Label>
                                    <Input type="file" onChange={this.handleFileChange} name="projectScreenshot2"/>
                                    {projectImageScreenshot2 ? <img src={this.setStaticImagePath(projectImageScreenshot2)} alt="Desktop Image"/> : null }
                                </FormGroup>
                                <FormGroup>
                                    <Label>Additional Screen shot 3</Label>
                                    <Input type="file" onChange={this.handleFileChange} name="projectScreenshot3"/>
                                    {projectImageScreenshot3 ? <img src={this.setStaticImagePath(projectImageScreenshot3)} alt="Desktop Image"/> : null }
                                </FormGroup>
                                <Button type="submit" >Submit</Button>
                            </Form>
                        </div>
                        <div className="col-12 col-md-6">
                            <h3>Existing Projects</h3>
                            <a href="/admin/projects/"><Button>Create new Project</Button></a>
                            <AdminProjectsList listData={projectsList} handleDelete={this.handleProjectDelete} handleProjectSelect={this.handleSetProjectId}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminProjects