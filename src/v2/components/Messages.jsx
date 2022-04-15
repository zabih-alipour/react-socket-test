import React, { useState, useEffect } from 'react';
import Emmiter from '../Emmiter'


export default function Messages(props){

	const [messages, setMessages] = useState([]);


	useEffect(() => {
		function handleStatusChange(update) {
			setMessages(preMessages=>{
				return [...preMessages, update]
			})
		}

		if (props?.initial?.instrumentId) {
			setMessages(preMessages=>{
				return [...preMessages, props?.initial]
			})
			Emmiter.subscribe("all", handleStatusChange, {})
		}
		return () => {
			Emmiter.unsubscribe("all", "")
		}
	}, [props?.initial])

	return(

		<div className="card text-black p-2 m-1">
			{console.log("Messages rendring")}
			<div className="card-header">Recieved messages</div>
			<div className="card-body">
				<table className="table table-responsive table-inverse">
					<thead className="thead-light">
						<tr>
							<th className="col-md-2">InstrumentId</th>
							<th className="col-md-2">Metadata</th>
							<th className="col-md-10">Body</th>
						</tr> 
					</thead>
					<tbody>
						{
							messages.map((msg, idx)=>{
								return (
									<tr key={idx}>
										<td>{msg.instrumentId}</td>
										<td>{msg.metadata}</td>
										<td>
											<div style={{"textAlign":"left"}}>{JSON.stringify(msg)}</div>
										</td>
									</tr>)
							})
						}	
					</tbody>
				</table>
			</div>		
		</div>
	)
}