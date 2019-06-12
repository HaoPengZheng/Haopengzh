import React,{Component} from 'react';
import { Row,Col } from "antd";
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
        <Row gutter={6}> 
          <Col xs={24} sm={14} md={16}>
          <div className={styles.essay_warp}><EssayContent essayList={this.state.essayList}/></div>
          </Col>
          <Col xs={24} sm={10} md={8}>
          <div><AnthorInfo/> </div>
          </Col>
        </Row>
      </div>
    )
  }
}
export default HomePage
