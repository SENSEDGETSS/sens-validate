# Form Validation - User Manual
## Version 1.0.0
# Document Control Sheet

## 1. Abstract
        This document outlines the process of implementing form validation using the sensval.min.js script.  
        It describes various validation rules that can be applied to form fields, ensuring data integrity and user input correctness.
## 2. Objective
        The objective of this document is to provide a comprehensive guide to implementing form validation in web applications. 
        It is intended for developers who need to validate user inputs to maintain data quality and prevent invalid submissions.
## 3. How to Use
        To use the validation rules, include the sensval.min.js script in your HTML file and apply the data-sensval attribute to input fields that require validation. 
        This manual covers single and multiple validations, as well as user-defined validation rules.
## 4. Summary
        Form validation is a critical aspect of web development to ensure data entered by users is accurate and secure. 
        This document provides step-by-step instructions to implement robust validation rules using the sensval.min.js script.
## 5. Validations
        
| Abbreviation | Field Type            | Validation Rule                                                                                                     |
|--------------|-----------------------|---------------------------------------------------------------------------------------------------------------------|
| MN           | Mandatory Field       | Ensures that the input is not empty.                                                                                |
| EM           | Email Address         | Validates that the input is a properly formatted email address.                                                     |
| PS           | Password Strength     | Ensures the password includes uppercase, lowercase, numbers, special characters, and a minimum length (e.g., PS#8). |
| TX           | Text Only             | Allows only letters and spaces in the input field.                                                                  |
| NM           | Number Only           | Allows only numeric characters in the input field.                                                                  |
| NL           | Number Length         | Validates that the length has the exact number of digits specified by the user (e.g., NL#10).                       |
| DT           | Date                  | Ensures the input is a valid date.                                                                                  |
| UL           | URL                   | Validates that the input is a properly formatted URL.                                                               |
| ML           | Minimum Length        | Ensures the input is at least a certain number of characters as defined by the user (e.g., ML#5).                   |
| XL           | Maximum Length        | Ensures the input does not exceed a certain number of characters as defined by the user (e.g., XL#20).              |
| CR           | Checkbox Required     | Ensures the checkbox is checked.                                                                                    |
| SO           | Select Option         | Ensures that the field does not select a 0th index value.                                                           |
| FT           | File Type             | Ensures that the uploaded file has one of the allowed extensions (e.g., FT#pdf, jpg).                                |
| IP           | IP Address            | Ensures the input is a valid IPv4 address.                                                                          |
| DB           | Date of Birth         | Ensures the input date is before today (validates that the user was born before today).                              |
| AN           | Alpha Numeric         | Allows only letters and numbers in the input field.                                                                 |
| FL           | File Limit            | Limits the number of files uploaded to a maximum specified by the user (e.g., FL#5).                                |
| FS           | File Size             | Ensures that the uploaded file does not exceed a specified size (in MB) (e.g., FS#2).                               |
| MR           | Minimum Range         | Ensures that the numeric input is greater than or equal to a specified minimum (e.g., MR#10).                       |
| XR           | Maximum Range         | Ensures that the numeric input is less than or equal to a specified maximum (e.g., XR#100).                         |
| SN           | No Sequential Number  | Ensures the input does not contain a sequence of repeating digits greater than or equal to a user-defined length (e.g., SN#3). |
| RC           | No Repeating Character | Ensures the input does not contain a sequence of repeating characters greater than or equal to a user-defined length (e.g., RC#3). |
| CD           | Current Valid Date    | Ensures the input date is today or a future date.                                                                   |
| NS           | No Special Characters | Ensures that the input does not contain any special characters.                                                     |
| CE           | Custom Error          | Allows custom validation logic with a custom error message.                                                         |

### Note:
        1. “MN” – the Input field Attribute value.
        2.“PN#10” – ‘PN’-Mean by the Input Attribute value,10 Defined the input field minimum length.

## 6. Single Validation:
        Use the data-sensval attribute to specify what kind of validation you want for each input field. 
        For example, data-sensval="EM" ensures the input is a valid email address.
```html
        Ex:
        <input type="email" data-sensval="EM">
```
## 7. Multiple Validations:
        You can apply more than one validation type to a field by separating them with a hyphen in the data-sensval attribute. 
        For example, data-sensval="EM-MN" makes sure the field is both a valid email and mandatory.
```html
        Ex:
        <input type=” email” data-sensval= “EM-MN”>
```
## 8. User-Defined Values for Validation:
        You can specify extra details for certain validations. For example, 
        if you want to check that a phone number has exactly 10 digits, use data-sensval="PN#10".
```html
        Ex:
        <input type=” number” data-sensval=”PN#10”>
```
## 9. Form Validation: 
        Use a button with an onclick event to trigger the validateForm function. 
        This function calls ValidateAll with the form’s ID to check all input fields in the form for validity.
## 10. Including the Validation Script:
      Make sure to include the “sensval.min.js” script in your HTML file to enable validation functionality.
```html
	Ex: 
        <script src="js/sensval.min.js"></script>
```

-- Sensedge tss



