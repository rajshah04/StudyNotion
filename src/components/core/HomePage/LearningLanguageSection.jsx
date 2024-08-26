import React from 'react' ;
import HighlightText from './HighlightText' ;
// import kyp from '../../../assets/Images/Know_your_progress.png' ;
import kyp from '../../../assets/Images/Know_your_progress.svg' ;
// import cwo from '../../../assets/Images/Compare_with_others.png' ;
import cwo from '../../../assets/Images/Compare_with_others.svg' ;
// import pyl from '../../../assets/Images/Plan_your_lessons.png' ;
import pyl from '../../../assets/Images/Plan_your_lessons.svg' ;
import Button from './Button';


const LearningLanguageSection = () => {
  return (
    <div className='flex flex-col gap-4 my-10'>
      
      {/* text section */}
      <div>
        <div className='text-left lg:text-center max-w-3xl mx-auto'>
          <p className='font-semibold text-4xl text-richblack-900 my-2'>Your swiss knife for <HighlightText text={" learning any language"} /></p>
          <p>Using spin making learning multiple languages easy with 20+ languages realistic voice-over, progress tracking, custom schedule any more.</p>
        </div>
      </div>

      {/* images section */}
      <div className='relative flex flex-col lg:flex-row items-center lg:mb-14'>
        <img src={kyp} className='lg:translate-x-20 lg:h-fit lg:w-fit' />
        <img src={cwo} className='-translate-y-11 lg:-translate-x-10 lg:translate-y-7 lg:h-fit lg:w-fit' />
        <img src={pyl} className='-translate-y-28 lg:-translate-x-48 lg:-translate-y-0 lg:h-fit lg:w-fit' />
      </div>


      {/* button wala section */}
      <div className='flex justify-center'>
        <Button active={true} linkto={"/signup"}>
          Learn More
        </Button>
      </div>
    </div>
  )
}

export default LearningLanguageSection