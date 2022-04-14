import React, { useState, useEffect } from 'react';
import Emmiter from '../Emmiter'

export default function Detail(props) {
	const { instument } = props
	const [info, setInfo] = useState({});


	useEffect(() => {
		function handleStatusChange(updates) {
			setInfo(prevInfo => {
				let result = { ...updates }
				Object.keys(prevInfo).forEach(element => {
					if (!updates[element]) {
						result[element] = prevInfo[element];
					}
				});
				return result;
			});
		}

		if (instument?.instrumentId) {
			console.log(`********** ${JSON.stringify(instument)}`);
			var intrestedData = {
				id: instument?.instrumentId,
				fields: ["name", "volume"]
			}
			Emmiter.subscribe(props?.instument?.metadata, handleStatusChange, intrestedData)
		}
		return () => {
			console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@");
			var key = props?.instument?.metadata;
			var id = props?.instument?.instrumentId;
			Emmiter.unsubscribe(key, id)
		}
	})

	return (
		<div style={{ color: "red" }}>
			{console.log("Updating Detail")}
			<p> Instument Name: {info?.name || props?.instument?.name} </p>
			<p> Volume: {info?.volume || props?.instument?.volume} </p>
		</div>
	)
}