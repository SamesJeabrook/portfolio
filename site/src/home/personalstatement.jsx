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

    componentDidMount(){
        if(this.props.userBio){
            this.renderHtml(JSON.parse(this.props.userBio.aboutMe), 'aboutMe')
            this.renderHtml(JSON.parse(this.props.userBio.aboutWork), 'aboutWork')
        }
    }

    render() {
        const {userBio} = this.props;
        return(
            <div className="container personal-statement_container fadeIn">
                <div className="row">
                    <div className="col-12 col-lg-6" dangerouslySetInnerHTML={{ __html: this.state.aboutMe }}></div>
                    <div className="col-12 col-lg-6" dangerouslySetInnerHTML={{ __html: this.state.aboutWork }}></div>
                </div>
            </div>
        )
    }
}

export default PersonalStatement;