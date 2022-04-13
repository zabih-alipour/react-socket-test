const PubSubBus = {
  pubSubMap: new Map(),

  subscribe(eventType, metadate={id:"", fields:[]}, eventAction) { 	

  	if(eventType==="all"){
  		var action = {
	  		eventAction: eventAction
	  	}

  		this.pubSubMap.set(eventType, []);
  		this.pubSubMap.get(eventType).push(action)
  	} else {
	  	var mapKey = eventType + "$" +metadate.id
		var action = {
			fields: metadate.fields,
	  		eventAction: eventAction
	  	}

	  	if(!this.pubSubMap.has(mapKey)){
	  		this.pubSubMap.set(mapKey, [{fields:[], eventAction:(args)=> console.log("Undefine subscription for "+ mapKey)}]);
	  	}

	    if (this.pubSubMap.get(mapKey)){
	    	this.pubSubMap.get(mapKey).push(action);	
	    } 
	}
    return this;
  },

  unsubscribe(key, id){
  	var mapKey = key + "$" +id
  	this.pubSubMap.delete(mapKey);
  },

  publish(eventType, data) {
  	var mapKey = eventType + "$" + data.instrumentId

  	this.pubSubMap.get("all") &&
  	this.pubSubMap.get("all").forEach((cb) => {
        cb.eventAction(data);
      });

    this.pubSubMap.get(mapKey) &&
      this.pubSubMap.get(mapKey).forEach((cb) => {
     	var changedFields ={}
      	cb.fields.forEach(p=>{
      		changedFields[p] = data[p]
      	})
        cb.eventAction(changedFields);
      });
  }
};

export default PubSubBus;