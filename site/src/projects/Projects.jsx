import React, { Component } from 'react';

// components
import ProjectsWrapper from './ProjectsWrapper';

// generic components
import Menu from '../generic/Menu';
import Footer from '../generic/footer';

class Projects extends Component {
  constructor(){
    super()
    this.state = {
      isFinishedHomeAnimation: false
    }
    this.showPage = this.showPage.bind(this);
  }

  showPage(){
    this.setState({
      isFinishedHomeAnimation: true
    })
  }

  render() {

    return (
        <div>
            <Menu />
            <ProjectsWrapper />
            <Footer />
        </div>
    );
  }
}

export default Projects;
