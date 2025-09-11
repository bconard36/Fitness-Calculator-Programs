# Sample Run 1

# Billy's Fitness Calculator

# This calculator will calculate your Body Mass Index (BMI), your Basal
# Metabolic Rate (BMR), and your Total Daily Energy Expenditure (T.D.E.E.).

# BMI - Estimates body fat percentage
# BMR - Number of calories your body burns at rest (life sustaining functions)
# T.D.E.E. - Total amount of calories a person burns in a 24-hour period

# Enter your height (in inches): 77
# Enter your weight (in pounds): 225
# Enter your age: 33
# What was your assigned sex at birth? (M/F): M
# 1. Sedentary (little or no exercise)
# 2. Lightly Active (light exercise/sports 1-3 days/week)
# 3. Moderately Active (moderate exercise/sports 3-5 days/week)
# 4. Very Active (hard exercise/sports 6-7 days a week)
# 5. Extra Active (very hard exercise/sports & a physical job)
# Enter the number that correlates with your activity level: 4

# Your Body Mass Index (BMI) is: 26.7
# Your Basal Metabolic Rate (BMR) is: 2083
# Your Total Daily Energy Expenditure (T.D.E.E.) is:  3593

# Sample Run 2

# Billy's Fitness Calculator

# This calculator will calculate your Body Mass Index (BMI), your Basal
# Metabolic Rate (BMR), and your Total Daily Energy Expenditure (T.D.E.E.).

# BMI - Estimates body fat percentage
# BMR - Number of calories your body burns at rest (life sustaining functions)
# T.D.E.E. - Total amount of calories a person burns in a 24-hour period

# Enter your height (in inches): 61
# Enter your weight (in pounds): 115
# Enter your age: 32
# What was your assigned sex at birth? (M/F): F
# 1. Sedentary (little or no exercise)
# 2. Lightly Active (light exercise/sports 1-3 days/week)
# 3. Moderately Active (moderate exercise/sports 3-5 days/week)
# 4. Very Active (hard exercise/sports 6-7 days a week)
# 5. Extra Active (very hard exercise/sports & a physical job)
# Enter the number that correlates with your activity level: 3

# Based on your height and weight, your Body Mass Index (BMI) is: 21.7
# Based on your sex, height, weight, and age, your Basal Metabolic Rate (BMR) is: 1169
# Based on your BMR and activity level, your Total Daily Energy Expenditure (T.D.E.E.) is: 1812

###############################################################################
# What is your desired weight (in pounds)?: 215 (Commented out until caloric deficit
# can be calculated).

# Inch to Meter Conversion
# m = in × 0.0254

# Meter to Centimeter Conversion
# 1 m = 100 cm
# Multiply m value by 100

# Pound to KG Conversion
# kg = lbs / 2.20462

# BMI Algorithm: BMI = weight (kg) / height (m)^2.

# BMR Algorithms
# Men: BMR = (10 x weight in kg) + (6.25 x height in cm) - (5 x age in years) + 5
# Women: BMR = (10 x weight in kg) + (6.25 x height in cm) - (5 x age in years) - 161

# Daily Energy Expenditure (T.D.E.E.) Algorithms
# Sedentary (little or no exercise): BMR x 1.2.
# Lightly Active (light exercise/sports 1-3 days/week): BMR x 1.375.
# Moderately Active (moderate exercise/sports 3-5 days/week): BMR x 1.55.
# Very Active (hard exercise/sports 6-7 days a week): BMR x 1.725.
# Extra Active (very hard exercise/sports & a physical job): BMR x 1.9.
###############################################################################
import validation as v

# Constants
METER_CONVERSION = 0.0254
KILOGRAM_CONVERSION = 2.20462
SEDENTARY = 1.2
LIGHTLY_ACTIVE = 1.375
MODERATELY_ACTIVE = 1.55
VERY_ACTIVE = 1.725
EXTRA_ACTIVE = 1.9

def main():

