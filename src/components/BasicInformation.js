import React from 'react'

import { Select,Space,Input,InputNumber } from '@feb-team/legao-react';
import '@feb-team/legao-react/dist/styles/css/legao.all.css';
//import { input } from '@testing-library/user-event/dist/types/event';
const Element_Change = new Map([
	['水','w'],['火','f'],['木','t'],['光','l'],['暗','d'],
	['w','水'],['f','火'],['t','木'],['l','光'],['d','暗']
]);
const Race_Change = new Map([
	['神','G'],['魔','E'],['人','H'],['獸','A'],['龍','D'],['妖','S'],['機','M'],
	['G','神'],['E','魔'],['H','人'],['A','獸'],['D','龍'],['S','妖'],['M','機']
]);

class BasicInformation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			basic:'',
			no:"",
			name:"",
			series:"",
			Element:"水",
			Race:"神",
			HP:3000,
			Atk:1500,
			Recover:400
		}
	}
	static getDerivedStateFromProps (props, state) {
		// 將 value prop 同步異動子組件的 phone state 值
		// (判斷 basic prop 與 basic state 不同時才變動)
		if (props.Input.basic!==state.basic) {
			let text=props.Input.basic;
			let no=     text.split('=b=')[0];
			let name=   text.split('=b=')[1].split(',')[0];
			let HP=     text.split('=b=')[1].split(',')[1];
			let Atk=    text.split('=b=')[1].split(',')[2];
			let Recover=text.split('=b=')[1].split(',')[3];

			let Element=Element_Change.get(text.split('=b=')[1].split(',')[4]);
			let Race=   Race_Change.get(text.split('=b=')[1].split(',')[5]);
			let series= text.split('=b=')[1].split(',')[6];

		  return { no:no,name:name,series:series,Element:Element,Race:Race,HP:HP,Atk:Atk,Recover:Recover,basic:props.Input.basic }
		}
	
		return null // 回傳 null 表示 state 無異動
	  }
	return_basic(){
		//123=b=456,3000,1500,400,w,G,789
		let no=this.state.no;
		let name=this.state.name;
		let series=this.state.series;
		let Element=this.state.Element;
		let Race=this.state.Race;
		let HP=this.state.HP;
		let Atk=this.state.Atk;
		let Recover=this.state.Recover;

		Element=Element_Change.get(Element)
		Race=Race_Change.get(Race)

		return `${no}=b=${name},${HP},${Atk},${Recover},${Element},${Race},${series}`;
	}   
	change(text){
		let no=     text.split('=b=')[0]
		let name=   text.split('=b=')[1].split(',')[0];
		let HP=     text.split('=b=')[1].split(',')[1];
		let Atk=    text.split('=b=')[1].split(',')[2];
		let Recover=text.split('=b=')[1].split(',')[3];

		let Element=Element_Change.get(text.split('=b=')[1].split(',')[4]);
		let Race=   Race_Change.get(text.split('=b=')[1].split(',')[5]);
		let series= text.split('=b=')[1].split(',')[6];

		this.setState({no,name,series,Element,Race,HP,Atk,Recover});
	}
	render(){
	
		this.props.Basic.text=this.return_basic();
		return(
			<div>
				<Space direction='vertical'>
					<div>
						<Input placeholder="編號" head="編號" value={this.state.no} onChange={no=>this.setState({no})}/>
						<Input placeholder="名稱" head="名稱" value={this.state.name} onChange={name=>this.setState({name})}/>
						<Input placeholder="系列" head="系列" value={this.state.series} onChange={series=>this.setState({series})}/>
					</div>
					<Space align='Bottom'>
					
						<span style={{ position: 'relative',top: -10}}>屬性</span>
						<Select value={this.state.Element} clear={false} onChange={Element=>this.setState({Element})} style={{width:'70px'}}>
							<Select.Option value={"水"}>水</Select.Option>
							<Select.Option value={"火"}>火</Select.Option>
							<Select.Option value={"木"}>木</Select.Option>
							<Select.Option value={"光"}>光</Select.Option>
							<Select.Option value={"暗"}>暗</Select.Option>
						</Select>
						<span style={{ position: 'relative',top: -10}}>種族</span>
						<Select value={this.state.Race} clear={false} onChange={Race=>this.setState({Race})} style={{width:'70px'}}>
							<Select.Option value={"神"}>神</Select.Option>
							<Select.Option value={"魔"}>魔</Select.Option>
							<Select.Option value={"人"}>人</Select.Option>
							<Select.Option value={"獸"}>獸</Select.Option>
							<Select.Option value={"龍"}>龍</Select.Option>
							<Select.Option value={"妖"}>妖</Select.Option>
							<Select.Option value={"機"}>機</Select.Option>
						</Select>
					</Space>
					
					<div>
						<span style={{ position: 'relative'}}>生命力</span>
						<InputNumber max={99999} min={0} decimalPlaces={1} defaultValue={this.state.HP} style={{width:'120px'}} onChange={HP=>this.setState({HP})} />
						<span style={{ position: 'relative'}}>攻擊力</span>
						<InputNumber max={99999} min={0} decimalPlaces={1} defaultValue={this.state.Atk} style={{width:'120px'}} onChange={Atk=>this.setState({Atk})} />
						<span style={{ position: 'relative'}}>回復力</span>
						<InputNumber max={99999} min={0} decimalPlaces={1} defaultValue={this.state.Recover} style={{width:'120px'}} onChange={Recover=>this.setState({Recover})} />
					</div>
				</Space>
			</div>
		);
	}
}
export default BasicInformation;