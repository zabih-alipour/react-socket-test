import React, { useState } from 'react';

export default function MessageCreator(props){
	const [message, setMessage] = useState("");

	
	return(
		<div>
			<p>Send a message to server:</p>
	      	<input style={{width:"700px"}} onChange={(e)=>setMessage(e.target.value)}/>
	      	<input type="button"  onClick={()=>props.onChange(message)} value="Send"/>
		</div>
	)
}