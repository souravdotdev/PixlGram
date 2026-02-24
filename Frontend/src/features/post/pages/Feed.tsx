import { useEffect } from "react";
import Post from "../components/Post"
import { usePost } from "../hooks/usePost"

const Feed = () => {

    const {loading, feed, handleGetFeed} = usePost();

    useEffect(()=>{
        handleGetFeed();
    },[])

    if(loading || !feed){
        return(
            <main>
                <h1>Loading Feed...</h1>
            </main>
        )
    }
  return (
    <div className="h-screen w-ful">
        <div className="feed m-auto w-160 h-full">
            {feed.map((post, index)=>{
                return <Post key={post._id || index} user={post.userId} post={post} />
            })}
        </div>
    </div>
  )
}

export default Feed