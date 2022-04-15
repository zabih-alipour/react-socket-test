import React, { useState, useEffect } from 'react';
import Emmiter from '../Emmiter'

export default function PriceVolume(props) {
	const { instrument } = props
	const [info, setInfo] = useState(null);
	const [blinkers, setBlinkers] = useState([]);


	useEffect(() => {
		function handleStatusChange(updates) {
			setInfo(prevInfo => {
				let result = { ...updates }
				setBlinkers(Object.keys(updates))

				Object.keys(prevInfo).forEach(element => {
					if (!updates[element]) {
						result[element] = prevInfo[element];
					}
				});
				return result;
			});
		}

		if (instrument?.instrumentId) {
			if(info===null){
				setInfo(preMessages=>{
					return {...instrument}
				})
				setBlinkers(["price", "volume"])
			}

			var intrestedData = {
				id: instrument?.instrumentId,
				fields: ["price", "volume"]
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

	return (
		<div className="p-10 m-3">
			{console.log("PriceVolume rendring")}
			<div className="card text-center">
				<div className="card-body">
					<h4 className="card-title">Price & Volume</h4>
					<h6 className="card-subtitle mb-2 text-muted">Instrument id <b>[{props?.instrument?.instrumentId}]</b></h6>
					{/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
					<table className="table table-inverse">
						<thead>
							<tr>
								<th>Price</th>
								<th>Volume</th>
							</tr>
						</thead>
						<tbody style={{color: "red"}}>
							<tr>
								<td className={`${blinkers.includes("price") ? "blink" : ""}`}>{info?.price}</td>
								<td className={`${blinkers.includes("volume") ? "blink" : ""}`}>{info?.volume}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}