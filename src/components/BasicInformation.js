import React from 'react'

import { Select,Space,Input,InputNumber } from '@feb-team/legao-react';
import '@feb-team/legao-react/dist/styles/css/legao.all.css';

var no="",name="",series="",Element="水",Race="神",HP=3000,Atk=1500,Recover=400;
class BasicInformation extends React.Component {
	constructor(props) {
		super(props);
        this.state = {
		}
	}
    static get(){
        return {No:no,Name:name,Series:series,Element:Element,Race:Race,HP:HP,Atk:Atk,Recover:Recover};
    }
	render(){
		return(
			<div>
                <Space direction='vertical'>
                    <div>
                        <Input placeholder="編號" head="編號" defaultValue={no} onChange={value=>no=value}/>
                        <Input placeholder="名稱" head="名稱" defaultValue={name} onChange={value=>name=value }/>
                        <Input placeholder="系列" head="系列" defaultValue={series} onChange={value=>series=value}/>
                    </div>
                    <Space align='Bottom'>
                    
                        <span style={{ position: 'relative',top: -10}}>屬性</span>
                        <Select defaultValue={Element} clear={false} onChange={value=>Element=value} style={{width:'70px'}}>
                            <Select.Option value={"水"}>水</Select.Option>
                            <Select.Option value={"火"}>火</Select.Option>
                            <Select.Option value={"木"}>木</Select.Option>
                            <Select.Option value={"光"}>光</Select.Option>
                            <Select.Option value={"暗"}>暗</Select.Option>
                        </Select>
                        <span style={{ position: 'relative',top: -10}}>種族</span>
                        <Select defaultValue={Race} clear={false} onChange={value=>Race=value} style={{width:'70px'}}>
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
                        <InputNumber max={99999} min={0} decimalPlaces={1} defaultValue={HP} style={{width:'120px'}} onChange={value=>HP=Math.floor(value)} />
                        <span style={{ position: 'relative'}}>攻擊力</span>
                        <InputNumber max={99999} min={0} decimalPlaces={1} defaultValue={Atk} style={{width:'120px'}} onChange={value=>Atk=Math.floor(value)} />
                        <span style={{ position: 'relative'}}>回復力</span>
                        <InputNumber max={99999} min={0} decimalPlaces={1} defaultValue={Recover} style={{width:'120px'}} onChange={value=>Recover=Math.floor(value)} />
                    </div>
                </Space>
			</div>
		);
	}
}
export default BasicInformation;