import { useContext } from "react";
import { postContext } from "../store/postContext";
import { showFeed } from "../services/postApi";

export function usePost(){
    const context = useContext(postContext);

    if(context == undefined){
        throw new Error("usePost must be within a Post Provider");
    }

    const {loading, setLoading, post, feed, setFeed} = context

   async function handleGetFeed(){
        setLoading(true);
        const response = await showFeed();
        setFeed(response.posts);
        setLoading(false);
    }

    return {handleGetFeed, loading, feed, post}
}