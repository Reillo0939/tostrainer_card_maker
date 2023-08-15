import React, {useState} from 'react';

//加入legao
import { Select,InputNumber,Drawer,Card,Tooltip,Button,Checkbox,message } from '@feb-team/legao-react';
import '@feb-team/legao-react/dist/styles/css/legao.all.css';

function Possess_subsystem(props) {
	const [state, setState] = useState([]);
	function REheader(){
		setState({...state});
	}
	function header(){
		let data=props.data;
		return `${data.Possess_1}符石兼具 ${data.Amplifier}% ${data.Possess_2}效果`
	}
	return (
		<div style={{position:'relative'}}>
			<Card shadow={'always'} onClick={()=>{
					setState({visible: true})
				}}>
					<p>{header()}</p>
					
			</Card>
			<Drawer 
					visible={state.visible??false}
					className="test"
					onClose={()=>{setState({visible: false});props.Refresh()}}
					close={true}
					width={320}
					height={320}
					placement={"right"}
					title={<p>{header()}</p>}
					mask={true}
					maskClosable={true}
					zIndex={1}
					getContainer={null}
					afterVisibleChange={()=> {}}
            	>
				<Tooltip title="選擇兼具的符石屬性" placement={"Left"} >
					<div>
						<Select clear={false} placeholder={"請選擇"} defaultValue={props.data.Possess_1} onChange={(value)=>{props.data.Possess_1=value;REheader()} } >
							<Select.Option value={"水"}>水符石</Select.Option>
							<Select.Option value={"火"}>火符石</Select.Option>
							<Select.Option value={"木"}>木符石</Select.Option>
							<Select.Option value={"光"}>光符石</Select.Option>
							<Select.Option value={"暗"}>暗符石</Select.Option>
							<Select.Option value={"心"}>心符石</Select.Option>
							<Select.Option value={"所有屬性"}>所有屬性</Select.Option>
							<Select.Option value={"所有"}>所有</Select.Option>
						</Select>
					</div>
				</Tooltip>
				<Tooltip title="兼具多少%" placement={"Left"}>
						<div>
							<InputNumber defaultValue={props.data.Amplifier} max={2147483647} min={0} decimalPlaces={3} step={1} style={{width:'200px'}} 
							onChange={(Amplifier)=>{
								if(isNaN(Amplifier))
									Amplifier=0;

								props.data.Amplifier=Amplifier;
								REheader()
							} } 
						/>
						</div>
				</Tooltip>
				<Tooltip title="選擇被兼具的符石屬性" placement={"Left"}>
					<div>
						<Select clear={false} placeholder={"請選擇"} defaultValue={props.data.Possess_2} onChange={(value)=>{props.data.Possess_2=value;REheader()} } >
							<Select.Option value={"水"}>水符石</Select.Option>
							<Select.Option value={"火"}>火符石</Select.Option>
							<Select.Option value={"木"}>木符石</Select.Option>
							<Select.Option value={"光"}>光符石</Select.Option>
							<Select.Option value={"暗"}>暗符石</Select.Option>
							<Select.Option value={"心"}>心符石</Select.Option>
							<Select.Option value={"其他屬性"}>其他屬性</Select.Option>
						</Select>
					</div>
				</Tooltip>
			</Drawer>
			<Button onClick={deleteButton} size="small" style={{position:'absolute',right:'0px',top:'0px'}} >刪除</Button>
			
		</div>
	);
	function deleteButton(){
		if(props.getList.length>1){
			const id = props.getList.findIndex((i)=>i.id===props.id);
			props.getList.splice(id, 1);
			props.Refresh();
		}
		else
			message.error('不能刪除最後一個',3000)
       // props.deleteItems(id);
	}
}

class Possess extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			auto:false,
			header:'水符石兼具 100% 水符石效果',
			items:[
				{id:Date.now(),data:{Possess_1:"水",Possess_2:"水",Amplifier:100}}
			],
			LeaderOnly:false,
			set_skill:props.set_skill,
			self:props.self,
		}
	}
	to_skill(){
		let LeaderOnly=this.state.LeaderOnly?1:0;
		let Possess_1=[],Possess_2=[],Amplifier=[];
		this.state.items.forEach(
			(i)=>{
				Possess_1.push(i.data.Possess_1);
				Possess_2.push(i.data.Possess_2);
				Amplifier.push(i.data.Amplifier);
		})
		Possess_1=Possess_1
			.join('_')
			.replace("水",0)
			.replace("火",1)
			.replace("木",2)
			.replace("光",3)
			.replace("暗",4)
			.replace("心",5)
			.replace("所有屬性",6)
			.replace("所有",7)

		Possess_2=Possess_2
			.join('_')
			.replace("水",0)
			.replace("火",1)
			.replace("木",2)
			.replace("光",3)
			.replace("暗",4)
			.replace("心",5)
			.replace("其他屬性",6)
		
		Amplifier=Amplifier.join('_');
		//console.log(this.state)
		return `possess=${LeaderOnly},${Possess_1},${Possess_2},${Amplifier};`
	}
	header(){
		let text=[];
		let Possess_1=[],Possess_2=[],Amplifier=[];
		this.state.items.forEach(
			(i)=>{
				Possess_1.push(i.data.Possess_1);
				Possess_2.push(i.data.Possess_2);
				Amplifier.push(i.data.Amplifier);
		})
		Possess_1.forEach((value,index)=>{
			text.push(`${Possess_1[index]}符石兼具 ${Amplifier[index]}% ${Possess_2[index]}符石效果`);
		})
		text=text.join("，\n")
		if(this.state.LeaderOnly==true)
			text+="\n(不可疊加)"
		return text;
	}
	Refresh(){
		this.setState({header:this.header()});
		this.setState({time:new Date()})
		
	}
	render() {
		this.state.set_skill(this.state.self,this.to_skill());
		
		return (
				<React.Fragment>
				<Card shadow={'always'} onClick={()=>{
					this.setState({	visible: true})
				}}>
					{this.state.header.split('\n').map(i=><p>{i}</p>)}
				</Card>
				<Drawer 
					visible={this.state.visible}
					className="test"
					onClose={()=>this.setState({visible: false})}
					close={true}
					width={320}
					height={320}
					placement={"right"}
					title={<p>{this.state.header.slice(0,20)}</p>}
					mask={true}
					maskClosable={true}
					zIndex={0}
					getContainer={null}
					afterVisibleChange={()=> {}}
            	>
					<Checkbox onChange={(e)=>{
						let LeaderOnly=e.target.checked
						this.setState({LeaderOnly},()=>{
							this.setState({header:this.header()});
						});
					} }>正副隊長不可疊加</Checkbox>
					<Button onClick={()=>{this.state.items.push({id:Date.now(),data:{Possess_1:"水",Possess_2:"水",Amplifier:100}});this.setState({header:this.header()})}}>新增</Button>
					{this.state.items.map(i => <Possess_subsystem id={i.id} data={i.data} getList={this.state.items} Refresh={()=>this.Refresh()}/>)}
			</Drawer>
		</React.Fragment>
		)
	}
}
export default Possess;