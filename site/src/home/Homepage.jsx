import React, { Component } from 'react';

// components

import Header from './header';
import PersonalStatement from './personalstatement';
import ProjectsBar from './projectsBar';
import Locker from './locker';
import CVBar from './CVBar';
import ContactMe from './contactMe';

// generic components
import Menu from '../generic/Menu';
import Footer from '../generic/footer.jsx';

class Homepage extends Component {
  constructor(props){
    super(props)
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
    let {isFinishedHomeAnimation} = this.state;

    const renderPage = () => {
      return(
        <div>
            <Menu />
            <PersonalStatement userBio={this.props.userBio} />
            <ProjectsBar />
            <Locker />
            <CVBar />
            <ContactMe />
            <Footer />
        </div>
      )
    }

    return (
      <div>
        <Header showPage={this.showPage} tagLine={this.props.userBio ? this.props.userBio.tagLine : null} />
        
        {isFinishedHomeAnimation ?  renderPage() : null}
      </div>
    );
  }
}

export default Homepage;
