import React from 'react';
import { v1 as uuidv1 } from 'uuid';

//加入legao
import { Select,Drawer,Card,Tooltip } from '@feb-team/legao-react';
import '@feb-team/legao-react/dist/styles/css/legao.all.css';

class Dsv extends React.PureComponent{
	constructor(props) {
		super(props);
		let header='2 粒或以上的水符石相連即可發動消除',
			Count=2,
			Element='水';
		if(props.init!==''){
			let data=props.init.split("=")[1].split(",");
			//`dsv=${Count},${Element};`
			Count=data[0];
			switch (data[1]) {
				case '*':Element="任何"; break;
				case 'w':Element="水"; break;
				case 'f':Element="火"; break;
				case 't':Element="木"; break;
				case 'l':Element="光"; break;
				case 'd':Element="暗"; break;
				case 'h':Element="心"; break;
				default:
			}
			header=this.header(Count,Element);
		}
		this.state = {
			visible: false,
			header:header,
			Count:Count,
			Element:Element,
		}
	}
	to_skill(){
		let Count=this.state.Count;
		let Element=this.state.Element;
		switch (Element) {
			case '任何':Element="*"; break;
			case '水':Element="w"; break;
			case '火':Element="f"; break;
			case '木':Element="t"; break;
			case '光':Element="l"; break;
			case '暗':Element="d"; break;
			case '心':Element="h"; break;
			default:
		}
		return `dsv=${Count},${Element};`
	}
	header(Count=this.state.Count,Element=this.state.Element){
		return `${Count} 粒或以上的${Element}符石相連即可發動消除`;
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
				<Tooltip title="選擇需要改變消除方式的數量" placement={"Left"}>
						<div>
							<Select defaultValue={this.state.Count} clear={false} placeholder={"請選擇"} 
							onChange={(Count)=>{
								this.setState({Count},()=>{
									this.setState({header:this.header()});
								});
							}}>
								<Select.Option value={2}>2</Select.Option>
								<Select.Option value={3}>3</Select.Option>
								<Select.Option value={4}>4</Select.Option>
							</Select>
						</div>
					</Tooltip>
					<Tooltip title="選擇需要改變消除方式的符石屬性" placement={"Left"}>
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
								<Select.Option value={"任何"}>任何符石</Select.Option>
							</Select>
						</div>
					</Tooltip>
            </Drawer>
		</React.Fragment>
		)
	}
}
export default Dsv;