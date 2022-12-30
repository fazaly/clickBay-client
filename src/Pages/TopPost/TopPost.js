import { useQuery } from '@tanstack/react-query';
import React from 'react';
import TopPostInfo from './TopPostInfo';

const TopPost = () => {

    const { data:posts, isLoading = [] } = useQuery({
        queryKey: ['myMedia'],
        queryFn: async () => {
            const res = await fetch('https://social-media-platform-server.vercel.app/homePost')
            const data = await res.json()
            return data;
        }
    });

    if(isLoading){
        return <div className="w-6 h-6 mx-auto mt-10 border-4 rounded-full animate-spin border-red-600"></div>
    }

    return (
        <div>
            <div className='grid grid-cols-1 gap-8 mt-32 mb-10'>
            {
                posts.sort((a,b)=> b.postLike - a.postLike).map(data => <TopPostInfo
                    key={data._id}
                    data={data}
                ></TopPostInfo>)
            }
            </div>
        </div>
    );
};

export default TopPost;