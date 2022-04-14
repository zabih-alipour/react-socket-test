const PubSubBus = {
	pubSubMap: new Map(),

	subscribe(eventType, eventAction, intrestedData = { id: "", fields: [] }) {

		var action = {
			eventAction: eventAction
		}
		if (eventType === "all") {

			this.pubSubMap.set(eventType, []);
			this.pubSubMap.get(eventType).push(action)
		} else {
			var mapKey = eventType + "$" + intrestedData.id
			action["fields"] = intrestedData.fields;

			console.log("Subscription list in sub" + JSON.stringify(this.pubSubMap))
			if (!this.pubSubMap.has(mapKey)) {
				this.pubSubMap.set(mapKey, [{ fields: [], eventAction: (args) => console.log("Initial subscription for " + mapKey) }]);
			}

			if (this.pubSubMap.get(mapKey)) {
				this.pubSubMap.get(mapKey).push(action);
			}
		}
		return this;
	},

	unsubscribe(key, id) {
		console.log("Subscription list in unsub" + JSON.stringify(this.pubSubMap))
		var mapKey = key + "$" + id
		this.pubSubMap.delete(mapKey);
	},

	publish(eventType, data) {
		console.log("Subscription list in pub" + JSON.stringify(this.pubSubMap.keys()))
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
					changedFields[p] = data[p]
				})
				cb.eventAction(changedFields);
			});
	}
};

export default PubSubBus;