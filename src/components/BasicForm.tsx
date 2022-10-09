import { useReducer, FormEvent, ChangeEvent } from "react";

interface InputState {
    value: string;
    isValid: boolean;
}

let defaultState: InputState = {
    value: "",
    isValid: true,
};

function inputReducer(
    inputState: InputState,
    action: {
        type: "Clear" | "Change" | "Invalid";
        inputString?: string;
    }
) {
    switch (action.type) {
        case "Change":
            let changedState: InputState = {
                value: action.inputString!,
                isValid: inputState.isValid,
            };
            if (!inputState.isValid && action.inputString === "") {
                changedState = {
                    value: action.inputString!,
                    isValid: false,
                };
            }
            if (!inputState.isValid && action.inputString !== "") {
                changedState = {
                    value: action.inputString!,
                    isValid: true,
                };
            }

            return changedState;

        case "Invalid":
            return {
                value: action.inputString!,
                isValid: false,
            };

        case "Clear":
            return defaultState;
    }
}

const BasicForm = () => {
    let [firstName, dispatchFirstName] = useReducer(inputReducer, defaultState);

    let firstNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            dispatchFirstName({ type: "Change", inputString: e.target.value });
        } else {
            dispatchFirstName({ type: "Invalid" });
        }
    };

    let firstNameBlurHandler = () => {
        if (!firstName.value) {
            dispatchFirstName({
                type: "Invalid",
            });
        }
    };

    let firstNameValid = firstName.isValid || firstName.value === "";

    let formIsValid = firstNameValid;

    let handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!formIsValid) {
            return;
        }

        console.log(firstName.value);
        dispatchFirstName({ type: "Clear" });
    };

    return (
        <form
            className="w-[50%] shadow-2xl border rounded-lg bg-white py-3 px-5 "
            autoComplete="off"
            onSubmit={handleFormSubmit}
        >
            <div className="flex flex-col justify-around  bg-white my-6 ">
                <label htmlFor="fname" className="text-2xl">
                    Your first name
                </label>
                <input
                    type="text"
                    id="fname"
                    className={`rounded-lg py-2 px-3 mt-3 text-lg focus:outline-none border-2 transition-all ${
                        firstName.isValid
                            ? "bg-white border-gray-700 outline-none"
                            : "bg-red-100 border-red-500"
                    }`}
                    value={firstName.value}
                    onChange={firstNameChangeHandler}
                    onBlur={firstNameBlurHandler}
                />
                {!firstName.isValid && (
                    <span className="ml-3 text-red-700">
                        Wrong first name entered!!
                    </span>
                )}
            </div>

            <div className="text-center rounded my-2">
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
