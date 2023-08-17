import React from 'react';
import { v1 as uuidv1 } from 'uuid';


//加入legao
import { Button,Select,Input,Drawer,message } from '@feb-team/legao-react';
import '@feb-team/legao-react/dist/styles/css/legao.all.css';


class Condition extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			Element:"不限",
			Race:"不限",
			Series:"",
		}
	}
	deleteItems(props){
		const id = props.getList.findIndex((i)=>i.id===props.id);
		props.getList.splice(id, 1);
		props.Refresh();
	}
	render(){
		if(this.props.type===1)
			return(
				<div style={{ position: 'relative '} }>
					<Select style={{width:'100px'}} defaultValue={this.props.data.Element} clear={false} placeholder={"請選擇"} onChange={(value)=>{this.props.data.Element=value} }>
						<Select.Option value={"不限"}>不限</Select.Option>
						<Select.Option value={"水"}>水</Select.Option>
						<Select.Option value={"火"}>火</Select.Option>
						<Select.Option value={"木"}>木</Select.Option>
						<Select.Option value={"光"}>光</Select.Option>
						<Select.Option value={"暗"}>暗</Select.Option>
					</Select>
					<Select style={{width:'100px'}} defaultValue={this.props.data.Race} clear={false} placeholder={"請選擇"} onChange={(value)=>{this.props.data.Race=value} }>
						<Select.Option value={"不限"}>不限</Select.Option>
						<Select.Option value={"神"}>神</Select.Option>
						<Select.Option value={"魔"}>魔</Select.Option>
						<Select.Option value={"人"}>人</Select.Option>
						<Select.Option value={"獸"}>獸</Select.Option>
						<Select.Option value={"龍"}>龍</Select.Option>
						<Select.Option value={"妖"}>妖</Select.Option>
						<Select.Option value={"機"}>機</Select.Option>
					</Select>
					<Button onClick={()=>this.deleteItems(this.props)} style={{ position: 'absolute',top:"0px",right:"0px"} }>刪除</Button>
				</div>
			);
		else
			return(
				<div style={{ position: 'relative '} }>
					<Input placeholder="系列"defaultValue={this.props.data.Series} onChange={(value)=>{this.props.data.Series=value} } />
					<Button onClick={()=>this.deleteItems(this.props)} style={{ position: 'absolute',top:"0px",right:"0px"} }>刪除</Button>
				</div>
			);
	}
}

class CardCondition extends React.PureComponent {
	constructor(props) {
		super(props);
		
		this.state = {
			visible: false,
			items: props.init
		}
	}
	
	addItems(type){
		if(this.state.items.length<15){
			this.state.items.push({type:type,id:uuidv1(),data:{Element:"不限",Race:"不限",Series:""}})
			this.setState({time:new Date()});
		}
		else
			message.error('不能超過15個',3000)
	}
	Refresh(){
		this.setState({time:new Date()})
	}
	render() {

		//console.log(this.state.items)
		this.props.setCondition(this.state.items);	
					
		return (
		<React.Fragment>
			<Button type="info" onClick={()=>{
				this.setState({
					visible: true
				})
            }}>設定限制</Button>
            <Drawer 
				visible={this.state.visible}
				className="test"
				onClose={()=>{
					this.setState({visible: false});
				}}
				close={true}
				width={320}
				height={320}
				placement={"right"}
				title={<p>設定 屬性種族/系列 限制</p>}
				mask={true}
				maskClosable={true}
				zIndex={2000}
				afterVisibleChange={()=> {}}
            >
				<Button onClick={()=>this.addItems(1)}>屬性/種族</Button>
				<Button onClick={()=>this.addItems(2)}>系列</Button>
				<div>
					{this.state.items.map(i => <Condition key={i.id} type={i.type} id={i.id} getList={this.state.items} data={i.data} Refresh={()=>this.Refresh()}/>)}
				</div>
            </Drawer>
		</React.Fragment>
		)
	}
}
export default CardCondition;