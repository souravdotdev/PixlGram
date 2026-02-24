
interface User {
  id: string;
  username: string;
  email: string;
  profileImage?: string;
  bio?: string;
}

interface PostData {
  _id: string;
  caption: string;
  imgUrl: string;
  userId: User; // Changed from string to User object (populated)
  createdAt?: string;
  updatedAt?: string;
  isLiked?: boolean;
}

interface PostProps {
  user: User;
  post: PostData;
}

const Post = ({user, post}: PostProps) => {
  return (
    <div className='p-10 flex flex-col gap-4'>
        <div className="top flex items-center gap-3">
            <div className='w-16 h-16 bg-conic from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-full'>
                <img className=' w-full h-full rounded-full object-cover object-center p-1' src={user.profileImage} alt="" />
            </div>
            <h2 className='text-white text-lg'>{user.username}</h2>
        </div>
        <div className="middle">
            <div className='h-150 w-full bg-[#1A1A1A]'>
                <img className='h-full w-full object-contain object-center' src={post.imgUrl} alt="" />
            </div>
        </div>
        <div className="bottom flex flex-col gap-3">
            <div className='icons flex justify-between'>
                <div className="left flex gap-3">
                    <button><i className="ri-heart-line text-white text-3xl"></i></button>
                    <button><i className="ri-chat-1-line text-white text-3xl"></i></button>
                    <button><i className="ri-share-forward-line text-white text-3xl"></i></button>
                </div>
                <div className="right">
                    <button><i className="ri-bookmark-line text-white text-3xl"></i></button>
                </div>
            </div>
            <div className='description'>
                <p className='text-white font-light'>{post.caption}</p>
            </div>
        </div>
    </div>
  )
}

export default Post