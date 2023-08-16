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

import { Button,Select,Card } from '@feb-team/legao-react';
import '@feb-team/legao-react/dist/styles/css/legao.all.css';

import Mag from './LeaderSkill/Mag';
import DynaMag from './LeaderSkill/DynaMag';
import Dh from './LeaderSkill/Dh';
import Dsv from './LeaderSkill/Dsv';
import Possess from './LeaderSkill/Possess';
import Gsbc from './LeaderSkill/Gsbc';
import Addtime from './LeaderSkill/Addtime';


var SelectSkill="倍率";
const set_skill=(self,text)=>{self.skill=text};
function LeaderSkills(props) {
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
			case '倍率':case 'mag':
				return <Mag set_skill={set_skill} self={props.self} id={props.id} header={props.header} init={props.init}/>
			case '動態倍率':case 'dynaMag':
				return <DynaMag set_skill={set_skill} self={props.self} id={props.id} header={props.header} init={props.init}/>
			case '減傷':case 'dh':
				return <Dh set_skill={set_skill} self={props.self} id={props.id} header={props.header} init={props.init}/>
			case '改變消除方式':case 'dsv':
				return <Dsv set_skill={set_skill} self={props.self} id={props.id} header={props.header} init={props.init}/>
			case '兼具':case 'possess':
				return <Possess set_skill={set_skill} self={props.self} id={props.id} header={props.header} init={props.init}/>
			case '改變掉落':case 'gsbc':
				return <Gsbc set_skill={set_skill} self={props.self} id={props.id} header={props.header} init={props.init}/>
			case '延秒':case 'addtime':
				return <Addtime set_skill={set_skill} self={props.self} id={props.id} header={props.header} init={props.init}/>
			default:
				return <Card><p>{props.self.name+'目前尚未設計'}</p></Card>
			// do nothing
		}
	}
	return (
		<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
			{skill()}
			<Button onClick={deleteButton} size="small" style={{position:'absolute',right:'0px',top:'0px'}}>刪除</Button>
		</div>
	);
	function deleteButton(){
        const id = props.getList().findIndex((i)=>i.id===props.id);
        props.deleteItems(id);
	}
}
function LeaderSkillsList(props) {
	const [items, setItems] = useState([]);

	useEffect(() => {
		deleteItems(0,true);
		if(props.Input.ls!==''){
			let LS_List=props.Input.ls.split(";")
			LS_List.forEach(i => {
				//console.log(i.split("=")[0])
				if(i.split("=")[0]!=='')
					addItems(i.split("=")[0],i)
			});
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
		<Select defaultValue={SelectSkill} clear={false} placeholder={"請選擇"} onChange={(value)=>{SelectSkill=value;addItems(SelectSkill)} }>
			<Select.Option value={"倍率"}>倍率</Select.Option>
			<Select.Option value={"動態倍率"}>動態倍率</Select.Option>
			<Select.Option value={"減傷"}>減傷</Select.Option>
			<Select.Option value={"改變消除方式"}>改變消除方式</Select.Option>
			<Select.Option value={"兼具"}>兼具</Select.Option>
			<Select.Option value={"改變掉落"}>改變掉落</Select.Option>
			<Select.Option value={"延秒"}>延秒</Select.Option>		
		</Select>
		<div style={{width:'100%'}}>
            <DndContext 
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd1}
				modifiers={[restrictToVerticalAxis,restrictToParentElement,restrictToWindowEdges]}
            >
				<SortableContext 
					items={items}
					strategy={verticalListSortingStrategy}
				>
					{items.map(i => <LeaderSkills key={i.id} id={i.id} self={i} init={i.init} deleteItems={deleteItems} getList={getList}/>)}
				</SortableContext>
			</DndContext>
		</div>
	</div>
	);
	function getList(){
        props.get(items);
		//console.log(items)
		return items;
	}
	function addItems(SelectSkill,init=""){
		items.push({id:uuidv1(),name:SelectSkill,skill:"",init:init});
		setItems(items.concat([]));
		getList();
	}
	function deleteItems(position,all=false){
        items.splice(position, 1);
		if(all===true)
			items.length = 0;
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
