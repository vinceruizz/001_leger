import React from 'react';

function AboutCard({ title, message, imageUrl, imageAlt }) {
    return (
        <div className='my-24 flex flex-col items-center'>
            <div className='bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-2xl text-gray-800 flex flex-col items-center'>
                <img src={imageUrl} alt={imageAlt} className="w-1/3 mb-4 rounded-lg shadow-lg"/>
                <h2 className='text-3xl font-bold mb-4 text-center'>{title}</h2>
                <p className='text-lg leading-relaxed text-center'>{message}</p>
            </div>
        </div>
    );
}
export default AboutCard;