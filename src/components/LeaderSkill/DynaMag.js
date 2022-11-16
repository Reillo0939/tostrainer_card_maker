import React from 'react';

//加入legao
import { Select,InputNumber,Drawer,Card,Tooltip } from '@feb-team/legao-react';
import '@feb-team/legao-react/dist/styles/css/legao.all.css';

class DynaMag extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			header:'全隊 攻擊力額外提升1倍',
			Count:0,
			Type:'任意符石',
			Element:'不限屬性',
			Race:'全隊',
			Amplifier:1,
			set_skill:props.set_skill,
			self:props.self,
		}
	}
	to_skill(){
		let Count=this.state.Count;
		let Type=this.state.Type;
		let Element=this.state.Element;
		let Race=this.state.Race;
		let Amplifier=this.state.Amplifier;
		switch (Type) {
			case '任意符石':Type="-1"; break;
			case '水符石':Type="0"; break;
			case '火符石':Type="1"; break;
			case '木符石':Type="2"; break;
			case '光符石':Type="3"; break;
			case '暗符石':Type="4"; break;
			case '心符石':Type="5"; break;
			default:
		}
		switch (Element) {
			case '不限屬性':Element="-1"; break;
			case '水屬性':Element="0"; break;
			case '火屬性':Element="1"; break;
			case '木屬性':Element="2"; break;
			case '光屬性':Element="3"; break;
			case '暗屬性':Element="4"; break;
			default:
		}
		switch (Race) {
			case '全隊':Race="-1"; break;
			case '神族':Race="0"; break;
			case '魔族':Race="1"; break;
			case '人類':Race="2"; break;
			case '獸類':Race="3"; break;
			case '龍類':Race="4"; break;
			case '妖精':Race="5"; break;
			case '機械':Race="6"; break;
			default:
		}
		//dynaMag=1,0,-1,-1,5;
		return `dynaMag=${Count},${Type},${Element},${Race},${Amplifier};`
	}
	header(){
		let text=''
		if(this.state.Count>0)
			text+='消除'+this.state.Count+'粒'+this.state.Type+'時，';
		if(this.state.Element==="不限屬性")
			return text+this.state.Race+" 攻擊力額外提升"+this.state.Amplifier+"倍";
		else if(this.state.Race==="全隊")
			return text+this.state.Element+" 攻擊力額外提升"+this.state.Amplifier+"倍";
		else	
			return text+this.state.Element+' '+this.state.Race+" 攻擊力額外提升"+this.state.Amplifier+"\n倍";
	}
	render() {
		this.state.set_skill(this.state.self,this.to_skill());
		return (
				<React.Fragment>
				<Card onClick={()=>{
					this.setState({	visible: true})
				}}>
					<p>{this.state.header}</p>
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
					afterVisibleChange={()=> {}}
            	>
					<Tooltip title="輸入需要消除的符石數量" placement={"Top"}>
						<div>
							<InputNumber style={{width:'200px'}} defaultValue={this.state.Count} max={9223372036854775807} min={0} decimalPlaces={3} step={1} 
							onChange={(Count)=>{
									if(isNaN(Count))
										Count=0;
									this.setState({Count},()=>{
										this.setState({header:this.header()});
									});
								} } 
							/>
						</div>
					</Tooltip>
					<Tooltip title="選擇需要消除的符石屬性" placement={"Top"}>
						<div>
							<Select defaultValue={this.state.Type} clear={false} placeholder={"請選擇"} 
							onChange={(Type)=>{
								this.setState({Type},()=>{
									this.setState({header:this.header()});
								});
							}}>
								<Select.Option value={"任意符石"}>任意符石</Select.Option>
								<Select.Option value={"水符石"}>水符石</Select.Option>
								<Select.Option value={"火符石"}>火符石</Select.Option>
								<Select.Option value={"木符石"}>木符石</Select.Option>
								<Select.Option value={"光符石"}>光符石</Select.Option>
								<Select.Option value={"暗符石"}>暗符石</Select.Option>
								<Select.Option value={"心符石"}>心符石</Select.Option>
							</Select>
						</div>
					</Tooltip>
					
					<Tooltip title="選擇攻擊力提升的屬性" placement={"Top"}>
						<div>
							<Select defaultValue={this.state.Element} clear={false} placeholder={"請選擇"} 
							onChange={(Element)=>{
								this.setState({Element},()=>{
									this.setState({header:this.header()});
								});
							}}>
								<Select.Option value={"不限屬性"}>不限屬性</Select.Option>
								<Select.Option value={"水屬性"}>水屬性</Select.Option>
								<Select.Option value={"火屬性"}>火屬性</Select.Option>
								<Select.Option value={"木屬性"}>木屬性</Select.Option>
								<Select.Option value={"光屬性"}>光屬性</Select.Option>
								<Select.Option value={"暗屬性"}>暗屬性</Select.Option>
							</Select>
						</div>
					</Tooltip>
					<Tooltip title="選擇攻擊力提升的種族" placement={"Top"}>
						<div>
							<Select defaultValue={this.state.Race} clear={false} placeholder={"請選擇"} 
							onChange={(Race)=>{
								this.setState({Race},()=>{
									this.setState({header:this.header()});
								});
							}}>
								<Select.Option value={"全隊"}>全隊</Select.Option>
								<Select.Option value={"神族"}>神族</Select.Option>
								<Select.Option value={"魔族"}>魔族</Select.Option>
								<Select.Option value={"人類"}>人類</Select.Option>
								<Select.Option value={"獸類"}>獸類</Select.Option>
								<Select.Option value={"龍類"}>龍類</Select.Option>
								<Select.Option value={"妖精"}>妖精</Select.Option>
								<Select.Option value={"機械"}>機械</Select.Option>
							</Select>
						</div>
					</Tooltip>
					<Tooltip title="輸入攻擊力提升的倍率" placement={"Top"}>
						<div>
							<InputNumber style={{width:'200px'}} defaultValue={this.state.Amplifier} max={9223372036854775807} min={0} decimalPlaces={3} step={0.1}
								onChange={(Amplifier)=>{
									if(isNaN(Amplifier))
										Amplifier=0;
									this.setState({Amplifier},()=>{
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
export default DynaMag;