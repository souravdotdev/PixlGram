/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, type ReactNode } from "react";

interface User {
    id: string;
    username: string;
    email: string;
    profileImage?: string;
    bio?: string;
}

interface Post {
    _id: string;
    caption: string;
    imgUrl: string;
    userId: User; // This will be populated by the backend
    createdAt?: string;
    updatedAt?: string;
    isLiked?: boolean;
}

interface PostContextType{
    post: Post | null,
    feed: Post[] | null
    loading: boolean
    setPost: (post: Post | null) => void
    setFeed: (feed: Post[] | null) => void
    setLoading: (loading: boolean) => void
}

const postContext = createContext<PostContextType | undefined>(undefined);

export default function PostProvider ({children}: {children: ReactNode}) {

    const [loading, setLoading] = useState<boolean>(false);
    const [post, setPost] = useState<Post| null>(null);
    const [feed, setFeed] = useState<Post[] | null>(null);


    return(
        <postContext.Provider value={{loading, setLoading, post, setPost, feed, setFeed}}>
            {children}
        </postContext.Provider>
    )
}

export {postContext}