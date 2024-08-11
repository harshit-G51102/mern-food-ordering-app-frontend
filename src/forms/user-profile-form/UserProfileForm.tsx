import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Form, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";


const formSchema = z.object({
    email: z.string().optional(),
    name: z.string().min(1, "name is required"),
    addressLine: z.string().min(1, "address line is required"),
    city: z.string().min(1, "city is required"),
    country: z.string().min(1, "country is required"),
})

type UserFormData = z.infer<typeof formSchema>

type Props = {
    currentUser:User,
    onSave: (userProfileData: UserFormData) => void,
    isLoading: boolean
}

const UserProfileForm = ({ onSave, isLoading,currentUser }: Props) => {
    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues:currentUser
    })
    useEffect(()=>{
        form.reset(currentUser);

    },[form,currentUser]);
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSave)} className="space-y-4 bg-gray-100 rounded-lg md:p-10">
                <div>
                    <h1 className="text-2xl font-bold">User Profile Form</h1>
                    <FormDescription>
                        View and change your profile information here 
                    </FormDescription>
                </div>
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <Input {...field} disabled className="bg-white"></Input>
                    </FormItem>
                )}></FormField>
                <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <Input {...field} className="bg-white"></Input>
                        <FormMessage></FormMessage>
                    </FormItem>
                )}></FormField>
                <div className="flex flex-col md:flex-row gap-4">
                    <FormField control={form.control} name="addressLine" render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>addressLine</FormLabel>
                            <Input {...field} className="bg-white"></Input>
                            <FormMessage></FormMessage>
                        </FormItem>
                    )}></FormField>
                    <FormField control={form.control} name="city" render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>City</FormLabel>
                            <Input {...field} className="bg-white"></Input>
                            <FormMessage></FormMessage>
                        </FormItem>
                    )}></FormField>
                    <FormField control={form.control} name="country" render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>Country</FormLabel>
                            <Input {...field} className="bg-white"></Input>
                            <FormMessage></FormMessage>
                        </FormItem>
                    )}></FormField>
                </div>
                {isLoading?<LoadingButton></LoadingButton>:<Button type="submit" className="bg-orange-500">Submit</Button>}
            </form>
        </Form>
    )
}
export default UserProfileForm;