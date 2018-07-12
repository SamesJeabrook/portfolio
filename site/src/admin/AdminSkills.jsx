import React, {Component} from 'react';
import {Table, Form, FormGroup, Button, Label, Input} from 'reactstrap';
import axios from 'axios';
// styles
import './styles/skills.css';

// components
import AdminHeader from './AdminHeader';
import Feedback from './Feedback';

class AdminSkills extends Component{

    constructor(){
        super();
        this.state = {
            feedbackType: null,
            feedbackMsg: null,
            skillName: "",
            skillPercent: "",
            addEditMode: "Add",
            id: null
        }
    
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    retrieveSkills(){
        axios.get('/api/skills/list').then((res) => {
            this.setState({
                skillset: res.data.data
            });
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

    handleFormChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleFormSubmit(e){
        e.preventDefault();
        const {skillName, skillPercent, addEditMode, id} = this.state;

        if(skillName === ""){
            this.setState({
                feedbackType: "danger",
                feedbackMsg: "You have not set a skill name"
            });
            return false;
        }

        if(skillPercent === ""){
            this.setState({
                feedbackType: "danger",
                feedbackMsg: "You have not set a skill value"
            });
            return false;
        }

        if(skillPercent > 100){
            this.setState({
                feedbackType: "danger",
                feedbackMsg: "The value is specified as a percentage and therefore can not be greater than 100"
            });
            return false;
        }

        setTimeout(() => {
            this.setState({
                feedbackType: null
            })
        }, 4000);
        const postObj = {
            skillName: skillName,
            skillPercent: skillPercent
        }
        if(id){
            postObj.id = id
        }
        axios.post('/api/skills/update', postObj, {headers: {'Authorization' : localStorage.jsToken}}).then((res) => {
            this.setState({
                feedbackType: "success",
                feedbackMsg: `Skill successfully ${addEditMode}ed`,
                skillName: "",
                skillPercent: "",
                addEditMode: "Add",
                id: null

            });
            setTimeout(() => {
                this.setState({
                    feedbackType: null
                })
            }, 4000);
            this.retrieveSkills();
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

    handleDelete(e){
        const id = e.target.parentElement.dataset.id;

        axios.post('/api/skills/delete', {id: id}, {headers: {'Authorization' : localStorage.jsToken}}).then((res) => {
            this.setState({
                feedbackType: "info",
                feedbackMsg: "Project successfully deleted"
            });
            setTimeout(() => {
                this.setState({
                    feedbackType: null
                })
            }, 4000);
            this.retrieveSkills();
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

    handleEdit(e){
        const id = e.target.parentElement.dataset.id;
        const {skillset} = this.state;
        const obj = skillset.find((obj) => {return obj._id === id});


        this.setState({
            addEditMode: "Edit",
            id: id,
            skillName: obj.skillName,
            skillPercent: obj.skillPercent,
        });



    }

    componentWillMount(){
        this.retrieveSkills();
    }
    render(){
        const {skillset} = this.state;
        const renderSkills = () => {
            if(skillset){
                return(
                    skillset.map((item, index) =>
                        <tr key={index}>
                            <td>{item.skillName}</td>
                            <td>{item.skillPercent}%</td>
                            <td data-id={item._id}><Button color="danger" className="skill-remove" onClick={this.handleDelete}>Delete</Button><Button color="info" className="skill-edit" onClick={this.handleEdit}>Edit</Button></td>
                        </tr>
                    )
                )
            }
        }

        const {feedbackType, feedbackMsg, skillName, skillPercent} = this.state;
        return(
            <div className="admin-skills">
                <AdminHeader />
                <div className="container admin-skills">
                    <div className="row">
                        <div className="col-12">
                        { feedbackType ? <Feedback type={feedbackType} message={feedbackMsg} /> : null }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h1>Admin Skills</h1>
                            <p>In this area you can update your existing skills</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <h3>Existing skills</h3>
                            <div className="overflow-wrapper">
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Skill Title</th>
                                            <th>Skill Percent</th>
                                            <th>Skill Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderSkills()}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                        <div className="col-6">
                        <h3>Add / edit skill</h3>
                            <Form onSubmit={this.handleFormSubmit}>
                                <FormGroup>
                                    <Label for="skillName">Skill Name</Label>
                                    <Input type="text" onChange={this.handleFormChange} value={skillName} name="skillName" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="skillPercent">Skill Percent</Label>
                                    <Input type="number" onChange={this.handleFormChange} value={skillPercent} name="skillPercent" />
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

export default AdminSkills;