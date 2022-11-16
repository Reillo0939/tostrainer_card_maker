import React from 'react'

import { Select,Space,Input,InputNumber } from '@feb-team/legao-react';
import '@feb-team/legao-react/dist/styles/css/legao.all.css';

class BasicInformation extends React.Component {
	constructor(props) {
		super(props);
        this.state = {
            Basic:props.Basic,
            set_Basic:props.set_Basic,
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

        switch (Element) {
			case '水':Element="w"; break;
			case '火':Element="f"; break;
			case '木':Element="t"; break;
			case '光':Element="l"; break;
			case '暗':Element="d"; break;
			default:
		}
		switch (Race) {
			case '神':Race="G"; break;
			case '魔':Race="E"; break;
			case '人':Race="H"; break;
			case '獸':Race="A"; break;
			case '龍':Race="D"; break;
			case '妖':Race="S"; break;
			case '機':Race="M"; break;
			default:
		}
        return `${no}=b=${name},${HP},${Atk},${Recover},${Element},${Race},${series}`;
    }   
	render(){
        this.state.set_Basic(this.state.Basic,this.return_basic());
		return(
			<div>
                <Space direction='vertical'>
                    <div>
                        <Input placeholder="編號" head="編號" defaultValue={this.state.no} onChange={no=>this.setState({no})}/>
                        <Input placeholder="名稱" head="名稱" defaultValue={this.state.name} onChange={name=>this.setState({name})}/>
                        <Input placeholder="系列" head="系列" defaultValue={this.state.series} onChange={series=>this.setState({series})}/>
                    </div>
                    <Space align='Bottom'>
                    
                        <span style={{ position: 'relative',top: -10}}>屬性</span>
                        <Select defaultValue={this.state.Element} clear={false} onChange={Element=>this.setState({Element})} style={{width:'70px'}}>
                            <Select.Option value={"水"}>水</Select.Option>
                            <Select.Option value={"火"}>火</Select.Option>
                            <Select.Option value={"木"}>木</Select.Option>
                            <Select.Option value={"光"}>光</Select.Option>
                            <Select.Option value={"暗"}>暗</Select.Option>
                        </Select>
                        <span style={{ position: 'relative',top: -10}}>種族</span>
                        <Select defaultValue={this.state.Race} clear={false} onChange={Race=>this.setState({Race})} style={{width:'70px'}}>
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