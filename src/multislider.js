class Multislider {
	constructor(JQUERY_OBJECT){
		this.ms = JQUERY_OBJECT;
		this.input_min = this.ms.find('.multislider-input.min');
		this.input_max = this.ms.find('.multislider-input.max');
		this.rail_min = this.ms.find('.multislider-rail.min');
		this.rail_max = this.ms.find('.multislider-rail.max');

		this.v_min = parseFloat(this.input_min[0].min);
		this.v_max = parseFloat(this.input_max[0].max);
		this.range = this.v_max - this.v_min;

		// slider range indicator (betweener)
		this.between = this.ms.find('.multislider-range');
		this.rails_width = this.ms.find('.multislider-rails').width() / 100;

		this.init();
		this.eventsBind();
	}

	static padding = 12;
	static firefox = navigator.userAgent.toLowerCase().includes('firefox');

	updateBetweener(){
		if(Multislider.firefox){ return; }
		const min = parseFloat(this.rail_min.val());
		const max = parseFloat(this.rail_max.val());
		const l = (min * this.rails_width) - Multislider.padding;
		const w = (max * this.rails_width) - l + Multislider.padding;
		this.between.css('left', l+'px').css('width', w+'px');
	}
	
	toRange(val, mode){
		let result = val;
		const current_min = parseFloat(this.input_min.val());
		const current_max = parseFloat(this.input_max.val());
	
		// correct for overall range limits
		if(val > this.v_max){
			result = this.v_max;
		}else if(val < this.v_min){
			result = this.v_min;
		}
	
		// correct for current range limits
		if(mode=='min' && val > current_max){ result = current_max; }
		if(mode=='max' && val < current_min){ result = current_min; }
	
		return result;
	}
	
	onNumberInput(t, val, rail, mode){
		// force input to obey limits
		let val_corrected = this.toRange(val, mode);
		if(val_corrected != val){ t.val(val_corrected); }
		// update sliders
		val_corrected = ((val_corrected - this.v_min) / this.range) * 100;
		rail.val(val_corrected);
		this.updateBetweener();
	}
	
	onRailDrag(requested, mode){
		let requested_fullrange = this.v_min + (this.range * requested / 100);
		requested_fullrange = Math.round( requested_fullrange * 100) / 100;
	
		if(mode=='min'){
			this.input_min.val(requested_fullrange);
			if(requested > parseFloat(this.rail_max.val())){ // move touching knob
				this.onRailDrag(requested, 'max');
				this.rail_max.val(requested);
			}
		}else if(mode=='max'){
			this.input_max.val(requested_fullrange);
			if(requested < parseFloat(this.rail_min.val())){ // move touching knob
				this.onRailDrag(requested, 'min');
				this.rail_min.val(requested);
			}
		}

		this.updateBetweener();
	}

	onResize(){
		this.rails_width = this.ms.find('.multislider-rails').width() / 100;
		this.updateBetweener();
	}

	init(){
		this.onNumberInput(this.input_min, parseFloat(this.input_min.val()), this.rail_min, 'min');
		this.onNumberInput(this.input_max, parseFloat(this.input_max.val()), this.rail_max, 'max');

		//some firefox flaws
		if(Multislider.firefox){
			this.between.hide();
			this.ms.find('.multislider-rail').css('top', '-8px');
		}else{
			this.onResize();
		}
	}

	eventsBind(){
		const ct = this;
		this.input_min.on('change', function(){
			ct.onNumberInput($(this), parseFloat($(this).val()), ct.rail_min, 'min');
		});

		this.input_max.on('change', function(){
			ct.onNumberInput($(this), parseFloat($(this).val()), ct.rail_max, 'max');
		});

		this.rail_min.on('input', function(){
			ct.onRailDrag(parseFloat($(this).val()), 'min');
		});

		this.rail_max.on('input', function(){
			ct.onRailDrag(parseFloat($(this).val()), 'max');
		});
	}
}