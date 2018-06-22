import React, { Component } from 'react';

import { Value } from 'slate';
import Html from 'slate-html-serializer';

// styles

import './styles/personalstatement.css';

const BLOCK_TAGS = {
    h1: 'heading-one',
    h2: 'heading-two',
    h3: 'heading-three',
    ol: 'numbered-list',
    ul: 'bulleted-list',
    li: 'list-item',
    p: 'paragraph',
    blockquote: 'block-quote',
    pre: 'code'
}
  
const MARK_TAGS = {
    em: 'italic',
    strong: 'bold',
    u: 'underlined'
}

const rules = [
    {
      deserialize:function(el, next ){
        if(el.tagName){
          const type = BLOCK_TAGS[el.tagName.toLowerCase()]
          if(!type) return
          if (el.tagName.toLowerCase() === 'a') {
            return {
              kind: 'inline',
              type: 'link',
              data: {
                href: el.getAttribute('href')
              },
              nodes: next(el.childNodes)
            }
          } else {
            return{
              object: 'block',
              type: type,
              nodes: next(el.childNodes),
            }
          }
        }
      },
      serialize:function(obj, children){
        if(obj.object != 'block') return;
        switch (obj.type) {
          case 'heading-one':
            return <h1>{children}</h1>
          case 'heading-two':
            return <h2>{children}</h2>
          case 'heading-three':
            return <h3>{children}</h3>
          case 'paragraph':
            return <p>{children}</p>
          case 'bulleted-list':
            return <ul>{children}</ul>
          case 'numbered-list':
            return <ol>{children}</ol>
          case 'list-item':
            return <li>{children}</li>
          case 'block-quote':
            return <blockquote>{children}</blockquote>
          // case 'underlined':
          //   return <u>{children}</u>
          case 'code':
            return (
              <pre>
                <code>{children}</code>
              </pre>
            )
          case 'link': {
            const entries = obj.data._root.entries[0];
            const href = entries[1]; 
            return <a href={href} target="_blank">{children}</a>
          }
          case 'block-quote':
            return <blockquote>{children}</blockquote>
        }
      }
    },
    {
      deserialize:function(el, next){
        if(el.tagName){
          const type = MARK_TAGS[el.tagName.toLowerCase()]
          if(!type) return
          if (el.tagName.toLowerCase() === 'a') {
            return {
              kind: 'inline',
              type: 'link',
              data: {
                href: el.getAttribute('href')
              },
              nodes: next(el.childNodes)
            }
          } else {
            return {
              object: 'mark',
              type: type,
              nodes: next(el.childNodes)
            }
          }
        }
      },
      serialize:function(obj, children){
        if(obj.object != 'mark') return
        switch(obj.type){
          case 'bold':
            return <strong>{children}</strong>
          case 'italic':
            return <em>{children}</em>
          case 'underlined':
            return <u>{children}</u>
          case 'code':
            return <code>{children}</code>
          case 'link':
            const entries = obj.data._root.entries[0];
            const href = entries[1]; 
            return <a href={href} target="_blank">{children}</a>
          case 'block-quote':
            return <blockquote>{children}</blockquote>
        }
      }
    },
    {
     // Special case for code blocks, which need to grab the nested childNodes.
     deserialize(el, next) {
      if (el.tagName.toLowerCase() == 'pre') {
        const code = el.childNodes[0]
        const childNodes =
          code && code.tagName.toLowerCase() == 'code'
            ? code.childNodes
            : el.childNodes
  
          return {
            object: 'block',
            type: 'code',
            nodes: next(childNodes),
          }
      }
    },
  },
  {
    // Special case for images, to grab their src.
    deserialize(el, next) {
      if (el.tagName.toLowerCase() == 'img') {
        return {
          object: 'block',
          type: 'image',
          isVoid: true,
          nodes: next(el.childNodes),
          data: {
            src: el.getAttribute('src'),
          },
        }
      }
    },
  },
  {
    // Special case for links, to grab their href.
    deserialize(el, next) {
      if (el.tagName.toLowerCase() == 'a') {
        return {
          object: 'inline',
          type: 'link',
          nodes: next(el.childNodes),
          data: {
            href: el.getAttribute('href'),
          },
        }
      }
    },
    serialize:function(obj, children){
      if(obj.object != 'inline') return
      switch(obj.type){
        case 'bold':
          return <strong>{children}</strong>
        case 'italic':
          return <em>{children}</em>
        case 'underlined':
          return <u>{children}</u>
        case 'code':
          return <code>{children}</code>
        case 'link': 
          const entries = obj.data._root.entries[0];
          const href = entries[1]; 
          return <a href={href} target="_blank">{children}</a>
        case 'block-quote':
          return <blockquote>{children}</blockquote>
      }
    }
  },
]
  
const html = new Html({rules})

class PersonalStatement extends Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }

    renderHtml(json, section){
        const serilizedJSON = html.serialize(Value.fromJSON( json ));
        this.setState({
            [section] : serilizedJSON
        });
    }

    componentWillMount(){
        this.renderHtml(JSON.parse(this.props.userBio.aboutMe), 'aboutMe')
        this.renderHtml(JSON.parse(this.props.userBio.aboutWork), 'aboutWork')
    }

    render() {
        const {userBio} = this.props;
        return(
            <div className="container personal-statement_container fadeIn">
                <div className="row">
                    <div className="col-12 col-lg-6" dangerouslySetInnerHTML={{ __html: this.state.aboutMe }}>
                        {/* <h1>About me...</h1>
                        <p>I have always been a creative person, starting young with writing short stories and then progressing into my teens by making films before DJing in my 20’s with a regular slot in Camden and on the radio. I was always trying to develop my own skills when it came to film editing techniques and designing my own flyers for my Camden gigs. It felt like a natural progression to move into the web where the challenge felt greater and more rewarding. Starting with a blank canvas and designing how the content should be presented and how it should react to the user I find really compelling.</p>
                        <p>Outside of work I’m a sociable person, with many friends and a big family which I like to spend my free time with. I am a father to 3 children and 2 step children which I like to both be inspired by and to inspire with good work ethics and a lot of play time and banter.</p>
                        <p>I enjoy keeping fit and have taken part in 6 Tough Mudders and hoping to at least get to 10! I still enjoy getting onto my turntables and the odd trip out to the French Alps for some snowboarding.</p> */}
                    </div>
                    <div className="col-12 col-lg-6" dangerouslySetInnerHTML={{ __html: this.state.aboutWork }}>
                        {/* <h1>About my work...</h1>
                        <p>I love frontend development. I particularly enjoy finding interesting ways for people to interact with a site and ways to represent content so that its both useful and visually compelling. I’m a self taught developer and have spent many hours at the start learning the basics in HTML and CSS before learning to make sites interactive using Javascript.</p>
                        <p>My base knowledge is Jquery. This is where I started, making a website powered by PHP where the user could upload an MP3 and play it back using a custom built HTML5 audio player with audio EQ bars. It was a steep learning curve but I learnt a lot quickly.</p>
                        <p>I have since then moved completely away from Jquery in favour of React and Vanilla Javascript. The move onto learn React and Node.js was thanks to many books and Udemy courses. I really enjoy the way React renders the HTML and interacts with an API.</p>
                        <p>I have aways worked really well within a team and currently lead a small Frontend team. I really enjoy assisting the juniors in their development but also learning new techniques and best practices from other developers no matter what their stages in their career.</p> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default PersonalStatement;