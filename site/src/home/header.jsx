import React, { Component } from 'react';
import './styles/header.css'
import headerImage from './images/HeaderMain.jpg';
import headShotImage from './images/portfolio.png';

class Intro extends Component {

    constructor(props){
        super(props);
    }

    animateIntro(){
        const callback = this.props.showPage;
        const paths = document.querySelectorAll('.animate');
        const pathsTotal = paths.length;
        let pathsCount = 0;

        [].forEach.call(paths, function(path) {
    
            var distancePerPoint = 1;
            var drawFPS = 120;
            var length, timer;
        
            function startDrawingPath(){
                length = 0;
                timer = setInterval(increaseLength, 100/drawFPS);
            }
        
            function increaseLength(){
                var pathLength = path.getTotalLength();
                length += distancePerPoint;
                path.style.strokeDasharray = [length,pathLength].join(' ');
                if(length >= pathLength){
                    clearInterval(timer)
                    pathsCount++
                    if(pathsCount === pathsTotal){
                        document.getElementById('headerImage').classList.add('fadeIn');
                        document.querySelector('.header_text').classList.add('fadeIn');
                        document.querySelector('svg').classList.add('fadeOut');
                        callback();
                    }
                }
            }
        
            startDrawingPath();
        });
    }

    slowScroll(){
        const speed = 5
        const elem = document.querySelector('.header_text-nodes');
        window.onscroll = function(){
            let ypos = window.scrollY / speed
            let coords = ypos + 'px';
            elem.style.top = coords;
        }
    }

    componentDidMount(){
        this.animateIntro();
        this.slowScroll();
    }

    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12" style={{padding: 0}}>
                        <div className="header-container">
                            {/*?xml version="1.0" encoding="utf-8"?*/}
                            
                            <div className="header_image">
                                <img id="headerImage" src={headerImage} alt="" />
                            </div>

                            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox={`0 0 968 726`} style={{enableBackground: 'new 0 0 968 7261'}} xmlSpace="preserve">
                                <style type="text/css" dangerouslySetInnerHTML={{__html: "\n\t\t\t\t.st0{fill:transparent;stroke:#999999;stroke-miterlimit:5;}\n\t\t\t\t\n\t\t\t" }} />
                                <path className="st0 animate" d="M960.5,448l-354,39c-8.4,1.4-16.1,1.2-23-1c-60-17.8-177-51.5-180-53.5s-2.6-2.2-4-4c-2.6-3.4-3.6-6.9-4-9
                                    c-13-89.2-26-178.3-39-267.5" />
                                <path className="st0 animate" d="M733.5,403.5 818.5,419.5 544.5,444.5 466.5,423.5 731.5,404.5 " />
                                <path className="st0 animate" d="M726.5,455.5 659.5,439.5 763.5,430.5 832.5,444.5 730.5,455.5 " />
                                <path className="st0 animate" d="M372.5,150.5 409.5,403.5 726.5,384.5 688.5,166.5 375.5,151.5 " />
                                <path className="st0 animate" points="-1.5,530.5 338.5,631.5 967.5,465.5 " />
                                <path className="st0 animate" points="-0.5,616.5 260.5,719.5 262,608.8 " />
                                <path className="st0 animate" d="M967.5,529.5 424.5,719.5 424.5,608.8 " />
                                <path className="st0 animate" d="M339.5,631.5L339.5,725.5"/>
                                <path className="st0 animate" d="M967.5,348.5L726.5,327"/>
                                <path className="st0 animate" d="M205.5,324.5l7,105c35.7,8,62.9,6.8,82-3l6-103c-6.8-8-74.2-7.8-95-3c-3.6,6.3,79.2,6.2,92,4" />
                                <path className="st0 animate" d="M-1.5,376.5L207.8,359.3"/>
                                <path className="st0 animate" d="M299,350L384,340.3"/>
                                <path className="st0 animate" points="-0.5,495.5 337.5,589.5 910.5,455.5 " />
                                <path className="st0 animate" d="M963.5,444.5v-8l-223-39l-44.5-239c-1.4-5.3-4.4-8.5-9.7-8.5l-321.8-19.8c-6.9,0.3-10.2,4.2-10,11.9l1,6.4" />
                            </svg>

                            <div className="header_text">
                                <div className="header_text-nodes">
                                    <div className="header_text-image">
                                        <img className="d-none d-md-inline" src={headShotImage} alt="Its me!"/>
                                    </div>
                                    <div className="header_text-node">
                                        <h1>James Seabrook</h1>
                                    </div>
                                    <div className="header_text-node">
                                        <p>{this.props.tagLine}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Intro;