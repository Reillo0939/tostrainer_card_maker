import React from 'react';
import { v1 as uuidv1 } from 'uuid';

//加入legao
import { Card } from '@feb-team/legao-react';
import '@feb-team/legao-react/dist/styles/css/legao.all.css';

class ClrBuff extends React.PureComponent{
	to_skill(){
		return `clrBuff=1;`
	}
	render() {
		this.props.self.skill=this.to_skill();
		return (
			<React.Fragment>
			<Card shadow={'always'}>
				<p>清除所有附加效果</p>
			</Card>
		</React.Fragment>
		)
	}
}
export default ClrBuff;