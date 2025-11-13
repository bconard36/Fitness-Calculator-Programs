// Contants for Unit Conversions & Activity Multipliers
const METER_CONVERSION = 0.0254
const KILOGRAM_CONVERSION = 2.20462
const SEDENTARY = 1.2
const LIGHTLY_ACTIVE = 1.375
const MODERATELY_ACTIVE = 1.55
const VERY_ACTIVE = 1.725
const EXTRA_ACTIVE = 1.9


// Modal Functionality Setup - DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    // Modal Elements to Display on Page 
    const modal = document.getElementById('termModal');
    const modalTitle = document.getElementById('termTitle');
    const modalText = document.getElementById('termText');
    const closeButton = document.getElementById('closeModal');

    /**
     * Opens a modal window displaying a term and its definition
     * @param {string} title - The term itself
     * @param {string} text - The definition of the term 
     */ 
    const openTermModal = (title, text) => {
        if (!modal) return;
        modalTitle.textContent = title;
        modalText.textContent = text;
        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
    };

    /**
     * Closes the modal window
     */
    const closeTermModal = () => {
        if (!modal) return;
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
    };

    // Add event listeners to all term buttons for modal functionality
    document.querySelectorAll('.term-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const title = button.getAttribute('data-title') || '';
            const content = button.getAttribute('data-content') || ''; 
            openTermModal(title, content);
        });
    });

    // Modal close actions: button, overlay click, or Escape key 
    if (closeButton) closeButton.addEventListener('click', closeTermModal);
    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) closeTermModal();
        });
    }
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeTermModal();
    });
});

/**
 * Validates and returns the user's height in inches
 * @returns {number|null} - Returns height if valid, otherwise null 
 */
const getHeight = () => {
    const heightInput = document.getElementById("height");
    const heightMessage = document.getElementById("heightMessage");
    const height = Number(heightInput.value);

    if (height >= 53 && height <= 84) {
        heightMessage.innerText = "";
        return height; 
    } else {
        heightMessage.innerText = "Invalid Height. Height range must be between 53in - 84in.";
        heightMessage.className = "alert";
        return null;
    }
}

/**
 * Validates and returns the user's weight in pounds
 * @returns {number|null} - Returns weight if valid, otherwise null 
 */
const getWeight = () => {
    const weightInput = document.getElementById("weight");
    const weightMessage = document.getElementById("weightMessage");
    const weight = Number(weightInput.value); 

    if (weight >= 50) {
        weightMessage.innerText = "";
        return weight;
    } else {
        weightMessage.innerText = "Invalid input. Weight out of range.";
        weightMessage.className = "alert";
        return null;
    }
}

/**
 * Validates and returns the user's age
 * @returns {number|null} - Returns age if valid, otherwise null 
 */
const getAge = () => {
    const ageInput = document.getElementById("age");
    const ageMessage = document.getElementById("ageMessage");
    const age = Number(ageInput.value);

    if (age >= 12 && age <= 100) {
            ageMessage.innerText = "";
            return age;
        } else {
            ageMessage.innerText = "Invalid age. Age must be between 12 and 100.";
            ageMessage.className = "alert";
            return null;
        }
    }

/**
 * Validates and returns the user's gender input
 * @returns {string|null} - Returns 'M' or 'F' if valid, otherwise null 
 */
const getGender = () => {
    const genderInput = document.getElementById("gender");
    const genderMessage = document.getElementById("genderMessage");
    const gender = genderInput.value.trim();

    if (gender == "M" || gender == "m" || gender == "F" || gender == "f") {
        genderMessage.innerText = "";
        return gender;
    } else {
        genderMessage.innerText = "Invalid gender. Input M/m or F/f";
        genderMessage.className = "alert";
        return null;
    }
}


/**
 * Validates and returns the user's selected activity level
 * @returns {number|null} - Returns activity value (1-5) if valid, otherwise null 
 */
