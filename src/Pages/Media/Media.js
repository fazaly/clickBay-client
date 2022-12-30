import { useQuery } from '@tanstack/react-query';
import React from 'react';
import MediaInfo from './MediaInfo';

const Media = () => {

    const { data:posts, isLoading, refetch = [] } = useQuery({
        queryKey: ['myMedia'],
        queryFn: async () => {
            const res = await fetch('https://social-media-platform-server.vercel.app/myMedia')
            const data = await res.json()
            return data;
        }
    })

    if(isLoading){
        return <div className="w-6 h-6 mx-auto mt-10 border-4 rounded-full animate-spin border-red-600"></div>
    }

    return (
        <div>
            <div className='grid grid-cols-1 gap-10 mt-10 mb-10'>
                {
                    posts.sort((a,b)=> b.time - a.time).map( post => <MediaInfo
                        key={post._id}
                        post={post}
                        refetch={refetch}
                    ></MediaInfo>)
                }
            </div>
        </div>
    );
};

export default Media;