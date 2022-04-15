import React, { useState } from 'react';

export default function MessageCreator(props){
	const [message, setMessage] = useState("");

	
	return(
		<div>
			<div className="card text-center">
				<div className="card-body">
					<div className="h4">Send a message to server:</div>
					<div className="input-group">
						<input type="text" name="message" id="input" className="form-control" 
							required="required" pattern="" title="Send message" placeholder="Send message in json"
							onChange={(e)=>setMessage(e.target.value)}/>
						<span className="input-group-btn ml-2">
							<button type="button" className="btn btn-primary" onClick={()=>props.onChange(message)}>Send!</button>
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}