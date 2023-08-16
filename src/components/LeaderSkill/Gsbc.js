import React from 'react';
import { v1 as uuidv1 } from 'uuid';

//加入legao
import { Select,InputNumber,Drawer,Card,Tooltip } from '@feb-team/legao-react';
import '@feb-team/legao-react/dist/styles/css/legao.all.css';

class Gsbc extends React.PureComponent {
	constructor(props) {
		super(props);
		let header='每首批消除 1 組符石，\n掉落 1 粒水符石',
			Count=1,
			Type='隨機',
			Drop=1,
			Element='水';

		if(props.init!==''){
			let data=props.init.split("=")[1].split(",");
			//`gsbc=${Count},${Type},${Drop},${Element},-1;`
			Count=data[0];
			switch (data[1]) {
				case 'RDM':Type="隨機"; break;
				case 'SLF':Type="自身直行"; break;
				default:
			}
			Drop=data[2];
			switch (data[3]) {
				case '0':Element="水"; break;
				case '1':Element="火"; break;
				case '2':Element="木"; break;
				case '3':Element="光"; break;
				case '4':Element="暗"; break;
				case '5':Element="心"; break;
				case '6':Element="水強化"; break;
				case '7':Element="火強化"; break;
				case '8':Element="木強化"; break;
				case '9化':Element="光強化"; break;
				case '10':Element="暗強化"; break;
				case '11':Element="心強化"; break;
				default:
			}
			header=this.header(Count,Type,Drop,Element);
		}
		this.state = {
			visible: false,
			header:header,
			Count:Count,
			Type:Type,
			Drop:Drop,
			Element:Element,
			set_skill:props.set_skill,
			self:props.self,
		}
	}
	to_skill(){
		let Count=this.state.Count;
		let Type=this.state.Type;
		let Drop=this.state.Drop;
		let Element=this.state.Element;
		switch (Type) {
			case '隨機':Type="RDM"; break;
			case '自身直行':Type="SLF"; break;
			default:
		}
		switch (Element) {
			case '水':Element="0"; break;
			case '火':Element="1"; break;
			case '木':Element="2"; break;
			case '光':Element="3"; break;
			case '暗':Element="4"; break;
			case '心':Element="5"; break;
			case '水強化':Element="6"; break;
			case '火強化':Element="7"; break;
			case '木強化':Element="8"; break;
			case '光強化':Element="9"; break;
			case '暗強化':Element="10"; break;
			case '心強化':Element="11"; break;
			default:
		}
		return `gsbc=${Count},${Type},${Drop},${Element},-1;`
	}
	header(Count=this.state.Count,Type=this.state.Type,Drop=this.state.Drop,Element=this.state.Element){
		return `每首批消除 ${Count} 組符石，\n${Type==="自身直行"?"自身直行":""}掉落 ${Drop} 粒${Element}符石`;
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
					afterVisibleChange={()=> {}}
            	>
					<Tooltip title="輸入需要首消消除的符石組數" placement={"Left"}>
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
					<Tooltip title="選擇掉落的方式" placement={"Left"}>
						<div>
							<Select defaultValue={this.state.Type} clear={false} placeholder={"請選擇"} 
							onChange={(Type)=>{
								this.setState({Type},()=>{
									this.setState({header:this.header()});
								});
							}}>
								<Select.Option value={"隨機"}>隨機</Select.Option>
								<Select.Option value={"自身直行"}>自身直行</Select.Option>
							</Select>
						</div>
					</Tooltip>
					<Tooltip title="輸入掉落的數量" placement={"Left"}>
						<div>
							<InputNumber style={{width:'200px'}} defaultValue={this.state.Drop} max={9223372036854775807} min={0} decimalPlaces={3} step={1}
								onChange={(Drop)=>{
									if(isNaN(Drop))
										Drop=0;
									this.setState({Drop},()=>{
										this.setState({header:this.header()});
									});
								} } 
							/>
						</div>
					</Tooltip>
					<Tooltip title="選擇掉落的屬性" placement={"Left"}>
						<div>
							<Select defaultValue={this.state.Element} clear={false} placeholder={"請選擇"} 
							onChange={(Element)=>{
								this.setState({Element},()=>{
									this.setState({header:this.header()});
								});
							}}>
								<Select.Option value={"水"}>水符石</Select.Option>
								<Select.Option value={"火"}>火符石</Select.Option>
								<Select.Option value={"木"}>木符石</Select.Option>
								<Select.Option value={"光"}>光符石</Select.Option>
								<Select.Option value={"暗"}>暗符石</Select.Option>
								<Select.Option value={"心"}>心符石</Select.Option>
								<Select.Option value={"水強化"}>水強化符石</Select.Option>
								<Select.Option value={"火強化"}>火強化符石</Select.Option>
								<Select.Option value={"木強化"}>木強化符石</Select.Option>
								<Select.Option value={"光強化"}>光強化符石</Select.Option>
								<Select.Option value={"暗強化"}>暗強化符石</Select.Option>
								<Select.Option value={"心強化"}>心強化符石</Select.Option>
							</Select>
						</div>
					</Tooltip>				
			</Drawer>
		</React.Fragment>
		)
	}
}
export default Gsbc;