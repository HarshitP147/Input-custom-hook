<h1>Input validation using custom hook</h1>

Another mini project. This repository contains the code for simple input validtaion of first name and last name and is written in typescript react. The entire validation and form handling is handled by the `useInput` hook defined in hooks folder.

There is another file `Check.tsx` beside `BasicInput.tsx` inside the components folder for comparison and see how seperating our state logic and UI logic and clean code is good.

There are many ways to validate an input field but this one is just for learning purposes.


Here's a super mini documentation for the `useInput` hook. It might not be the best, you can checkout the code anyway.
<table>
    <tb>
    <tr>
        <td>Parameters</td>
        <td>
            "inValidCondtion" function takes string as arguement and returns boolean value to check the invalidity of the string 
        </td>
    </tr>
    <tr>
        <td>Returns</td>
        <td>
            An object containing the input state, input valid boolean and basic input field handler functions
        </td>
    </td>
</table>

<h4>PS: The main point of this repository is to learn about custom hooks and not input validation.</h4>

I will try to keep updating this repository whenever it's feasible to do so. Your contributions are always welcome.

<h3>Thanks!!</h3>
