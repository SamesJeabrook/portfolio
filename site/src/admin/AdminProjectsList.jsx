import React, {Component} from 'react';
import {Table, Button} from 'reactstrap';
import {Link} from 'react-router-dom';

class AdminProjectsList extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const projectsListData = this.props.listData;
        const renderProjectsList = () => {
            if(projectsListData){
                return(
                    projectsListData.map((item, index) => 
                        <tr key={index}>
                            <td>{item.projectTitle}</td>
                            <td data-id={item._id}><Button color="danger" className="project-remove" onClick={this.props.handleDelete}>Delete</Button><Button color="info" className="project-edit" onClick={this.props.handleProjectSelect}>Edit</Button></td>
                        </tr>
                    )
                )
            }
        }
        return(
            <Table>
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Project Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {renderProjectsList()}
                </tbody>
            </Table>
        )
    }
}

export default AdminProjectsList;