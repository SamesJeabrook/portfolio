import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {FormGroup} from 'reactstrap';
import {Editor} from 'slate-react';
import {Value} from 'slate';
import { isKeyHotkey } from 'is-hotkey'

import './styles/bio.css';

const existingValue = JSON.parse(localStorage.getItem('aboutMe'))
const initialValue = Value.fromJSON(
  existingValue || {
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        leaves: [
                            {
                                text: 'Initial line of text in a paragraph'
                            }
                        ]
                    }
                ]
            }
        ]
    }
});

const DEFAULT_NODE = 'paragraph'


const isBoldHotkey = isKeyHotkey('mod+b')
const isItalicHotkey = isKeyHotkey('mod+i')
const isUnderlinedHotkey = isKeyHotkey('mod+u')
const isCodeHotkey = isKeyHotkey('mod+`')


class AboutMe extends Component{

    state= {
        value: this.props.value ? typeof this.props.value == 'object' ? Value.fromJSON(this.props.value) : Value.fromJSON(JSON.parse(this.props.value)) : initialValue
    }

    hasMark = type => {
        const { value } = this.state
        return value.activeMarks.some(mark => mark.type == type)
    }

    hasBlock = type => {
        const { value } = this.state
        return value.blocks.some(node => node.type == type)
    }    

    onChange = ({ value }) => {
        this.setState({ value })
        this.props.onChange({value})
    }

    onKeyDown = (event, change) => {
        let mark
    
        if (isBoldHotkey(event)) {
          mark = 'bold'
        } else if (isItalicHotkey(event)) {
          mark = 'italic'
        } else if (isUnderlinedHotkey(event)) {
          mark = 'underlined'
        } else if (isCodeHotkey(event)) {
          mark = 'code'
        } else {
          return
        }
    
        event.preventDefault()
        change.toggleMark(mark)
        return true
    }

    onClickMark = (event, type) => {
        event.preventDefault()
        const { value } = this.state
        const change = value.change().toggleMark(type)
        this.onChange(change)
    }

    onClickBlock = (event, type) => {
        event.preventDefault()
        const { value } = this.state
        const change = value.change()
        const { document } = value
    
        // Handle everything but list buttons.
        if (type != 'bulleted-list' && type != 'numbered-list') {
          const isActive = this.hasBlock(type)
          const isList = this.hasBlock('list-item')
    
          if (isList) {
            change
              .setBlocks(isActive ? DEFAULT_NODE : type)
              .unwrapBlock('bulleted-list')
              .unwrapBlock('numbered-list')
          } else {
            change.setBlocks(isActive ? DEFAULT_NODE : type)
          }
        } else {
          // Handle the extra wrapping required for list buttons.
          const isList = this.hasBlock('list-item')
          const isType = value.blocks.some(block => {
            return !!document.getClosest(block.key, parent => parent.type == type)
          })
    
          if (isList && isType) {
            change
              .setBlocks(DEFAULT_NODE)
              .unwrapBlock('bulleted-list')
              .unwrapBlock('numbered-list')
          } else if (isList) {
            change
              .unwrapBlock(
                type == 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
              )
              .wrapBlock(type)
          } else {
            change.setBlocks('list-item').wrapBlock(type)
          }
        }
    
        this.onChange(change)
    }

    render(){
        return(
            
            <FormGroup>
                {this.renderToolbar()}
                {this.renderEditor()}
            </FormGroup>
        )
    }

    renderToolbar = () => {
        return (
          <div className="menu toolbar-menu">
            {this.renderMarkButton('bold', 'format_bold')}
            {this.renderMarkButton('italic', 'format_italic')}
            {this.renderMarkButton('underlined', 'format_underlined')}
            {this.renderMarkButton('code', 'code')}
            {this.renderBlockButton('heading-one', 'looks_one')}
            {this.renderBlockButton('heading-two', 'looks_two')}
            {this.renderBlockButton('block-quote', 'format_quote')}
            {this.renderBlockButton('numbered-list', 'format_list_numbered')}
            {this.renderBlockButton('bulleted-list', 'format_list_bulleted')}
          </div>
        )
    }

    renderMarkButton = (type, icon) => {
        const isActive = this.hasMark(type)
        const onMouseDown = event => this.onClickMark(event, type)
    
        return (
          // eslint-disable-next-line react/jsx-no-bind
          <span className="button" onMouseDown={onMouseDown} data-active={isActive}>
            <span className="material-icons">{icon}</span>
          </span>
        )
    }

    renderBlockButton = (type, icon) => {
        let isActive = this.hasBlock(type)
    
        if (['numbered-list', 'bulleted-list'].includes(type)) {
          const { value } = this.state
          const parent = value.document.getParent(value.blocks.first().key)
          isActive = this.hasBlock('list-item') && parent && parent.type === type
        }
        const onMouseDown = event => this.onClickBlock(event, type)
    
        return (
          // eslint-disable-next-line react/jsx-no-bind
          <span className="button" onMouseDown={onMouseDown} data-active={isActive}>
            <span className="material-icons">{icon}</span>
          </span>
        )
    }

    renderEditor = () => {
        return (
          <div className="editor form-control">
            <Editor
              placeholder="Enter some rich text..."
              value={this.state.value}
              onChange={this.onChange}
              onKeyDown={this.onKeyDown}
              renderNode={this.renderNode}
              renderMark={this.renderMark}
              spellCheck
              autoFocus
            />
          </div>
        )
    }

    renderNode = props => {
        const { attributes, children, node } = props
        switch (node.type) {
          case 'block-quote':
            return <blockquote {...attributes}>{children}</blockquote>
          case 'bulleted-list':
            return <ul {...attributes}>{children}</ul>
          case 'heading-one':
            return <h1 {...attributes}>{children}</h1>
          case 'heading-two':
            return <h2 {...attributes}>{children}</h2>
          case 'list-item':
            return <li {...attributes}>{children}</li>
          case 'numbered-list':
            return <ol {...attributes}>{children}</ol>
        }
    }

    renderMark = props => {
        const { children, mark, attributes } = props
        switch (mark.type) {
          case 'bold':
            return <strong {...attributes}>{children}</strong>
          case 'code':
            return <code {...attributes}>{children}</code>
          case 'italic':
            return <em {...attributes}>{children}</em>
          case 'underlined':
            return <u {...attributes}>{children}</u>
        }
    }
}

export default AboutMe