import { useState, useEffect, useMemo } from "react";
import { ArrowDownAZ, Star, CalendarClock } from "lucide-react";
import OwnerDetails from "../../component/OwnerDetails/OwnerDetails";
import RepoDetailsModal from "../../component/RepoDetailsModal/RepoDetailsModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const URLENDPOINT = "https://api.github.com";

export default function RepositoryList() {

    const navigate = useNavigate();

    const [ownerDetail, setOwnerDetail] = useState(null);
    const [reposDetail, setReposDetail] = useState([]);

    useEffect(() => {
        const accountdetails = JSON.parse(localStorage.getItem("accountdetails"));
        if (!accountdetails?.type) navigate("/");
        (async () => {
            try {
                let tempOwner = await fetchDetails(accountdetails, "owner");
                if (tempOwner) setOwnerDetail(tempOwner);

                let tempRepos = await fetchDetails(accountdetails, "repos");
                if (tempRepos) setReposDetail(tempRepos);
            } catch (error) {
                console.log("error :: ", error);
            }
        })();
    }, [])

    async function fetchDetails(ownerParams, type = "repos") {
        try {
            let endPoint = URLENDPOINT;
            if (ownerParams?.type == "Organization") {
                endPoint += "/orgs"
            } else if (ownerParams?.type == "User") {
                endPoint += "/users"
            }
            endPoint += "/" + ownerParams?.login;
            switch (type) {
                case "repos":
                    endPoint += "/repos";
                    break;
            }
            console.log("endPoint :: ", endPoint);
            let data = await axios.get(endPoint);
            console.log("data.data :: ", data.data);
            if (data.data) {
                return data.data;
            }
        } catch (error) {
            return null;
        }
    }

    const [repos, setRepos] = useState([]);
    const [search, setSearch] = useState("");
    const [sortType, setSortType] = useState("");
    const [selectedRepo, setSelectedRepo] = useState(null);

    useEffect(() => {
        try {
            let filteredRepos = reposDetail.filter((repo) =>
                repo?.name?.toLowerCase()?.includes(search.toLowerCase()) ? true : false
            );

            if (sortType === "name") {
                filteredRepos.sort((a, b) => a.name.localeCompare(b.name));
            } else if (sortType === "stars") {
                filteredRepos.sort((a, b) => b.stars - a.stars);
            } else if (sortType === "updated") {
                filteredRepos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
            }
            console.log("filteredRepos :: ", filteredRepos);

            setRepos(filteredRepos);

        } catch (error) {

        }
    }, [search, sortType, reposDetail]);

    return (
        <div className="min-h-screen bg-gray p-6">
            {/* Back Button */}
            <button
                onClick={() => navigate("/")} // Go back to previous page
                className="mb-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
                ← Back
            </button>

            {/* Owner Info */}

            <OwnerDetails ownerData={ownerDetail} />

            {/* Search & Sorting */}
            <div className="flex flex-wrap gap-4 my-4">
                <input
                    type="text"
                    placeholder="Search repository..."
                    className="px-4 py-2 w-full sm:w-auto border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
                    onChange={(e) => setSortType(e.target.value)}
                >
                    <option value="">Sort By</option>
                    <option value="name">Name (A-Z)</option>
                    <option value="stars">Stars (High to Low)</option>
                    <option value="updated">Last Updated</option>
                </select>
            </div>

            {/* Repository List */}
            <div className="grid gap-4">
                {repos.length > 0 ? (
                    repos.map((repo) => (
                        <div key={repo.id} className="bg-white p-4 rounded-lg shadow-md">
                            <h3 className="text-lg text-gray-600 font-semibold">{repo.name}</h3>
                            <p className="text-gray-600">{repo.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                <span className="font-medium">Language:</span> {repo.language || "-"}
                                {/* <span className="font-medium">License:</span> {repo?.license || "-"} */}
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                    <Star size={16} /> {repo.stars || 0}
                                </div>
                                <div className="flex items-center gap-1">
                                    <CalendarClock size={16} /> {repo?.updated_at ? new Date(repo.updated_at).toDateString() : "-"}
                                </div>
                            </div>
                            <button
                                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                                onClick={() => setSelectedRepo(repo)}
                            >
                                View Details
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No repositories found.</p>
                )}
            </div>
            {selectedRepo &&
                <RepoDetailsModal
                    repoData={selectedRepo}
                    onClose={() => setSelectedRepo(null)}
                />}

        </div>
    );
}