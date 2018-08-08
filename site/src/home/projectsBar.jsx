import React, { Component } from 'react';
import { Button } from 'reactstrap';
import {Link} from 'react-router-dom';

// styles

import './styles/projectsbar.css';


class ProjectsBar extends Component {
    render() {
        return(
            <div className="container-fluid projects-container fadeIn">
                <div className="projects-container_blend-color"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <Link to="/Projects"><Button color="default">View Projects</Button></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProjectsBar;