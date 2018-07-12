import React, {Component} from 'react';
import {Table, Button} from 'reactstrap';

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
                            <td data-id={item._id}><Button color="danger" className="project-remove" onClick={this.props.handleDelete}>Delete</Button><a href={`/admin/projects/${item._id}`}><Button color="info" className="project-edit">Edit</Button></a></td>
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