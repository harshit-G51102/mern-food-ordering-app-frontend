import { useGetrestaurant } from "@/api/RestaurantApi";
import CheckOutButton from "@/components/CheckOutButton";
import MenuItems from "@/components/MenuItems";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { Card, CardFooter } from "@/components/ui/card";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { MenuItem } from "@/types";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type CartItem={
    _id:string;
    name:string;
    price:number;
    quantity:number
}


const DetailsPage = () => {
    const {restaurantId}=useParams();
    const [cartItems,setCartItems]=useState<CartItem[]>(()=>{
        const storedCartItems=sessionStorage.getItem(`cartItems-${restaurantId}`);
        return storedCartItems?JSON.parse(storedCartItems):[];
    });
    const {restaurant,isLoading}=useGetrestaurant(restaurantId);
    const addToCart=(menuItem:MenuItem)=>{
        setCartItems((prevCartItems)=>{
            const existingCartItem=prevCartItems.find((cartItem)=>cartItem._id===menuItem._id);
            let updatedCartItem;
            if(existingCartItem){
                updatedCartItem=prevCartItems.map((cartItem)=>cartItem._id===menuItem._id?{...cartItem,quantity:cartItem.quantity+1}:cartItem)
                console.log("clicked");
            }else{
                updatedCartItem=[...prevCartItems,{_id:menuItem._id,name:menuItem.name,price:menuItem.price,quantity:1}]
                console.log("clicked");
            }
            sessionStorage.setItem(`cartItems-${restaurantId}`,JSON.stringify(updatedCartItem));
            return updatedCartItem;

        })
    }
    const deleteFromCart=(deleteCartItem:CartItem)=>{
        setCartItems((prevCartItems)=>{
            let updatedCartItem;
            if(deleteCartItem.quantity>1){
                updatedCartItem=prevCartItems.map((cartItem)=>cartItem._id===deleteCartItem._id?{...cartItem,quantity:cartItem.quantity-1}:cartItem)
                console.log("clicked");
            }else{
                updatedCartItem=prevCartItems.filter((cartItem)=>cartItem._id!==deleteCartItem._id)
                console.log("clicked");
            }
            sessionStorage.setItem(`cartItems-${restaurantId}`,JSON.stringify(updatedCartItem));
            return updatedCartItem;

        })
    }

    const onCheckout=(userFormData:UserFormData)=>{
        console.log("userformData",userFormData);
    }

    if(isLoading||!restaurant){
        return <h1>Loading...</h1>
    }
    
    return (
        <div className="flex flex-col gap-10">
            <AspectRatio ratio={16/5}>
                <img src={restaurant.imageUrl} className="rounded-md object-cover h-full w-full"  />
            </AspectRatio>
            <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
                <div className="flex flex-col gap-4">
                    <RestaurantInfo restaurant={restaurant}></RestaurantInfo>
                    <span className="text-2xl font-bold tracking-tight">Menu</span>
                    {restaurant.menuItems.map((menuitem)=>(
                        <MenuItems menuitem={menuitem} addToCart={()=>addToCart(menuitem)}></MenuItems>
                    ))}
                </div>
                <div>
                    <Card>
                        <OrderSummary cartItems={cartItems} restaurant={restaurant} deleteFromCart={deleteFromCart}></OrderSummary>
                        <CardFooter>
                            <CheckOutButton disabled={cartItems.length===0} onCheckout={onCheckout}></CheckOutButton>
                        </CardFooter>
                    </Card>

                </div>
            </div>
        </div>
    )
}
export default DetailsPage;