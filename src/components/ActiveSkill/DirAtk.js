import React from 'react';
import { v1 as uuidv1 } from 'uuid';

//加入legao
import { Checkbox,Drawer,Card,Select,InputNumber,Tooltip } from '@feb-team/legao-react';
import '@feb-team/legao-react/dist/styles/css/legao.all.css';

import CardCondition from './CardCondition';

class DirAtk extends React.PureComponent{
	constructor(props) {
		super(props);
		let header='對敵方全體造成1點的水屬性傷害',
			attr="水屬性",
			fix=1,
			mbA=0,
			mbR=0,
			mr=0,
			mbCC=0,
			iD=0,
			iS=false,
			iA=false;
		if(props.init!==''){
			let data=props.init.split("=")
			//`dirAtk = attr = 3,fix = 1234,mbA = 5678,mbR = 9012,mr = 3456,mbCC = 7890,iD = 12,iS = 1,iA = 1;`
			attr=data[2].split(',')[0];
			fix=data[3].split(',')[0];
			mbA=data[4].split(',')[0];
			mbR=data[5].split(',')[0];
			mr=data[6].split(',')[0];
			mbCC=data[7].split(',')[0];
			iD=data[8].split(',')[0];
			iS=data[9].split(',')[0]==='1'?true:false;
			iA=data[10].split(';')[0]==='1'?true:false;
			switch (data[2].split(',')[0]) {
				case 0:
					attr="水屬性"
					break;
				case 1:
					attr="火屬性"
					break;
				case 2:
					attr="木屬性"
					break;
				case 3:
					attr="光屬性"
					break;
				case 4:
					attr="暗屬性"
					break;
				case 5:
					attr="無屬性"
					break;
				default:
					break;
			}

			header=this.header(attr,fix,mbA,mbR,mr,mbCC,iD,iS,iA);
		}
		this.state = {
			visible: false,
			header:header,
			attr:attr,
			fix:fix,
			mbA:mbA,
			mbR:mbR,
			mr:mr,
			mbCC:mbCC,
			iD:iD,
			iS:iS,
			iA:iA
		}
	}
	to_skill(){
		let attr,
			fix=this.state.fix,
			mbA=this.state.mbA,
			mbR=this.state.mbR,
			mr=this.state.mr,
			mbCC=this.state.mbCC,
			iD=this.state.iD,
			iS=this.state.iS===true?1:0,
			iA=this.state.iA===true?1:0;
			switch(this.state.attr){
				case "水屬性":
					attr=0;
					break;
				case "火屬性":
					attr=1;
					break;
				case "木屬性":
					attr=2;
					break;
				case "光屬性":
					attr=3;
					break;
				case "暗屬性":
					attr=4;
					break;
				case "無屬性":
					attr=5;
					break;
				default:													
			}
		return `dirAtk=attr=${attr},fix=${fix},mbA=${mbA},mbR=${mbR},mr=${mr},mbCC=${mbCC},iD=${iD},iS=${iS},iA=${iA};`
	}
	header(
		attr=this.state.attr,
		fix=this.state.fix,
		mbA=this.state.mbA,
		mbR=this.state.mbR,
		mr=this.state.mr,
		mbCC=this.state.mbCC,
		iD=this.state.iD,
		iS=this.state.iS,
		iA=this.state.iA)
	{

		let text='';
		text+=`${fix>0?`${fix}點`:""}`;
		text+=`${mbA>0&&text!==''?`、\n`:''}`;
		text+=`${mbA>0?`${mbA}倍自身攻擊力`:""}`;
		text+=`${mbR>0&&text!==''?`、\n`:''}`;
		text+=`${mbR>0?`依累積戰鬥回合倍化${mbR}點`:""}`;
		text+=`${mr>0?`(最大${mbR*mr}點)`:""}`;
		text+=`${mbCC>0&&text!==''?`、\n`:''}`;
		text+=`${mbCC>0?`依消除附加效果的數量倍化${mbCC}點`:""}`;
		text+=`${text.length>=20?`\n`:''}`;
		text+=`的${attr}傷害`;
		text+=`${iD>0?`，\n此傷害無視${iD}%防禦力`:""}`;
		text+=`${iS?`，\n此傷害無視強化盾`:""}`;
		text+=`${iA?`，\n此傷害無視敵方所有技能`:""}`;
		return `對敵方全體造成${text}`;
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
			<Tooltip title="選擇屬性" placement={"Left"}>
				<div>
					<Select defaultValue={this.state.attr} clear={false} placeholder={"請選擇"} 
					onChange={(attr)=>{
						this.setState({attr},()=>{
							this.setState({header:this.header()});
						});
					}}>
						<Select.Option value={"水屬性"}>水屬性</Select.Option>
						<Select.Option value={"火屬性"}>火屬性</Select.Option>
						<Select.Option value={"木屬性"}>木屬性</Select.Option>
						<Select.Option value={"光屬性"}>光屬性</Select.Option>
						<Select.Option value={"暗屬性"}>暗屬性</Select.Option>
						<Select.Option value={"無屬性"}>無屬性</Select.Option>
					</Select>
				</div>
			</Tooltip>
			<Tooltip title="輸入固定傷害" placement={"Left"}>
				<div>
					<InputNumber defaultValue={this.state.fix} max={2147483647} min={0} decimalPlaces={3} step={1} style={{width:'100%'}} 
					onChange={(fix)=>{
						if(isNaN(fix))
							fix=0;
						fix=Math.floor(fix);
						this.setState({fix},()=>{
							this.setState({header:this.header()});
						});
					} } 
				/>
				</div>
			</Tooltip>
			<Tooltip title="輸入依攻擊力倍化的傷害" placement={"Left"}>
				<div>
					<InputNumber defaultValue={this.state.mbA} max={2147483647} min={0} decimalPlaces={3} step={1} style={{width:'100%'}} 
					onChange={(mbA)=>{
						if(isNaN(mbA))
							mbA=0;
						mbA=Math.floor(mbA);
						this.setState({mbA},()=>{
							this.setState({header:this.header()});
						});
					} } 
				/>
				</div>
			</Tooltip>
			<Tooltip title="輸入累積回合倍化的傷害" placement={"Left"}>
				<div>
					<InputNumber defaultValue={this.state.mbR} max={2147483647} min={0} decimalPlaces={3} step={1} style={{width:'100%'}} 
					onChange={(mbR)=>{
						if(isNaN(mbR))
							mbR=0;
						mbR=Math.floor(mbR);
						this.setState({mbR},()=>{
							this.setState({header:this.header()});
						});
					} } 
				/>
				</div>
			</Tooltip>
			<Tooltip title="輸入最多的累積回合" placement={"Left"}>
				<div>
					<InputNumber defaultValue={this.state.mr} max={2147483647} min={0} decimalPlaces={3} step={1} style={{width:'100%'}} 
					onChange={(mr)=>{
						if(isNaN(mr))
							mr=0;
						mr=Math.floor(mr);
						this.setState({mr},()=>{
							this.setState({header:this.header()});
						});
					} } 
				/>
				</div>
			</Tooltip>
			<Tooltip title="輸入依附加消除數量倍化的傷害" placement={"Left"}>
				<div>
					<InputNumber defaultValue={this.state.mbCC} max={2147483647} min={0} decimalPlaces={3} step={1} style={{width:'100%'}} 
					onChange={(mbCC)=>{
						if(isNaN(mbCC))
							mbCC=0;
						mbCC=Math.floor(mbCC);
						this.setState({mbCC},()=>{
							this.setState({header:this.header()});
						});
					} } 
				/>
				</div>
			</Tooltip>
			<Tooltip title="輸入無視的防禦力%" placement={"Left"}>
				<div>
					<InputNumber defaultValue={this.state.iD} max={2147483647} min={0} decimalPlaces={3} step={1} style={{width:'100%'}} 
					onChange={(iD)=>{
						if(isNaN(iD))
							iD=0;
						iD=Math.floor(iD);
						this.setState({iD},()=>{
							this.setState({header:this.header()});
						});
					} } 
				/>
				</div>
			</Tooltip>

			<Checkbox.Font defaultChecked={this.state.iS} onChange={(e)=>{
			let iS=e.target.checked
			this.setState({iS},()=>{
				this.setState({header:this.header()});
			});
			  } }>無視強化盾
			</Checkbox.Font>
			<Checkbox.Font defaultChecked={this.state.iA} onChange={(e)=>{
			let iA=e.target.checked
			this.setState({iA},()=>{
				this.setState({header:this.header()});
			});
				} }>無視所有技能
			</Checkbox.Font>
			</Drawer>
		</React.Fragment>
		)
	}
}
export default DirAtk;