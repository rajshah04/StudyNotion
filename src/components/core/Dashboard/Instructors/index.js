import React, { useState } from 'react';
import InstructorsTable from './InstructorsTable';

const Categories = () => {

    const [instructors, setInstructors] = useState([]) ;

    return (
        <div>
            <div className='mb-14 flex justify-between items-center'>
                <h1 className='text-3xl font-medium text-richblack-5'>
                    All Instructors
                </h1>
            </div>

            {
                instructors && (
                    <InstructorsTable instructors={instructors} setInstructors={setInstructors} />
                )
            }

            {
                !instructors && (
                    <div className='text-xl font-medium text-richblack-5'>
                        No Instructors Registered Yet.
                    </div>
                )
            }
        </div>
    )
}

export default Categories