L.Control.CustomControl = L.Control.extend({
	setPosition: function(position) {
		var controls = this._controls;

		if(controls) {
			this.remove();
		}

		this.options.position = position;

		if(controls) {
			controls.addCustomControl(this);
		}

		return this;
	},

	addTo: function(map, outercontainer) {
		this.remove();
		this._map = map;
		this._container = this.onAdd(map, outercontainer);

		L.DomUtil.addClass(this._container, 'leaflet-custom-control');

		var child;

		if(this.options.position && (child = outercontainer.childNodes[this.options.position])) {
			outercontainer.insertBefore(this._container, child);
		} else {
			outercontainer.appendChild(this._container);
		}

		return this;
	},

	remove: function() {
		if(!this._map) {
			return this;
		}

		L.DomUtil.remove(this._container);

		if(this.onRemove) {
			this.onRemove(this._map);
		}

		this._map = null;

		return this;
	}
});

L.Map.include({
	addCustomControl: function(control, addTo) {
		control.addTo(this, addTo || this._controlContainer);
		return this;
	}
});