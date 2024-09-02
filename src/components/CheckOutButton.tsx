import { useAuth0} from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import UserProfileForm, { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useGetMyUser } from "@/api/MyUserApi";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

type Props={
    onCheckout:(userFormData:UserFormData)=>void;
    disabled:boolean;
}

const CheckOutButton = ({onCheckout,disabled}:Props) => {
  const {isAuthenticated,isLoading:isAuthLoading,loginWithRedirect}=useAuth0();
  const {pathname}=useLocation();
  const {currentUser,isLoading:isGetuserLoading}=useGetMyUser();
  const onLogin=async()=>{
    loginWithRedirect({
        appState:{
            returnTo:pathname
        }
    })
  }
  if(!isAuthenticated){
    return(
        <Button className="bg-orange-500 flex-1" onClick={onLogin}>Login to check out</Button>
    )
  }
  if(isAuthLoading||!currentUser){
    return <LoadingButton></LoadingButton>
  }
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button disabled={disabled} className="bg-orange-500 flex-1">Go to checkout</Button>
        </DialogTrigger>
        <DialogContent className="max-w-[425px] md:min-w-[700px]">
            <UserProfileForm currentUser={currentUser} onSave={onCheckout} isLoading={isGetuserLoading} title="Confirm Delivery Details" buttonText="Continue to payment">

            </UserProfileForm>
        </DialogContent>
    </Dialog>
  )
}

export default CheckOutButton;