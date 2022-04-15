import React, { useState, useEffect } from 'react';
import Emmiter from '../Emmiter'


export default function Price(props){
	const { instrument } = props
	const [price, setPrice] = useState(null);
	const [blink, setBlink] = useState(false);


	useEffect(() => {
		function handleStatusChange(update) {
			console.log("PRICE change:" + JSON.stringify(update))
			setBlink(true)
			setPrice(update.price);
		}

		if (instrument?.instrumentId) {
			if(price===null){
				setPrice(instrument["price"])
				setBlink(true)
			}

			var intrestedData = {
				id: instrument?.instrumentId,
				fields: ["price"]
			}
			Emmiter.subscribe(props?.instrument?.metadata, handleStatusChange, intrestedData)
		}
		return () => {
			console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@");
			var key = props?.instrument?.metadata;
			var id = props?.instrument?.instrumentId;
			Emmiter.unsubscribe(key, id)
		}
	}, [instrument?.instrumentId])
	
	return(
		<div className="p-10 m-3">
			{console.log("Price rendring")}
			<div className="card text-center">
				<div className="card-body">
					<h4 className="card-title">Price </h4>
					<h6 className="card-subtitle mb-2 text-muted">Instrument id <b>[{props?.instrument?.instrumentId}]</b></h6>
					<hr/>
					<p className={`banner ${blink ? "blink" : ""}`}>Price: {price}</p>
				</div>
			</div>
		</div>
		)
}