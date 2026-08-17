const display = document.getElementById("display");

function appendValue(value) {

    if (display.value === "0" || display.value === "Error") {
        display.value = value;
    } else {
        display.value += value;
    }

    // Real-time result preview
    try {
        if (/^[0-9+\-*/%.]+$/.test(display.value)) {
            let result = eval(display.value);

            if (isFinite(result)) {
                console.log("Result:", result);
            }
        }
    } catch {
        // Ignore incomplete expressions
    }
}

function clearDisplay() {
    display.value = "0";
}

function deleteLast() {

    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } else {
        display.value = "0";
    }
}

function calculate() {

    try {

        let expression = display.value;

        // Prevent invalid characters
        if (!/^[0-9+\-*/%.]+$/.test(expression)) {
            display.value = "Error";
            return;
        }

        let result = eval(expression);

        if (!isFinite(result)) {
            display.value = "Error";
        } else {
            display.value = result;
        }

    } catch {
        display.value = "Error";
    }
}

/* Keyboard support */

document.addEventListener("keydown", function(event) {

    const key = event.key;

    if (
        (key >= "0" && key <= "9") ||
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "." ||
        key === "%"
    ) {
        appendValue(key);
    }

    else if (key === "Enter" || key === "=") {
        calculate();
    }

    else if (key === "Escape") {
        clearDisplay();
    }

    else if (key === "Backspace") {
        deleteLast();
    }

});