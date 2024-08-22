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
    <div className='flex flex-col my-10'>
      
      {/* text section */}
      <div>
        <div className='text-center max-w-3xl mx-auto'>
          <p className='font-semibold text-4xl text-richblack-900 my-2'>Your swiss knife for <HighlightText text={" learning any language"} /></p>
          <p>Using spin making learning multiple languages easy with 20+ languages realistic voice-over, progress tracking, custom schedule any more.</p>
        </div>
      </div>

      {/* images section */}
      <div className='relative flex items-center mb-14'>
        <img src={kyp} className='translate-x-20 h-fit w-fit' />
        <img src={cwo} className='-translate-x-10 translate-y-7 h-fit w-fit' />
        <img src={pyl} className='-translate-x-48 h-fit w-fit' />
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