import React from 'react';
import RenderSteps from './RenderSteps';

const AddCourse = () => {
  return (
    <div className='min-w-full'>
        
        <div className='flex flex-col-reverse lg:flex-row gap-6 w-full'>

            <div className='flex flex-1 flex-col'>
                <h1  className='mb-14 text-3xl font-medium text-richblack-5'>
                    Add Course
                </h1>

                <div className='flex-1'>
                    <RenderSteps />
                </div>
            </div>

            <div className='sticky top-10 hidden max-w-[400px] flex-1 w-full lg:w-[40%] text-richblack-5 text-sm bg-richblack-800 max-h-fit p-6 border border-richblack-700 rounded-lg  xl:block'>
                <p className='font-semibold text-lg mb-8'>✨ Course Upload Tips ✨</p>

                <ul className='ml-5 space-y-4 list-item list-disc'>
                    <li>
                        Set the Course Price option or make it free.
                    </li>
                    <li>
                        To add a tag, type the text and press "enter" button or "," button .
                    </li>
                    <li>
                        Standard size for the Course thumbnail is 1024 x 576.
                    </li>
                    <li>
                        Video secton controls the course overview video.
                    </li>
                    <li>
                        Course builder is where you create & optimize a course.
                    </li>
                    <li>
                        Add topics in the Course Builder section to create lessons, quizzes and assignments.
                    </li>
                    <li>
                        Information from the Additional Data section shows up on the course single page.
                    </li>
                    <li>
                        Make announcements to notify anything important.
                    </li>
                    <li>
                        Notes to all enrolled students at once.
                    </li>
                </ul>
            </div>

        </div>

    </div>
  )
}

export default AddCourse