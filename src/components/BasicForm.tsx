import { FormEvent } from "react";

import useInput from "../hook/useInput";

const BasicForm = () => {
    const {
        inputName: firstNameValue,
        inputNameValid: firstNameValid,
        inputNameChangeHandler: firstNameChangeHandler,
        inputNameBlurHandler: firstNameBlurHandler,
        inputNameClearHandler: firstNameClear,
    } = useInput((value) => value === "");

    const {
        inputName: lastNameValue,
        inputNameValid: lastNameValid,
        inputNameChangeHandler: lastNameChangeHandler,
        inputNameBlurHandler: lastNameBlurHandler,
        inputNameClearHandler: lastNameClear,
    } = useInput((value) => value === "");

    let formIsValid = firstNameValid && lastNameValid;

    let handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!formIsValid) {
            return;
        }

        if (
            formIsValid &&
            (firstNameValue.value === "" || lastNameValue.value === "")
        ) {
            // this is where an error should be displayed on the input boxes
            return;
        }

        console.log(firstNameValue.value);
        console.log(lastNameValue.value);

        firstNameClear();
        lastNameClear();
    };

    return (
        <form
            className="w-[50%] shadow-2xl border rounded-lg bg-white py-3 px-5"
            autoComplete="off"
            onSubmit={handleFormSubmit}
            noValidate={true}
        >
            <div className="flex flex-col justify-around bg-white my-6">
                <label htmlFor="fname" className="text-2xl">
                    Your first name
                </label>
                <input
                    type={"text"}
                    id="fname"
                    className={`rounded-lg py-2 px-3 mt-3 text-lg focus:outline-none border-2 transition-all ${
                        firstNameValid
                            ? "bg-white border-gray-700 outline-none"
                            : "bg-red-100 border-red-500"
                    }`}
                    value={firstNameValue.value}
                    onChange={firstNameChangeHandler}
                    onBlur={firstNameBlurHandler}
                />
                {!firstNameValid && (
                    <span className="ml-3 text-red-700">
                        Wrong first name entered !!
                    </span>
                )}
            </div>

            <div className="flex flex-col justify-around bg-white my-6">
                <label htmlFor="lname" className="text-2xl">
                    Your last name
                </label>
                <input
                    type={"text"}
                    id="lname"
                    className={`rounded-lg py-2 px-3 mt-3 text-lg focus:outline-none border-2 transition-all ${
                        lastNameValid
                            ? "bg-white border-gray-700 outline-none"
                            : "bg-red-100 border-red-500"
                    }`}
                    value={lastNameValue.value}
                    onChange={lastNameChangeHandler}
                    onBlur={lastNameBlurHandler}
                />
                {!lastNameValid && (
                    <span className="ml-3 text-red-700">
                        Wrong last name entered !!
                    </span>
                )}
            </div>

            <div className="text-center rounded my-3">
                <button
                    type="submit"
                    disabled={!formIsValid}
                    className={`border w-72 rounded-lg p-3 transition-colors ${
                        formIsValid
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-green-300 hover:cursor-not-allowed"
                    }`}
                >
                    Submit
                </button>
            </div>
        </form>
    );
};
export default BasicForm;
