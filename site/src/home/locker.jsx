import React, { Component } from 'react';
import { Table } from 'reactstrap';
import axios from 'axios';

// styles

import './styles/locker.css';
import tumbler from './images/tumbler.png';

class Locker extends Component {

    constructor(){
        super();
        this.state = {
            skillsetColours : {
                html5 : '#fff',
                css: '#fff',
                javascript: '#fff',
                react: '#fff',
                node: '#fff',
                sass: '#fff',
                bullshit: '#fff'
            }
        }
        this.handleSkillsHover = this.handleSkillsHover.bind(this);
        this.setSkillsHeightandColour = this.setSkillsHeightandColour.bind(this);
    }

    // set the height and colour of each representative skill within the glass based on the height of the responsive image upon load.

    setSkillsHeightandColour(){
        const imgHeight = document.querySelector('.skills-container__image').height;
        const {skillsetPercent} = this.state;
        if(skillsetPercent){
            const skillsLength = Object.keys(skillsetPercent).length;
            let colorPercent = 1;
            const skillsValues = new Map(Object.entries(this.state.skillsetPercent));
            const totalSkillsValue = [...skillsValues.values()].reduce(((total, num) => {return total + num}));
            document.querySelectorAll('.waveLine').forEach((node, index) => {
                node.style.backgroundColor = '#ffa863';
            })
            Object.keys(skillsetPercent).forEach((key, index) => {
                const height = (skillsetPercent[key] / totalSkillsValue) * (imgHeight - 100);
                const skillColor = this.getColourTone('#441e00','#ffa863', colorPercent);
                document.querySelector('.skills-block_'+key).style.height = height+'px';
                document.querySelector('.skills-block_'+key).style.backgroundColor = skillColor;
                colorPercent = colorPercent - (100/skillsLength)/100;
                let colourStateClone = this.state.skillsetColours;
                colourStateClone[key] = skillColor;
                this.setState({
                    skillsetColours: colourStateClone
                })
            });
        }
    }

    /*
        getColourTone is a function taken from an amazing stackoverflow post and response found here: https://stackoverflow.com/a/13542669/2838542
        No credit can be applied to myself for this, it was found as it was exactly what I was looking for and took the creater 2 years to perfect.
    */

    getColourTone(c0, c1, p){
        var f=parseInt(c0.slice(1),16),t=parseInt(c1.slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF,R2=t>>16,G2=t>>8&0x00FF,B2=t&0x0000FF;
        return "#"+(0x1000000+(Math.round((R2-R1)*p)+R1)*0x10000+(Math.round((G2-G1)*p)+G1)*0x100+(Math.round((B2-B1)*p)+B1)).toString(16).slice(1);
    }

    // sets the height shown from the percentage of the skill for an individual element

    setSkillsHeightandColourIndividual(skill){
        const skillPercent = this.state.skillsetPercent[skill];
        const skillColour = this.state.skillsetColours[skill];
        const imgHeight = document.querySelector('.skills-container__image').height;
        const skillHeight = (skillPercent / 100) * (imgHeight - 100)
        document.querySelectorAll('.skills-block').forEach((node, index) => {
            node.style.height = 0
        });
        document.querySelectorAll('.waveLine').forEach((node, index) => {
            node.style.backgroundColor = skillColour;
        })
        document.querySelector('.skills-block_'+skill).style.height = skillHeight+'px';
    }

    handleSkillsHover(e){
        const skill = e.target.parentElement.dataset.skill;
        this.setSkillsHeightandColourIndividual(skill);
    }

    setSkillsFallback(){
        this.setState({
            skillsetPercent : {
                html5 : 100,
                css: 100,
                javascript: 80,
                react: 75,
                node: 25,
                sass: 70
            },
            skillsetColours : {
                html5 : '#fff',
                css: '#fff',
                javascript: '#fff',
                react: '#fff',
                node: '#fff',
                sass: '#fff'
            }
        });
    }

    retrieveSkills(){
        axios.get('/api/skills/list').then((res) => {
            let skillsetPercent = {};
            let skillsetColours = {};
            if(res.data.data.length > 0){
                res.data.data.map((item, index) => {
                    skillsetPercent[item.skillName] = item.skillPercent;
                    skillsetColours[item.skillName] = "#fff";

                })
                this.setState({
                    skillsetPercent: skillsetPercent,
                    skillsetColours: skillsetColours
                });
                console.log(this.state);
            }else{
                this.setSkillsFallback();
            }
            this.setSkillsHeightandColour();
            
        }, (res) => {
            this.setSkillsFallback();
            this.setSkillsHeightandColour();
        })
    }

    componentWillMount(){
        this.retrieveSkills();
    }
 
    render() {

        // render the table nodes based on how many options their are in the skills list
        const renderSkillsList = () =>{
            const {skillsetColours} = this.state;
            let tableBlock = [];
            Object.keys(skillsetColours).forEach((key, index) => {
                tableBlock.push( <tr key={index} data-skill={key} onMouseEnter={this.handleSkillsHover} onMouseLeave={this.setSkillsHeightandColour}><td>{key}</td><td style={{backgroundColor: skillsetColours[key] }}></td></tr> )
            });
            return(tableBlock);
            
            
        }

        // loop to retrieve each of the skills block from the state and output individually
        const renderSkillsGlass = () =>{
            const {skillsetPercent} = this.state;
            if(skillsetPercent){
                let skillsBlock = [];
                Object.keys(skillsetPercent).forEach((key, index) => {
                    skillsBlock.push(<div key={index} className={`skills-block skills-block_${key}`} ></div>)
                })
                return(skillsBlock);
            }else{
                return null;
            }
        }

        // loop to create each waveline for the inner glass
        const renderWave = () =>{
            let waveLines = [];
            for(let i = 0; i < 395; i++){
                waveLines.push(<div key={i} className="waveLine"></div>)
            }
            return waveLines;
        }
        return(
            <div className="container locker-container">
                <div className="row">
                    <div className="col-12">
                        <h1>My Glass</h1>
                        <p>This is my glass, its a tumbler and its full of whisky (yum). Each shade represents a percentage of where I feel my current knowledge base is at. I am forever learning new skills and improving upon existing ones, so this glass is likely to often change.</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <Table>
                            <tbody>
                                {renderSkillsList()}
                            </tbody>
                        </Table>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="skills-container">
                            <div className="skills-container__glass-contents">
                                <div className="skills-container__wave">
                                    {renderWave()}
                                </div>
                                {renderSkillsGlass()}
                            </div>
                            <img className="skills-container__image img-fluid" src={tumbler} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Locker;