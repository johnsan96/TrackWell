import React from "react";

const { useEffect, useState } = React;


export default function FormMobileTimeSteps() {
    const [date, setDate] = useState<string>(new Date().toLocaleDateString());
    const [steps, setSteps] = useState('');
    const [mobile_time, setMobile_time] = useState('');

    const sendRequest = async () => {

        const data = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify(
                {
                    date: date,
                    steps: steps,
                    mobile_time: mobile_time,
                }
            )

        }

        const response = await fetch("http://localhost:5000/activities", data)
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const h = await response.json()
    }



    return (
        <div>
            <h1>Form</h1>

            <div className="form">
                <input
                    type="number"
                    placeholder="steps"
                    value={steps}
                    onChange={(e) => setSteps(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="mobile time"
                    value={mobile_time}
                    onChange={(e) => setMobile_time(e.target.value)}
                />
                <button onClick={sendRequest}>send data</button>
            </div>
        </div>
    )
}