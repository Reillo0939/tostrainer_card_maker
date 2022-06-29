import React, {useState} from 'react';
import {DndContext,closestCenter,KeyboardSensor,MouseSensor,TouchSensor,useSensor,useSensors,} from '@dnd-kit/core';
import {useSortable,SortableContext,sortableKeyboardCoordinates,verticalListSortingStrategy,} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

import { Button,Select,Collapse,Tabs,Input,InputNumber } from '@feb-team/legao-react';
import '@feb-team/legao-react/dist/styles/css/legao.all.css';

import CardCondition from './CardCondition';

var selectSkillList="1",skill1Name="技能1",skill1Cd=6,skill2Name="技能2",skill2Cd=6,skill3Name="技能3",skill3Cd=6,SelectSkill="解鎖";

function ActiveSkills(props) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
	  } = useSortable({id: props.id});
	const style = {
	transform: CSS.Transform.toString(transform),
	transition,
	};
	return (
		<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
			<Collapse iconPosition={"left"} >
				<Collapse.Panel key = {props.id} header={props.name} icon={true}>
					<p>{props.name}</p>
					<CardCondition />
					<Button onClick={deleteButton}>刪除</Button>
				</Collapse.Panel>
			</Collapse>
		</div>
	);
	function deleteButton(){
		let list=props.getList();
		switch(selectSkillList){
			case "1":
				const id1 = list[0].findIndex((i)=>i.id===props.id);
				console.log(id1);
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
	const [items1, setItems1] = useState([]);
	const [items2, setItems2] = useState([]);
	const [items3, setItems3] = useState([]);
	const sensors = useSensors(
	useSensor(MouseSensor, {
		activationConstraint: {
			distance: 10,
	}}),
	useSensor(TouchSensor, {
		activationConstraint: {
			delay: 100,
			tolerance: 5,
	}}),
	useSensor(KeyboardSensor, {
		coordinateGetter: sortableKeyboardCoordinates,
	})
	);

	return (
	<div>
		<Select defaultValue={SelectSkill} clear={false} placeholder={"請選擇"} onChange={(value)=>{SelectSkill=value} }>
			<Select.Option value={"解鎖"}>解鎖</Select.Option>
			<Select.Option value={"附加消除"}>附加消除</Select.Option>
			<Select.Option value={"引爆符石"}>引爆符石</Select.Option>
			<Select.Option value={"轉版"}>轉版</Select.Option>
			<Select.Option value={"直傷"}>直傷</Select.Option>
			<Select.Option value={"增減集氣值"}>增減集氣值</Select.Option>
			<Select.Option value={"增攻"}>增攻</Select.Option>
			<Select.Option value={"增回"}>增回</Select.Option>
			<Select.Option value={"減傷"}>減傷</Select.Option>
			<Select.Option value={"改變消除方式"}>改變消除方式</Select.Option>
			<Select.Option value={"延秒"}>延秒</Select.Option>
			<Select.Option value={"排珠"}>排珠</Select.Option>
			<Select.Option value={"追打"}>追打</Select.Option>
			<Select.Option value={"兼具"}>兼具</Select.Option>
			<Select.Option value={"變身"}>變身</Select.Option>
			<Select.Option value={"合體"}>合體</Select.Option>			
		</Select>
		<Button style={{ position: 'absolute'} } onClick={addItems}>新增</Button>

		<Tabs type={"card"} defaultActiveKey={selectSkillList} size={'normal'} onBeforeChange={(key)=>{return true} } onChange={(activeKey)=>{selectSkillList=activeKey}}>
			<Tabs.Panel key="1" label="技能1" forceRender={true} style={{position:'relative'}}>
				<Input placeholder="技能名稱" head="技能名稱" defaultValue={skill1Name} onChange={value=>skill1Name=value}/>
				<InputNumber max={2147483647} min={0} decimalPlaces={1} defaultValue={skill1Cd} onChange={ value=>skill1Cd=Math.floor(value) } style={{position:'absolute',width:'150px',right:'0px',top:'0px'}}/>
				<DndContext 
					sensors={sensors}
					collisionDetection={closestCenter}
					onDragEnd={handleDragEnd1}
				>
					<SortableContext 
						items={items1}
						strategy={verticalListSortingStrategy}
					>
						{items1.map(i => <ActiveSkills key={i.id} id={i.id} name={i.name} deleteItems={deleteItems} getList={getList}/>)}
					</SortableContext>
				</DndContext>
			</Tabs.Panel>
			<Tabs.Panel key="2" label="技能2" forceRender={true} style={{position:'relative'}}>
				<Input placeholder="技能名稱" head="技能名稱" defaultValue={skill2Name} onChange={value=>skill2Name=value}/>
				<InputNumber max={2147483647} min={0} decimalPlaces={1} defaultValue={skill2Cd} onChange={ value=>skill2Cd=Math.floor(value) } style={{position:'absolute',width:'150px',right:'0px',top:'0px'}}/>
				<DndContext 
					sensors={sensors}
					collisionDetection={closestCenter}
					onDragEnd={handleDragEnd2}
				>
					<SortableContext 
						items={items2}
						strategy={verticalListSortingStrategy}
					>
						{items2.map(i => <ActiveSkills key={i.id} id={i.id} name={i.name} deleteItems={deleteItems} getList={getList}/>)}
					</SortableContext>
				</DndContext>
			</Tabs.Panel>
			<Tabs.Panel key="3" label="技能3" forceRender={true} style={{position:'relative'}}>
				<Input placeholder="技能名稱" head="技能名稱" defaultValue={skill3Name} onChange={value=>skill3Name=value}/>
				<InputNumber max={2147483647} min={0} decimalPlaces={1} defaultValue={skill3Cd} onChange={ value=>skill3Cd=Math.floor(value) } style={{position:'absolute',width:'150px',right:'0px',top:'0px'}}/>
				<DndContext 
					sensors={sensors}
					collisionDetection={closestCenter}
					onDragEnd={handleDragEnd3}
				>
					<SortableContext 
						items={items3}
						strategy={verticalListSortingStrategy}
					>
						{items3.map(i => <ActiveSkills key={i.id} id={i.id} name={i.name} deleteItems={deleteItems} getList={getList}/>)}
					</SortableContext>
				</DndContext>
			</Tabs.Panel>
		</Tabs>
		</div>
	);
	function getList(){
		props.get([
			{name:skill1Name,cd:skill1Cd,list:items1},
			{name:skill2Name,cd:skill2Cd,list:items2},
			{name:skill3Name,cd:skill3Cd,list:items3},
		]);
		return [items1,items2,items3];
	}
	function addItems(){
		switch(selectSkillList){
			case "1":
				items1.push({id:Date.now(),name:SelectSkill});
				setItems1(items1.concat([]));
			break;
			case "2":
				items2.push({id:Date.now(),name:SelectSkill});
				setItems2(items2.concat([]));
			break;
			case "3":
				items3.push({id:Date.now(),name:SelectSkill});
				setItems3(items3.concat([]));
			break;
			default:
   			 // do nothing
		}
		getList();
		
	}
	function deleteItems(position){
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