# HTML ranges slider (css+js)

## Features:
- Lightweight
- Range limiters in all inputs
- Knobs can push each other and don't overlap
- Visual representation of selected range
- Autoestablishes on page load
- Resizable
- Data should be gathered from input[type="number']
- Supports unlimited instances
- No initiation or coding needed

## Demo
Download the pachage and open index.html

<img width="520" alt="multislider" src="https://github.com/user-attachments/assets/fd3d745b-651a-471a-a92f-1d4be158afda" />

## How to
1. Add multislider.min.css
2. Add multislider.min.js after Jquery
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
