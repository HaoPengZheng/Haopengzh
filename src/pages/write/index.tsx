import React from 'react'
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/mode/markdown';
import 'brace/ext/beautify'
import 'brace/ext/searchbox';
import 'brace/theme/github';
import 'brace/theme/monokai';
import styles from './index.less'
import 'github-markdown-css'
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import * as essayService from '@/services/essayService'

import { Icon, Button } from "antd";

var Remarkable = require('remarkable');
var md = new Remarkable({
  html:true,
  highlight: function (str: any, lang: any) {
    // 如果 highlight.js 支持我們編寫的語言
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (err) { }
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (err) { }

    return "";
  }
});
export interface WriteProps {

}
export interface IWriteState {
  renderMd: string,
  editorValue: string,
  onResize:Boolean,
  editorStyle:Object
}
class Write extends React.Component<WriteProps, IWriteState>{
  state = {
    renderMd: "hello world",
    editorValue: "",
    onResize:false,
    editorStyle:{
      width:'40vw'
    }
  }
  onChange = (newValue: string) => {
    console.log(md.render(newValue))
    this.setState({ editorValue: newValue, renderMd: md.render(newValue) })
  }
  postEssay = ()=>{
    let essay = {
      title: "第一篇md",
      tag: [],
      time: new Date(),
      isMarkdown: true,
      content: this.state.renderMd,
      isDraft: false,
    }
    essayService.postEssay(essay).then((res:any)=>{
      console.log(res)
    })
  }
  handleMouseMove = (e:any)=>{
    this.setState({editorStyle: {width:e.clientX+'px'}})
  }
  startResize = (e:any) =>{
    e.persist()
    console.log('开始')
    this.setState({onResize:true})
    document.addEventListener('mousemove',this.handleMouseMove)
  }
  endResize = (e:any)=>{
   
    console.log(e)
    if(this.state.onResize){
      e.persist()
      this.setState({editorStyle: {width:e.clientX+'px'}})
      this.setState({onResize:false})
      document.removeEventListener('mousemove',this.handleMouseMove)
      console.log('结束')
    }
    
  }
  render() {
    return (
      <div className={styles.write_warp} onMouseUp={this.endResize.bind(this)}>
        <AceEditor
          className={styles.editor}
          style={this.state.editorStyle}
          placeholder="Placeholder Text"
          mode="markdown"
          theme="monokai"
          name="blah2"
          height="calc(100vh - 106px)"
          value={this.state.editorValue}
          onChange={this.onChange}
          fontSize={16}
          showPrintMargin={true}
          onMouseDown={this.endResize}
          highlightActiveLine={true}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }} />
        <div className={styles.resize} onMouseDown={this.startResize} >
        </div>
        <div className={styles.render} >
          <div dangerouslySetInnerHTML={{ __html: this.state.renderMd }} className="markdown-body">

          </div>
        </div>
        <div className={styles.btn_control}>
          <div className={styles.btn_control_editor}>
            <Icon type="file-markdown" />
          </div>
          <div className={styles.btn_control_action}><Button type="primary" onClick={this.postEssay}>保存</Button></div>
        </div>
      </div>
    )
  }
}


export default Write
