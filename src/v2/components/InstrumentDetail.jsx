import React from 'react';
import Detail from './Detail'
import Price from './Price'
import PriceVolume from './PriceVolume'

export default function InstrumentDetail(props){
	const {instument} = props;


	return(
		<div className="card text-black p-2 m-1">
			{console.log("InstrumentDetail rendring")}
			<div className="card-header">Data display</div>
			<div className="card-body">
				<div >
			        <div className="row">
			          <div className="col">
			            <Detail instrument = {instument}/>
			          </div>
			          <div className="col col-lg-5">
			            <Price instrument = {instument}/>
			          </div>
			        </div>
   			        <div className="row">
			          <div className="col">
			            <PriceVolume instrument = {instument}/>
			          </div>
			        </div>

			    </div>
			</div>
		</div>
		)
}