import React from "react";

export default function RepoDetailsModal({ repoData, onClose }) {
    if (!repoData) return <></>;

    // Function to copy text to clipboard
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard: " + text);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white max-w-lg w-full rounded-lg shadow-lg p-6 relative">
                {/* Close Button */}
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    ✖
                </button>

                {/* Repository Name */}
                <h2 className="text-2xl font-bold text-gray-900">{repoData.full_name}</h2>
                <p className="text-gray-600">{repoData.description || "No description available."}</p>

                {/* Repository Owner */}
                <div className="flex items-center mt-4 space-x-4">
                    <img
                        src={repoData?.owner?.avatar_url}
                        alt={repoData?.owner?.login}
                        className="w-12 h-12 rounded-full border"
                    />
                    <div>
                        <p className="font-semibold text-lg">{repoData?.owner?.login}</p>
                        <a
                            href={repoData?.owner?.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            View Profile
                        </a>
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-4 flex justify-between text-gray-700">
                    <p>⭐ <strong>{repoData.stargazers_count}</strong> Stars</p>
                    <p>🍴 <strong>{repoData.forks_count}</strong> Forks</p>
                    <p>👀 <strong>{repoData.watchers_count}</strong> Watchers</p>
                </div>

                {/* Additional Info */}
                <div className="mt-4 text-sm text-gray-600">
                    <p><strong>Language:</strong> {repoData.language || "Unknown"}</p>
                    <p><strong>Visibility:</strong> {repoData.visibility}</p>
                    <p><strong>Open Issues:</strong> {repoData.open_issues_count}</p>
                    <p><strong>Default Branch:</strong> {repoData.default_branch}</p>
                </div>

                {/* Clone URLs with Copy Buttons */}
                <div className="mt-4">
                    <p className="font-semibold">Clone Repository:</p>
                    <div className="flex items-center justify-between bg-gray-100 p-2 rounded mt-2">
                        <span className="text-sm text-gray-800 truncate">{repoData.clone_url}</span>
                        <button
                            className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
                            onClick={() => copyToClipboard(repoData.clone_url)}
                        >
                            Copy HTTPS
                        </button>
                    </div>

                    <div className="flex items-center justify-between bg-gray-100 p-2 rounded mt-2">
                        <span className="text-sm text-gray-800 truncate">{repoData.ssh_url}</span>
                        <button
                            className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
                            onClick={() => copyToClipboard(repoData.ssh_url)}
                        >
                            Copy SSH
                        </button>
                    </div>
                </div>

                {/* GitHub Link */}
                <div className="mt-6">
                    <a
                        href={repoData.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        View on GitHub
                    </a>
                </div>
            </div>
        </div>
    );
}