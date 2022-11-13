import React from 'react';

//加入legao
import { Tabs,Input } from '@feb-team/legao-react';
import '@feb-team/legao-react/dist/styles/css/legao.all.css';

import BasicInformation from './components/BasicInformation';
import ActiveSkill from './components/ActiveSkill';
import LeaderSkill from './components/LeaderSkill';

var ActiveSkillList=[],LeaderSkillList=[];
class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			ActiveSkill:[],
			LeaderSkill:[]
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
				<Tabs type={"border"} defaultActiveKey={'0'} size={'normal'} onBeforeChange={(key)=>{return true}} onChange={(activeKey)=>{
					if(activeKey==='4'){
						this.setState({ActiveSkill:ActiveSkillList});
						this.setState({LeaderSkill:LeaderSkillList});
						console.log(ActiveSkillList);
					}
				}}>
					<Tabs.Panel key="0" label="基本資料" forceRender={true}>
						<BasicInformation  />
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
						<Textarea placeholder="basic" />
					</Tabs.Panel>
				</Tabs>
			</div>
		);
	}
}
export default App;