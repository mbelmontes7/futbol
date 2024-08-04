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
        <article className="flex w-full flex-col rounded-xl bg-lime-100 p-7">
            <div className="flex items-start justify-between"></div>
            <div className="flex w-full flex-1 flex-grow gap-4"></div>
           {/* //this is the image of the user is going to be when the user post a comment on the social media */}
            <Link href={`/profile/${author.id}`} className='relative h-11 w-11'>
                <Image
                    src={author.image}
                    alt='user_community_image'
                    fill
                    className='cursor-pointer rounded-full'
                />
            </Link>



            <h2 className="text-small-regular text-black">
                {content}
            </h2>
        </article>
    )
}
export default ThreadCard;