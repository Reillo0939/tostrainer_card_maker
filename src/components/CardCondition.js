import React from 'react';

//加入legao
import { Button,Dialog,Select,Input,Drawer,message } from '@feb-team/legao-react';
import '@feb-team/legao-react/dist/styles/css/legao.all.css';
import {CloseOutlined} from '@feb-team/legao-icons-react';


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
		console.log(props)
		const Index = props.target.state.items.findIndex((i)=>i.id===props.id);
		props.target.deleteItems(props.target,Index);
	}
	render(){
		if(this.props.type===1)
			return(
				<div style={{ position: 'relative '} }>
					<Select style={{width:'100px'}} defaultValue={this.state.Element} clear={false} placeholder={"請選擇"} onChange={(value)=>{this.setState({Element:value})} }>
						<Select.Option value={"不限"}>不限</Select.Option>
						<Select.Option value={"水"}>水</Select.Option>
						<Select.Option value={"火"}>火</Select.Option>
						<Select.Option value={"木"}>木</Select.Option>
						<Select.Option value={"光"}>光</Select.Option>
						<Select.Option value={"暗"}>暗</Select.Option>
					</Select>
					<Select style={{width:'100px'}} defaultValue={this.state.Race} clear={false} placeholder={"請選擇"} onChange={(value)=>{this.setState({Race:value})} }>
						<Select.Option value={"不限"}>不限</Select.Option>
						<Select.Option value={"神"}>神</Select.Option>
						<Select.Option value={"魔"}>魔</Select.Option>
						<Select.Option value={"人"}>人</Select.Option>
						<Select.Option value={"獸"}>獸</Select.Option>
						<Select.Option value={"龍"}>龍</Select.Option>
						<Select.Option value={"妖"}>妖</Select.Option>
						<Select.Option value={"機"}>機</Select.Option>
					</Select>
					<Button onClick={()=>this.deleteItems(this.props)} style={{ position: 'absolute',top:"0px",right:"0px"} }><CloseOutlined/></Button>
				</div>
			);
		else
			return(
				<div style={{ position: 'relative '} }>
					<Input placeholder="系列" onChange={(value)=>{this.setState({Series:value})} } />
					<Button onClick={()=>this.deleteItems(this.props)} style={{ position: 'absolute',top:"0px",right:"0px"} }><CloseOutlined/></Button>
				</div>
			);
	}
}

class CardCondition extends React.PureComponent {
	state = {
		visible: false,
		items: []
	}
	deleteItems(target,position){
		target.state.items.splice(position,1);
		target.setState({items:this.state.items.concat([])});
	}
	render() {
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
				onClose={()=>this.setState({visible: false})}
				close={true}
				width={320}
				height={320}
				placement={"right"}
				title={<p>設定 屬性種族/系列 限制</p>}
				mask={false}
				maskClosable={false}
				zIndex={2000}
				afterVisibleChange={()=> {}}
            >
				<Button onClick={()=>{
					if(this.state.items.length<15){
						this.state.items.push({type:1,id:Date.now()})
						this.setState({items:this.state.items.concat([])});
					}
					else
						message.error('不能超過15個',3000)
				}}>屬性/種族</Button>
				<Button onClick={()=>{
					if(this.state.items.length<15){
						this.state.items.push({type:2,id:Date.now()})
						this.setState({items:this.state.items.concat([])});
					}
					else
						message.error('不能超過15個',3000)
				}}>系列</Button>
				<div>
					{this.state.items.map(i => <Condition type={i.type} id={i.id} target={this}/>)}
				</div>
            </Drawer>
		</React.Fragment>
		)
	}
}
export default CardCondition;