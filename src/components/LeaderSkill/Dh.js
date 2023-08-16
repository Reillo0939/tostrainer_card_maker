import React from 'react';
import { v1 as uuidv1 } from 'uuid';

//加入legao
import { Checkbox,InputNumber,Drawer,Card,Tooltip } from '@feb-team/legao-react';
import '@feb-team/legao-react/dist/styles/css/legao.all.css';

class Dh extends React.PureComponent{
	constructor(props) {
		super(props);
		let header='減少 0% 所受傷害',
		 	Percentage = 0,
		 	HPGT= 0,
		 	AC= 0,
		 	AI= [];
		if(props.init!==''){
			let data=props.init.split("=")
			//`dh = IdrOnly = 0,p = ${Percentage},condiHpGt = ${HPGT},condiAC = ${AC},condiAI = ${AI};`
			Percentage=data[3].split(',')[0]
			HPGT=data[4].split(',')[0]
			AC=data[5].split(',')[0]
			console.log(data )
			AI=data[6] 
				.replace("0","水")
				.replace("1","火")
				.replace("2","木")
				.replace("3","光")
				.replace("4","暗")
				.replace("6","心")
				.replace("_","")
				.split('');
			header=this.header(Percentage,HPGT,AC,AI);
		}
		this.state = {
			visible: false,
			header: header,
			Percentage: Percentage,//減傷量
			HPGT: HPGT,//HP大於多少
			AC: AC,//消幾種符石
			AI: AI,//同時消指定種符石
			
		}
	}
	to_skill(){
		let Percentage=this.state.Percentage;
		let HPGT=this.state.HPGT;
		let AC=this.state.AC;
		let AI=this.state.AI;
		if(AI.length>0)
			AI=AI.join("")
				.replace("水",0)
				.replace("火",1)
				.replace("木",2)
				.replace("光",3)
				.replace("暗",4)
				.replace("心",5);
		else
			AI="_"
		
		return `dh=IdrOnly=0,p=${Percentage},condiHpGt=${HPGT},condiAC=${AC},condiAI=${AI};`
	}
	header(
		Percentage=this.state.Percentage,
		HPGT=this.state.HPGT,
		AC=this.state.AC,
		AI=this.state.AI
	){
		let text='';
		if(HPGT>0)
			text+= "我方生命值大於等於"+HPGT+"%";
		if(AC>0){
			if(text!=='')
				text+="，\n且";
			text+= "消除"+AC+"種以上符石";
		}
		if(AI.length>0){
			if(text!=='')
				text+="，\n且";
			if(AI.length>1)
				text+="同時"
			text+= "消除"+AI.join("、")+"符石";
		}
		if(text!=='')
				text+="時，\n";
		text+= "減少 "+ Percentage+"% 所受傷害";
		return text;
	}
	render() {
		this.props.self.skill=this.to_skill();
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
				<Tooltip title="輸入減傷的比例" placement={"Left"}>
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
				<Tooltip title="輸入達成條件所需最低的血量比例" placement={"Left"}>
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
				<Tooltip title="輸入達成條件所需消除的符石種類數" placement={"Left"}>
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
				<Tooltip title="輸入達成條件所需同時消除的符石種類" placement={"Left"}>
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