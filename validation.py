def get_integer(prompt="Enter an integer: "):
    num = 0
    while True:
        try:
            num = int(input(prompt))
            return num
        except:
            print("Invalid Integer.")


def get_real(prompt="Enter a real number: "):
    num = 0.0
    while True:
        try:
            num = float(input(prompt))
            return num
        except:
            print("Invalid Number.")


def get_string(prompt="Please enter a string: "):
    char = ''
    while True:
        char = input(prompt)
        if char != '':
            return char
        else:
            print("Invalid String")


def get_m_or_f(prompt="Enter sex at birth (m/f): "):
    response = ''
    response = input(prompt)
    response = response.lower()
    while response != 'm' and response != 'M' and response != 'f' and response != 'F':
        print("Invalid Answer.")
        response = input(prompt)
        response = response.lower()
    return response[0]



