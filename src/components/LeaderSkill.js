import React, {useState} from 'react';
import {DndContext,closestCenter,KeyboardSensor,MouseSensor,TouchSensor,useSensor,useSensors,} from '@dnd-kit/core';
import {useSortable,SortableContext,sortableKeyboardCoordinates,verticalListSortingStrategy,} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

import { Button,Select,Collapse } from '@feb-team/legao-react';
import '@feb-team/legao-react/dist/styles/css/legao.all.css';

import Mag from './LeaderSkill/Mag';




var SelectSkill="倍率";

function LeaderSkills(props) {
	const [items, setItems] = useState([]);
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
			case '倍率':
				props.self.Element=props.self.Element?props.self.Element:"不限屬性";
				props.self.Race=props.self.Race?props.self.Race:"全隊";
				props.self.Type=props.self.Type?props.self.Type:"攻擊力";
				props.self.Amplifier=props.self.Amplifier?props.self.Amplifier:"1";
				if(props.self.Element==="不限屬性")
					props.self.header=props.self.Race+" "+props.self.Type+" "+props.self.Amplifier+"倍";
				else if(props.self.Race==="全隊")
					props.self.header=props.self.Element+" "+props.self.Type+" "+props.self.Amplifier+"倍";
				else	
					props.self.header=props.self.Element+" "+props.self.Race+" "+props.self.Type+" "+props.self.Amplifier+"\n倍";
				
				return <Mag self={props.self} fun={refresh}/>
			
			default:
			// do nothing
		}
	}
	return (
		<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
			<Collapse iconPosition={"left"} >
				<Collapse.Panel key = {props.id} header={props.self.header} icon={true} >
					{skill()}
				</Collapse.Panel>
			</Collapse>
			<Button onClick={deleteButton} style={{position:'absolute',right:'0px',top:'0px'}}>刪除</Button>
		</div>
	);
	function deleteButton(){
        const id = props.getList().findIndex((i)=>i.id===props.id);
        props.deleteItems(id);
	}
	function refresh(){
		setItems([]);
	}
}
function LeaderSkillsList(props) {
	const [items, setItems] = useState([]);
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
		<Select defaultValue={SelectSkill} clear={false} placeholder={"請選擇"} onChange={(value)=>{SelectSkill=value} }>
			<Select.Option value={"倍率"}>倍率</Select.Option>
			<Select.Option value={"動態倍率"}>動態倍率</Select.Option>
			<Select.Option value={"減傷"}>減傷</Select.Option>
			<Select.Option value={"改變消除方式"}>改變消除方式</Select.Option>
			<Select.Option value={"兼具"}>兼具</Select.Option>
			<Select.Option value={"改變掉落"}>改變掉落</Select.Option>
			<Select.Option value={"延秒"}>延秒</Select.Option>		
		</Select>
		<Button style={{ position: 'absolute'} } onClick={addItems}>新增</Button>
            <DndContext 
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd1}
            >
                <SortableContext 
                    items={items}
                    strategy={verticalListSortingStrategy}
                >
                    {items.map(i => <LeaderSkills key={i.id} id={i.id} self={i} deleteItems={deleteItems} getList={getList}/>)}
                </SortableContext>
            </DndContext>
		</div>
	);
	function getList(){
        props.get(items);
		return items;
	}
	function addItems(){
		items.push({id:Date.now(),name:SelectSkill});
		setItems(items.concat([]));
		getList();
	}
	function deleteItems(position){
        items.splice(position, 1);
        setItems(items.concat([]));
        getList();
	}
	function handleDragEnd1(event) {
		const {active, over} = event;
		if (active.id !== over.id) {
			const oldIndex = items.findIndex((i)=>i.id===active.id);
			const newIndex = items.findIndex((i)=>i.id===over.id);
			items.splice(newIndex, 0,items.splice(oldIndex, 1)[0]);
			setItems(items.concat([]));
			getList();
		}
	}
}

export default LeaderSkillsList
