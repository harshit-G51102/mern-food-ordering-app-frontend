import { Button } from "@/components/ui/button";
import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form"
import MenuItemInput from "./MenuItemInput";

const MenuSection=()=>{
    const {control} =useFormContext();
    const {fields,append,remove}=useFieldArray({
        control,
        name:"menuItems",
    })
    return(
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl text-bold">Menu</h2>
                <FormDescription>
                    Create Your Menu And Give Each Item A Name And A Price
                </FormDescription>
            </div>
            <FormField control={control} name="menuItems" render={()=>(
                <FormItem className="flex flex-col gap-2">
                   {fields.map((_,index)=>(
                    <MenuItemInput key={index} index={index} removeMenuItem={remove}></MenuItemInput>
                   ))}
                </FormItem>
            )}/>
            <Button type="button" onClick={()=>append({name:"",price:""})}>
                Add Menu Item
            </Button>
        </div>
    )
}
export default MenuSection

