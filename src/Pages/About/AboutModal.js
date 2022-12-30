import React from 'react';
import { toast } from 'react-hot-toast';

const AboutModal = ({about, setUpdate, refresh, setRefresh}) => {

    const {name, email, university, address, _id} = about;

    const handleAbout = event => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const university = form.university.value;
        const address = form.address.value;

        const about = {
            name,
            email,
            university,
            address
        }
        console.log(about);
        fetch(`https://social-media-platform-server.vercel.app/about/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(about)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.acknowledged){
                toast.success('About Info Updated!!!');
                setUpdate(null);
                setRefresh(!refresh)
            }
            else{
                toast.error(data.message);
            }
        })
    } 

    return (
        <>
            <input type="checkbox" id="about-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="about-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-[50px] text-center  font-bold text-[#3A4256] mb-10">All Information</h3>
                    <form onSubmit={handleAbout} className='grid grid-cols-1 gap-6'>
                        <input type="text" name='name' defaultValue={name} placeholder='Your Name'  className="input input-bordered w-full"/>
                        <input name='email' defaultValue={email} type="email" placeholder="Your Email" className="input input-bordered text-[#3A4256] w-full"/>
                        <input name='university' defaultValue={university} type="text" placeholder="University" className="input input-bordered text-[#3A4256] w-full"/>
                        <input name='address' defaultValue={address} type="text" placeholder="Address" className="input input-bordered text-[#3A4256] w-full"/>
                        <input className='w-full btn p-3 rounded-lg uppercase' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default AboutModal;