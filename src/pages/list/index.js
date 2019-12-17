import React from 'react';
import { Table, Modal, Button, Form, Input,Card,Row,Col } from 'antd';
import { connect } from 'dva';

const namespace = "list";

@connect(
  ({ list }) => ({
    list,
}))
class List extends React.Component {

  state = {
    visible: false,
    flag: "",
    name:"",
    age:undefined,
    desc:""

  }

  columns = [
    {
      title: 'id',
      dataIndex: 'id'
    },
    {
      title: '名称',
      dataIndex: 'name'
    },
    {
      title: '年龄',
      dataIndex: 'age'
    },
    {
      title: '自我介绍',
      dataIndex: 'desc'
    },
    {
      title: '操作',
      dataIndex: '',
      render: (text, record) => {
        return (
          <div>
            <a onClick={this.deleteOne.bind(this, record.id)}>删除</a> | <a onClick={this.editOneShow.bind(this, record.id, "edit")}> 编辑</a>
          </div>
         
        )
      }
    }
  ];


  componentDidMount() {
    this.props.dispatch({
      type: `${namespace}/showListEf`,
    })
  };

  //展示对话框
  // showModal = () => {
  //   this.setState({
  //     visible: true,
  //   })

  // };

  //取消会话框
  modalCancel = () => {

    this.setState({
      visible: false,
    })
  }

  modalOk = () => {

    const { dispatch, form: { validateFields } } = this.props;
    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: "list/addOne",
          payload: values,
          flag: this.state.flag,
        });
        this.setState({
          visible: false,
          flag: "add"
        });
      }
    });
  } 

  deleteOne(id) {
    const { dispatch} = this.props;
    const { datalist } = this.props.list;
    dispatch({
      type: "list/delOne",
      payload: id,
    });
    //他妈的
    this.setState({
      datalist: datalist
    })
  }

  editOneShow(id, flag) {
    const { dispatch} = this.props;

    dispatch({
      type: "list/editOneShow",
      payload:id,
      flag:flag,
    });
    this.setState({
      visible: true, 
      flag: flag,
    });

  }

  reset = ()=>{
    this.setState({
      name:"",
      age:undefined,
      desc:""
    })
  }

  nameFunc = (e) => {
    this.setState({
      name: e.target.value,
    })
  }
  ageFunc = (e) => {
    this.setState({
      age: e.target.value,
    })
  }
  descFunc = (e) => {
    this.setState({
      desc: e.target.value,
    })
  }

  submit = (e) => {
   
    
    const { dispatch } = this.props;
    // validateFields((err, values) => {
    //   if (!err) {
    //     dispatch({
    //       type: "list/addOne",
    //       payload: values,
    //     });
    //   }
    // });
    dispatch({
      type: 'list/search',
      name: this.state.name,
      age: this.state.age,
      desc: this.state.desc
    }),
    e.preventDefault(); //阻止默认跳转

  }

  render() {
    const buttonSty = {
      marginTop: '10px',
    };
    const inSty = {
      width:'250px'
    };
    const {form: { getFieldDecorator} } = this.props;

    const {editobj = {}, datalist=[]} = this.props.list;
    return (
      <div>
        <div>      
          <Form onSubmit={this.submit}>
            <Card hoverable={false}>
              <Row >
                <Col span={6} push={1}>名称：<Input onChange={this.nameFunc} value={this.state.name} name="name" placeholder="请输入" style={inSty}/></Col>
                <Col span={6} push={1}>年龄：<Input onChange={this.ageFunc} value={this.state.age} name="value" placeholder="请输入" style={inSty}/></Col>
                <Col span={6} push={1}>描述：<Input onChange={this.descFunc} value={this.state.desc} name="desc" placeholder="请输入" style={inSty}/></Col>
                <Col span={6} push={2}><Button type="primary" htmlType="submit" style={{marginRight:'10px'}}>搜索</Button><Button onClick={this.reset}>清空</Button></Col>        
              </Row>
            </Card>
          </Form>
        </div>
        <div style={buttonSty}>
          <Button type="primary" onClick={this.editOneShow.bind(this, 0, "add")}>新建</Button>
          <Table style={buttonSty}
            columns={this.columns}
            dataSource={datalist}
            //loading={cardsLoading}
          />
          <Modal destroyOnClose={true} forceRender={true} title="新建记录" visible={this.state.visible} onOk={this.modalOk} onCancel={this.modalCancel} flag={0}>
            <Form>
              <Form.Item label="id">
                {
                  getFieldDecorator('id', {
                    rules: [{ required: true }],
                    initialValue: editobj.id  
                  })
                  (
                    <Input placeholder="请输入唯一编号" />
                  )
                }
              </Form.Item>
              <Form.Item label="名称">
                {getFieldDecorator('name', {
                  rules: [{ required: true }],
                  initialValue: editobj.name                
                })(
                  <Input placeholder="请输入名字" />
                )}
              </Form.Item>
              <Form.Item label="年龄">
                {getFieldDecorator('age', {
                  rules: [{ required: true }],
                  initialValue: editobj.age
                })(
                  <Input placeholder="请输入年龄" />
                )}
              </Form.Item>
              <Form.Item label="自我介绍">
                {getFieldDecorator('desc', {
                  rules: [{ required: true }],
                  initialValue: editobj.desc               
                })(
                  <Input placeholder="请输入自我介绍" />
                )}
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    );
  }
}

//等于this.props.list //list为namespace的名字 namespace = 'list'

// function mapStateToProps(state) {

//   return {
//     datalist: state[namespace].datalist,
//     editobj:state[namespace].editobj,
//     cardsLoading: state.loading.effects['list/showListEf'],
//   }
// }


//export default connect(mapStateToProps)(Form.create()(List));
export default connect()(Form.create()(List));




