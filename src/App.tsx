import React from "react";

import BasicForm from "./components/BasicForm";
import Check from "./components/Check";

export default function App() {
    return (
        <>
            <h1 className="text-3xl text-center mt-12">
                This is for practicing a basic user form
            </h1>
            <div className="justify-center flex mt-8">
                <BasicForm />
                {/* <Check /> */}
            </div>
        </>
    );
}
