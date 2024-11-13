"use client"
import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import Image from "next/image";
import {Prediction} from "@/app/utils/type";
import PredictionBox from "@/app/components/PredictionBoxComponent";
import {predictBellPepperHealthy} from "@/app/api/repository/PredictionRepository";

const DropZone = () => {
    const [dataURL, setDataURL] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [prediction, setPrediction] = useState<Prediction | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const selectedFiles = acceptedFiles[0];
        const reader = new FileReader();
        reader.onabort = () => console.log('aborted');
        reader.onerror = () => console.log('error');
        reader.onload = () => {
            const binaryStr = reader.result as string;
            setDataURL(binaryStr);
        }
        reader.readAsDataURL(selectedFiles);
    }, [])
    const {getRootProps, acceptedFiles, getInputProps, isDragActive} = useDropzone({onDrop: onDrop})

    const detectImage = async () => {
        setIsLoading(true);
        const data = await predictBellPepperHealthy(acceptedFiles[0])
        setPrediction(data)
        setIsLoading(false);
    }

    const resetAll = () => {
        setDataURL(null)
        setIsLoading(false);
        setPrediction(null);
    }

    if (dataURL) return (
        <div>
            <div className="relative">
                {prediction && (
                    <div
                        className={`absolute w-full h-full ${prediction.prediction === "Bacterial Spot" ? "bg-rose-500/30" : "bg-emerald-500/30"}`}></div>
                )}
                <Image src={dataURL} width="500" height="500" alt="uploaded"/>
            </div>
            <div className="mt-4 flex flex-row justify-around text-sm font-medium">
                {prediction ? (
                    <button onClick={resetAll}
                            className="rounded-md py-2 px-6 bg-black dark:bg-white dark:text-black text-white hover:bg-black/90 hover:ring-1 ring-slate-800 dark:hover:bg-white/90 dark:ring-slate-200 transition-all duration-150">Start
                        New Image
                    </button>
                ) : (
                    <>
                        <button onClick={detectImage}
                                className="text-white bg-emerald-600 rounded-md py-2 px-6 hover:bg-emerald-500 hover:ring-1 ring-emerald-400 transition-all duration-150">Detect
                        </button>
                        <button onClick={() => setDataURL(null)}
                                className="text-white bg-rose-600 rounded-md py-2 px-6 hover:bg-rose-500 hover:ring-1 ring-rose-400 transition-all duration-150">Cancel
                        </button>
                    </>
                )}
            </div>
            {isLoading ? "Predicting..." : prediction && (
                <PredictionBox data={prediction}/>
            )}
        </div>
    )

    return (
        <div {...getRootProps()}
             className={`ring-1 ring-slate-950/20 dark:ring-slate-100/20 rounded-2xl p-16 w-full cursor-pointer transition-all ${isDragActive ? 'bg-slate-50 dark:bg-slate-100/10' : 'hover:bg-slate-50 dark:hover:bg-slate-100/10'}`}>
            <input {...getInputProps()}/>
            {
                isDragActive ?
                    <div className="flex items-center justify-center">
                        <Image src="/upload.png" alt="upload" width="96" height="96"/>
                    </div> :
                    <div className="h-24 flex items-center justify-center">

                        <p>Drag file here, or click to choose file</p>
                    </div>
            }
        </div>
    )
}

export default DropZone;