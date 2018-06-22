import React, {Component} from 'react';

import {Link} from 'react-router-dom';

// components

import ProjectImage from './images/projectImage.jpg';

import './styles/projectList.css';


class ProjectsList extends Component {

    

    render(){
        const renderProjects = () => {
            return(
                <div className="col-12 col-md-6 project-item">
                    <Link to="/project/1">
                        <div className="row project-item-wrapper">
                            <div className="col-8 project-item__text-container">
                                <h3>Project Name</h3>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                            </div>
                            <div className="col-4 project-item__image">
                                <div className="project-item__image-container">
                                    <div className="project-item__image-wrapper">
                                        <img src={ProjectImage} alt="First Project"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            )    
        }

        return(
            <div className="row projects-list-wrapper">
                {renderProjects()}
                {renderProjects()}
                {renderProjects()}
                {renderProjects()}
                {renderProjects()}
                {renderProjects()}
                {renderProjects()}
                {renderProjects()}
            </div>
        )
    }
}

export default ProjectsList;