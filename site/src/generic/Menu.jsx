import React, {Component} from "react";
import {Link} from 'react-router-dom';
import './styles/menu.css';

class Menu extends Component {

    constructor(){
        super();
        this.state = {
            openClass: "",
            displayMenu: false
        }
        this.toggleClickClass = this.toggleClickClass.bind(this);
    }

    toggleClickClass(){
        const clickClass = this.state.openClass === "open" ? "" : "open";
        const displayMenu = this.state.displayMenu ? false : true;
        this.setState({
            openClass: clickClass,
            displayMenu: displayMenu
        })
    }

    render(){
        return(
            <div className={`menu-wrapper ${this.state.openClass}`}>
                <div className={`menu-icon ${this.state.openClass}`} onClick={this.toggleClickClass}>
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                </div>
                {this.state.displayMenu ? <div className={`menu ${this.state.openClass}`}>
                    <span className="vertical-align"></span>
                    <div className="menu-content">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/Projects">Projects</Link></li>
                        </ul>
                    </div>
                </div> : false}
            </div>
        )
    }
}

export default Menu;