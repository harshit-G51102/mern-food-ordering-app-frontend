import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import { useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant } from "@/api/MyRestaurantApi";

const ManageRestaurantPage=()=>{
    const {createRestaurant,isLoading:createIsLoading}=useCreateMyRestaurant();
    const {currentRestaurant,isLoading:getIsLoading}=useGetMyRestaurant();
    const {updateRestaurant,isLoading:updateIsLoading}=useUpdateMyRestaurant();
    const isEditing=!!currentRestaurant;
    if(getIsLoading){
        return <div>loading</div>
    }
    return <ManageRestaurantForm restaurant={currentRestaurant} onSave={isEditing?updateRestaurant:createRestaurant} isLoading={createIsLoading||updateIsLoading||getIsLoading}></ManageRestaurantForm>

}

export default ManageRestaurantPage;