# Initial Variable Declaration / Initialization
    height = 0.0
    weight = 0.0
    age = 0
    sex = ''
    activity = 0
    target_weight = 0.0
    metric_height = 0.0
    metric_weight = 0.0
    bmi = 0.0
    bmr = 0.0
    daily = 0.0


    print_welcome()

    print_definitions()

    # Inputs
    height = get_height()
    weight = get_weight()
    age = get_age()
    sex = get_sex()
    activity = get_activity()
    # target_weight = get_target_weight()

    # Calculations and Output
    metric_height = calc_metric_height(height)
    metric_weight = calc_metric_weight(weight)
    bmi = calc_bmi(metric_weight, metric_height)
    bmr = calc_bmr(sex, metric_weight, metric_height, age)
    daily = calc_daily(activity, bmr)

    # Output
    print_result(bmi, bmr, daily)


def print_welcome():
    print("\nBilly's Fitness Calculator")


def print_definitions():
    print("\nThis calculator will calculate your Body Mass Index (BMI), your "
          "Basal Metabolic Rate (BMR), and your Total Daily Energy Expenditure "
          "(T.D.E.E.).")
    print("\nBMI - Estimates body fat percentage")
    print("BMR - Number of calories your body burns at rest (life sustaining "
          "functions")
    print("T.D.E.E. - Total amount of calories a person burns in a 24-hour "
          "period")


def get_height():
    height = 0.0
    while True:
        height = v.get_real("\nEnter your height (in inches): ")
        if height < 53 or height > 84:
            print("Invalid Height. Height range is 53in - 84in.")
        else:
            return height


def get_weight():
    weight = 0.0
    while True:
        weight = v.get_real("Enter your weight (in pounds): ")
        if weight < 50:
            print("Invalid input. Weight out of range.")
        else:
            return weight


def get_age():
    age = 0
    while True:
        age = v.get_integer("Enter your age: ")
        if age < 12 or age > 100:
            print("Invalid age. Age must be between 12 and 100.")
        else:
            return age


def get_sex():
    sex = ''
    while True:
        sex = v.get_m_or_f("What was your assigned sex at birth? (M/F): ")
        return sex


def get_activity():
    activity = 0
    while True:
        activity = v.get_integer("\n1. Sedentary (little or no exercise)"
                     "\n2. Lightly Active (light exercise/sports "
                     "1-3 days/week)"
                     "\n3. Moderately Active (moderate exercise/sports "
                     "3-5 days/week)"
                     "\n4. Very Active (hard exercise/sports 6-7 days a week)"
                     "\n5. Extra Active (very hard exercise/sports "
                     "& a physical job)"
                     "\nEnter the number that correlates with your activity "
                     "level: ")
        if activity < 1 or activity > 5:
            print("Invalid Input. Choose a number 1-5.")
        else:
            return activity


# def get_target_weight():
#    target_weight = 0.0
#    target_weight = float(input("What is your desired weight "
#                                    "(in pounds)?: "))
#    return target_weight


def calc_metric_height(height):
    metric_height = 0.0
    metric_height = height * METER_CONVERSION
    return metric_height


def calc_metric_weight(weight):
    metric_weight = 0.0
    metric_weight = weight / KILOGRAM_CONVERSION
    return metric_weight


def calc_bmi(metric_weight, metric_height):
    bmi = 0.0
    bmi = metric_weight / (metric_height ** 2)
    return bmi


def calc_bmr(sex, metric_weight, metric_height, age):
    bmr = 0.0
    if sex == 'm':
        bmr = ((10 * metric_weight) + (6.25 * (metric_height * 100)) -
               (5 * age) + 5)
        return bmr
    else:
        bmr = ((10 * metric_weight) + (6.25 * (metric_height * 100)) -
               (5 * age) - 161)
        return bmr


def calc_daily(activity, bmr):
    daily = 0
    if activity == 1:
        daily = bmr * SEDENTARY
    elif activity == 2:
        daily = bmr * LIGHTLY_ACTIVE
    elif activity == 3:
        daily = bmr * MODERATELY_ACTIVE
    elif activity == 4:
        daily = bmr * VERY_ACTIVE
    elif activity == 5:
        daily = bmr * EXTRA_ACTIVE
    return daily


def print_result(bmi, bmr, daily):
    print("\nBased on your height and weight, your Body Mass Index (BMI) is: ",
          format(bmi, ".1f"))
    print("Based on your sex, height, weight, and age, your Basal Metabolic "
          "Rate (BMR) is: ", format(bmr, ".0f"))
    print("Based on your BMR and activity level, your Total Daily Expenditure "
          "(T.D.E.E.) is: ", format(daily, ".0f"))


main()