import React, { Component } from 'react';

// styles

import './styles/footer.css';


class Footer extends Component {
    render() {
        return(
            <div className="container-fluid footer-container">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-4 col-lg-4">
                            <ul>
                                <li className="footer-container__heading">James Seabrook</li>
                                <li><a href="mailto:its-me@jamesseabrook.com"><i className="js-at-sign"></i> its-me@jamesseabrook.com</a></li>
                                <li><i className="js-phone-circle"></i>07841 409 479</li>
                            </ul>
                        </div>
                        <div className="col-12 col-md-4 col-lg-4">
                            <ul>
                                <li><a href="https://www.linkedin.com/in/jamesthedeveloper"><i className="js-logo-circle-linkedin"></i> LinkedIn</a></li>
                                <li><a href="https://www.instagram.com/samesjeabrook/"><i className="js-logo-circle-instagram"></i> Instagram</a></li>
                                <li><a href="https://github.com/SamesJeabrook"><i className="js-logo-circle-github-2"></i> Github</a></li>
                            </ul>
                        </div>
                        <div className="col-12 col-md-4 col-lg-4">
                            <ul>
                                <li><i className="js-location-pin-home-1"></i>24 Chaulden Terrace</li>
                                <li>Hemel Hempstead</li>
                                <li>Herts</li>
                                <li>HP1 2AN</li>
                                <li className="text-muted">30 minutes from central London</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;