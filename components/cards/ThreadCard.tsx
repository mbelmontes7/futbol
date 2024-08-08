import Image from "next/image";
import Link from "next/link";


import { Content } from "next/font/google";

interface Props {
    id: string;
    currentUserId: string;
    parentId: string | null;
    content: string;
    author: {
        name: string;
        image: string;
        id: string;
    };
    community: {
        id: string;
        name: string;
        image: string;
    } | null;
    createdAt: string;
    comments: {
        author: {

            image: string;
        };
    }[];
    isComment?: boolean;
}

const ThreadCard = ({
    id,
    currentUserId,
    parentId,
    content,
    author,
    community,
    createdAt,
    comments,
    isComment,
}: Props) => {
    return (
        <article
            className={`flex w-full flex-col rounded-xl ${isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
                }`}
        >
            <div className='flex items-start justify-between'>
                <div className='flex w-full flex-1 flex-row gap-4'>
                    <div className='flex flex-col items-center'>
                        <Link href={`/profile/${author.id}`} className='relative h-11 w-11'>
                            <Image
                                src={author.image}
                                alt='user_community_image'
                                fill
                                className='cursor-pointer rounded-full'
                            />
                        </Link>

                        <div className='thread-card_bar' />
                        {/* this div provides the line on the name*/}
                    </div>

                    <div className='flex w-full flex-col'>
                        <Link href={`/profile/${author.id}`} className='w-fit'>
                            <h4 className='cursor-pointer text-base-semibold text-light-1'>
                                {/* {author.name} */}
                            </h4>
                        </Link>



                        <div className='flex w-full flex-col'>
                            {/* this is the user uname of the bottom of the comment  */}
                            <Link href={`/profile/${author.id}`} className='w-fit'>
                                {/* //to make it appear on the screen */}
                                <h4 className='cursor-pointer text-base-medium text-green-100 m-1'>
                                    {author.name}
                                </h4>
                            </Link>
                        </div>
                        {/* //Render the content of the post */}
                        <p className='mt-2 text-body-semibold text-green-200'>{content}</p>

                        {/* //Render the community image  here are all my icons for the app that it can see the user */}
                        <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>
                            {/* //social media icons for the user to interact with the post */}
                            <div className='flex gap-3.5'>
                                <Image
                                    src='/assets/heart-gray.svg'
                                    alt='heart'
                                    width={24}
                                    height={24}
                                    className='cursor-pointer object-contain'
                                />
                                {/* //this is the reply icon for the user to reply to the post and the only one that is going to be working right now */}
                                <Link href={`/thread/${id}`}>
                                    <Image
                                        src='/assets/reply.svg'
                                        alt='heart'
                                        width={24}
                                        height={24}
                                        className='cursor-pointer object-contain'
                                    />
                                </Link>
                                <Image
                                    src='/assets/repost.svg'
                                    alt='heart'
                                    width={24}
                                    height={24}
                                    className='cursor-pointer object-contain'
                                />
                                <Image
                                    src='/assets/share.svg'
                                    alt='heart'
                                    width={24}
                                    height={24}
                                    className='cursor-pointer object-contain'
                                />
                                {/* // part of the comment section for a user. It conditionally renders a link to the post  if there are comments to */}
                                {isComment && comments.length > 0 && (
                                    <Link href={`/thread/${id}`}>
                                        <p className='mt-1 text-subtle-medium text-gray-1'>
                                            {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                                        </p>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>















        </article>
    )
}
export default ThreadCard;