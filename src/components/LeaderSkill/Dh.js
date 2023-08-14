import React from 'react';

//加入legao
import { Checkbox,InputNumber,Drawer,Card,Tooltip } from '@feb-team/legao-react';
import '@feb-team/legao-react/dist/styles/css/legao.all.css';

class Dh extends React.PureComponent{
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			header: '減少 0% 所受傷害',
			Percentage: 0,//減傷量
			HPGT: 0,//HP大於多少
			AC: 0,//消幾種符石
			AI: [],//同時消指定種符石
			
		}
	}
	to_skill(){
		let Percentage=this.state.Percentage;
		let HPGT=this.state.HPGT;
		let AC=this.state.AC;
		let AI=this.state.AI;
		AI=AI.join("")
			 .replace("水",0)
			 .replace("火",1)
			 .replace("木",2)
			 .replace("光",3)
			 .replace("暗",4)
			 .replace("心",5);
		return `dh=p=${Percentage},condiHpGt=${HPGT},condiAC=${AC},condiAI${AI};`
	}
	header(){
		let text='';
		if(this.state.HPGT>0)
			text+= "我方生命值大於等於"+this.state.HPGT+"%";
		if(this.state.AC>0){
			if(text!='')
				text+="，且";
			text+= "消除"+this.state.AC+"種以上符石";
		}
		if(this.state.AI){
			if(text!='')
				text+="，且";
			if(this.state.AI.length>1)
				text+="同時"
			text+= "消除"+this.state.AI.join("、")+"符石";
		}
		if(text!='')
				text+="時，";
		text+= "減少 "+ this.state.Percentage+"% 所受傷害";
		return text;
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
				<Tooltip title="輸入減傷的比例" placement={"Top"}>
						<div>
							<InputNumber defaultValue={this.state.Percentage} max={100} min={0} decimalPlaces={3} step={1} style={{width:'200px'}} 
							onChange={(Percentage)=>{
								if(isNaN(Percentage))
								Percentage=0;
								this.setState({Percentage},()=>{
									this.setState({header:this.header()});
								});
							} } 
						/>
						</div>
				</Tooltip>
				<Tooltip title="輸入達成條件所需最低的血量比例" placement={"Top"}>
						<div>
							<InputNumber defaultValue={this.state.HPGT} max={100} min={0} decimalPlaces={3} step={1} style={{width:'200px'}} 
							onChange={(HPGT)=>{
								if(isNaN(HPGT))
								HPGT=0;
								this.setState({HPGT},()=>{
									this.setState({header:this.header()});
								});
							} } 
						/>
						</div>
				</Tooltip>
				<Tooltip title="輸入達成條件所需消除的符石種類數" placement={"Top"}>
						<div>
							<InputNumber defaultValue={this.state.AC} max={6} min={0} decimalPlaces={3} step={1} style={{width:'200px'}} 
							onChange={(AC)=>{
								if(isNaN(AC))
								AC=0;
								this.setState({AC},()=>{
									this.setState({header:this.header()});
								});
							} } 
						/>
						</div>
				</Tooltip>
				<Tooltip title="輸入達成條件所需同時消除的符石種類" placement={"Top"}>
						<div>
							<Checkbox.Group onChange={(AI)=>{
								this.setState({AI},()=>{
									this.setState({header:this.header()});
								});
							} } >
								<Checkbox>水</Checkbox>
								<Checkbox>火</Checkbox>
								<Checkbox>木</Checkbox>
								<Checkbox>光</Checkbox>
								<Checkbox>暗</Checkbox>
								<Checkbox>心</Checkbox>
							</Checkbox.Group>
						</div>
				</Tooltip>
				
            </Drawer>
		</React.Fragment>
		)
	}
}
export default Dh;