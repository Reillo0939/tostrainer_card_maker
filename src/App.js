import React from 'react';

//加入legao
import { Tabs } from '@feb-team/legao-react';
import '@feb-team/legao-react/dist/styles/css/legao.all.css';

import BasicInformation from './components/BasicInformation';
import ActiveSkill from './components/ActiveSkill';
import LeaderSkill from './components/LeaderSkill';
import IOPage from './components/IOPage';

var ActiveSkillList=[],LeaderSkillList=[];
function time(){
	let now_time=new Date();
	return `${now_time.getFullYear()}/${now_time.getMonth()+1}/${now_time.getDate()}-${now_time.getHours()}:${now_time.getMinutes()}`
}
class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			size: document.body.offsetWidth<528? (document.body.offsetWidth<447?'small':'normal') :'large',
			Basic:{text:''},
			ActiveSkill:'',
			LeaderSkill:'',
			Output:'',
			Input:{basic:'',as:'',ls:'' ,ts:'',imgId:'',imgCrop:'',imgSrc:'',time:Date.now()}
		}
	}
	test(){
		this.setState({});
		console.log(this.state.Input)
	}
	render(){
		function getActiveSkill(list){
			ActiveSkillList=list;
		}
		function getLeaderSkill(list){
			LeaderSkillList=list;
		}
		return(
			<div style={{  display: 'flex',justifyContent: 'center',alignItems: 'center' } }>
				<Tabs type={"border"} defaultActiveKey={'0'} size={this.state.size} onBeforeChange={(key)=>{return true}} onChange={(activeKey)=>{
					if(activeKey==='4'){
						let AS="";
						ActiveSkillList.forEach((value,index)=>{
							if(value.list.length>0)
								AS+=`${value.name}=b=${value.cd}$s=${value.list.map(i=>i.skill).join("")};`;
						})
						this.setState({
							ActiveSkill:`$$as=${AS}`,
							LeaderSkill:`$$ls=${time()}=s=${LeaderSkillList.map(i=>i.skill).join('')}`
						},
						()=>this.setState({Output:this.state.Basic.text+this.state.ActiveSkill+this.state.LeaderSkill+'$$ts=$$imgId=$$imgCrop=$$imgSrc='}));
						console.log(ActiveSkillList)
						//console.log(LeaderSkillList)
						//console.log(this.state.Output)
					}
				}}>
					<Tabs.Panel key="0" label="基本資料" forceRender={true}>
						<BasicInformation Basic={this.state.Basic} Input={this.state.Input}/>
					</Tabs.Panel>
					<Tabs.Panel key="1" label="主動技能" forceRender={true}>
						<ActiveSkill get={getActiveSkill}  Input={this.state.Input}/>
					</Tabs.Panel>
					<Tabs.Panel key="2" label="隊長技能" forceRender={true}>
						<LeaderSkill get={getLeaderSkill} Input={this.state.Input}/>
					</Tabs.Panel>
					<Tabs.Panel key="3" label="隊伍技能" forceRender={true}>
						
					</Tabs.Panel>
					
					<Tabs.Panel key="4" label="輸入/輸出" forceRender={true}>
						<IOPage Output={this.state.Output} Input={this.state.Input} test={()=>this.test()}/>
					</Tabs.Panel>
				</Tabs>
			</div>
		);
	}
}
export default App;