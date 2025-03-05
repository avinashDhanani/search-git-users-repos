import React from "react";

export default function OwnerDetails({ ownerData }) {
    if (!ownerData) return <p className="text-center text-gray-500">No owner data available.</p>;

    return (
        <div className=" mx-auto bg-white shadow-md rounded-lg p-6 flex items-center space-x-6">
            {/* Avatar */}
            <img
                src={ownerData.avatar_url}
                alt="Avatar"
                className="w-28 h-28 rounded-full border-2 border-gray-300"
            />

            {/* Owner Info */}
            <div className="flex-1">
                <h2 className="text-2xl font-semibold">{ownerData.name || ownerData.login}</h2>
                <p className="text-gray-500">@{ownerData.login}</p>
                {ownerData.bio && <p className="text-gray-700 mt-2">{ownerData.bio}</p>}

                {/* Social Stats */}
                <div className="mt-3 flex space-x-6 text-gray-700">
                    <p><span className="font-bold">{ownerData.public_repos}</span> Repos</p>
                    <p><span className="font-bold">{ownerData.followers}</span> Followers</p>
                    <p><span className="font-bold">{ownerData.following}</span> Following</p>
                </div>


            </div>
            {/* Links */}
            <div className="mt-4">
                <a
                    href={ownerData.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                    View on GitHub
                </a>
            </div>
        </div>
    );
}