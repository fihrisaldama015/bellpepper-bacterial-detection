import React from 'react';
import {Prediction} from "@/app/utils/type";

const PredictionBox = ({data}: { data:Prediction }) => {
    return (
        <div
            className="mt-12 p-6 ring-1 rounded-md ring-slate-950/20 dark:ring-slate-100/20 flex flex-row justify-between text-sm font-light">
            <div>
                <p>Predicted Class:</p>
                <h1 className={`text-2xl font-semibold ${data.prediction === "Bacterial Spot" ? "from-rose-600 via-lime-500 to-red-400" : "from-green-500 via-blue-400 to-emerald-400"} bg-gradient-to-r inline-block text-transparent bg-clip-text`}>{data.prediction}</h1>
            </div>
            <div>
                <p>Predicted Value:</p>
                <h1 className="text-2xl font-semibold">{data.prediction_value}</h1>
            </div>
        </div>
    )
}

export default PredictionBox;