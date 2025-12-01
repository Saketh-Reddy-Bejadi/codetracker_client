import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { SearchX } from "lucide-react";
import Attributes from "./Attributes";
import StudentData from "./StudentData";
import SkeletonLoader from "./SkeletonLoader";
import TopLoader from "./TopLoader";
import { fetchUsers, fetchScrapingStats } from "../services/api";
import { useDebounce } from "../hooks/useDebounce";

const Leaderboard = () => {
  const { batch } = useParams();
  const [showDetails, setShowDetails] = useState(false);
  const [search, setSearch] = useState("");
  const [scrapingStats, setScrapingStats] = useState(null);
  const [allData, setAllData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const debouncedSearch = useDebounce(search, 400);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchUsers(batch);
      const stats = await fetchScrapingStats(batch);
      setScrapingStats(stats);

      const users = response.users;
      setAllData(users);

      setDisplayedData(users.slice(0, 200));
      setLoading(false);

      if (users.length > 300) {
        for (let i = 200; i < users.length; i += 200) {
          setTimeout(() => {
            setDisplayedData((prev) => [...prev, ...users.slice(i, i + 200)]);
          }, (i / 200) * 50);
        }
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [batch]);

  useEffect(() => {
    if (batch) {
      loadData();
    }
  }, [batch, loadData]);

  const filteredData = useMemo(() => {
    if (!debouncedSearch.trim()) {
      return displayedData;
    }

    const searchTerm = debouncedSearch.trim().toLowerCase();
    return allData.filter((user) => {
      return user.searchString?.includes(searchTerm);
    });
  }, [allData, displayedData, debouncedSearch]);

  const finalData = debouncedSearch.trim() ? filteredData : displayedData;

  const handleSearchChange = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  if (loading) {
    return (
      <>
        <TopLoader isVisible={loading} />
        <div className="overflow-hidden">
          {/* Mobile Layout */}
          <div className="md:hidden p-4 bg-black border-b border-zinc-800">
            <div className="flex flex-col space-y-4">
              <div className="text-zinc-400 text-md text-center">
                <div className="h-4 w-32 bg-zinc-700 rounded mx-auto animate-pulse"></div>
              </div>
              <input
                type="text"
                className="w-full p-2 rounded bg-zinc-900 text-white placeholder-zinc-400 outline-none"
                placeholder="Search by roll number or any handle..."
                value={search}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          {/* Desktop/Tablet Layout */}
          <div className="hidden md:flex p-4 bg-black border-b border-zinc-800">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-4 flex-1">
                <input
                  type="text"
                  className="p-2 rounded bg-zinc-900 text-white placeholder-zinc-400 outline-none flex-1"
                  placeholder="Search by roll number or any handle..."
                  value={search}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="text-zinc-400 text-md ml-4 whitespace-nowrap">
                <div className="h-4 w-32 bg-zinc-700 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="max-h-[calc(100vh-80px)] text-black overflow-y-auto border border-zinc-800">
            <table className="min-w-full table-auto border border-zinc-800 text-white">
              <Attributes
                showDetails={showDetails}
                setShowDetails={setShowDetails}
                loading={loading}
                setLoading={setLoading}
              />
              <SkeletonLoader showDetails={showDetails} />
            </table>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <>
      <TopLoader isVisible={false} />
      <div className="overflow-hidden select-none">
        {/* Mobile Layout */}
        <div className="md:hidden p-4 bg-black border-b border-zinc-800">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row items-center justify-center">
              {scrapingStats && (
                <div className="text-zinc-400 text-md">
                  Last updated: {formatTimestamp(scrapingStats.lastScraped)}
                </div>
              )}
            </div>
            <input
              type="text"
              className="w-full p-2 rounded bg-zinc-900 text-white placeholder-zinc-400 outline-none"
              placeholder="Search by roll number or any handle..."
              value={search}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Desktop/Tablet Layout */}
        <div className="hidden md:flex p-4 bg-black border-b border-zinc-800">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-4 flex-1">
              <input
                type="text"
                className="search-input p-2 rounded bg-zinc-900 text-white placeholder-zinc-400 outline-none flex-1"
                placeholder="Search by roll number or any handle..."
                value={search}
                onChange={handleSearchChange}
              />
            </div>
            {scrapingStats && (
              <div className="text-zinc-400 text-md ml-4 whitespace-nowrap">
                Last updated: {formatTimestamp(scrapingStats.lastScraped)}
              </div>
            )}
          </div>
        </div>

        <div className="leaderboard-container max-h-[calc(100vh-80px)] text-black overflow-y-auto border border-zinc-800">
          <table className="leaderboard-table min-w-full table-auto border border-zinc-800 text-white">
            <Attributes
              showDetails={showDetails}
              setShowDetails={setShowDetails}
              loading={loading}
              setLoading={setLoading}
            />
            {loading ? (
              <SkeletonLoader showDetails={showDetails} />
            ) : finalData.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={showDetails ? 18 : 8} className="py-8 px-4">
                    <div className="flex items-center gap-4 text-zinc-400 bg-zinc-900/50 rounded-lg p-6 border border-zinc-800">
                      <SearchX className="w-8 h-8 text-zinc-500 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="text-lg font-semibold text-zinc-300 mb-2">
                          No Results Found
                        </div>
                        <div className="text-sm text-zinc-500">
                          {search.trim() ? (
                            <>
                              No students found matching "
                              <span className="text-zinc-300 font-medium">
                                {search.trim()}
                              </span>
                              ". Try searching with a different roll number or
                              handle.
                            </>
                          ) : (
                            "No student data available for this batch."
                          )}
                        </div>
                        {search.trim() && (
                          <button
                            onClick={() => setSearch("")}
                            className="mt-3 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white text-sm rounded transition-colors duration-200"
                          >
                            Clear Search
                          </button>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            ) : (
              <StudentData
                data={finalData}
                showDetails={showDetails}
                setShowDetails={setShowDetails}
                showSerialNumber={true}
              />
            )}
          </table>
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
