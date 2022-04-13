import React, { useState, useEffect }  from 'react';
import PubSubBus from '../pubSubBus'

export default function Detail(props){	
	const [instument, setInstrument] = useState({});

	
	useEffect(() => {  
		function handleStatusChange(updates) {
			const changes = instument;
      		setInstrument({...changes, ...updates});
    	}
		
		if(props?.instument?.instrumentId){
			console.log(`********** ${JSON.stringify(instument)}`);
			var intrestedData = {
					id: props?.instument?.instrumentId,	
					fields:["name", "volume"]
				}
			PubSubBus.subscribe(props?.instument?.metadata, intrestedData, handleStatusChange)
		}
		return ()=>{
			console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@");
			var key = props?.instument?.metadata;
			var id = props?.instument?.instrumentId;
			PubSubBus.unsubscribe(key, id)	
		}
	})

	return(
		<div style={{color:"red"}}>
			{console.log("Updating Detail")}
			<p> Instument Name: {instument?.name} </p>
			<p> Volume: {instument?.volume} </p>
		</div>
		)
}