import { ChangeEvent, FormEvent, useEffect, useReducer } from "react";

interface InputState {
    value: string;
    wasTouched: boolean;
    isValid: boolean;
}

let defaultState: InputState = {
    value: "",
    wasTouched: false,
    isValid: true,
};

function inputReducer(
    state: InputState,
    action: {
        type: "Clear" | "Change" | "Touched";
        inputString: string;
    }
) {
    switch (action.type) {
        case "Clear":
            return defaultState;

        case "Change":
            return {
                value: action.inputString,
                isValid: action.inputString ? true : false,
                wasTouched: state.wasTouched,
            };

        case "Touched":
            return {
                value: state.value,
                isValid: state.value ? state.isValid : false,
                wasTouched: true,
            };
    }
}

const BasicForm = () => {
    const [firstName, dispatchFirstName] = useReducer(
        inputReducer,
        defaultState
    );

    let firstNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatchFirstName({
            type: "Change",
            inputString: e.target.value,
        });
    };

    let firstNameBlurHandler = () => {
        dispatchFirstName({
            type: "Touched",
            inputString: "",
        });
    };

    useEffect(() => {
        // code to check the validity of the state
    }, [firstName]);

    let formIsValid = firstName.isValid;

    let handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();

        console.log(firstName);
        dispatchFirstName({
            type: "Clear",
            inputString: "",
        });
    };

    return (
        <form
            className="w-[50%] border rounded-lg bg-white py-3 shadow-xl"
            autoComplete="off"
            onSubmit={handleFormSubmit}
        >
            <div className="flex flex-col rounded-lg justify-around p-3 my-3 ">
                <label htmlFor="fname" className="text-2xl">
                    Your name
                </label>
                <input
                    className={`rounded-lg py-2 px-3 mt-3 text-lg ${
                        firstName.isValid ? "bg-white" : "bg-red-200"
                    } focus:outline-none border`}
                    type="text"
                    id="fname"
                    value={firstName.value}
                    onChange={firstNameChangeHandler}
                    onBlur={firstNameBlurHandler}
                />
                {!firstName.isValid && (
                    <span className="ml-4 text-base text-red-700">
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
                            ? "bg-green-500 hover:bg-green-400"
                            : "bg-gray-400 hover:cursor-not-allowed"
                    } `}
                >
                    Submit
                </button>
            </div>
        </form>
    );
};
export default BasicForm;
