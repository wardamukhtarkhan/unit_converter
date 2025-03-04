const unitTypes = {
    length: {
        meters: 1,
        kilometers: 1000,
        centimeters: 0.01,
        millimeters: 0.001,
        miles: 1609.34,
        yards: 0.9144,
        feet: 0.3048,
        inches: 0.0254
    },
    weight: {
        kilograms: 1,
        grams: 0.001,
        milligrams: 0.000001,
        pounds: 0.453592,
        ounces: 0.0283495,
        tons: 1000
    },
    temperature: {
        celsius: 'C',
        fahrenheit: 'F',
        kelvin: 'K'
    },
    speed: {
        'meters/second': 1,
        'kilometers/hour': 0.277778,
        'miles/hour': 0.44704,
        'feet/second': 0.3048,
        knots: 0.514444
    }
};

const unitTypeSelect = document.getElementById('unitType');
const fromUnitSelect = document.getElementById('fromUnit');
const toUnitSelect = document.getElementById('toUnit');
const fromValueInput = document.getElementById('fromValue');
const toValueInput = document.getElementById('toValue');
const convertBtn = document.getElementById('convertBtn');
const swapBtn = document.getElementById('swapBtn');
const formulaDisplay = document.getElementById('formulaDisplay');

// Populate unit selects based on unit type
function populateUnits(unitType) {
    const units = Object.keys(unitTypes[unitType]);
    fromUnitSelect.innerHTML = '';
    toUnitSelect.innerHTML = '';
    
    units.forEach(unit => {
        fromUnitSelect.add(new Option(unit, unit));
        toUnitSelect.add(new Option(unit, unit));
    });
}

// Convert temperature
function convertTemperature(value, fromUnit, toUnit) {
    let celsius;
    
    // Convert to Celsius first
    switch(fromUnit) {
        case 'celsius':
            celsius = value;
            break;
        case 'fahrenheit':
            celsius = (value - 32) * 5/9;
            break;
        case 'kelvin':
            celsius = value - 273.15;
            break;
    }
    
    // Convert from Celsius to target unit
    switch(toUnit) {
        case 'celsius':
            return celsius;
        case 'fahrenheit':
            return (celsius * 9/5) + 32;
        case 'kelvin':
            return celsius + 273.15;
    }
}

// Convert units
function convert() {
    const fromValue = parseFloat(fromValueInput.value);
    const fromUnit = fromUnitSelect.value;
    const toUnit = toUnitSelect.value;
    const unitType = unitTypeSelect.value;
    
    if (isNaN(fromValue)) {
        alert('Please enter a valid number');
        return;
    }
    
    let result;
    let formula = '';
    
    if (unitType === 'temperature') {
        result = convertTemperature(fromValue, fromUnit, toUnit);
        formula = `Formula: ${fromValue}°${unitTypes[unitType][fromUnit]} → ${result.toFixed(2)}°${unitTypes[unitType][toUnit]}`;
    } else {
        const fromFactor = unitTypes[unitType][fromUnit];
        const toFactor = unitTypes[unitType][toUnit];
        result = (fromValue * fromFactor) / toFactor;
        formula = `Formula: ${fromValue} ${fromUnit} × (${toFactor}/${fromFactor}) = ${result.toFixed(4)} ${toUnit}`;
    }
    
    toValueInput.value = result.toFixed(4);
    formulaDisplay.textContent = formula;
}

// Event listeners
unitTypeSelect.addEventListener('change', () => {
    populateUnits(unitTypeSelect.value);
    convert();
});

convertBtn.addEventListener('click', convert);

swapBtn.addEventListener('click', () => {
    const tempUnit = fromUnitSelect.value;
    const tempValue = fromValueInput.value;
    
    fromUnitSelect.value = toUnitSelect.value;
    toUnitSelect.value = tempUnit;
    fromValueInput.value = toValueInput.value;
    toValueInput.value = tempValue;
    
    convert();
});

fromValueInput.addEventListener('input', convert);
fromUnitSelect.addEventListener('change', convert);
toUnitSelect.addEventListener('change', convert);

// Initialize
populateUnits(unitTypeSelect.value); 