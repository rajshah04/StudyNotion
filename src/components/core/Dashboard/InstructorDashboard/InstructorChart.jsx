import React, { useState } from 'react';
import {Chart, registerables} from "chart.js";
import {Pie} from "react-chartjs-2";

Chart.register(...registerables) ;

const InstructorChart = ({courses}) => {

    const [currChart, setCurrChart] = useState("students") ;

    // function to generate random colours
    const getRandomColours = (numColors) => {
        const colours = [] ;
        
        for(let i = 0 ; i < numColors ; i++){
            const colour = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})` ;

            colours.push(colour) ;
        }

        return colours ;
    }

    // create data for chart displaying student info
    const chartDataForStudents = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalStudentsEnrolled),
                backgroundColor: getRandomColours(courses.length) 
            }
        ]
    } ;

    // create data for chart displaying income info
    const chartDataForIncome = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalAmountGenerated),
                backgroundColor: getRandomColours(courses.length) 
            }
        ]
    } ;

    // create options
    const options = {

    } ;

    return (
        <div className='flex flex-col flex-1 gap-4 gap-y-4'>
            <p className='text-xl font-semibold'>
                Visualize
            </p>

            <div className='flex gap-x-3 font-bold text-lg'>
                <button onClick={() => setCurrChart("students")} className={`${currChart === "students" ? "text-yellow-25 bg-richblack-700 rounded-xl" : "text-yellow-300"} px-2 py-1`}>
                    Student
                </button>
                
                <button onClick={() => setCurrChart("income")} className={`${currChart === "income" ? "text-yellow-25 bg-richblack-700 rounded-xl" : "text-yellow-300"} px-2 py-1`}>
                    Income
                </button>
            </div>

            <div className='relative mx-auto aspect-square h-[400px] w-full flex items-center justify-center'>
                <Pie data={currChart === "students" ? chartDataForStudents : chartDataForIncome} options={options} />
            </div>
        </div>
    )
}

export default InstructorChart