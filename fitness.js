// Contants for Conversions // 
const METER_CONVERSION = 0.0254
const KILOGRAM_CONVERSION = 2.20462
const SEDENTARY = 1.2
const LIGHTLY_ACTIVE = 1.375
const MODERATELY_ACTIVE = 1.55
const VERY_ACTIVE = 1.725
const EXTRA_ACTIVE = 1.9

// Gets user input for height in inches
// Validates height is within specific parameters
// Displays message if input is invalid
function getHeight() {
    const heightInput = document.getElementById("height");
    const heightMessage = document.getElementById("heightMessage");

    const height = Number(heightInput.value);

    if(height >= 53 && height <= 84) {
        heightMessage.innerText = "";
        return height; 
    } else {
        heightMessage.innerText = "Invalid Height. Height range is between 53in - 84in.";
        return null;
    }
}

// Get users input for weight in pounds
// Validates weight is within specific parameters
// Displays message if input is invalid
function getWeight() {
    const weightInput = document.getElementById("weight");
    const weightMessage = document.getElementById("weightMessage");

    const weight = Number(weightInput.value); 

    if(weight >= 50) {
        weightMessage.innerText = "";
        return weight;
    } else {
        weightMessage.innerText = "Invalid input. Weight out of range.";
        return null;
    }
}

// Gets user input for age
// Validates age is within specific parameters
// Displays message if input is invalid
function getAge() {
    const ageInput = document.getElementById("age");
    const ageMessage = document.getElementById("ageMessage");

    const age = Number(ageInput.value);

    if(age >= 12 && age <= 100) {
            ageMessage.innerText = "";
            return age;
        } else {
            ageMessage.innerText = "Invalid age. Age must be between 12 and 100.";
            return null;
        }
    }

// Get users input for gender
// Validates gender input is a string containing a specific character
// Displays message if input is invalid
function getGender() {
    const genderInput = document.getElementById("gender");
    const genderMessage = document.getElementById("genderMessage");

    const gender = genderInput.value.trim();

    if(gender == "M" || gender == "m" || gender == "F" || gender == "f") {
        genderMessage.innerText = "";
        return gender;
    } else {
        genderMessage.innerText = "Invalid gender. Input M/m or F/f";
        return null;
    }
}

// Gets user input for activity level
// Validates input is an integer within a specific range
// Displays message if input is invalid
function getActivity() {
    const activitySelect = document.getElementById("activityChooser");
    const activityMessage = document.getElementById("activityMessage");

    const activity = Number(activitySelect.value); 
    
    if(activity >= 1 && activity <= 5) {
        return activity;
    } else {
        activityMessage.innerText = "Invalid input. Please choose a number from 1-5."; 
        return null;
    }
}

// Converts user input for height from inches to meters
function calcMetricHeight(height) {
    let metricHeight = 0.0;
    metricHeight = height * METER_CONVERSION;
    return metricHeight;
}

// Converts user input for weight from pounds to kilograms
function calcMetricWeight(weight) {
    let metricWeight = 0.0;
    metricWeight = weight / KILOGRAM_CONVERSION;
    return metricWeight;
}

// Calculates BMI 
function calcBMI(metricWeight, metricHeight) {
    let bmi = 0.0;
    bmi = metricWeight / (metricHeight ** 2);
    return bmi;
}

// Calculates BMR
function calcBMR(gender, metricWeight, metricHeight, age) {
    let bmr = 0.0;
    if(gender == 'm' || gender == 'M') {
        bmr = ((10 * metricWeight) + (6.25 * (metricHeight * 100)) -
               (5 * age) + 5);
    } else {
        bmr = ((10 * metricWeight) + (6.25 * (metricHeight * 100)) -
               (5 * age) - 161);
    } 
    return bmr;
}

// Calcuates TDEE (Total Daily Energy Expenditure
function calcDaily(activity, bmr) {
    let daily = 0;
     
    if(activity === 1) {
        daily = bmr * SEDENTARY;
    } else if(activity === 2) {
        daily = bmr * LIGHTLY_ACTIVE;
    } else if(activity === 3) {
        daily = bmr * MODERATELY_ACTIVE;
    } else if(activity === 4) {
        daily = bmr * VERY_ACTIVE;
    } else if (activity === 5) {
        daily = bmr * EXTRA_ACTIVE;
    }

    return daily;
}

// Confirms user inputs are valid and calculates the promised values 
// Prints the results to the screen for the user to see 
function handleSubmit() {
    const height = getHeight();
    const weight = getWeight();
    const age = getAge();
    const gender = getGender();
    const activity = getActivity(); 

    const submitMessage = document.getElementById("submitMessage");

    if(height && weight && age && gender && activity) {
        submitMessage.innerText = "All inputs are valid. Here are your results:";

        const metricHeight = calcMetricHeight(height);
        const metricWeight = calcMetricWeight(weight);

        const BMI = calcBMI(metricWeight, metricHeight);
        const BMR = calcBMR(gender, metricWeight, metricHeight, age);
        const DAILY = calcDaily(activity, BMR); 

        document.getElementById("bmiResult").innerText = `BMI: ${BMI.toFixed(1)}`;
        document.getElementById("bmrResult").innerText = `BMR: ${BMR.toFixed(0)} calories/day`; 
        document.getElementById("dailyResult").innerText = `Estimated TDEE: ${DAILY.toFixed(0)} calories/day`;
        

        
    } else {
        submitMessage.innerText = "Invalid input(s). Please double check your input values.";

        document.getElementById("bmiResult").innerText = "";
        document.getElementById("bmrResult").innerText = "";
        document.getElementById("dailyResult").innerText = "";
    }
}
