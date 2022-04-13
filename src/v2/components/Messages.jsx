import React, { useState } from 'react';
import PubSubBus from '../pubSubBus'


export default function Messages(props){
	const [messages, setMessages] = useState([]);
	PubSubBus.publish("all",{},  (msg)=>{
		console.log("^^^^^^" + msg)
		messages.push(msg)
	})
	
	// const addInitialValue =()=>{
	// 	if(props?.initial?.instrumentId){
	// 		messages.push(props.initial)
	// 	}
	// }

	// addInitialValue();
	return(

		<div>
			<p>Recieved messages:</p>
			{

				messages.map((msg, idx)=>{
					return <div key={idx}> {JSON.stringify(msg)} </div>
				})
			}	
		</div>
	)
}