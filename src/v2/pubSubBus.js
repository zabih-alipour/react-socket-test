const PubSubBus = {
	pubSubMap: new Map(),

	subscribe(eventType, eventAction, intrestedData = { id: "", fields: [] }) {
		console.log("New subscriber... " + eventType)
		var action = {
			eventAction: eventAction
		}
		if (eventType === "all") {

			this.pubSubMap.set(eventType, [action]);
		} else {
			var mapKey = eventType + "$" + intrestedData.id
			action["fields"] = intrestedData.fields;

			if (!this.pubSubMap.has(mapKey)) {
				this.pubSubMap.set(mapKey, []);
			} 
			if (this.pubSubMap.get(mapKey)) {
				this.pubSubMap.get(mapKey).push(action);
			}
						
		}
		return this;
	},

	unsubscribe(key, id) {
		var mapKey = key + "$" + id
		this.pubSubMap.delete(mapKey);
	},

	publish(eventType, data) {
		var mapKey = eventType + "$" + data.instrumentId

		this.pubSubMap.get("all") &&
			this.pubSubMap.get("all").forEach((cb) => {
				cb.eventAction(data);
			});

		console.log("Value in map for " + mapKey + " is: " + JSON.stringify(this.pubSubMap.get(mapKey)))
		this.pubSubMap.get(mapKey) &&
			this.pubSubMap.get(mapKey).forEach((cb) => {
				var changedFields = {}
				cb.fields.forEach(p => {
					if (data[p]) {
						changedFields[p] = data[p]
					}
				})
				if(Object.keys(changedFields).length > 0){
					cb.eventAction(changedFields);
				}
			});
	}
};

export default PubSubBus;