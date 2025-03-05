$(document).ready(function(){
	$('.multislider').each(function(){
		const ms = $(this);
		const input_min = ms.find('.multislider-input.min');
		const input_max = ms.find('.multislider-input.max');
		const rail_min = ms.find('.multislider-rail.min');
		const rail_max = ms.find('.multislider-rail.max');

		const v_min = parseFloat(input_min[0].min);
		const v_max = parseFloat(input_max[0].max);
		const range = v_max - v_min;

		const firefox = navigator.userAgent.toLowerCase().includes('firefox');

		// slider range indicator (betweener)
		let rails_width = ms.find('.multislider-rails').width() / 100;
		const padding = 12;
		const between = ms.find('.multislider-range');

		function update_betweener(){
			if(firefox){ return; }
			const min = parseFloat(rail_min.val());
			const max = parseFloat(rail_max.val());
			const l = (min * rails_width) - padding;
			const w = (max * rails_width) - l + padding;
			between.css('left', l+'px').css('width', w+'px');
		}

		function to_range(val, mode){
			let result = val;
			const current_min = parseFloat(input_min.val());
			const current_max = parseFloat(input_max.val());

			// correct for overall range limits
			if(val > v_max){
				result = v_max;
			}else if(val < v_min){
				result = v_min;
			}

			// correct for current range limits
			if(mode=='min' && val > current_max){ result = current_max; }
			if(mode=='max' && val < current_min){ result = current_min; }

			return result;
		}

		function on_number_input(t, val, rail, mode){
			// force input to obey limits
			let val_corrected = to_range(val, mode);
			if(val_corrected != val){ t.val(val_corrected); }
			// update sliders
			val_corrected = ((val_corrected - v_min) / range) * 100;
			rail.val(val_corrected);
			update_betweener();
		}

		function on_rail_drag(requested, mode){
			let requested_fullrange = v_min + (range * requested / 100);
			requested_fullrange = Math.round( requested_fullrange * 100) / 100;

			if(mode=='min'){
				input_min.val(requested_fullrange);
				if(requested > parseFloat(rail_max.val())){ // move touching knob
					on_rail_drag(requested, 'max');
					rail_max.val(requested);
				}
			}else if(mode=='max'){
				input_max.val(requested_fullrange);
				if(requested < parseFloat(rail_min.val())){ // move touching knob
					on_rail_drag(requested, 'min');
					rail_min.val(requested);
				}
			}

			update_betweener();
		}

		on_number_input(input_min, parseFloat(input_min.val()), rail_min, 'min');
		on_number_input(input_max, parseFloat(input_max.val()), rail_max, 'max');

		input_min.on('change', function(){
			on_number_input($(this), parseFloat($(this).val()), rail_min, 'min');
		});
		input_max.on('change', function(){
			on_number_input($(this), parseFloat($(this).val()), rail_max, 'max');
		});

		rail_min.on('input', function(){
			on_rail_drag(parseFloat($(this).val()), 'min');
		});
		rail_max.on('input', function(){
			on_rail_drag(parseFloat($(this).val()), 'max');
		});

		$(window).resize(function(){
			rails_width = ms.find('.multislider-rails').width() / 100;
			update_betweener();
		});

		//some firefox flaws
		if(firefox){
			between.hide();
			ms.find('.multislider-rail').css('top', '-8px');
		}2
	});
});