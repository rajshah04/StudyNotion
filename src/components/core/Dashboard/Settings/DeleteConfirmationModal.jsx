import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../../services/operations/authAPI';
import { deleteAccount } from '../../../../services/operations/settingsAPI';

const DeleteConfirmationModal = ({setDeleteModal}) => {

    const { user } = useSelector((state) => state.profile) ;
    const { token } = useSelector((state) => state.auth) ;

    const dispatch = useDispatch() ;
    const navigate = useNavigate() ;

    const mainValue = `delete${user?.email}'s-account` ;
    const [input, setInput] = useState("") ;
    const [checkSameOrNot, setCheckSameOrNot] = useState(false) ;

    const changeHandler = (e) => {
        const newInput = e.target.value ;
        setInput(newInput) ;
        console.log(input) ;
        console.log(newInput) ;

        if(mainValue === newInput){
            setCheckSameOrNot(true) ;
            console.log("Same") ;
        }
        else{
            setCheckSameOrNot(false) ;
            console.log("Diff") ;
        }
    }

    const submitHandler = (e) => {
        e.preventDefault() ;
        dispatch(logout(navigate)) ;
        dispatch(deleteAccount(token)) ;
    }

    return (
        <div className='fixed inset-0 z-[1000] grid place-items-center overflow-auto backdrop-blur-sm bg-opacity-0'>
            <div className='w-11/12 max-w-fit rounded-lg border-2 border-richblack-500 bg-richblack-800 p-6'>

                <div className='flex justify-between items-center pb-2 border-b border-richblack-500'>
                    <p className='text-base text-left font-semibold text-richblack-5'>
                        Delete account - {user?.email}
                    </p>

                    <button onClick={() => setDeleteModal(false)} className='hover:bg-white hover:bg-opacity-10 p-2 rounded-md'>
                        <IoMdClose />
                    </button>
                </div>

                <div className='py-4 border-b border-richblack-500'>
                    {/* add user and email icons */}
                    <div className='flex gap-4 justify-center items-center'>
                        <img src={user?.image} width={30} height={30} className='rounded-full' /> 
                        
                        <p>
                            {user?.email}    
                        </p>
                    </div>

                    {/* try adding active course details here */}

                </div>

                <form className='py-2 flex flex-col text-sm' onSubmit={(e) => submitHandler(e)}>
                    
                    <label htmlFor="deleteAcc" className='font-bold'>
                        To confirm, type "{mainValue}" in the box below
                    </label>
                    <input type="text" name="deleteAcc" id="deleteAcc" className='bg-richblack-900 border focus:border-red-700 rounded-md px-4 py-2' onChange={(e) => changeHandler(e)} />

                    <button type='submit' className={`mt-2 px-4 py-2 rounded-md text-base font-semibold text-red-600 bg-richblack-700 ${checkSameOrNot ? "hover:text-richblack-5 hover:bg-red-600" : "cursor-not-allowed opacity-50"}`}>
                        Delete my account
                    </button>

                </form>
                
            </div>
        </div>
    )
}

export default DeleteConfirmationModal