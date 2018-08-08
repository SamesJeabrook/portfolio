import React, {Component} from 'react';
import axios from 'axios';

// components

import ProjectHeader from './ProjectHeader.jsx';
import ProjectDetail from './ProjectDetail.jsx';

// generic components
import Menu from '../generic/Menu';
import Footer from '../generic/footer';

class Project extends Component {
    constructor(props){
        super(props);
        this.state= {}
    }

    retrieveproject(){
        axios.get(`/api/projects/item/${this.props.match.params.id}`).then((res) => {
            const data = res.data.data;
            this.setState({
                description: data.projectDesc && data.projectDesc !== "undefined" ? JSON.parse(data.projectDesc) : null,
                detail: data.projectDetail && data.projectDetail !== "undefined" ? JSON.parse(data.projectDetail) : null,
                challenges: data.projectChallenges && data.projectChallenges !== "undefined" ? JSON.parse(data.projectChallenges) : null,
                likes: data.projectLikes && data.projectLikes !== "undefined" ? JSON.parse(data.projectLikes) : null,
                improvements: data.projectImprovements && data.projectImprovements !== "undefined" ? JSON.parse(data.projectImprovements) : null,
                title: data.projectTitle && data.projectTitle !== "undefined" ? data.projectTitle : null,
                link: data.projectLinkTo && data.projectLinkTo !== "undefined" ? data.projectLinkTo : null,
                tech: data.projectTechnologies && data.projectTechnologies !== "undefined" ? data.projectTechnologies : null,
                shortDescription: data.projectDescShort && data.projectDescShort !== "undefined" ? data.projectDescShort : null,
                imgHero: data.projectHeroImage && data.projectHeroImage !== "undefined" ? data.projectHeroImage : null,
                imgDesktop: data.projectImageDesktop && data.projectImageDesktop !== "undefined" ? data.projectImageDesktop : null,
                imgMobile: data.projectImageMobile && data.projectImageMobile !== "undefined" ? data.projectImageMobile : null,
                imgScreenshot1: data.projectScreenshot1 && data.projectScreenshot1 !== "undefined" ? data.projectScreenshot1 : null,
                imgScreenshot2: data.projectScreenshot2 && data.projectScreenshot2 !== "undefined" ? data.projectScreenshot2 : null,
                imgScreenshot3: data.projectScreenshot3 && data.projectScreenshot3 !== "undefined" ? data.projectScreenshot3 : null
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

    componentWillMount(){
        this.retrieveproject()
    }

    render(){
        return(
            <div>
                <Menu />
                <ProjectHeader
                    description={this.state.description}
                    title={this.state.title}
                    bannerImage={this.state.imgHero}
                    link={this.state.link}
                    />
                <ProjectDetail projectData={this.state} />
                <Footer />
            </div>
        )
    }
}

export default Project;