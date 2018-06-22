import React, {Component} from 'react';

// components

import ProjectsHeader from './ProjectsHeader';
import ProjectList from './ProjectList';

class ProjectsWrapper extends Component {
    render(){
        return(
            <div>
                <div className="container-fluid projects-head-wrapper">
                    <div className="row">
                        <ProjectsHeader />
                    </div>
                </div>
                <div className="container projects-list-container">
                    <div className="row">
                        <div className="col-12">
                            <ProjectList />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProjectsWrapper;