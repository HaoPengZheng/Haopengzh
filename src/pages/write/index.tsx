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
import Prompt from 'umi/prompt';
import { Icon, Button, Modal,message } from "antd";
import router from 'umi/router';
import GlobalUser from '@/components/GlobalUser/GlobalUser'
import { Upload, Popover } from 'antd';
import cheerio from 'cheerio'
import * as qiniuService from '@/services/qiniuService'
var Remarkable = require('remarkable');



const confirm = Modal.confirm;
//当离开页面时,询问是否存为草稿箱
function showConfirmForDraft(location: any) {
  confirm({
    title: '确认离开？',
    content: '您的文章尚未保存，先别走吧？',
    onOk() {
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      }).catch(() => console.log('Oops errors!'));
    },
    onCancel() {
      console.log(location)
      router.go(location.href)
    },
  });
}

var md = new Remarkable({
  html: true,
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
  title: string,
  renderMd: string,
  cover: string,
  previewImg:string,
  editorValue: string,
  onResize: Boolean,
  editorStyle: Object,
  converUploadLoadding:boolean,
  upload_token:string
}

function getBase64(img:Blob, callback:Function) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}


class Write extends React.Component<WriteProps, IWriteState>{
  state = {
    title: "",
    renderMd: "hello world",
    editorValue: "",
    previewImg:'',
    cover: "",
    coverKey:"nothing",
    onResize: false,
    editorStyle: {
      width: '40vw'
    },
    converUploadLoadding:false,
    upload_token:''
  }

  componentDidMount(){
    this.getQiniuUploadToken()
  }
  onChange = (newValue: string) => {
    console.log(md.render(newValue))
    this.setState({ editorValue: newValue, renderMd: md.render(newValue) })
  }

  getHtmlByObj = (refElement: any) => {
    return refElement.outerHTML
  }

  handleImgPic() {
    const $ = cheerio.load(this.state.renderMd)
    let cover = $('img').attr('src')
    alert(cover)
    this.setState({ cover })
    return cover
  }
  postEssay = () => {
  
    if(this.state.cover==""){
      this.handleImgPic()
    }
    let essay = {
      title: this.state.title,
      cover: this.state.cover==""?this.handleImgPic():this.state.cover,
      tag: [],
      time: new Date(),
      isMarkdown: true,
      content: this.state.editorValue,
      isDraft: false,
    }
    essayService.postEssay(essay).then((res: any) => {
      if(res.code==201){
        router.push('/')
      }else{
          
        message.warning(res.err.message)
      }
    })
  }
  handleMouseMove = (e: any) => {
    this.setState({ editorStyle: { width: e.clientX + 'px' } })
  }
  startResize = (e: any) => {
    e.persist()
    console.log('开始')
    this.setState({ onResize: true })
    document.addEventListener('mousemove', this.handleMouseMove)
  }
  endResize = (e: any) => {
    if (this.state.onResize) {
      e.persist()
      this.setState({ editorStyle: { width: e.clientX + 'px' } })
      this.setState({ onResize: false })
      document.removeEventListener('mousemove', this.handleMouseMove)
      console.log('结束')
    }
  }

  handleCoverUploadChange=(info:any)=>{

    getBase64(info.file.originFileObj, (imageUrl:string) =>
      this.setState({
        previewImg:imageUrl,
        converUploadLoadding: false,
      }),
    );
  }
  getQiniuUploadToken = ()=>{
    
      qiniuService.getQiniuToken().then((res:any)=>{
        this.setState({upload_token:res.data.token})
      })
  
  }
  getToken = async()=>{
    let upload_token= await this.getQiniuUploadToken()
    return upload_token
  }
  getUpLoadData = ()=>{
    let coverKey = new Date().getTime()+Math.floor(Math.random()*10000000000).toString()
    this.setState({cover:'http://static.haopengzh.cn/'+coverKey})
    return {
      token:this.state.upload_token,
      key:coverKey
    }
  }
  handleBeforeCoverUpload = (file:any)=>{
    return true
  }
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.converUploadLoadding ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.previewImg
        /* {imageUrl?<img src={imageUrl} alt="avatar" width="200" height="200" />:uploadButton} */
    const uploadCover = (
      <Upload
      name="file"
      beforeUpload={this.handleBeforeCoverUpload}
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      data={this.getUpLoadData}
      action="http://up-z2.qiniup.com"
      onChange={this.handleCoverUploadChange}
    >
  
      {imageUrl?<img src={imageUrl} alt="avatar" width="200" height="200" />:uploadButton}
    </Upload>)
    return (
      <div className={styles.write_warp} onMouseUp={this.endResize.bind(this)}>
        <div className={styles.header}>
          <div className={styles.title}>
            <input className={styles.title_input} onChange={(e) => { this.setState({ title: e.target.value }) }} value={this.state.title} placeholder="请输入文章标题.." />
          </div>
          <div className={styles.header_action}>
            <div className={styles.upload_img} style={{ margin: "10px" }}>
              <Popover content={uploadCover}>
                上传文章封面<Button type="link" ><Icon type="picture" style={{ fontSize: '1.2rem' }} /></Button>
              </Popover>
            </div>
            <GlobalUser />
          </div>
        </div>
        <div className={styles.editor_warp}>
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

            <Prompt
              when={true}
              message={(location) => {
                showConfirmForDraft(location)
                return false
              }
              }
            />
            <div dangerouslySetInnerHTML={{ __html: this.state.renderMd }} className="markdown-body" >
            </div>
          </div>
        </div>
        <div className={styles.btn_control}>
          <div className={styles.btn_control_editor}>
            <Icon type="file-markdown" />
          </div>
          <div className={styles.btn_control_action}>
            <div className={styles.btn_draft} style={{ margin: "10px" }}>文章将会自动保存到草稿。<Button>草稿箱</Button></div>
            <div ><Button type="primary" onClick={this.postEssay} >保存</Button></div>
          </div>
        </div>
      </div>
    )
  }
}


export default Write


