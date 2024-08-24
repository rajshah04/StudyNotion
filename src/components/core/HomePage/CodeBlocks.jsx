import React from 'react'
import CTAButton from "./Button" ;
import { FaArrowRight } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor}) => {
  return (
    <div className={`flex ${position} my-10 lg:my-20 justify-between lg:items-center gap-20`}>

        {/* Section 1 */}
        <div className='lg:w-[50%] flex flex-col gap-8 justify-center'>
            {heading}
            <div className='text-richblack-300 font-bold'>
                {subheading}
            </div>

            <div className='flex items-center lg:items-start gap-7 mt-7'>
                <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                    <div className='flex gap-2 items-center'>
                        {ctabtn1.text}
                        <FaArrowRight />
                    </div>
                </CTAButton>

                <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                    {ctabtn2.text}
                </CTAButton>
            </div>

        </div>

        {/* Section 2 */}
        <div className='h-fit flex lg:w-[50%] code-border text-sm leading-5 rounded-sm'>
        
            {backgroundGradient}
            <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
                <p>12</p>
                <p>13</p>
                <p>14</p>
            </div>

            <div className={`w-11/12 lg:w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
                <TypeAnimation 
                sequence={[codeblock, 100000, ""]} 
                repeat={Infinity} 
                cursor={true}
                style={
                    {
                        whiteSpace: "pre-line",
                        display: "block"
                    }
                } 
                omitDeletionAnimation={true} />
            </div>
        </div>

    </div>
  )
}

export default CodeBlocks