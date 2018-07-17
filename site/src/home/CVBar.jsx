import React, { Component } from 'react';
import { Button } from 'reactstrap';

// styles

import './styles/cvbar.css';


class CVBar extends Component {
    constructor(props){
        super(props);
    };
    render() {

        let {printClick} = this.props;
        return(
            <div className="container-fluid cv-container fadeIn">
                <div className="cv-container_blend-color"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <form action="/jamesCV.docx">
                                <Button color="default">Download CV</Button>
                            </form>
                        </div>
                        <div className="col-6 d-none d-md-block">
                            <Button onClick={printClick} color="default">Print CV</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CVBar;