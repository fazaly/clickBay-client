import { useQuery } from '@tanstack/react-query';
import React from 'react';
import MediaInfo from './MediaInfo';

const Media = () => {

    const { data:posts = [] } = useQuery({
        queryKey: ['myMedia'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/myMedia')
            const data = await res.json()
            return data;
        }
    })

    return (
        <div>
            <div className='grid grid-cols-1 gap-10 mt-10 mb-10'>
                {
                    posts.map( post => <MediaInfo
                        key={post._id}
                        post={post}
                    ></MediaInfo>)
                }
            </div>
        </div>
    );
};

export default Media;