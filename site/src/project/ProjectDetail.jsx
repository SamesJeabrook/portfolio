import React, {Component} from 'react';

import './styles/projectDetail.css';

import desktop from './images/desktopView.png';
import mobile from './images/mobileView.png';

class ProjectDetail extends Component {

    render(){
        return(
            <div className="container project-detail">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <h3>Project Description</h3>
                        <p>Project description for project ID: {this.props.projectId}</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat placeat quo amet ducimus debitis facere, atque magni illo aliquid labore exercitationem, iusto quas? Iure dolore error officiis fugiat ipsam? Voluptate.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel architecto facere delectus, quidem debitis sequi excepturi beatae dolor, inventore ipsum saepe enim nisi voluptatum libero nihil illo modi, natus quod!</p>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="desktop-image-container">
                            <div className="desktop-surround-image">
                            </div>
                            <img src={desktop} alt=""/>
                        </div>
                        <div className="phone-image-container">
                            <div className="phone-surround-image">
                            </div>
                            <img src={mobile} alt=""/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <h3>Project Challenges</h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam voluptate praesentium pariatur nulla eum. Veniam sed adipisci odit nesciunt temporibus amet maxime odio, expedita, assumenda esse, quibusdam facere possimus! Ipsam.</p>
                    </div>
                    <div className="col-12 col-md-6">
                        <h3>Project Likes</h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam voluptate praesentium pariatur nulla eum. Veniam sed adipisci odit nesciunt temporibus amet maxime odio, expedita, assumenda esse, quibusdam facere possimus! Ipsam.</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProjectDetail;