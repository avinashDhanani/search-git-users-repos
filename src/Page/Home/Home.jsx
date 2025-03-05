import { useState } from "react";
import { Search } from "lucide-react"; // Icon for better UX
import axios from "axios";
import { useNavigate } from "react-router-dom";
// https://api.github.com/orgs/airbnb/repos
// https://api.github.com/users/avinashDhanani/repos
// https://api.github.com/orgs/airbnb/repos

export default function GitHubSearchBar() {
    const [owner, setOwner] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSearch = async () => {
        try {

            localStorage.setItem("accountdetails", JSON.stringify({}));
            if (!owner.trim()) return;
            let orgDetails = null;
            let userDetails = null;
            try {
                orgDetails = await axios.get(`https://api.github.com/orgs/${owner}`)
            } catch (error) { }
            try {
                userDetails = await axios.get(`https://api.github.com/users/${owner}`)
            } catch (error) { }

            let accountDetails = {}
            if (!orgDetails?.data && !userDetails?.data) {
                setError("user or organization with this name not found")
                return;
            }
            if (orgDetails?.data) {
                accountDetails = orgDetails?.data;
            } else if (userDetails?.data) {
                accountDetails = userDetails?.data;
            }

            localStorage.setItem("accountdetails", JSON.stringify(accountDetails));
            navigate("/repositorylist")
        } catch (error) {
            localStorage.setItem("accountdetails", JSON.stringify({}));
            console.log("error :: ", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r">
            <div className="bg-gray bg-opacity-10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-lg border border-white/20">
                <h2 className="text-2xl font-bold text-white text-center mb-6">
                    GitHub Owner Search
                </h2>
                <div className="flex items-center bg-white rounded-full shadow-md overflow-hidden">
                    <input
                        type="text"
                        placeholder="Enter GitHub username..."
                        className="w-full px-5 py-3 text-gray-800 border-none focus:outline-none rounded-l-full"
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                    />
                    <button
                        className={`${owner ? "bg-blue-600" : "bg-blue-500"} ${owner ? "hover:bg-blue-700" : "hover:bg-blue-500"} text-white px-5 py-3 rounded-r-full flex items-center gap-2 transition-all duration-300`}
                        onClick={handleSearch}
                        value={owner}
                        disable={true}
                    >
                        <Search size={18} /> Search
                    </button>
                </div>

                {error && <span className="text-red mx-3 text-red-300">{error}</span>}
            </div>
        </div>
    );
}