import React from 'react'

import ReactMarkdown from 'react-markdown'

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

import { Icon,Button } from "antd";

var Remarkable = require('remarkable');
var md = new Remarkable({
  highlight: function (str: any, lang: any) {
    // 如果 highlight.js 支持我們編寫的語言
    console.log(lang)
    console.log(str)
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
  editorValue: string
}
class Write extends React.Component<WriteProps, IWriteState>{
  state = {
    renderMd: "hello world",
    editorValue: ""
  }
  onChange = (newValue: string) => {
    console.log(md.render(newValue))
    this.setState({ editorValue: newValue, renderMd: md.render(newValue) })
  }
  render() {
    return (
      <div className={styles.write_warp} >
        <AceEditor
          className={styles.editor}
          placeholder="Placeholder Text"
          mode="markdown"
          theme="monokai"
          name="blah2"
          width="40vw"
          height="calc(100vh - 106px)"
          value={this.state.editorValue}
          style={null}
          onChange={this.onChange}
          fontSize={16}
          showPrintMargin={true}

          highlightActiveLine={true}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }} />
        <div className={styles.render}>
          <div dangerouslySetInnerHTML={{ __html: this.state.renderMd }} className="markdown-body">

          </div>
        </div>
        <div className={styles.btn_control}>
          <div className={styles.btn_control_editor}>
            <Icon type="file-markdown" />
          </div>
          <div className={styles.btn_control_action}><Button type="primary">保存</Button></div>
        </div>
      </div>
    )
  }
}


export default Write
