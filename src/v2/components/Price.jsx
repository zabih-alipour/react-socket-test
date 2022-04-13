import React from 'react';
import PubSubBus from '../pubSubBus'

export default function Price(props){
	const {instument} = props;

// console.log(`re-render avatar for ${JSON.stringify(props.instrument)}`);

	// const [instument, setInstrument] = useState(props.instrument);

	// if(instument){
	// 	var intrestedData = {
	// 		id: instument.instrumentId,
	// 		fields:["name", "volume"]
	// 	}
	// 	PubSubBus.subscribe(instument.metadata, intrestedData, setInstrument)
	// }
	
	return(
		<div style={{color:"green"}}>
			{console.log("Updating Price")}
			Price: {instument.price}
		</div>
		)
}