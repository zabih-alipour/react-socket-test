import React from 'react';
import Detail from './Detail'
import Price from './Price'

export default function InstrumentDetail(props){
	const {instument} = props;


	return(
		<div>
			{console.log("Updating InstrumentDetail")}
			<Detail instument = {instument}/>
			<Price instument = {instument}/>
		</div>
		)
}