import landingImage from "../assets/landing.png"
import appDownloadImage from "../assets/appDownload.png"
import SearchBar, { SearchForm } from "@/components/SearchBar"
import { useNavigate } from "react-router-dom"

const HomePage=()=>{
    const navigate =useNavigate();
    const handleSearchSubmit=(searchFormValues:SearchForm)=>{
        navigate(`/search/${searchFormValues.searchQuery}`);
    };
    return(
        <div className="flex flex-col gap-12">
            <div className="md:mx-28 md:px-16 bg-white rounded-lg shadow-2xl py-8 flex flex-col text-center gap-5 -mt-16">
                <h1 className="text-5xl font-bold tracking-tight text-orange-600">
                    Tuck into a takeway today
                </h1>
                <span className="text-xl">Food is just a click away</span>
                <SearchBar placeholder="search by city or town" onSubmit={handleSearchSubmit}></SearchBar>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
                <img src={landingImage}/>
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <span className="font-bold text-3xl tracking-tighter">
                        Order takeaway even faster
                    </span>
                    <span>
                        Download MERNeats for faster ordering and personalised recommendation
                    </span>
                    <img src={appDownloadImage} className="sm:w-[50vw] md:w-[30vw] "></img>

                </div>
            </div>
        </div>
    )
}
export default HomePage