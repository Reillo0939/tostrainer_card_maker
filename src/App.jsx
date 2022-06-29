import React, {useState} from 'react';
import {DndContext,closestCenter,KeyboardSensor,MouseSensor,TouchSensor,useSensor,useSensors,} from '@dnd-kit/core';
import {useSortable,arrayMove,SortableContext,sortableKeyboardCoordinates,verticalListSortingStrategy,} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

import {Button,Select,Collapse,Tabs,Input,InputNumber } from '@feb-team/legao-react';
import '@feb-team/legao-react/dist/styles/css/legao.all.css';

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
                  <Button onClick={()=>{  } }>刪除</Button>
              </Collapse.Panel>
          </Collapse>
      </div>
    );
  }

function App() {
  const [items, setItems] = useState([]);
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
       
    <Tabs type={"button"} defaultActiveKey={'0'} size={'normal'} onBeforeChange={(key)=>{return true}}>
			<Tabs.Panel key="0" label="技能1" forceRender={true}>
      <Select defaultValue={"解鎖"} clear={false} placeholder={"請選擇"}>
					<Select.Option value={"解鎖"}>解鎖</Select.Option>
					<Select.Option value={"清除所有附加效果"}>清除所有附加效果</Select.Option>
					<Select.Option value={"引爆"}>引爆</Select.Option>
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
      <Button onClick={ ()=>{
            setItems( items.concat([{id:items.length+1,name:items.length*10}]) )
            console.log(items)
        } }>1234</Button>
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
      <SortableContext 
        items={items}
        strategy={verticalListSortingStrategy}
      >
        {items.map(i => <ActiveSkills key={i.id} id={i.id} name={i.name}/>)}
      </SortableContext>
    </DndContext>
			</Tabs.Panel>
			<Tabs.Panel key="1" label="技能2" forceRender={true}>
			
			</Tabs.Panel>
			<Tabs.Panel key="2" label="技能3" forceRender={true}>
				
			</Tabs.Panel>
		</Tabs>
  </div>
  );
  
  function handleDragEnd(event) {
    const {active, over} = event;
    console.log(event);
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((i)=>i.id===active.id);
        const newIndex = items.findIndex((i)=>i.id===over.id);
        console.log(oldIndex,newIndex);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}

export default App;