import React,{Component} from 'react';
import { version, Button } from "antd";
import * as essayService from '@/services/essayService'
import EssayContent from '@/components/EssayContent'
import AnthorInfo from './components/AuthorInfo'
import styles from './index.less'
interface HomePageState{
  essayList:Array<Object>
}
class HomePage extends Component<any,HomePageState>{
  state = {
    essayList:[]
  }
  componentDidMount(){
    essayService.getEssay().then(res=>{
      this.setState({essayList:res.data.essayList})
    })
  }
  render(){
    return (
      <div className={styles.warp}>
        <div className={styles.essay_warp}><EssayContent essayList={this.state.essayList}/></div>
        <div><AnthorInfo/> </div>
      </div>
    )
  }
}
export default HomePage
