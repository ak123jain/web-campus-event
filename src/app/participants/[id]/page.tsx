 "use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";

const ParticipantsPage = () => {
  const { id } = useParams();
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/event/getallparticipants/${id}`
        );
        const event = response.data.data;
        console.log("Participants:", event.participant);
        setParticipants(event.participant);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };

    if (id) fetchParticipants();
  }, [id]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Participants</h1>
      {participants.length === 0 ? (
        <p className="text-gray-500">No participants found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {participants.map((user: any) => (
            <div
              key={user._id}
              className="border rounded-xl shadow-sm hover:shadow-md p-4 bg-white transition"
            >
              {/* Avatar */}
              <div className="flex items-center space-x-4 mb-4">
                <Image
                  src={user.avatar?.startsWith("http") ? user.avatar.replace("http://", "https://") : "/default-avatar.png"}
                  alt={user.fullname}
                  width={60}
                  height={60}
                  className="rounded-full object-cover"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {user.fullname}
                  </h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Mobile:</strong> {user.mobile}</p>
                <p><strong>Role:</strong> {user.Role}</p>
                {user.bio && <p><strong>Bio:</strong> {user.bio}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ParticipantsPage;
