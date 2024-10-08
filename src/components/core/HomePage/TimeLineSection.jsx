import React from 'react' ;
import image from '../../../assets/Images/TimelineImage.png' ;
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg" ;
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg" ;
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg" ;
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg" ;


const timeline = [
  {
    logo: logo1,
    heading: "Leadership",
    description: "Fully committed to the success"
  } ,
  {
    logo: logo2,
    heading: "Responsibility",
    description: "Students will be our first priority"
  } ,
  {
    logo: logo3,
    heading: "Flexibility",
    description: "The ability to switch is an important skill"
  } ,
  {
    logo: logo4,
    heading: "Solve the problem",
    description: "Code your way to a solution"
  } ,
] ;

const TimeLineSection = () => {
  return (
    <div>
      
      <div className='flex flex-col lg:flex-row gap-32 items-center mb-20'>

        {/* left div */}
        <div className='w-full lg:w-[45%] flex flex-col gap-6'>
          {
            timeline.map((ele, ind) => {
              return (
                // <div className='flex flex-row gap-10 items-center my-3' key={ind}>
                <div className='flex flex-col' key={ind}>

                  <div className={`hidden ${ind !== 0 ? "lg:block" : "hidden" } h-14 w-7 border-r border-dotted border-richblack-600 -translate-y-3`}>
                  </div> 

                  <div className='flex flex-row gap-10 items-center'>
                    {/* circles div */}
                    <div className='w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]'>
                      <img src={ele.logo} alt={ele.heading + "logo"} />
                    </div>

                    <div>
                      <h1 className='text-richblack-700 font-bold text-lg'>{ele.heading}</h1>
                      <p className='text-richblack-700 text-base'>{ele.description}</p>
                    </div> 
                  </div>

                </div>
              )
            })
          }
        </div>

        {/* right div */}
        <div className='relative shadow-blue-200'>
          <img src={image} height={550} width={720} alt="timelineImage" className='shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)] object-cover h-fit' />

          {/* green box */}
          <div className='absolute bg-caribbeangreen-700 lg:flex flex-col lg:flex-row text-white uppercase py-5 lg:py-10 right-[50%] translate-x-[50%] translate-y-[-50%]'>

            <div className='flex gap-6 items-center justify-center py-2 lg:border-r border-caribbeangreen-300 px-7'>
              <div className='font-bold text-3xl'>10</div>

              <div className='uppercase text-caribbeangreen-300 text-sm'>Years of experience</div>
            </div>

            <div className='flex gap-6 items-center justify-center px-7'>
              <div className='font-bold text-3xl'>250</div>

              <div className='uppercase text-caribbeangreen-300 text-sm'>types of courses</div>
            </div>

          </div>
        </div>

      </div>

    </div>
  )
}

export default TimeLineSection