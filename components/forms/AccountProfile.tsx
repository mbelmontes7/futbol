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
import { ChangeEvent } from 'react';

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
    //initialize the form using the useForm hook
    const form = useForm({
        resolver: zodResolver(UserValidation),
        defaultValues: {
            profile_photo: '',
            name: '',
            username: '',
            bio: '',
        },
    });
    //is a custom function to handle image upload. It updates the form state when a new image is selected.
    const handleImage = (e: ChangeEvent, fieldChange: (value: string) => void) => {
        //to update the form state with the new value of the input field.
        e.preventDefault();
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
                    name="profile_photo"
                    render={({ field }) => (
                        <FormItem className='flex items-center gap-4'>
                            <FormLabel className="account-form-image-label">
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
                        <FormItem className='flex items-center gap-3 w-full'>
                            <FormLabel className="text-base-semibold text-light-2">
                                Name

                            </FormLabel>
                            <FormControl className='flex-1 text-base-semibold text-gray-200'>
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
                        <FormItem className='flex items-center gap-3 w-full'>
                            <FormLabel className="text-base-semibold text-light-2">
                                username

                            </FormLabel>
                            <FormControl className='flex-1 text-base-semibold text-gray-200'>
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
                        <FormItem className='flex items-center gap-3 w-full'>
                            <FormLabel className="text-base-semibold text-light-2">
                                Bio

                            </FormLabel>
                            <FormControl className='flex-1 text-base-semibold text-gray-200'>
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