import React from 'react';

export default function Price(props){
	const {instument} = props;

	return(
		<div style={{color:"green"}}>
			{console.log("Updating Price")}
			Price: {instument.price}
		</div>
		)
}