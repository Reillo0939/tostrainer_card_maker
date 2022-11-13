import React from 'react';

//加入legao
import { Select,InputNumber } from '@feb-team/legao-react';
import '@feb-team/legao-react/dist/styles/css/legao.all.css';

class Mag extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			Self:props.self,
			fun:props.fun,
		}
	}
	render() {
		return (
			<div style={{height:'280px'}}>
				<Select style={{width:'115px'}} defaultValue={this.state.Self.Element} clear={false} placeholder={"請選擇"} 
				onChange={(value)=>{
						this.state.Self.Element=value;
						this.state.fun();
					} }
				>
					<Select.Option value={"不限屬性"}>不限屬性</Select.Option>
					<Select.Option value={"水屬性"}>水屬性</Select.Option>
					<Select.Option value={"火屬性"}>火屬性</Select.Option>
					<Select.Option value={"木屬性"}>木屬性</Select.Option>
					<Select.Option value={"光屬性"}>光屬性</Select.Option>
					<Select.Option value={"暗屬性"}>暗屬性</Select.Option>
				</Select>
				<Select style={{width:'85px'}} defaultValue={this.state.Self.Race} clear={false} placeholder={"請選擇"} 
				onChange={(value)=>{
						this.state.Self.Race=value;
						this.state.fun();
					}}
				>
					<Select.Option value={"全隊"}>全隊</Select.Option>
					<Select.Option value={"神族"}>神族</Select.Option>
					<Select.Option value={"魔族"}>魔族</Select.Option>
					<Select.Option value={"人類"}>人類</Select.Option>
					<Select.Option value={"獸類"}>獸類</Select.Option>
					<Select.Option value={"龍類"}>龍類</Select.Option>
					<Select.Option value={"妖精"}>妖精</Select.Option>
					<Select.Option value={"機械"}>機械</Select.Option>
				</Select>
				<Select style={{width:'100px'}} defaultValue={this.state.Self.Type} clear={false} placeholder={"請選擇"} 
				onChange={(value)=>{
						this.state.Self.Type=value;
						this.state.fun();
					}}
				>
					<Select.Option value={"攻擊力"}>攻擊力</Select.Option>
					<Select.Option value={"生命力"}>生命力</Select.Option>
					<Select.Option value={"回復力"}>回復力</Select.Option>
				</Select>
				<InputNumber defaultValue={this.state.Self.Amplifier} max={9223372036854775807} min={0} decimalPlaces={3} step={0.1} style={{width:'120px'}} 
					onChange={(value)=>{
						if(isNaN(value))
							value=0;
						this.state.Self.Amplifier=value;
						this.state.fun();
					} } 
				/>
			</div>
		)
	}
}
export default Mag;