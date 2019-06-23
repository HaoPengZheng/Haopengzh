import { List, Avatar, Icon } from 'antd';
import React,{Component} from 'react';

const listData: any[] | { href: string; title: string; avatar: string; description: string; content: string; }[] | undefined = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

const IconText = ({ type, text }:any) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

interface EssayContentProps{
  essayList:Array<any>
}

class EssayContent extends Component<EssayContentProps>{

  render(){
    return (<List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: page => {
          console.log(page);
        },
        pageSize: 8,
      }}
      dataSource={this.props.essayList}
      renderItem={item => (
        <List.Item
          key={item.title}
          actions={[
            <IconText type="star-o" text="156" />,
            <IconText type="like-o" text="156" />,
            <IconText type="message" text="2" />,
          ]}
          extra={
            <img
              width={100}
              style={{display:item.cover?"block":"none"}}
              height={80}
              alt="logo"
              src={item.cover}
            />
         
          }
        >
          <List.Item.Meta
            avatar={<Avatar src={item.author.profile.picture||""} />}
            title={<a href={`/essay/${item._id}`}>{item.title}</a>}
            description={item.description}
          />
          {/* {item.author} */}
        </List.Item>
      )}
    />)
  }
}

export default EssayContent
