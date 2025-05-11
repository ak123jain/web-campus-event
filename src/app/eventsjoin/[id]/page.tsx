 "use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

const Page = () => {
    const { id } = useParams();
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const handleClick = async () => {
        console.log("clicked");

        try {
            const token = localStorage.getItem("accessToken");
            console.log("token", token);

            const response = await axios.post(
                `http://localhost:8000/event/joinevent/${id}`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            console.log("response here", response.data);

            if (response.data.message === 'Event joined') {
                console.log("User joined the event successfully");
                setMessage("Event booked successfully!");
                setIsSuccess(true);
            }

        } catch (error) {
            console.error("Error creating admin:", error);
            setMessage("Error joining event");
            setIsSuccess(false);
        }
    };

    useEffect(() => {
        handleClick();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
                {isSuccess ? (
                    <div className="flex flex-col items-center space-y-4">
                        <CheckCircle className="w-16 h-16 text-green-500" />
                        <h1 className="text-2xl font-semibold text-green-600">
                            {message}
                        </h1>
                        <p className="text-gray-600">
                            Your spot has been reserved.
                        </p>
                         <button 
                            onClick={() => window.location.href = '/events'}
                            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                        >
                            View All Events
                        </button>
                    </div>
                ) : (
                    <h1 className="text-2xl font-semibold text-center">
                        {message}
                    </h1>
                )}
            </div>
        </div>
    );
};

export default Page;