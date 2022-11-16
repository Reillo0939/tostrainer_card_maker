import React from 'react';

//加入legao
import { Select,InputNumber,Drawer,Card,Tooltip } from '@feb-team/legao-react';
import '@feb-team/legao-react/dist/styles/css/legao.all.css';

class Mag extends React.PureComponent{
	constructor(props) {
		super(props);
		if(props.preset){

		}
		this.state = {
			visible: false,
			header:'全隊 攻擊力 1倍',
			Element:'不限屬性',
			Race:'全隊',
			Type:'攻擊力',
			Amplifier:'1',
		}
	}
	to_skill(){
		let Element=this.state.Element;
		let Race=this.state.Race;
		let Type=this.state.Type;
		let Amplifier=this.state.Amplifier;
		switch (Element) {
			case '不限屬性':Element="*"; break;
			case '水屬性':Element="w"; break;
			case '火屬性':Element="f"; break;
			case '木屬性':Element="t"; break;
			case '光屬性':Element="l"; break;
			case '暗屬性':Element="d"; break;
			default:
		}
		switch (Race) {
			case '全隊':Race="*"; break;
			case '神族':Race="G"; break;
			case '魔族':Race="E"; break;
			case '人類':Race="H"; break;
			case '獸類':Race="A"; break;
			case '龍類':Race="D"; break;
			case '妖精':Race="S"; break;
			case '機械':Race="M"; break;
			default:
		}
		switch (Type) {
			case '攻擊力':Type="A"; break;
			case '生命力':Type="H"; break;
			case '回復力':Type="R"; break;
			default:
		}
		return `mag=${Element},${Race},${Type},${Amplifier};`
	}
	header(){
		if(this.state.Element==="不限屬性")
			return this.state.Race+" "+this.state.Type+" "+this.state.Amplifier+"倍";
		else if(this.state.Race==="全隊")
			return this.state.Element+" "+this.state.Type+" "+this.state.Amplifier+"倍";
		else	
			return this.state.Element+" "+this.state.Race+" "+this.state.Type+" "+this.state.Amplifier+"\n倍";
	}
	render() {
		this.props.self.skill=this.to_skill();
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
				onClose={()=>{this.setState({visible: false})}}
				close={false}
				width={320}
				height={320}
				placement={"right"}
				title={<p>{this.state.header}</p>}
				mask={true}
				maskClosable={true}
				zIndex={0}
				afterVisibleChange={()=> {}}
            >
				<Tooltip title="選擇提升的屬性" placement={"Top"}>
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
				<Tooltip title="選擇提升的種族" placement={"Top"}>
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
				<Tooltip title="選擇提升的種類" placement={"Top"}>
						<div>
							<Select defaultValue={this.state.Type} clear={false} placeholder={"請選擇"} 
							onChange={(Type)=>{
								this.setState({Type},()=>{
									this.setState({header:this.header()});
								});
							}}>
								<Select.Option value={"攻擊力"}>攻擊力</Select.Option>
								<Select.Option value={"生命力"}>生命力</Select.Option>
								<Select.Option value={"回復力"}>回復力</Select.Option>
							</Select>
						</div>
				</Tooltip>
				<Tooltip title="輸入攻擊力提升的倍率" placement={"Top"}>
						<div>
							<InputNumber defaultValue={this.state.Amplifier} max={9223372036854775807} min={0} decimalPlaces={3} step={0.1} style={{width:'200px'}} 
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
export default Mag;