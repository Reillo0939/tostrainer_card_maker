import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Clipboard from '@react-native-clipboard/clipboard';

//加入legao
import { Tabs,Input, Button,notification } from '@feb-team/legao-react';

class IOPage extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			copied: false,
			Output:props.Output,
			Input:'',

			basic:'',
			as:'', 
			ls:'' , 
			ts:'', 
			imgId:'', 
			imgCrop:'', 
			imgSrc:''
		}
	}
	Input_process(Input){
		//let Input=this.state.Input;
		let Input_split=Input.split('$$')
		let as=-1,ls=-1,ts=-1,imgId=-1,imgCrop=-1,imgSrc=-1;
		this.setState({basic:Input_split[0]})
		for(let i=0;i<Input_split.length;i++){
			if(Input_split[i].search('as=')===0){
				as=i;
				continue;
			}
			if(Input_split[i].search('ls=')===0){
				ls=i;
				continue;
			}
			if(Input_split[i].search('ts=')===0){
				ts=i;
				continue;
			}
			if(Input_split[i].search('imgId=')===0){
				imgId=i;
				continue;
			}
			if(Input_split[i].search('imgCrop=')===0){
				imgCrop=i;
				continue;
			}	
			if(Input_split[i].search('imgSrc=')===0){
				imgSrc=i;
				continue;
			}	
		}

		this.setState({
			as:as>-1?Input_split[as].split('as=')[1]:'',
			ls:ls>-1?Input_split[ls].split('ls=')[1].split('=s=')[1]:'',
			ts:ts>-1?Input_split[ts].split('ts=')[1]:'',
			imgId:imgId>-1?Input_split[imgId].split('imgId=')[1]:'',
			imgCrop:imgCrop>-1?Input_split[imgCrop].split('imgCrop=')[1]:'',
			imgSrc:imgSrc>-1?Input_split[imgSrc].split('imgSrc=')[1]:'',
		},()=>{
			this.props.Input.basic=this.state.basic;
			this.props.Input.as=this.state.as;
			this.props.Input.ls=this.state.ls;
			this.props.Input.ts=this.state.ts;
			this.props.Input.imgId=this.state.imgId;
			this.props.Input.imgCrop=this.state.imgCrop;
			this.props.Input.imgSrc=this.state.imgSrc;
			this.props.Input.time=Date.now();
			this.props.test();
		})
	}
	copyToClipboard() {
		Clipboard.setString('hello world');
	}
	render(){
		const { Textarea } = Input;
		return(
			<Tabs type={"card"} defaultActiveKey={'0'} size={'normal'} onBeforeChange={(key)=>{return true}}>
				<Tabs.Panel key="0" label="輸出" forceRender={true}>
					<Textarea value={this.props.Output} />
					<Button onClick={()=>{
						Clipboard.setString(this.props.Output)
						notification.success({message:'複製成功',duration:1000});
					}}>
						一鍵複製
					</Button>
				</Tabs.Panel>
				<Tabs.Panel key="1" label="輸入" forceRender={true}>
					<Textarea value={this.state.Input}/>
					<Button onClick={async ()=>{
						const Input = await Clipboard.getString();
						this.setState({Input});
						this.Input_process(Input);
						notification.success({message:'貼上成功',duration:1000});
					}}>
						一鍵貼上
					</Button>
				</Tabs.Panel>
			</Tabs>
		);
	}
}
export default IOPage;