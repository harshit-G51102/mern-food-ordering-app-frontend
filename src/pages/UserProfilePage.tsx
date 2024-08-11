import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

const UserProfilePage=()=>{
    const {currentUser,isLoading:isGetLoading}=useGetMyUser();
    const {updateuser,isLoading:isUpdateLoading}=useUpdateMyUser();
    if(!currentUser){
        return <h1>unable to load user profile (login to see user profile)</h1>
    }
    if(isGetLoading){
        return <div>loading</div>
    }
    return(
        <UserProfileForm currentUser={currentUser} onSave={updateuser} isLoading={isUpdateLoading} ></UserProfileForm>
    )
}
export default UserProfilePage;