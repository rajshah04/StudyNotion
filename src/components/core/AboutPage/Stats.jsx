import React from 'react';

const statsData = [
    {
        count: "10K+",
        label: "Active Students"
    },
    {
        count: "10+",
        label: "Mentors"
    },
    {
        count: "200+",
        label: "Courses"
    },
    {
        count: "50+",
        label: "Awards"
    },
] ;

const Stats = () => {
  return (
    <div className='bg-richblack-700'>    
        <div className='flex flex-col gap-10 justify-between w-11/12 max-w-maxContent text-richblack-5 mx-auto'>
            <div className="grid grid-cols-2 md:grid-cols-4 text-center">
                {
                    statsData.map((stat, index) => (
                        <div className="flex flex-col py-10" key={index}>
                            <h1 className='font-bold text-3xl ' >
                                {stat.count}
                            </h1>
                            
                            <p className='font-semibold text-richblack-400'>
                                {stat.label}
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Stats