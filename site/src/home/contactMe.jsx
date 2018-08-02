import React, { Component } from 'react';
import { Button } from 'reactstrap';
import isEmpty from 'lodash/isEmpty';
import axios from 'axios';

// styles

import './styles/contactMe.css';


class ContactMe extends Component {

    constructor(){
        super();
        this.state = {
            errorMessages: {},
            successMessage: null,
            email: {}
        }
        this.showError = this.showError.bind(this);
        this.validateInput = this.validateInput.bind(this);
    }

    showError(e){
        e.preventDefault();
        let errorMessages = this.state.errorMessages;
        let errorCount = 0;
        
        document.querySelectorAll('.contact-input').forEach((target) => {
            const errorName = `error_${target.name}`;
            if(target.classList.contains("fake_news") || target.value == ""){
                target.classList.add("fake_news");
                let message;
                switch(errorName){
                    case "error_geezersName":
                        message = "I was taught not to speak to strangers, how about you tell me your name.";
                    break;
                    case "error_geezersSubject":
                        message = "Be nice to know what you want to talk about..."
                    break;
                    case "error_geezersEmail":
                        message = "Going to need an email if I'm going to get back to you about anything."
                    break;
                    case "error_geezersDescription":
                        message = "Is that it.... nothing to even start the conversation?"
                    break;
                }

                errorMessages[errorName] = message;

                this.setState({
                    errorMessages : errorMessages
                });
                errorCount++;
            }else{
                errorMessages[errorName] = null;

                this.setState({
                    errorMessages : errorMessages
                })
            }
        });

        if(errorCount === 0){
            if(!isEmpty(this.state.email)){
                console.log("Post these details to email", this.state)
                axios.post('/api/mail/send', this.state.email).then((res) => {
                    this.setState({
                        successMessage: "Thanks, I'll be in touch as soon as possible."
                    });
                    window.setTimeout(() => {
                        this.setState({
                            successMessage : null
                        })
                    }, 3000)
                }, (res) => {
                    let errorMessages = this.state.errorMessages;
                    errorMessages['error_notsent'] = "Unable to send email at this time";
                    this.setState({
                        errorMessages : errorMessages
                    });
                    console.log(res);
                })
            }else{
                errorMessages = this.state.errorMessages;
                errorMessages["error_form"] = "Check the form again, I think you missed something";
                this.setState({errorMessages: errorMessages})
                document.querySelectorAll('.contact-input').forEach((target) => {
                    if(target.value === ""){
                        target.classList.add("fake_news")
                    }
                });
            }
        }
    }

    validateInput(e){
        const val = e.target.value;
        const type = e.target.type;
        let emailClone = this.state.email;

        switch(type){
            case 'text':
                if(val < 1) { e.target.classList.add('fake_news') }else{ e.target.classList.remove('fake_news'); emailClone[e.target.name] = val };
            break;
            case 'email':
                const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(regex.test(String(val).toLowerCase())) { e.target.classList.remove('fake_news') }else{ e.target.classList.add('fake_news'); emailClone[e.target.name] = val };
            break;
            case 'textarea':
                if(val < 10) { e.target.classList.add('fake_news') }else{ e.target.classList.remove('fake_news'); emailClone[e.target.name] = val };
            break;
        }
        this.setState({
            email: emailClone,
            errorMessages: {}
        })
    }

    render() {
        const {errorMessages, successMessage} = this.state;
        const renderErrorMessages = () => {
            let messages = [];
            let errorCount = 0;
            Object.keys(errorMessages).forEach((item, index) => {
                if(errorMessages[item] != null){ messages.push(<li key={item}>{errorMessages[item]}</li>); errorCount ++}
            })
            errorCount > 1 && messages.unshift(<li key={"additional"}>Couple of things...</li>)
            return(messages);
        }

        return(
            <div className="container contact-me-container">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <h1>Get in touch</h1>
                        <p>I'm renowned for being a bit of a talker so happy to talk about anything, but if you have anything specific you want to chat about drop me a line using the form or any of the other contact options below</p>
                    </div>
                    <div className="col-12 col-md-6">
                        <form action="">
                            <p>Hi James,</p>
                            <p>My name is <input type="text" name="geezersName" onChange={this.validateInput} className="contact-input"/>, and I'd like to have a chat about <input type="text" name="geezersSubject" onChange={this.validateInput} className="contact-input"/>. If you want to get back in touch with me, ping me an email to <input type="email" name="geezersEmail" onChange={this.validateInput} className="contact-input"/> and we can discuss more on</p>
                            <textarea className="contact-input" name="geezersDescription" onChange={this.validateInput} cols="30" rows="10"></textarea>
                            <Button color="default" type="submit" onClick={this.showError}>Send</Button>
                        </form>
                        <div className="error_messages">
                            <ul>
                                {renderErrorMessages()}
                            </ul>
                        </div>
                        {successMessage ? <div className="success_message">{successMessage}</div> : null}
                    </div>
                </div>
            </div>
        )
    }
}

export default ContactMe;