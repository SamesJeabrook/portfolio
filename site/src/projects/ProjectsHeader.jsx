import React, {Component} from 'react';

// components

import headerImage from './images/headerImage.jpg';

import './styles/projectsHeader.css';

class ProjectsHeader extends Component {
    render(){
        return(
            <div className="projects-header">
                <div className="header-image">
                    <img src={headerImage} alt=""/>
                </div>
                <span className="vertical-align"></span>
                <div className="projects-header-text">
                    <h1>Projects</h1>
                    <p>Here is a list of some of the projects I have been working on.</p>
                    <p className="small">Some of the projects listed are completely personal and were created as a way of learning a new technology or perfecting another... or simply just to amuse myself.</p>
                </div>
            </div>
        )
    }
}

export default ProjectsHeader;