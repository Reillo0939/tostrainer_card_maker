import React, {useState,useEffect} from 'react';
import { v1 as uuidv1 } from 'uuid';

import {DndContext,closestCenter,KeyboardSensor,MouseSensor,TouchSensor,useSensor,useSensors,} from '@dnd-kit/core';
import {useSortable,SortableContext,sortableKeyboardCoordinates,verticalListSortingStrategy,} from '@dnd-kit/sortable';
import {
	restrictToVerticalAxis,
	restrictToParentElement,
	restrictToWindowEdges
  } from '@dnd-kit/modifiers';
import {CSS} from '@dnd-kit/utilities';

import { Button,Select,Tabs,Input,InputNumber,Card } from '@feb-team/legao-react';
import '@feb-team/legao-react/dist/styles/css/legao.all.css';

import ClrLock from './ActiveSkill/ClrLock';
import ClrBuff from './ActiveSkill/ClrBuff';
import DirAtk from './ActiveSkill/DirAtk';

//import CardCondition from './ActiveSkill/CardCondition';

var selectSkillList="1";
const set_skill=(self,text)=>{self.skill=text};
function ActiveSkills(props) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
	  } = useSortable({id: props.id});
	const style = {
		position:'relative',
		maxWidth: window.innerWidth,
		transform: CSS.Transform.toString(transform),
		transition,
	};
	function skill(){
		
		switch(props.self.name){
			case '解鎖': case 'clrLock':
				return <ClrLock set_skill={set_skill} self={props.self} id={props.id} init={props.init} />
			case '附加消除':case 'clrBuff':
				return <ClrBuff set_skill={set_skill} self={props.self} />
			case '直傷': case 'dirAtk':
				return <DirAtk set_skill={set_skill} self={props.self} id={props.id} init={props.init} />
			default:
				return <Card><p>{props.self.name+'目前尚未設計'}</p></Card>
			// do nothing
		}
	}
	return (
		<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
			{skill()}
			<Button onClick={deleteButton} size={"small"} style={{position:'absolute',right:'0px',top:'0px'}}>刪除</Button>
		</div>
	);
	function deleteButton(){
		let list=props.getList();
		switch(selectSkillList){
			case "1":
				const id1 = list[0].findIndex((i)=>i.id===props.id);
				//console.log(id1);
				props.deleteItems(id1);
			break;
			case "2":
				const id2 = list[1].findIndex((i)=>i.id===props.id);
				props.deleteItems(id2);
			break;
			case "3":
				const id3 = list[2].findIndex((i)=>i.id===props.id);
				props.deleteItems(id3);
			break;
			default:
   			 // do nothing
		}
	}
}
function ActiveSkillsList(props) {
	const [state,setState] = useState({
		skill1Name:"技能1",
		skill2Name:"技能2",
		skill3Name:"技能3",
		skill1Cd:6,
		skill2Cd:6,
		skill3Cd:6,
		SelectSkill:"解鎖"	
	});
	const [items1, setItems1] = useState([]);
	const [items2, setItems2] = useState([]);
	const [items3, setItems3] = useState([]);
	useEffect(() => {
		deleteItems(0,true);
		if(props.Input.ls!==''){
			let AS_List=props.Input.as.split(";;");		
			let set={
				skill1Name:"技能1",
				skill2Name:"技能2",
				skill3Name:"技能3",
				skill1Cd:6,
				skill2Cd:6,
				skill3Cd:6
			};	
			AS_List.forEach((data,index) => {
				switch(index){
					case 0:
						selectSkillList="1";
						set.skill1Name=data.split("=b=")[0];
						set.skill1Cd=data.split("=b=")[1].split("$s=")[0];
					break;
					case 1:
						selectSkillList="2";
						set.skill2Name=data.split("=b=")[0];
						set.skill2Cd=data.split("=b=")[1].split("$s=")[0];
					break;
					case 2:
						selectSkillList="3";
						set.skill3Name=data.split("=b=")[0];
						set.skill3Cd=data.split("=b=")[1].split("$s=")[0];
					break;
					default:

				}
				data.split("=b=")[1].split("$s=")[1].split(";").forEach(i=>{
					if(i.split("=")[0]!=='')
						addItems(i.split("=")[0],i)
				})
			});
			selectSkillList="1";
			setState({...state,...set})
		}
		
	}, [props.Input.time]);

	const sensors = useSensors(
		useSensor(MouseSensor, {
			activationConstraint: {
				distance: 20,
		}}),
		useSensor(TouchSensor, {
			activationConstraint: {
				distance: 20,
		}}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	return (
	<div>
		<Select defaultValue={state.SelectSkill} clear={false} placeholder={"請選擇"} onChange={(SelectSkill)=>{console.log(state);setState({...state,...{SelectSkill:SelectSkill}});addItems(SelectSkill)} }>
			<Select.Option value={"解鎖"}>解鎖</Select.Option>
			<Select.Option value={"附加消除"}>附加消除</Select.Option>
			<Select.Option value={"引爆符石"}>引爆符石x</Select.Option>
			<Select.Option value={"轉版"}>轉版x</Select.Option>
			<Select.Option value={"直傷"}>直傷</Select.Option>
			<Select.Option value={"增減集氣值"}>增減集氣值w</Select.Option>
			<Select.Option value={"增攻"}>增攻w</Select.Option>
			<Select.Option value={"增回"}>增回w</Select.Option>
			<Select.Option value={"減傷"}>減傷w</Select.Option>
			<Select.Option value={"改變消除方式"}>改變消除方式w</Select.Option>
			<Select.Option value={"延秒"}>延秒w</Select.Option>
			<Select.Option value={"排珠"}>排珠w</Select.Option>
			<Select.Option value={"追打"}>追打w</Select.Option>
			<Select.Option value={"兼具"}>兼具w</Select.Option>
			<Select.Option value={"變身"}>變身w</Select.Option>
			<Select.Option value={"合體"}>合體w</Select.Option>			
		</Select>

		<Tabs type={"card"} defaultActiveKey={selectSkillList} size={'normal'} onBeforeChange={(key)=>{return true} } onChange={(activeKey)=>{selectSkillList=activeKey}}>
			<Tabs.Panel key="1" label="技能1" forceRender={true} style={{position:'relative'}}>
				<Input placeholder="技能名稱" value={state.skill1Name} style={{width:'100%'}} onChange={skill1Name=>{setState({...state,...{skill1Name:skill1Name}});getList()}}/>
				<InputNumber max={2147483647} min={0} decimalPlaces={1} defaultValue={state.skill1Cd} onChange={ value=>{setState({...state,...{skill1Cd:Math.floor(value)}});getList() }} style={{position:'absolute',width:'40%',right:'0px',top:'-35px'}}/>
				<div>
					<DndContext 
						sensors={sensors}
						collisionDetection={closestCenter}
						onDragEnd={handleDragEnd1}
						modifiers={[restrictToVerticalAxis,restrictToParentElement,restrictToWindowEdges]}
					>
						<SortableContext 
							items={items1}
							strategy={verticalListSortingStrategy}
						>
							{items1.map(i => <ActiveSkills key={i.id} id={i.id} name={i.name} self={i} init={i.init} deleteItems={deleteItems} getList={getList}/>)}
						</SortableContext>
					</DndContext>
				</div>
			</Tabs.Panel>
			<Tabs.Panel key="2" label="技能2" forceRender={true} style={{position:'relative'}}>
				<Input placeholder="技能名稱" value={state.skill2Name} style={{width:'100%'}} onChange={skill2Name=>{setState({...state,...{skill2Name:skill2Name}});getList()}}/>
				<InputNumber max={2147483647} min={0} decimalPlaces={1} defaultValue={state.skill2Cd} onChange={ value=>{setState({...state,...{skill2Cd:Math.floor(value)}});getList() }} style={{position:'absolute',width:'40%',right:'0px',top:'-35px'}}/>
				<div>
					<DndContext 
						sensors={sensors}
						collisionDetection={closestCenter}
						onDragEnd={handleDragEnd2}
						modifiers={[restrictToVerticalAxis,restrictToParentElement,restrictToWindowEdges]}
					>
						<SortableContext 
							items={items2}
							strategy={verticalListSortingStrategy}
						>
							{items2.map(i => <ActiveSkills key={i.id} id={i.id} name={i.name} self={i} init={i.init} deleteItems={deleteItems} getList={getList}/>)}
						</SortableContext>
					</DndContext>
				</div>
			</Tabs.Panel>
			<Tabs.Panel key="3" label="技能3" forceRender={true} style={{position:'relative'}}>
				<Input placeholder="技能名稱" value={state.skill3Name} style={{width:'100%'}} onChange={skill3Name=>{setState({...state,...{skill3Name:skill3Name}});getList()}}/>
				<InputNumber max={2147483647} min={0} decimalPlaces={1} defaultValue={state.skill3Cd} onChange={ value=>{setState({...state,...{skill3Cd:Math.floor(value)}});getList() }} style={{position:'absolute',width:'40%',right:'0px',top:'-35px'}}/>
				<div>
					<DndContext 
						sensors={sensors}
						collisionDetection={closestCenter}
						onDragEnd={handleDragEnd3}
						modifiers={[restrictToVerticalAxis,restrictToParentElement,restrictToWindowEdges]}
					>
						<SortableContext 
							items={items3}
							strategy={verticalListSortingStrategy}
						>
							{items3.map(i => <ActiveSkills key={i.id} id={i.id} name={i.name} self={i} init={i.init} deleteItems={deleteItems} getList={getList}/>)}
						</SortableContext>
					</DndContext>
				</div>
			</Tabs.Panel>
		</Tabs>
		</div>
	);
	function getList(){
		props.get([
			{name:state.skill1Name,cd:state.skill1Cd,list:items1},
			{name:state.skill2Name,cd:state.skill2Cd,list:items2},
			{name:state.skill3Name,cd:state.skill3Cd,list:items3},
		]);
		return [items1,items2,items3];
	}
	function addItems(SelectSkill,init=""){
		let data={id:uuidv1(),name:SelectSkill,skill:"",init:init};
		switch(selectSkillList){
			case "1":
				items1.push(data);
				setItems1(items1.concat([]));
			break;
			case "2":
				items2.push(data);
				setItems2(items2.concat([]));
			break;
			case "3":
				items3.push(data);
				setItems3(items3.concat([]));
			break;
			default:
   			 // do nothing
		}
		getList();
	}
	function deleteItems(position,all=false){
		if(all===true){
			items1.length=0;
			items2.length=0;
			items3.length=0;
		}

		switch(selectSkillList){
			case "1":
				items1.splice(position, 1);
				setItems1(items1.concat([]));
			break;
			case "2":
				items2.splice(position, 1);
				setItems2(items2.concat([]));
			break;
			case "3":
				items3.splice(position, 1);
				setItems3(items3.concat([]));
			break;
			default:
   			 // do nothing
		}
		getList();
	}
	function handleDragEnd1(event) {
		const {active, over} = event;
		if (active.id !== over.id) {
			const oldIndex = items1.findIndex((i)=>i.id===active.id);
			const newIndex = items1.findIndex((i)=>i.id===over.id);
			items1.splice(newIndex, 0,items1.splice(oldIndex, 1)[0]);
			setItems1(items1.concat([]));
		}
		getList();
	}
	function handleDragEnd2(event) {
		const {active, over} = event;
		if (active.id !== over.id) {
			const oldIndex = items2.findIndex((i)=>i.id===active.id);
			const newIndex = items2.findIndex((i)=>i.id===over.id);
			items2.splice(newIndex, 0,items2.splice(oldIndex, 1)[0]);
			setItems2(items2.concat([]));
		}
		getList();
	}
	function handleDragEnd3(event) {
		const {active, over} = event;
		if (active.id !== over.id) {
			const oldIndex = items3.findIndex((i)=>i.id===active.id);
			const newIndex = items3.findIndex((i)=>i.id===over.id);
			items3.splice(newIndex, 0,items3.splice(oldIndex, 1)[0]);
			setItems3(items3.concat([]));
		}
		getList();
	}
}
export default ActiveSkillsList