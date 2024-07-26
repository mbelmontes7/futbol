"use client";

import * as z from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";

import { UserValidation } from "@/lib/validations/user";
import { updateUser } from "@/lib/actions/user.actions";

//The Props interface is used to define the type of the props object.
interface Props {
    user: {
        id: string;
        objectId: string;
        username: string;
        name: string;
        bio: string;
        image: string;
    };
    btnTitle: string;
}



const AccountProfile = ({ user, btnTitle }: Props) => {
    //an array of files to store the selected image files
    const [files, setFiles] = useState<File[]>([]);
    const { startUpload } = useUploadThing("media");
    const router = useRouter();
    const pathname = usePathname();

    //initialize the form using the useForm hook
    const form = useForm({
        //the resolver is used to validate the form fields using the zod schema automatically when the form is submitted.
        resolver: zodResolver(UserValidation),
        defaultValues: {
            profile_photo: user?.image || '',
            name: user?.name || '',
            username: user?.username || '',
            bio: user?.bio || '',
        },
    });





    //is a custom function to handle image upload. This function takes two arguments: the event object and a function to set the value of the field.
    //Also the reason to use this function is to handle the image upload and set the value of the field to the image URL.
    const handleImage = (
        //the event object is passed to the function to get the selected file
        e: ChangeEvent<HTMLInputElement>,
        fieldChange: (value: string) => void
    ) => {
        e.preventDefault();

        const fileReader = new FileReader();
        //make a check to see if the file is an image file
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            //set the files to the array of files 
            setFiles(Array.from(e.target.files));

            if (!file.type.includes("image")) return;

            //read the file as a data URL
            fileReader.onload = async (event) => {
                const imageDataUrl = event.target?.result?.toString() || "";
                //set the value of the field to the image URL
                //react hook works you get the value of the input field and set it to the value of the input field
                fieldChange(imageDataUrl);
            };

            fileReader.readAsDataURL(file);
        }
    };
    const onSubmit = async (values: z.infer<typeof UserValidation>) => {
        //get the pathname from the router object
        const blob = values.profile_photo;
        //check if the image has changed is cpming from the isBase64Image function
        const hasImageChanged = isBase64Image(blob);
        if (hasImageChanged) {
            const imgRes = await startUpload(files);

            //check if the image response has a URL and set the value of the profile photo to the URL?! 
            if (imgRes && imgRes[0].url) {
                values.profile_photo = imgRes[0].url;
            }
        }
        //calling the updateUser function to update the user profile
        await updateUser({
            //Instead of passing individual arguments, an object is created and passed as a single argument.
            name: values.name,
            path: pathname,
            username: values.username,
            userId: user.id,
            bio: values.bio,
            image: values.profile_photo,
        });
        //if the pathname is /profile/edit, the user is redirected to the previous page using the router.back() method. Otherwise, the user is redirected to the home page using the router.push() method.
        if (pathname === "/profile/edit") {
            router.back();
        } else {
            //redirect the user to the home page
            router.push("/");
        }
    };


    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex flex-col justify-start gap-10'>
                <FormField
                    control={form.control}
                    name='profile_photo'
                    render={({ field }) => (
                        <FormItem className='flex items-center gap-4'>
                            {/* this image is for the user profile icon  */}
                            <FormLabel className='account-form_image-label'>
                                {field.value ? (
                                    <Image
                                        src={field.value}
                                        alt='profile_icon'
                                        width={96}
                                        height={96}
                                        priority
                                        className='rounded-full object-contain'
                                    />
                                ) : (
                                    <Image
                                        src='/assets/profile.svg'
                                        alt='profile_icon'
                                        width={24}
                                        height={24}
                                        className='object-contain'
                                    />
                                )}
                            </FormLabel>
                            <FormControl className='flex-1 text-base-semibold text-gray-200'>
                                {/* //input field to add the profile photo */}
                                <Input
                                    type='file'
                                    accept='image/*'
                                    placeholder='Add profile photo'
                                    className='account-form_image-input'
                                    onChange={(e) => handleImage(e, field.onChange)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* //for the secound field is going to be the name  */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className='flex flex-col w-full gap-3'>
                            <FormLabel className="text-base-semibold text-light-2">
                                Name

                            </FormLabel>
                            <FormControl >
                                {/* //input field to add the profile photo */}
                                <Input
                                    //react hook works you get the value of the input field and set it to the value of the input field
                                    type='text'
                                    className='account-form_input no-focus'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className='flex flex-col w-full gap-3'>
                            <FormLabel className="text-base-semibold text-light-2">
                                Username

                            </FormLabel>
                            <FormControl >
                                {/* //input field to add the profile photo */}
                                <Input
                                    //react hook works you get the value of the input field and set it to the value of the input field
                                    type='text'
                                    className='account-form_input no-focus'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        //the flex-col is to make the form field to be in a column for the bio field as well as the other fields
                        <FormItem className='flex flex-col w-full gap-3'>
                            <FormLabel className="text-base-semibold text-light-2">
                                Bio
                            </FormLabel>
                            <FormControl >
                                {/* //input field to add the profile photo */}
                                <Textarea
                                    //react hook works you get the value of the input field and set it to the value of the input field
                                    rows={10}
                                    className='account-form_input no-focus'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className='bg-green-300'>Submit</Button>
            </form>
        </Form>
    )
}

export default AccountProfile; 