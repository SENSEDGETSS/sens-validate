//Validation Library in Pure JavaScript
const errors = [];
//OnKeyUp Common function
document.addEventListener('keyup', function (event) { // Listen for 'keyup' events on the document
    Independent_Validation(event); // Call Independent_Validation
});

//Change Event Validation
document.addEventListener('change', function (event) {
    const validTypes = ['checkbox', 'radio', 'date', 'file', 'time', 'datetime-local', 'number'];
    if (validTypes.includes(event.target.type) || event.target.tagName.toLowerCase() === 'select') {
        Independent_Validation(event);
    }
});

//Independent_Validation
function Independent_Validation(event) {
    let inputElement = event.target;  // Get the element that triggered the event
    let inputValue = inputElement.value;  // Get the value of the input field
    let sensValAttr = inputElement.getAttribute('data-sensval');  // Get the value of the 'data-sensval' attribute
    if (sensValAttr && sensValAttr.indexOf('-') !== -1) { // Check if the 'data-sensval' attribute contains '-'
        const validations = sensValAttr.split('-');  // Split the attribute value if it contains '-'
        for (const Casevalidation of validations) {
            let isValidInput = mainValidation(Casevalidation, inputElement, inputValue);
            if (isValidInput === false && isValidInput !== null) {
                break;
            }
        }
    } else {
        mainValidation(sensValAttr, inputElement, inputValue);  // Call MainValidation directly if no '-'
    }
}

//Form Validation Function
export function validateAll(FormId) { // FormId is the ID of the form
    let validValue = validateFormInputs(FormId);
    if (validValue) { // Call validateFormInputs and pass FormId
        return true; // Return true if the form is valid
    } else {
        return false; // Return false if the form is invalid
    }
}

