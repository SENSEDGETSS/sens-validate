# Form Validation - User Manual
## Version 1.0.6
# Document Control Sheet

## Why SENSVAL
Traditional validation methods often require users to create separate functions for each input 
field and form, which can be time-consuming and complex. The sensval library simplifies this 
process by providing a unified solution for validating all types of input fields and forms. 
With sensval, users can easily implement validation by adding a data-sensval attribute to the 
relevant input fields and forms, streamlining the entire process and saving valuable 
development time.

## How to Use
## Installation
To use the validation rules outlined in this document, include the sensval.min.js script in 
your HTML file and apply the data-sensval attribute to the input fields that require validation.
 ```html
	Ex:
	<script src="sensval.min.js"></script>
	This manual provides detailed instructions on single and multiple validations,
	as well as user-defined validation rules.
```
#### Using by NPM
To use the sensedge-validation package through npm.
 ```html
	Ex:
	<npm install sensedge-validation>
```
#### Using By CDN
cdn Link - [https://cdn.jsdelivr.net/gh/SENSEDGETSS/sens-validate@main/sensval.min.js](https://cdn.jsdelivr.net/gh/SENSEDGETSS/sens-validate@main/sensval.min.js)
 
## Single Validation
Use the data-sensval attribute to specify what kind of validation you want for each input field. 
For example, data-sensval="TX" ensures the input contains text only.
 ```html
	Ex:
	<input type="text" data-sensval="TX">
```
## Multiple Validations:
You can apply more than one validation type to a field by separating them with a ‘hyphen(-)’ 
in the data-sensval attribute. 
For example, data-sensval="TX-MN" makes sure the field is both text-only and mandatory.
```html
	Ex:
	<input type=” text” data-sensval= “TX-MN”>
```
## User-Defined Values for Validation:
You can specify extra details for certain validations. 
For example, if you want to check that a number has exactly 10 digits, use data-sensval="NL#10".
```html	
 	Ex:
	<input type=” text” data-sensval=”NL#10-MN”>
```
## Form Validation: 
Use a button with an onclick event to trigger the validateForm function. This function 
calls ValidateAll with the form’s id to check all input fields in the form for validity.
```html
	Ex:
	<form id="formId">
	    <input type="text" data-sensval = "MN">
	    <input type="text" data-sensval = "AN">
	    <button onclick="ValidateAll('formId')">Submit</button>
	</form>
```
## Independent Validation:
By using the data-sensval attribute, each input field can be validated in real-time. This allows 
validation to occur dynamically, such as when a user changes the input. As soon as the input 
changes, the specific field is instantly validated, providing immediate feedback and ensuring 
data accuracy throughout the process.

## Validations
        
| Abbreviation | Field Type            | Validation Rule                                                                                                     |
|--------------|-----------------------|---------------------------------------------------------------------------------------------------------------------|
| MN           | Mandatory Field       | Ensures that the input is not empty.                                                                                |
| EM           | Email Address         | Validates that the input is a properly formatted email address.                                                     |
| PS           | Password Strength     | Ensures the password includes uppercase, lowercase, numbers, special characters, and a minimum length defined by the user (e.g., PS#8). |
| TX           | Text Only             | Allows only letters and spaces in the input field.                                                                  |
| NM           | Number Only           | Allows numeric characters in the input field.                                                                  |
| NL           | Number Length         | Validates that the length has the exact number of digits specified by the user (e.g., NL#10). Like, Credit Card, CVV, ZipCode, Phone No.....  |
| DT           | Date                  | Ensures the input is a valid date.                                                                                  |
| UL           | URL                   | Validates that the input is a properly formatted URL.                                                               |
| ML           | Minimum Length        | Ensures the input is at least a certain number of characters as defined by the user (e.g., ML#5).                   |
| XL           | Maximum Length        | Ensures the input does not exceed a certain number of characters as defined by the user (e.g., XL#20).              |
| CR           | Checkbox Required     | It Ensures the checkbox status.                                                                                    |
| SO           | Select Option         | Ensures the field does not select a 0th index value.                                                           |
| FT           | File Type             | Ensures the uploaded file has one of the allowed extensions specified by the user (e.g., FT#pdf, jpg).                                |
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

## Note:
- “MN” – the Input field Attribute value.
- “NL#10” – ‘NL’-Mean by the Input Attribute value, 10 Defined the input field minimum length.


![code](https://github.com/user-attachments/assets/c085739f-af93-47e9-842b-9407519b98a7)

![Correct](https://github.com/user-attachments/assets/c17d5e66-1cab-44af-95da-c3f373de253e)

![Wrong](https://github.com/user-attachments/assets/2de27c70-3332-4721-bf7b-eb17d4cb1072)

## By Using React Component 
## Key Functions
- const isValid = validateAll('validationForm'); this line validates the whole form by that corresponding form Id.
- Also returns the validation result as a Boolean value (true or false). Using this return value you can execute your code by the validation result.
![React](https://github.com/user-attachments/assets/0aeeebfc-d881-43e5-8148-8970ed84b8c2)


