import React from 'react';
import { Link } from 'react-router-dom';
import img from '../../../assets/404 Error.gif'

const ErrorPage = () => {
    return (
        <section className="flex items-center h-screen bg-gray-900 text-white">
            <div className="container flex flex-col items-center justify-center mx-auto">
                <div className="max-w-md text-center">
                    <img className='border rounded-lg' src={img} alt="" />
                    <p className="text-2xl mt-4 font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
                    <p className="mt-4 mb-8 text-white">But don't worry, you can find plenty of other things on our homepage.</p>
                    <Link to='/' className='btn'>Back to homepage</Link>
                </div>
            </div>
        </section>
    );
};

export default ErrorPage;