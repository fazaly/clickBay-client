import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';

const Home = () => {

	const {user} = useContext(AuthContext);

	const imageHostKey = process.env.REACT_APP_imgbb_key;
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const name = user?.displayName || 'Please Register Now'
        const email = user?.email || 'Invalid Email'
        const message = e.target.message.value;
        const image = e.target.img.files[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then((imgData) => {
                if (imgData.success) {
                    console.log(imgData.data.url);
                    const addPost = {
                        userName: name,
                        email,
                        message,
                        image: imgData.data.url
                    }
                    console.log(addPost);
                    fetch('http://localhost:5000/addPost', {
                        method: "POST",
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(addPost)
                    })
                    .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged && user?.email) {
                                toast.success('Data has been Posted Successfully')
                            }
                            else {
                                toast.error('Please first Log in')
                                // navigate('/login')
                                return
                            }
                        })
                }
            })
    }

    return (
        <section className="p-6 bg-gray-800 text-white">
			<form onSubmit={handleSubmit} action="" className="container flex flex-col mx-auto  ng-untouched ng-pristine ng-valid">
				<fieldset className="grid grid-cols-6 gap-6 p-6 rounded-md shadow-sm bg-gray-900">
					<div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-6">
						<div className="col-span-full">
							<label htmlFor='message' className="text-sm">Message</label>
							<textarea placeholder="Place Your Message" name='message' className="w-full p-5 rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"></textarea>
						</div>
						<div className="col-span-full sm:col-span-3">
							<input type="file" name="img" className="w-full rounded-lg focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-white" />
						</div>
					</div>
					<div>
						<button type='submit' className='btn btn-md px-6'>Submit</button>
					</div>
				</fieldset>
			</form>
		</section>
    );
};

export default Home;