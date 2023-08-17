import React from 'react';
import { v1 as uuidv1 } from 'uuid';

//加入legao
import { Checkbox,Drawer,Card } from '@feb-team/legao-react';
import '@feb-team/legao-react/dist/styles/css/legao.all.css';

import CardCondition from './CardCondition';

class ClrLock extends React.PureComponent{
	constructor(props) {
		super(props);
		let header='解除所有成員被封鎖的狀態\n(此技能無視封鎖)',
            Condition=[],
            All=true,
            Self=false;
		if(props.init!==''){
			let data=props.init.split("=")
			//`clrLock = all = 1,ar = ,self = 0;`
			All=data[2].split(',')[0]==='1'?true:false;
			Condition=data[3].split(',')[0].split("_");
			Self=data[4].split(';')[0]==='1'?true:false;
            //console.log(Condition);
            let Con=[];
            Condition.forEach((value,index)=>{
                switch(value.split("--").length){
                    case 1:
                        let text=value.split("--")[0],Element="不限",Race="不限";
                        let E=text.includes('w')||
                              text.includes('f')||
                              text.includes('t')||
                              text.includes('l')||
                              text.includes('d'),
                            R=text.includes('G')||
                              text.includes('E')||
                              text.includes('H')||
                              text.includes('A')||
                              text.includes('D')||
                              text.includes('S')||
                              text.includes('M');
                        if(E===true && R===false){
                            Element=text
                                .replace("w","水")
                                .replace("f","火")
                                .replace("t","木")
                                .replace("l","光")
                                .replace("d","暗");
                        }
                        if(E===false && R===true){
                            Race=text
                                .replace("G","神")
                                .replace("E","魔")
                                .replace("H","人")
                                .replace("A","獸")
                                .replace("D","龍")
                                .replace("S","妖")
                                .replace("M","機"); 
                        }
                        if(E===true && R===true){
                            Element=text[0]
                                .replace("w","水")
                                .replace("f","火")
                                .replace("t","木")
                                .replace("l","光")
                                .replace("d","暗");
                            Race=text[1]
                                .replace("G","神")
                                .replace("E","魔")
                                .replace("H","人")
                                .replace("A","獸")
                                .replace("D","龍")
                                .replace("S","妖")
                                .replace("M","機"); 
                        }

                        Con.push({type:1,id:uuidv1(),data:{Element:Element,Race:Race,Series:""}})
                        //console.log(E,R,text)
                    break;
                    case 2:
                        Con.push({type:2,id:uuidv1(),data:{Element:"不限",Race:"不限",Series:value.split("--")[1]}})
                    break;
                    default:
                }
                Condition=Con;
            })

			header=this.header(Condition,All,Self);
		}
		this.state = {
			visible: false,
			header:header,
            Condition:Condition,
            All:All,
            Self:Self
		}
	}
	to_skill(){
		let Condition=this.state.Condition;
		let All=this.state.All?1:0;
		let Self=this.state.Self?1:0;
		Condition=this.to_Condition();
		return `clrLock=all=${All},ar=${Condition},self=${Self};`
	}
	header(Condition=this.state.Condition,All=this.state.All,Self=this.state.Self){
        let list=[];
		Condition.forEach((value,index)=>{
			switch(value.type){
				case 1:
					let text='';
                    if(value.data.Element!=='不限')
                        text+=value.data.Element;
                    if(value.data.Race!=='不限')
                        text+=value.data.Race;
					if(text!=="")
						list.push(text)
				break;
				case 2:
					if(value.data.Series!=="")
						list.push(`「${value.data.Series}」系列`)
				break;
                default:
			}
		})
		return `解除${Self?"自身":""}${Self&&All?"及":""}${All?`所有${list.join("/")}成員`:""}被封鎖的狀態\n(此技能無視封鎖)`;
	}
    setCondition(Condition){
		this.setState({Condition},()=>{
            this.setState({header:this.header()});
        })
        //console.log(Condition)
    }
    to_Condition(){
		let list=[];
		this.state.Condition.forEach((value,index)=>{
			switch(value.type){
				case 1:
					let text='';
					switch (value.data.Element) {
						case '不限':text+=""; break;
						case '水':text+="w"; break;
						case '火':text+="f"; break;
						case '木':text+="t"; break;
						case '光':text+="l"; break;
						case '暗':text+="d"; break;
						default:
					}
					switch (value.data.Race) {
						case '不限':text+=""; break;
						case '神':text+="G"; break;
						case '魔':text+="E"; break;
						case '人':text+="H"; break;
						case '獸':text+="A"; break;
						case '龍':text+="D"; break;
						case '妖':text+="S"; break;
						case '機':text+="M"; break;
						default:
					}
					if(text!=="")
						list.push(text)

				break;
				case 2:
					if(value.data.Series!=="")
						list.push(`--${value.data.Series}`)
				break;
                default:
			}
		})
		return list.join("_");
	}
	render() {
        //console.log(this.state)
		this.props.self.skill=this.to_skill();
		return (
			<React.Fragment>
			<Card shadow={'always'} onClick={()=>{
				this.setState({	visible: true})
            }}>
				{this.state.header.split('\n').map(i=><p key={uuidv1()}>{i}</p>)}
			</Card>
            <Drawer 
				visible={this.state.visible}
				className="test"
				onClose={()=>{this.setState({visible: false})}}
				close={false}
				width={320}
				height={320}
				placement={"right"}
				title={<p>{this.state.header}</p>}
				mask={true}
				maskClosable={true}
				zIndex={0}
				afterVisibleChange={()=> {}}
            >

            <Checkbox.Font defaultChecked={this.state.All} onChange={(e)=>{
            let All=e.target.checked
            this.setState({All},()=>{
                this.setState({header:this.header()});
            });
              } }>解鎖全隊
            </Checkbox.Font>

            <CardCondition setCondition={Condition=>this.setCondition(Condition)} init={this.state.Condition}/>
            <Checkbox.Font defaultChecked={this.state.Self} onChange={(e)=>{
            let Self=e.target.checked
            this.setState({Self},()=>{
                this.setState({header:this.header()});
            });
                } }>解鎖自身
            </Checkbox.Font>
            </Drawer>
		</React.Fragment>
		)
	}
}
export default ClrLock;