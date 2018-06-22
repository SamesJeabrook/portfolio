import React, {Component} from 'react';

// components

import ProjectHeader from './ProjectHeader.jsx';
import ProjectDetail from './ProjectDetail.jsx';

// generic components
import Menu from '../generic/Menu';
import Footer from '../generic/footer';

class Project extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <Menu />
                <ProjectHeader />
                <ProjectDetail projectId={this.props.match.params.id} />
                <Footer />
            </div>
        )
    }
}

export default Project;