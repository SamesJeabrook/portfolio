import React, { Component } from 'react';
import { Button } from 'reactstrap';

// styles

import './styles/cvbar.css';


class CVBar extends Component {
    render() {
        return(
            <div className="container-fluid cv-container fadeIn">
                <div className="cv-container_blend-color"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <Button color="default">Download CV</Button>
                        </div>
                        <div className="col-6 d-none d-md-block">
                            <Button color="default">Print CV</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CVBar;