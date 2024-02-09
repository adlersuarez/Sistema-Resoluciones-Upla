import { Link } from "react-router-dom";
import { images } from "../../../../../helper/index.helper";

const Title = () => {
    return (
        <Link to="#" className="flex flex-col items-center mb-5 ">
            <div className="flex items-center">
                {/*<img src={images.Idiomas_Logo} className="w-40 mr-0" alt="Flowbite Logo" />*/}
                <div className="flex justify-center text-left mt-5 gap-2">
                    <img src={images.logo_negativo} className="w-10" alt="Logo negativo" />
                    <div className="flex flex-col my-auto">
                        <span className="text-[8px] text-white">
                            R E S O L U C I O N E S
                        </span>
                        <span className="font-mont my-[-6px] text-white text-2xl font-bold tracking-widest">
                            UPLA
                        </span>
                    </div>

                </div>
            </div>

            {/* <small className="font-bold my-2 text-white">IDIOMAS UPLA</small> */}

        </Link>
    )
}

export default Title