import React from 'react';

//加入legao
import { Tabs,Input } from '@feb-team/legao-react';
import '@feb-team/legao-react/dist/styles/css/legao.all.css';

import BasicInformation from './components/BasicInformation';
import ActiveSkill from './components/ActiveSkill';
import LeaderSkill from './components/LeaderSkill';

const set_Basic=(Basic,text)=>{Basic.text=text};
var ActiveSkillList=[],LeaderSkillList=[],Basic={text:''};
function time(){
	let now_time=new Date();
	return `${now_time.getFullYear()}/${now_time.getMonth()+1}/${now_time.getDate()}-${now_time.getHours()}:${now_time.getMinutes()}`
}
class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			size: document.body.offsetWidth<528? (document.body.offsetWidth<447?'small':'normal') :'large',
			Basic:'',
			ActiveSkill:'',
			LeaderSkill:'',
			Output:''
		}
	}

	render(){
		function getActiveSkill(list){
			ActiveSkillList=list;
		}
		function getLeaderSkill(list){
			LeaderSkillList=list;
		}
		const { Textarea } = Input;
		return(
			<div style={{  display: 'flex',justifyContent: 'center',alignItems: 'center' } }>
				<Tabs type={"border"} defaultActiveKey={'0'} size={this.state.size} onBeforeChange={(key)=>{return true}} onChange={(activeKey)=>{
					if(activeKey==='4'){
						this.setState({
							Basic:Basic.text,
							ActiveSkill:`$$as=${ActiveSkillList.map(i=>i.skill).join('')}`,
							LeaderSkill:`$$ls=${time()}=s=${LeaderSkillList.map(i=>i.skill).join('')}`
						},
						()=>this.setState({Output:this.state.Basic+this.state.ActiveSkill+this.state.LeaderSkill+'$$ts=$$imgId=$$imgCrop=$$imgSrc='}));
						console.log(ActiveSkillList)
						console.log(LeaderSkillList)
						console.log(this.state.Output)
					}
				}}>
					<Tabs.Panel key="0" label="基本資料" forceRender={true}>
						<BasicInformation Basic={Basic} set_Basic={set_Basic}  />
					</Tabs.Panel>
					<Tabs.Panel key="1" label="主動技能" forceRender={true}>
						<ActiveSkill get={getActiveSkill} />
					</Tabs.Panel>
					<Tabs.Panel key="2" label="隊長技能" forceRender={true}>
						<LeaderSkill get={getLeaderSkill}/>
					</Tabs.Panel>
					<Tabs.Panel key="3" label="隊伍技能" forceRender={true}>
						
					</Tabs.Panel>
					<Tabs.Panel key="4" label="輸入/輸出" forceRender={true}>
						<Textarea value={this.state.Output} />
					</Tabs.Panel>
				</Tabs>
			</div>
		);
	}
}
export default App;