import React from 'react'
import styles from './index.less'
import 'github-markdown-css'
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import * as essayService from '@/services/essayService'

import { Icon, Button } from "antd";

var Remarkable = require('remarkable');
var md = new Remarkable({
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
  match:any,
  location:any
}
export interface IWriteState {
  renderMd: string,
  editorValue: string
}
class Write extends React.Component<WriteProps, IWriteState>{
  state = {
    renderMd: "hello world",
    editorValue: ""
  }
  fetchEssayData = ()=>{
    let id = this.props.match.params.id
    essayService.getEssayById(id).then((res:any)=>{
      this.setState({renderMd:res.data.essay.content})
    })
  }
  componentDidMount(){
    this.fetchEssayData()
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
  render() {
    return (
      <div className={styles.write_warp} >
        <div className={styles.render}>
          <div dangerouslySetInnerHTML={{ __html: this.state.renderMd }} className="markdown-body">
          </div>
        </div>
      </div>
    )
  }
}


export default Write
