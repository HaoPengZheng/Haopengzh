import React from 'react'
import styles from './index.less'
import 'github-markdown-css'
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import * as essayService from '@/services/essayService'
import cheerio from 'cheerio'
import { Icon, Button } from "antd";
import { link } from 'fs';

var Remarkable = require('remarkable');
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

// 过滤目录使用的数据结构
export interface IHNode{
  text:string|null,
  level:number,
  link:string,
  children:Array<HNode>,
  parent:IHNode|null
}
class HNode implements IHNode{
  text:string|null;
  level:number;
  link:string;
  children:Array<HNode>;
  parent:IHNode|null;
  constructor({text,level,link,children,parent}:IHNode){
    this.text = text
    this.level = level
    this.link = link
    this.children = children
    this.parent = parent
  }

}

export interface EssayDeatilProp {
  match:any,
  location:any
}

export interface EssayDetailState {
  renderMd: string,
  catalogObject:IHNode
}



class EssayDetailPage extends React.Component<EssayDeatilProp, EssayDetailState>{
  state = {
    renderMd: "hello world",
    catalogObject: new HNode({text:null,level:0,link:"",children:[],parent:null}),
  }
  fetchEssayData = ()=>{
    let id = this.props.match.params.id
    essayService.getEssayById(id).then((res:any)=>{
      this.setState({renderMd: md.render(res.data.essay.content)})
      this.generateCatalogByRenderStr(this.state.renderMd)
    })
  }
  generateCatalogByRenderStr(renderStr:any){
    const $ = cheerio.load(renderStr)
    //打锚点
    for(let i = 1 ; i < 6 ;i++){
      $(`h${i}`).each(function(index,element){
        $(element).attr('href',`#h${i}_${index}`)
      })
    }
   

    //重点：遍历元素生成一颗节点树
    let origin:IHNode = new HNode({text:null,level:0,link:"",children:[],parent:null})
    let temp = origin 
    $('body').children().each(function(index,element){
      let tagName = element.tagName
      if(tagName[0]!='h'||$(element).text()==null){
        return ;
      }
      //打锚点
      let name:string = `h_tag_${index}`
      $(element).attr('id',name)
      let text = $(element).text()
      let level = parseInt(tagName[1])

      while(level<=temp.level){
        if(temp.parent!=null){
          temp = temp.parent
        }
      }
      let node = new HNode({text:text,level:level,link:`#${name}`,children:[],parent:temp})
      temp.children.push(node)
      temp = node
      // if(level>temp.level){
      //   let node = new HNode({text:text,level:level,link:`#${name}`,children:[],parent:temp})
      //   temp.children.push(node)
      //   temp = node
      // }else{
      //   while(level<=temp.level){
      //     if(temp.parent!=null){
      //       temp = temp.parent
      //     }
      //   }
      //   let node = new HNode({text:text,level:level,children:[],parent:temp})
      //   temp.children.push(node)
      //   temp = node
      // }
    })
    this.setState({renderMd:$.html()})
    this.setState({catalogObject:origin})
  }

  componentDidMount(){
    this.fetchEssayData()
  }
  render() {
    let childrenRender = (node:IHNode,index:number)=>{
      if(node.children.length==0){
        return  (<li  key={index}><a href={node.link}>{node.text}</a></li>)
      }else{
        return  (<li  key={index}><a href={node.link}>{node.text}</a><ul>{node.children.map(childrenRender)}</ul></li>)
      }
    }
    let catalog = this.state.catalogObject.children.map(childrenRender)

    return (
      <div className={styles.write_warp} >
        <div className={styles.render}>
          <div dangerouslySetInnerHTML={{ __html: this.state.renderMd }} className="markdown-body">
          </div>
        </div>
        <div>
          <ul className={styles.catalog_list}>
          {catalog}
          </ul>
        </div>
      </div>
    )
  }
}


export default EssayDetailPage
