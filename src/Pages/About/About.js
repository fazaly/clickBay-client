import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import AboutModal from './AboutModal';

const About = () => {

    const [about, setAbout] = useState({})
    const [update, setUpdate] = useState(null);
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        fetch('http://localhost:5000/about')
        .then( res => res.json())
        .then( data => {
            // console.log(data);
            setAbout(data[0])
        })
    }, [refresh])

    return (
        <div>
            <section className="bg-gray-800 text-white">
                <div className="container max-w-5xl px-4 py-12 mx-auto">
                    <div className='text-end'>
                        <label onClick={() => setUpdate(about)} htmlFor="about-modal" className='btn btn-md'>Edit</label>
                    </div>
                    <div className="grid gap-4 mx-4 sm:grid-cols-12">
                        <div className="col-span-12 sm:col-span-3">
                            <div className="text-center sm:text-left mb-14 before:block before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0 before:bg-violet-400">
                                <h3 className="text-2xl font-semibold">{about.name}</h3>
                                <span className="text-sm font-bold tracking-wider uppercase text-gray-400">Front-End Developer</span>
                            </div>
                        </div>
                        <div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
                            <div className="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:bg-gray-700">
                                <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-violet-400">
                                    <h3 className="text-xl font-semibold tracking-wide">Email</h3>
                                    <p className="mt-3">{about.email}</p>
                                </div>
                                <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-violet-400">
                                    <h3 className="text-xl font-semibold tracking-wide">University</h3>
                                    <p className="mt-3">{about.university}</p>
                                </div>
                                <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-violet-400">
                                    <h3 className="text-xl font-semibold tracking-wide">Address</h3>
                                    <p className="mt-3">{about.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {
                update &&
                <AboutModal
                about={about}
                setUpdate={setUpdate}
                refresh={refresh}
                setRefresh={setRefresh}
            ></AboutModal>
            }
        </div>
    );
};

export default About;