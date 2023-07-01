import { useReducer, ChangeEvent } from "react";

interface InputState {
    value: string;
    isValid: boolean;
    isTouched?: boolean;
}

interface ActionType {
    type: "Change" | "Clear" | "Invalid";
    inputString?: string;
}

let defaultState: InputState = {
    value: "",
    isValid: true,
    isTouched: false,
};

function inputReducer(inputState: InputState, action: ActionType) {
    switch (action.type) {
        case "Change":
            let changedState: InputState = {
                value: action.inputString!,
                isValid: inputState.isValid,
                isTouched: true,
            };

            if (!inputState.isValid && action.inputString === "") {
                changedState = {
                    value: action.inputString,
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
                isTouched: true,
            };

        case "Clear":
            return defaultState;
    }
}

/**
 * `useInput` hook defined to handle HTML input elements and managing their states.
 * @param inValidCondition function to get the invalid condition for the input string state
 * @returns  Object containing input states and input handler functions
 */
function useInput(inValidCondition: (str: string) => boolean) {
    const [inputName, dispatchInputName] = useReducer(
        inputReducer,
        defaultState
    );

    let inputNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            dispatchInputName({
                type: "Change",
                inputString: e.target.value,
            });
        } else {
            dispatchInputName({
                type: "Invalid",
            });
        }
    };

    let inputNameBlurHandler = () => {
        if (!inputName.value) {
            dispatchInputName({
                type: "Invalid",
            });
        }
    };

    let inputNameClearHandler = () => {
        dispatchInputName({
            type: "Clear",
        });
    };

    let inputNameValid =
        inputName.isValid ||
        (inValidCondition(inputName.value) && inputName.isTouched);

    return {
        inputName,
        inputNameValid,
        inputNameChangeHandler,
        inputNameBlurHandler,
        inputNameClearHandler,
    };
}
export default useInput;
