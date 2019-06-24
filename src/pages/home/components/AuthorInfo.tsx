import { Skeleton, Switch, Card, Icon, Avatar, Popover,Tooltip } from 'antd';
import React from 'react';
const { Meta } = Card;

class AnthorInfo extends React.Component {
  state = {
    loading: false,
  };

  skipGithub() {
    window.open('https://github.com/HaoPengZheng/Haopengzh')
  }

  skipRss() {
    window.open('http://haopengzh.cn:3001/api/feed')
  }

  render() {
    const MyIcon = Icon.createFromIconfontCN({
      scriptUrl: '//at.alicdn.com/t/font_1257734_ja792ff535i.js', // 在 iconfont.cn 上生成
    });
    const { loading } = this.state;

    return (
      <div>
        <Card
          style={{ margin: 16 }}
          actions={[
            <Tooltip title="查看Github" placement="bottom">
              <Icon type="github" style={{ fontSize: '20px', color: '#000000' }} onClick={this.skipGithub} />
            </Tooltip>,
            <Tooltip title="zhp354416479" placement="bottom">
              <Icon type="wechat" style={{ fontSize: '20px', color: '#04be02' }} />
            </Tooltip>,
             <Tooltip title="喜欢就订阅一下吧" placement="bottom">
               <MyIcon type="icon-rss" style={{fontSize:'20px'}} onClick={this.skipRss}/>
             </Tooltip>
            ]}
        >
          <Skeleton loading={loading} avatar active>
            <Meta
              avatar={
                <Avatar src="http://pswzb45f5.bkt.clouddn.com/QQ%E6%88%AA%E5%9B%BE20190525170234.png" />
              }
              title="郑浩鹏"
              description="对酒当歌，人生几何。"
            />
            {/* <div>目前在前端入门的道路上跌打滚爬，期盼加入一个大家庭，一起成长一起努力。如果有合适的机会，请联系我。haopengzh@gmail.com</div> */}
          </Skeleton>
        </Card>
      </div>
    );
  }
}
export default AnthorInfo
