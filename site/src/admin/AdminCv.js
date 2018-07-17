import React, {Component} from 'react';
import {Table, Form, FormGroup, Button, Label, Input} from 'reactstrap';
import axios from 'axios';
import {Value} from 'slate';

import './styles/projects.css';

// components
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

class AdminCv extends Component {
    constructor(props){
        super(props);
        this.state = {
            feedbackType: null,
            feedbackMsg: null,
            cvHtml:  JSON.stringify(DocumentSet)
        }
        this.handleProjectDescChange = this.handleProjectDescChange.bind(this);
    }

    handleProjectDescChange({value}){
        if(value.document != this.state.cvHtml.document){
            const content = JSON.stringify(value.toJSON())
            localStorage.setItem('projectDesc', content)
            this.setState({
                cvHtml: content
            });
        }
    }

    handleFileChange(e){
        this.setState({
            [e.target.name]: e.target.files[0]
        });
    }

    handleSubmit(e){
        e.preventDefault();
        console.log(this.state);
        const {
            cvFile,
            cvHtml,
        } = this.state;

        let formData = new FormData();

        formData.append('cvHtml', cvHtml);
        formData.append('cvFile', cvFile);


        axios.post('/api/cv/update', formData, {headers: {'Authorization' : localStorage.jsToken, 'Content-Type': 'multipart/form-data'}}).then((res) =>{
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

    retrieveProjectItem(){
        axios.get(`/api/projects/item/${this.state.projectId}`).then((res) => {
            const data = res.data.data;
            this.setState({
                cvHtml: data.cvHtml && data.cvHtml !== "undefined" ? data.cvHtml : JSON.stringify(DocumentSet),
                cvFile: data.cvFile && data.cvFile !== "undefined" ? data.cvFile : null
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
        if(this.state.projectId){
            this.retrieveProjectItem();
        }
    }

    render(){
        const {
            feedbackType,
            feedbackMsg,
            cvHtml,
            projectDescShort,
            projectDetailValue,
            projectChallengesValue,
            projectLikesValue,
            projectImprovementsValue,
            projectTitle,
            projectLinkTo,
            projectsList,
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
                                <Button type="submit" >Submit</Button>
                            </Form>
                        </div>
                        <div className="col-12 col-md-6">
                            <h3>Existing Projects</h3>
                            <a href="/admin/projects/"><Button>Create new Project</Button></a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminCv