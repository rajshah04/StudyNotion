import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import RenderSteps from '../AddCourse/RenderSteps';
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';

const EditCourse = () => {

  const dispatch = useDispatch() ;
  const { courseId } = useParams() ;
  const { course } = useSelector((state) => state.course) ;
  const { token } = useSelector((state) => state.auth) ;
  const [loading, setLoading] = useState(false) ;

  console.log("Course id : ", courseId) ;

  useEffect(() => {
    const populateCourseDetails = async() => {
      setLoading(true) ;

      const result = await getFullDetailsOfCourse(courseId, token) ;

      if(result?.courseDetails){
        dispatch(setEditCourse(true)) ;
        dispatch(setCourse(result?.courseDetails)) ;
      }

      setLoading(false) ;
    }

    populateCourseDetails() ;
  }, []) ;


  if(loading){
    return (
      <div className='h-[80vh] w-full grid place-items-center'>
        <div className='custom-loader'>

        </div>
      </div>
    )
  }

  return (
    <div className='min-w-full' >
      
      <p className='mb-14 text-3xl font-medium text-richblack-5'>
        Edit Course
      </p>

      <div>
        {
          course ? (
            <RenderSteps />
          ) : (
            <div>
              Course Not Found
            </div>
          )
        }
      </div>

    </div>
  )
}

export default EditCourse