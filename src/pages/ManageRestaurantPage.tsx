import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import { useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant } from "@/api/MyRestaurantApi";

const ManageRestaurantPage=()=>{
    const {createRestaurant,isLoading:createIsLoading}=useCreateMyRestaurant();
    const {currentRestaurant,isLoading:getIsLoading}=useGetMyRestaurant();
    const {updateRestaurant,isLoading:updateIsLoading}=useUpdateMyRestaurant();
    const isEditing=!!currentRestaurant;
    if(isEditing&&getIsLoading){
        return <div>loading</div>
    }
    return <ManageRestaurantForm
    {...(isEditing && { restaurant: currentRestaurant })}
    onSave={isEditing ? updateRestaurant : createRestaurant}
    isLoading={createIsLoading || updateIsLoading}
/>
}

export default ManageRestaurantPage;

