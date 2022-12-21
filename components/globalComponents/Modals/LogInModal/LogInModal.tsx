import { useSelector, useDispatch } from "react-redux"
import { IAllSlicesState } from "../../../../customTypesAndInterfaces/allSlicesState"
import { setIsLoginModalOpen } from "../../../../redux/slices/modalSlices"

// Icons
import {FcGoogle} from "react-icons/fc"
import {IoClose} from "react-icons/io5"
import SignInWithGoogleButton from "../../SignInWithGoogleButton/SignInWithGoogleButton"

const LogInModal = () => {
    const {isLoginModalOpen} = useSelector((state:IAllSlicesState) => state.modals)
    const dispatch = useDispatch()

    if(isLoginModalOpen == false) return null

  return (
    <>
        {isLoginModalOpen && (
            <div className="z-50 fixed inset-0 w-screen h-screen bg-darkColor bg-opacity-80 flex flex-col justify-center items-center">

                {/* ====== MODAL ====== */}
                <div className="w-[70%] sm:w-[60%] md:w-[50%] lg:w-[30%] xl:w-[25%] 2xl:w-[25%] h-[50vh] bg-lightColor flex flex-col justify-between items-center rounded-md">
                    {/*  Close Icon  */}
                    {false && <div className="w-full py-3 px-3 flex justify-end items-center rounded-md">
                        <IoClose className="text-darkColor opacity-60 hover:cursor-pointer" onClick={() => dispatch(setIsLoginModalOpen(false))} />
                    </div>}

                    <div className="w-full h-full flex flex-col space-y-5 justify-center items-center">

                        {/* Sign in with Google Button */}
                        <SignInWithGoogleButton />
                        {/* <div className="w-[80%] py-2 flex justify-center items-center space-x-3 rounded-full bg-lightColor border border-gray-300 hover:cursor-pointer">
                            <FcGoogle className="text-lg" /> 
                            <span className="text-darkColor text-base"> Sign in with Google </span>
                        </div> */}

                        {/*  Closs Button */}
                        <button 
                            type="button"
                            className="w-[80%] py-2 flex justify-center items-center space-x-3 rounded-full bg-lightColor border border-gray-300 hover:cursor-pointer"
                            onClick={() => {
                            dispatch(setIsLoginModalOpen(false))}}
                            >  
                        Close  
                        </button>

                    </div>
                </div>

            </div>
        )}
    </>
  )
}

export default LogInModal