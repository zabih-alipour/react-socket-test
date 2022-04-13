import React, { useState, useEffect }  from 'react';

export default function Detail(props){	
	const {instument} = props;
	
	return(
		<div style={{color:"red"}}>
			{console.log("Updating Detail")}
			<p> Instument Name: {instument?.name} </p>
			<p> Volume: {instument?.volume} </p>
		</div>
		)
}