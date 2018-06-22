import React, {Component} from 'react';

// components

import headerImage from './images/headerImage.jpg';

import './styles/projectsHeader.css';

class ProjectHeader extends Component {
    render(){
        return(
            <div className="projects-header">
                <div className="header-image">
                    <img src={headerImage} alt=""/>
                </div>
                <span className="vertical-align"></span>
                <div className="projects-header-text">
                    <h1>Project Title</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel recusandae architecto tenetur eligendi. Voluptatum minus ad consectetur nemo quo nihil officiis. Voluptatibus reiciendis illum, enim error iste autem aut molestiae?</p>
                </div>
            </div>
        )
    }
}

export default ProjectHeader;