const getActivity = () => {
    const activitySelect = document.getElementById("activityChooser");
    const activityMessage = document.getElementById("activityMessage");
    const activity = Number(activitySelect.value); 
    
    if (activity >= 1 && activity <= 5) {
        return activity;
    } else {
        activityMessage.innerText = "Invalid input. Please choose a number from 1-5."; 
        activityMessage.className = "alert";
        return null;
    }
}

/**
 * Converts height in inches to meters 
 * @param {number} height - Height in inches
 * @returns {number} - Height in meters
 */
const calcMetricHeight = (height) => {
    let metricHeight = 0.0;
    metricHeight = height * METER_CONVERSION;
    return metricHeight;
}

/**
 * Converts weight in pounds to kilograms (KG)
 * @param {number} weight - Weight in pounds
 * @returns {number} - Weight in kilograms (KG)
 */
const calcMetricWeight = (weight) => {
    let metricWeight = 0.0;
    metricWeight = weight / KILOGRAM_CONVERSION;
    return metricWeight;
}

/**
 * Calculates BMI using the metric formula
 * @param {number} metricWeight - Weight in kilograms
 * @param {number} metricHeight - Height in meters 
 * @returns {number} - Calculated BMI
 */
const calcBMI = (metricWeight, metricHeight) => {
    let bmi = 0.0;
    bmi = metricWeight / (metricHeight ** 2);
    return bmi;
}

/**
 * Calculates BMR using the Mifflin-St Jeor equation
 * @param {string} gender - 'M' or 'F'
 * @param {number} metricWeight - Weight in kilograms
 * @param {number} metricHeight - Height in meters
 * @param {number} age - Age in years 
 * @returns - BMR Value (calories/day)
 */
const calcBMR = (gender, metricWeight, metricHeight, age) => {
    let bmr = 0.0;
    if (gender == 'm' || gender == 'M') {
        bmr = ((10 * metricWeight) + (6.25 * (metricHeight * 100)) -
               (5 * age) + 5);
    } else {
        bmr = ((10 * metricWeight) + (6.25 * (metricHeight * 100)) -
               (5 * age) - 161);
    } 
    return bmr;
}

/**
 * Calculates TDEE based on activity level
 * @param {number} activity - Activity multiplier index
 * @param {number} bmr - Basal Metabolic Rate 
 * @returns {number} - Estimated daily calorie needs
 */
const calcDaily = (activity, bmr) => {
    let daily = 0;
     
    if (activity === 1) {
        daily = bmr * SEDENTARY;
    } else if (activity === 2) {
        daily = bmr * LIGHTLY_ACTIVE;
    } else if (activity === 3) {
        daily = bmr * MODERATELY_ACTIVE;
    } else if (activity === 4) {
        daily = bmr * VERY_ACTIVE;
    } else if (activity === 5) {
        daily = bmr * EXTRA_ACTIVE;
    }

    return daily;
}

/**
 * Handles form submission 
 * - Validates all inputs 
 * - Performs all calculations 
 * - Displays results (BMI, BMR, TDEE)
 */
const handleSubmit = () => {
    const height = getHeight();
    const weight = getWeight();
    const age = getAge();
    const gender = getGender();
    const activity = getActivity(); 

    const submitMessage = document.getElementById("submitMessage");

    if (height && weight && age && gender && activity) {
        submitMessage.innerText = "All inputs are valid. Here are your results:";

        // Convert to metric units
        const metricHeight = calcMetricHeight(height);
        const metricWeight = calcMetricWeight(weight);

        // Perform calculations
        const BMI = calcBMI(metricWeight, metricHeight);
        const BMR = calcBMR(gender, metricWeight, metricHeight, age);
        const DAILY = calcDaily(activity, BMR); 

        // Display formatted results
        document.getElementById("bmiResult").innerText = `BMI: ${BMI.toFixed(1)}`;
        document.getElementById("bmrResult").innerText = `BMR: ${BMR.toFixed(0)} calories/day`; 
        document.getElementById("dailyResult").innerText = `Estimated TDEE: ${DAILY.toFixed(0)} calories/day`;
    } else {
        // Validation failure handling 
        submitMessage.innerText = "Invalid input(s). Please double check your input values.";
        submitMessage.className = "alert"
    }
}
