"use client"

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserValidation } from '@/lib/validations/user';
import * as z from 'zod';
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

// Define the props interface for the AccountProfile component
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
                fieldChange(imageDataUrl);
            };

            fileReader.readAsDataURL(file);
        }
    };

    //function to handle the form submission and validate the form is coming from the file 
    const onSubmit = async (values: z.infer<typeof UserValidation>) => {
        const blob = values.profile_photo;
    }


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
                        </FormItem>
                    )}
                />
                <Button type="submit" className='bg-green-300'>Submit</Button>
            </form>
        </Form>
    )
}

export default AccountProfile; 