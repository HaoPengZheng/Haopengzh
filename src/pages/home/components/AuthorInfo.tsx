import { Skeleton, Switch, Card, Icon, Avatar } from 'antd';
import React from 'react';

const { Meta } = Card;

class AnthorInfo extends React.Component {
  state = {
    loading: false,
  };



  render() {
    const { loading } = this.state;

    return (
      <div>
        <Card
          style={{ margin: 16 }}
          actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
        >
          <Skeleton loading={loading} avatar active>
            <Meta
              avatar={
                <Avatar src="http://pswzb45f5.bkt.clouddn.com/QQ%E6%88%AA%E5%9B%BE20190525170234.png" />
              }
              title="郑浩鹏"
              description="对酒当歌，人生几何"
            />
          </Skeleton>
        </Card>
      </div>
    );
  }
}
export default AnthorInfo
