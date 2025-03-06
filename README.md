# HTML ranges slider (css+js)

### Features:
- Lightweight
- Range limiters in all inputs
- Knobs can push each other and don't overlap
- Visual representation of selected range
- Autoestablishes on page load
- Resizable
- Supports unlimited instances
- Utilize native html inputs

### Drawbacks
- Firefox limited support (still fully usable)
- Requeres JQuery, but it can be fixed

## Demo
Download the package and open index.html

<img width="520" alt="multislider" src="https://github.com/user-attachments/assets/fd3d745b-651a-471a-a92f-1d4be158afda" />

## How to
1. Add multislider.min.css
2. Add multislider.min.js after JQuery
3. Copy html on your page:
```
<div class="multislider">
	<div class="multislider-inputs">
		<div><input type="number" name="filter-price-min" class="multislider-input min" min="12824.32" max="152735.76" value="30000" step="any"></div>
		<div><input type="number" name="filter-price-max" class="multislider-input max" min="12824.32" max="152735.76" value="70000" step="any"></div>
	</div>
	<div class="multislider-rails-container">
		<div class="multislider-rails">
			<div class="multislider-range"></div>
			<input type="range" min="0" max="100" value="0" class="multislider-rail min">
			<input type="range" min="0" max="100" value="100" class="multislider-rail max">
		</div>
	</div>
</div>
```
4. Initialize each multislider. Optionally bind resize.
```
let multislider = [];
$(document).ready(function(){
	$('.multislider').each(function(key){
		multislider[key] = new Multislider($(this));
		$(window).on('resize', function(){
			multislider[key].onResize();
		});
	});
});
```
6. Data should be gathered from input[type="number']

## Usefull methods
1. `multislider.init()` - positions sliders according number inputs. Use after modification on input values via js.
2. `multislider.updateBetweener()` - positions the bar between slider knobs to match current set range. Use after manipulating slider knobs via js.
3. `multislider.onResize()` - corrects variables used by the bar between slider knobs to function properly after changing multislider container width.