//Find All the Form Input Elements To Validate
function validateFormInputs(FormId) {
    let form = document.getElementById(FormId); // Get the form
    if (!form) return false; // Check if the form exists
    // let inputs = form.querySelectorAll('input[data-sensval]'); // Get all the input elements with 'data-sensval' attribute
    let inputs = form.querySelectorAll('[data-sensval]');
    let ValidationAry = [];
    inputs.forEach(input => { // Loop through all the input elements
        let sensval = input.getAttribute('data-sensval');
        let value = input.value; // Get the value of the input element
        let validations = sensval.split('-'); // Split the 'data-sensval' attribute value if it contains '-'
        validations.forEach(validation => { // Loop through all the validations
            let result = mainValidation(validation, input, value);  // Call MainValidation for each case
            if(result !== undefined){
                ValidationAry.push(result); // Return
            }
        });
    });
    if (ValidationAry.includes(false) || ValidationAry.includes('false')) {
        return false;
    } else {
        return true;
    }
}
//Validation Main Function{Validate the All Input Elements}
function mainValidation(CaseValue, input, value) {
    errors.length = 0;
    let isValidInput;
    const [validationType, userDefinedValue] = CaseValue.split('#');
    switch (validationType) {
        case 'MN': // Mandatory Field
            isValidInput = value.trim() !== '';
            if (!isValidInput) {
                errors.push('This field is mandatory.');
            }
            cssValidation(isValidInput, input);
            return isValidInput;
        case 'EM': // Email Field
            if (value !== null && value.trim() !== '') {
                isValidInput = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); //
                if (!isValidInput) {
                    errors.push('Please enter a valid email address.');
                }
                cssValidation(isValidInput, input);
                return isValidInput;
            }
            break;
        case 'PS': // Password Strength
            if (value !== null && value.trim() !== '') {
                isValidInput = /[A-Z]/.test(value) && /[a-z]/.test(value) && /[0-9]/.test(value) &&
                    /[!@#$%^&*(),.?":{}|<>]/.test(value) && value.length >= userDefinedValue;
                if (!isValidInput) {
                    errors.push('Password must include uppercase, lowercase, numbers, special characters, and be at least ' + userDefinedValue + ' characters long.');
                }
                cssValidation(isValidInput, input);
                return isValidInput;
            }
            break;
        case 'TX': // Text Only
            if (value !== null && value.trim() !== '') {
                isValidInput = /^[a-zA-Z\s]+$/.test(value);
                if (!isValidInput) {
                    errors.push('Only alphabetic characters and spaces are allowed in this field.');
                }
                cssValidation(isValidInput, input);
                return isValidInput;
            }
            break;
        case 'NM': // Number Only
            if (value !== null && value.trim() !== '') {
                isValidInput = /^\d+$/.test(value);
                if (!isValidInput) {
                    errors.push('Please enter only numeric values in this field.');
                }
                cssValidation(isValidInput, input);
                return isValidInput;
            }
            break;
        case 'NL': // Number Length 
            if (value !== null && value.trim() !== '') {
                const regex = new RegExp(`^\\d{${userDefinedValue}}$`);
                isValidInput = regex.test(value);
                if (!isValidInput) {
                    errors.push(`Please enter a valid length consisting of exactly ${userDefinedValue} digits.`);
                }
                cssValidation(isValidInput, input);
                return isValidInput;
            }
            break;
        case 'DT': // Date
            if (value !== null && value.trim() !== '') {
                isValidInput = !isNaN(Date.parse(value));
                if (!isValidInput) {
                    errors.push('Please enter a valid date in the correct format (e.g., YYYY-MM-DD).');
                }
                cssValidation(isValidInput, input);
                return isValidInput;
            }
            break;
        case 'UL': // URL
            if (value !== null && value.trim() !== '') {
                isValidInput = /^(https?:\/\/[^\s$.?#].[^\s]*)$/.test(value);
                if (!isValidInput) {
                    errors.push('Please enter a valid URL, including the protocol (e.g., https://example.com).');
                }
                cssValidation(isValidInput, input);
                return isValidInput;
            }
            break;
        case 'ML': // Minimum Length
            if (value !== null && value.trim() !== '') {
                isValidInput = value.length >= userDefinedValue;
                if (!isValidInput) {
                    errors.push(`This field requires a minimum of ${userDefinedValue} characters.`);
                }
                cssValidation(isValidInput, input);
                return isValidInput;
            }
            break;
        case 'XL': // Maximum Length
            if (value !== null && value.trim() !== '') {
                isValidInput = value.length <= userDefinedValue;
                if (!isValidInput) {
                    errors.push(`This field must not exceed ${userDefinedValue} characters in length.`);
                }
                cssValidation(isValidInput, input);
                return isValidInput;
            }
            break;
        case 'FT': // File Type
            if (value !== null && value.trim() !== '') {
                const allowedExtensions = userDefinedValue.split(',').map(ext => ext.trim()).join('|');
                const regex = new RegExp(`\\.(${allowedExtensions})$`, 'i');
                isValidInput = regex.test(value);
                if (!isValidInput) {
                    errors.push(`Please upload a file with one of the following acceptable extensions: ${userDefinedValue}.`);
                }
                cssValidation(isValidInput, input);
                return isValidInput;
            }
            break;
        case 'CR': // Checkbox Required
            isValidInput = input.checked;
            if (!isValidInput) {
                errors.push('Please select this checkbox to proceed.');
            }
            cssValidation(isValidInput, input);
            return isValidInput;
        case 'SO': // Select Option
            isValidInput = input.selectedIndex > 0;
            if (!isValidInput) {
                errors.push('Please select an option from the dropdown menu.');
            }
            cssValidation(isValidInput, input);
            return isValidInput;
        case 'IP': // IP
            if (value !== null && value.trim() !== '') {
                isValidInput = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value);
                if (!isValidInput) {
                    errors.push('Please enter a valid IP address in the format: xxx.xxx.xxx.xxx.');
                }
                cssValidation(isValidInput, input);
                return isValidInput;
            }
            break;
        case 'DB': // Date of Birth
            if (value !== null && value.trim() !== '') {
                const today = new Date();
                const birthDate = new Date(value);
                isValidInput = birthDate < today;
                if (!isValidInput) {
                    errors.push('Please enter a valid date of birth in the format: YYYY-MM-DD.');
                }
                cssValidation(isValidInput, input);
                return isValidInput;
            }
            break;
        case 'AN': // Alpha Numeric
            if (value !== null && value.trim() !== '') {
                isValidInput = /^[a-zA-Z0-9]+$/.test(value);
                if (!isValidInput) {
                    errors.push('This field can only contain letters and numbers (alphanumeric characters).');
                }
                cssValidation(isValidInput, input);
                return isValidInput;
            }
            break;
        case 'NS': // No Special Characters //User can add or remove special characters to this field
            if (value !== null && value.trim() !== '') {
                let disallowedSpecialChars = "!@#$%^&*()_+[]{}|;:',.<>/?`~\"\\";
                let specialCharRegex = new RegExp(`[${disallowedSpecialChars.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}]`);
                isValidInput = !specialCharRegex.test(value);
                if (!isValidInput) {
                    errors.push(`Please enter a value without these special characters: ${disallowedSpecialChars}`);
                }
                cssValidation(isValidInput, input);
                return isValidInput;
            }
            break;
        case 'FL': // Upload FIle Limit
            if (value !== null && value.trim() !== '') {
                isValidInput = input.files.length <= userDefinedValue;
                if (!isValidInput) {
                    errors.push(`Please upload no more than ${userDefinedValue} file(s).`);
                }
                cssValidation(isValidInput, input);
                return isValidInput;
            }
            break;
        case 'FS': // File Size
            if (value !== null && value.trim() !== '') {
                const fileSize = input.files[0]?.size || 0;
                console.log(userDefinedValue);
                isValidInput = fileSize <= userDefinedValue * 1024 * 1024; // Convert MB to Bytes
                if (!isValidInput) {
                    errors.push(`File size must be less than ${userDefinedValue} MB.`);
                }
                cssValidation(isValidInput, input);
                return isValidInput;
            }
            break;
        case 'MR': // Min Range
            if (value !== null && value.trim() !== '') {
                isValidInput = parseFloat(value) >= userDefinedValue;
                if (!isValidInput) {
                    errors.push(`The value must be greater than or equal to ${userDefinedValue}.`);
                }
                cssValidation(isValidInput, input);
                return isValidInput;
            }
            break;
        case 'XR': // Max Range
            if (value !== null && value.trim() !== '') {
                isValidInput = parseFloat(value) <= userDefinedValue;
                if (!isValidInput) {
                    errors.push(`The value must be less than or equal to ${userDefinedValue}.`);

                }
                cssValidation(isValidInput, input);
                return isValidInput;
            }
            break;
        case 'SN': // No Sequential Number
            if (value !== null && value.trim() !== '') {
                const regex = new RegExp(`(\\d)\\1{${userDefinedValue - 1}}`);
                isValidInput = !regex.test(value);
                if (!isValidInput) {
                    errors.push(`This field must not contain ${userDefinedValue} or more consecutive digits.`);
                }
                cssValidation(isValidInput, input);
                return isValidInput;
            }
            break;
        case 'RC': // No Repeating Character
            if (value !== null && value.trim() !== '') {
                const regex = new RegExp(`(.)\\1{${userDefinedValue - 1}}`);
                isValidInput = !regex.test(value);
                if (!isValidInput) {
                    errors.push(`This field must not contain ${userDefinedValue} or more consecutive repeating characters.`);
                }
                cssValidation(isValidInput, input);
                return isValidInput;
            }
            break;
        case 'CD': // Current Valid Date 
            if (value !== null && value.trim() !== '') {
                const todayDV = new Date();
                todayDV.setHours(0, 0, 0, 0);
                const UserDate = new Date(value);
                alert(UserDate);
                isValidInput = UserDate >= todayDV;
                if (!isValidInput) {
                    errors.push('Please enter a date that is current or in the future.');
                }
                cssValidation(isValidInput, input);
                return isValidInput;
            }
            break;
        case 'CE': // Custom Error..If you want validate the new input and condition to use this case
            if (value !== null && value.trim() !== '') {
                isValidInput = value !== ''; //User can define a custom error condition
                if (!isValidInput) {
                    errors.push('*Please enter a valid value.');
                }
                cssValidation(isValidInput, input);
                return isValidInput;
            }
            break;
        default:
            isValidInput = true;
            break;
    }
}

//CSS Validation
function cssValidation(flag, fieldInput, errorMessage = '') {
    // Check if an error message element already exists
    let errorElement = fieldInput.parentNode.querySelector('.error-message');
    if (!flag) { // If validation fails
        fieldInput.style.border = '1px solid red';
        // If the error element doesn't exist, create one
        if (!errorElement) {
            errorElement = document.createElement('small');
            errorElement.className = 'error-message';
            errorElement.style.color = 'red';
            errorElement.style.display = 'block'; // Ensure the error message is displayed on its own line
            errorElement.style.fontWeight = 'bold'; // Make the text bold
            fieldInput.parentNode.appendChild(errorElement);
        }
        // Set the error message text
        errorElement.textContent = errors[0];
    } else { // If validation passes
        fieldInput.style.border = '1px solid blue';
        // If an error element exists, remove it
        if (errorElement) {
            errorElement.remove();
        }
    }
}