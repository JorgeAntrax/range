class Range {
    constructor({ el = null, min = 1, max = 100, step = 1, multiple = false, call = null }) {
        this.parent = el !== null ? document.querySelector(el) : console.error('property el invalid');
        this.idRange = `${el}__input_range`;
        this.min = min == 0 ? 1 : min;
        this.max = max;
        this.step = step;
        this.multiple = multiple;
        this.call = call;
        this.value = 1;
        this.values = {};

        if (this.multiple) {
            this.values.min = parseFloat(this.min);
            this.values.max = parseFloat(this.max);
        }

        if (el !== null) {
            this.print(this.idRange);
            this.addListener(this.parent, this.call);
        }

    }

    print($id) {
        let $widget = '';
        let $style = `
    	oh-range {
        box-sizing: border-box;
        display: flex;
        width: 100%;
        max-width: 100%;
        height: 40px;
        position: relative;
        align-items: center;
        flex-wrap: nowrap;
      }
      oh-range .oh-range {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        display: block;
        outline: 0;
        width: 100%;
        border:none;
        max-width: 100%;
        height: 2px;
        border-radius: 4px;
        background-color: #000;
        pointer-events: none;
        position: absolute;
        margin: 0;
        padding: 0;
      }
      
      oh-range .oh-range::-webkit-slider-thumb {
        -webkit-appearance: none;
        background-color: #000;
        border-radius: 50%;
        height: 20px;
        width: 20px;
        pointer-events: all;

        cursor: pointer;
        transition: box-shadow 0.25s ease-out;
      }
      oh-range .oh-range::-webkit-slider-thumb:hover {
        box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.3);
      }
    `;

        if (this.multiple) {
            $widget = `
        <input type="range" id="${$id}--min" class="oh-range" minRange min="${this.min}" max="${this.max}" step="${this.step}" value="${this.min}">
        <input type="range" id="${$id}--max" class="oh-range" maxRange min="${this.min+500}" max="${this.max}" step="${this.step}" value="${this.max}">
      `;
        } else {
            $widget = `
    		<input type="range" id="${$id}" class="oh-range" min="${this.min}" max="${this.max}" step="${this.step}">
    	`;
        }


        let $styles = document.createElement('style');
        $styles.textContent = $style;
        document.querySelector('head').appendChild($styles);
        this.parent.innerHTML = $widget;
    }

    addListener($parent, callback) {
        $parent.addEventListener('input', $e => {
            const $element = $e.target;
            if (this.multiple) {
                this.updateRange($element);
            } else {
                this.updateRange($element);
            }

            if (callback !== null) {
                callback.call();
            }
        }, true);
    }

    updateRange($element) {

        if (this.multiple) {
            if ($element.hasAttribute('minRange')) {
                if ($element.value < this.values.max) {
                    this.minValue($element.value);
                }
            } else {
                if ($element.value > this.values.min) {
                    this.maxValue($element.value);
                }
            }
        } else {
            this.setValue($element.value);
        }
        console.log(this.values);
    }

    minValue($val) {
        this.values.min = parseFloat($val);
    }

    maxValue($val) {
        this.values.max = parseFloat($val);
    }

    setValue($val) {
        this.value = parseFloat($val);
    }

    get getMinValue() {
        return this.values.min;
    }

    get getMaxValue() {
        return this.values.max;
    }

    get getValue() {
        return this.value;
    }
}
