import React from 'react';
import { v1 as uuidv1 } from 'uuid';

//加入legao
import { Select,InputNumber,Drawer,Card,Tooltip } from '@feb-team/legao-react';
import '@feb-team/legao-react/dist/styles/css/legao.all.css';

class Addtime extends React.PureComponent {
	constructor(props) {
		super(props);
		let header='移動符石時間延長 1 秒',
			Type='延長',
			Time=1,
			ExTime=0,
			MaxExTime=0;
		if(props.init!==''){
			let data=props.init.split("=")[1].split(",")
			//`addtime=0,${Type},${Time},${ExTime},${MaxExTime};`
			switch (data[1]) {
				case '0':Type='延長'; break;
				case '1':Type='必然延長'; break;
				case '2':Type='必延長至'; break;
				default:
			}
			Time=data[2];
			ExTime=data[3];
			MaxExTime=data[4];
			header=this.header(Type,Time,ExTime,MaxExTime);
		}
		
		this.state = {
			visible: false,
			header:header,
			Type:Type,
			Time:Time,
			ExTime:ExTime,
			MaxExTime:MaxExTime,
			set_skill:props.set_skill,
			self:props.self,
		}
	}
	to_skill(){
		let Type=this.state.Type;
		let Time=this.state.Time;
		let ExTime=this.state.ExTime;
		let MaxExTime=this.state.MaxExTime;
		switch (Type) {
			case '延長':Type="0"; break;
			case '必然延長':Type="1"; break;
			case '必延長至':Type="2"; break;
			default:
		}
		return `addtime=0,${Type},${Time},${ExTime},${MaxExTime};`
	}
	header(Type=this.state.Type,Time=this.state.Time,ExTime=this.state.ExTime,MaxExTime=this.state.MaxExTime){
		let text=`移動符石時間${Type} ${Time} 秒`;
		if(ExTime>0)
			text+=`，\n隊伍成員每多 1 屬性，額外延長 ${ExTime} 秒`
		if(MaxExTime>0)
			text+=`，\n最多可額外延長 ${MaxExTime} 秒`
		return text;
	}
	render() {
		this.state.set_skill(this.state.self,this.to_skill());
		return (
				<React.Fragment>
				<Card shadow={'always'} onClick={()=>{
					this.setState({	visible: true})
				}}>
					{this.state.header.split('\n').map(i=><p key={uuidv1()}>{i}</p>)}
				</Card>
				<Drawer 
					visible={this.state.visible}
					className="test"
					onClose={()=>this.setState({visible: false})}
					close={true}
					width={320}
					height={320}
					placement={"right"}
					title={<p>{this.state.header}</p>}
					mask={true}
					maskClosable={true}
					zIndex={0}
					getContainer={null}
            	>
					<Tooltip title="選擇延長的方式" placement={"Left"}>
						<div>
							<Select defaultValue={this.state.Type} clear={false} placeholder={"請選擇"} 
							onChange={(Type)=>{
								this.setState({Type},()=>{
									this.setState({header:this.header()});
								});
							}}>
								<Select.Option value={"延長"}>延長</Select.Option>
								<Select.Option value={"必然延長"}>必然延長</Select.Option>
								<Select.Option value={"必延長至"}>必延長至</Select.Option>
							</Select>
						</div>
					</Tooltip>
					<Tooltip title="輸入延長的秒數" placement={"Left"}>
						<div>
							<InputNumber style={{width:'200px'}} defaultValue={this.state.Time} max={9223372036854775807} min={0} decimalPlaces={3} step={0.1} 
							onChange={(Time)=>{
									if(isNaN(Time))
									Time=0;
									this.setState({Time},()=>{
										this.setState({header:this.header()});
									});
								} } 
							/>
						</div>
					</Tooltip>
					
					<Tooltip title="輸入隊伍每多 1 屬性額外延長的秒數" placement={"Left"}>
						<div>
							<InputNumber style={{width:'200px'}} defaultValue={this.state.ExTime} max={9223372036854775807} min={0} decimalPlaces={3} step={0.1}
								onChange={(ExTime)=>{
									if(isNaN(ExTime))
										ExTime=0;
									this.setState({ExTime},()=>{
										this.setState({header:this.header()});
									});
								} } 
							/>
						</div>
					</Tooltip>
					<Tooltip title="輸入隊伍每多 1 屬性最多可額外延長的秒數" placement={"Left"}>
						<div>
							<InputNumber style={{width:'200px'}} defaultValue={this.state.MaxExTime} max={9223372036854775807} min={0} decimalPlaces={3} step={0.1}
								onChange={(MaxExTime)=>{
									if(isNaN(MaxExTime))
										MaxExTime=0;
									this.setState({MaxExTime},()=>{
										this.setState({header:this.header()});
									});
								} } 
							/>
						</div>
					</Tooltip>
			</Drawer>
		</React.Fragment>
		)
	}
}
export default Addtime;