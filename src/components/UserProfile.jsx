import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { User, Edit, Save, X, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import TopLoader from "./TopLoader";
import { PLATFROMS_DATA } from "../../data/platfromsData";

const UserProfile = () => {
  const { user, token } = useAuth();
  const { batch } = useParams();
  const [profile, setProfile] = useState(null);
  const [restrictions, setRestrictions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [handles, setHandles] = useState({});
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [verificationError, setVerificationError] = useState(null);

  const [timeLeft, setTimeLeft] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  
  useEffect(() => {
  const endTime = new Date("2025-11-03T00:00:00");
  
  const timer = setInterval(() => {
    const diff = endTime - new Date();
    setTimeLeft(diff > 0 ? diff : 0);
    setIsDisabled(diff <= 0);
  }, 1000);

  return () => clearInterval(timer);
}, []);

  const formatTime = (ms) => {
    if (!ms) return "N/A";
    try{
      const totalSeconds = Math.floor(ms / 1000);
      const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
      const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
      const seconds = String(totalSeconds % 60).padStart(2, "0");
      return `${hours}:${minutes}:${seconds}`;
    }
    catch {
      return "Invalid timestamp";
    }
  };

  useEffect(() => {
    if (user && token) {
      fetchProfile();
    }
  }, [user, token]);

  const fetchProfile = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${apiUrl}/api/users/${batch}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data.user);

        // Ensure restrictions data is properly formatted
        if (data.restrictions) {
          const formattedRestrictions = {
            ...data.restrictions,
            nextHandleUpdate: data.restrictions.nextHandleUpdate
              ? new Date(data.restrictions.nextHandleUpdate)
              : null,
            nextScoreUpdate: data.restrictions.nextScoreUpdate
              ? new Date(data.restrictions.nextScoreUpdate)
              : null,
          };
          setRestrictions(formattedRestrictions);
        }

        setHandles({
          GeeksForGeeksHandle: data.user.GeeksForGeeksHandle || "",
          CodeforcesHandle: data.user.CodeforcesHandle || "",
          LeetCodeHandle: data.user.LeetCodeHandle || "",
          CodeChefHandle: data.user.CodeChefHandle || "",
          HackerRankHandle: data.user.HackerRankHandle || "",
        });
      } else {
        setError("Failed to fetch profile");
      }
    } catch (error) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateHandles = async () => {
    // Check if all usernames are entered
    const requiredPlatforms = ['GeeksForGeeksHandle', 'CodeforcesHandle', 'LeetCodeHandle', 'CodeChefHandle'];
    const missingPlatforms = requiredPlatforms.filter(platform => !handles[platform] || !handles[platform].trim());

    if (missingPlatforms.length > 0) {
      const platformNames = {
        'GeeksForGeeksHandle': 'GeeksforGeeks',
        'CodeforcesHandle': 'Codeforces',
        'LeetCodeHandle': 'LeetCode',
        'CodeChefHandle': 'CodeChef'
      };
      const missingNames = missingPlatforms.map(p => platformNames[p]).join(', ');
      setError(`
        Please enter usernames for all platforms. 
        Missing: 
        ${missingNames}`);
      return;
    }

    setUpdating(true);
    setError("");
    setSuccess("");
    setVerificationError(null);

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(
        `${apiUrl}/api/users/${batch}/update-handles`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ handles }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message || "Handles updated and verified as CMRIT student successfully!");
        setEditing(false);
        fetchProfile(); // Refresh profile data
      } else if (response.status === 422) {
        setVerificationError({
          message: data.message || data.error,
          details: data.details || {},
          nonExistentUsers: data.details?.nonExistentUsers || [],
          notVerifiedPlatforms: data.details?.notVerifiedPlatforms || [],
          summary: data.details?.summary || {}
        });
      } else if (response.status === 503 || response.status === 429) {
        // Service temporarily unavailable or rate limited
        const retryMessage = data.retryAfterMinutes
          ? `Please try again in about ${data.retryAfterMinutes} minutes.`
          : "Please try again in a few minutes.";
        setError(`${data.error} ${retryMessage}`);
      } else {
        setError(data.error || data.message || "Failed to update handles");
      }
    } catch (error) {
      setError("Network error");
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setError("");
    setSuccess("");
    setVerificationError(null);
    // Reset handles to current values
    if (profile) {
      setHandles({
        GeeksForGeeksHandle: profile.GeeksForGeeksHandle || "",
        CodeforcesHandle: profile.CodeforcesHandle || "",
        LeetCodeHandle: profile.LeetCodeHandle || "",
        CodeChefHandle: profile.CodeChefHandle || "",
        HackerRankHandle: profile.HackerRankHandle || "",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen w-full bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-red-500 mb-4">Failed to load profile</p>
          <button
            onClick={fetchProfile}
            className="cursor-pointer bg-zinc-900 px-5 xl:py-2 py-1 rounded-lg hover:bg-zinc-950 transition-all duration-300 border border-zinc-800"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <TopLoader isVisible={updating} />
      <Navbar />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-5">
        <div className="max-w-4xl mx-auto px-4 mt-20">
          {/* Header */}
          <div className="backdrop-blur-sm bg-zinc-900/60 border-[1.5px] border-zinc-800 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                {profile.picture ? (
                  <img
                    src={profile.picture}
                    alt={`Profile picture of ${profile.name || profile.Handle}`}
                    className="w-16 h-16 rounded-full"
                  />
                ) : (
                  <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-zinc-500" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                    <h1 className="text-lg sm:text-xl font-bold text-white truncate min-w-0">
                      <span className="hidden sm:inline">
                        {(profile.name || profile.Handle).length > 25
                          ? `${(profile.name || profile.Handle).substring(0, 25)}...`
                          : (profile.name || profile.Handle)
                        }
                      </span>
                      <span className="inline sm:hidden">
                        {(profile.name || profile.Handle).length > 15
                          ? `${(profile.name || profile.Handle).substring(0, 15)}...`
                          : (profile.name || profile.Handle)
                        }
                      </span>
                    </h1>
                    {profile.isHandlesVerified && (
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                    Roll Number: {profile.Handle}
                  </p>
                </div>
              </div>
            </div>

            {/* Restrictions Info */}
            {restrictions && (
              <div className="flex flex-wrap items-center gap-4 px-3">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-zinc-500" />
                  <span className="text-md text-zinc-400">
                    Next Handle updates: NA
                  </span>
                </div>
                {!profile.isHandlesVerified && (
                  <div className="flex items-center font-semibold space-x-2 ">
                    <Clock className="w-5 h-5 text-red-500" />
                    <span className="text-md text-red-500">
                        {isDisabled
                        ? "Username Update window closed!"
                        : `Time left: ${formatTime(timeLeft)}`}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Handles Section */}
          <div className="backdrop-blur-sm bg-zinc-900/60 border-[1.5px] border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">
                Coding Platform Handles
              </h2>
              {!editing && restrictions?.canUpdateHandles === true && !isDisabled && (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-1 cursor-pointer bg-zinc-900 px-5 xl:py-2 py-2 rounded-lg hover:bg-zinc-950 transition-all duration-300 border border-zinc-800"
                >
                  <Edit className="w-4 h-4" />
                  <span className="hidden sm:inline">Edit Handles</span>
                  <span className="inline sm:hidden">Edit</span>
                </button>
              )}
              {editing && (
                <div className="flex items-center gap-2 flex-col xl:flex-row p-2">
                  <button
                    onClick={handleUpdateHandles}
                    disabled={updating}
                    className="flex items-center justify-center gap-1 cursor-pointer bg-zinc-900 px-5 xl:py-2 py-1 rounded-lg hover:bg-zinc-950 transition-all duration-300 border border-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={updating}
                    className="flex items-center gap-1 cursor-pointer bg-zinc-900 px-5 xl:py-2 py-1 rounded-lg hover:bg-zinc-950 transition-all duration-300 border border-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>

            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-300 px-3 sm:px-4 py-3 rounded-md mb-4">
                <div className="flex items-start sm:items-center gap-2">
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 sm:mt-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm sm:text-base break-words">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {updating && (
              <div className="bg-blue-900/50 border border-blue-700 text-blue-300 px-4 py-3 rounded-md mb-4 flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                <span>Verifying User Handles...</span>
              </div>
            )}

            {success && !updating && (
              <div className="bg-green-900/50 border border-green-700 text-green-300 px-3 sm:px-4 py-3 rounded-md mb-4 flex items-start sm:items-center gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 sm:mt-0" />
                <span className="text-sm sm:text-base break-words min-w-0">{success}</span>
              </div>
            )}

            {verificationError && (
              <div className="bg-red-900/50 border border-red-700 text-red-300 px-3 sm:px-4 py-3 rounded-md mb-4 space-y-3">
                <div className="flex items-start sm:items-center gap-2">
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 sm:mt-0" />
                  <span className="font-medium text-sm sm:text-base">Verification Failed</span>
                </div>

                {/* Usernames not found */}
                {verificationError.nonExistentUsers && verificationError.nonExistentUsers.length > 0 && (
                  <div>
                    <div className="font-medium text-sm mb-2">Usernames not found:</div>
                    <div className="flex flex-wrap gap-2">
                      {verificationError.nonExistentUsers.map((platform, index) => (
                        <span key={index} className="bg-red-700/50 px-2 py-1 rounded text-xs">
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {/* Usernames not verified */}
                {verificationError.notVerifiedPlatforms && verificationError.notVerifiedPlatforms.length > 0 && (
                  <div>
                    <div className="font-medium text-sm mb-2">Usernames not verified:</div>
                    <div className="flex flex-wrap gap-2">
                      {verificationError.notVerifiedPlatforms.map((platform, index) => (
                        <span key={index} className="bg-yellow-700/50 px-2 py-1 rounded text-xs">
                          {platform.platform}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className={`grid md:grid-cols-2 gap-6 transition-opacity duration-300 ${updating ? 'opacity-60 pointer-events-none' : ''}`}>
              {PLATFROMS_DATA && PLATFROMS_DATA.length > 0 ? PLATFROMS_DATA.map((platform) => (
                <div
                  key={platform.key}
                  className="p-1 rounded-xl bg-zinc-800/40 shadow-md border-[1.5px] border-zinc-200/10 hover:shadow-xl hover:border-zinc-300/20 hover:scale-105 transition-transform duration-300 ease-out cursor-pointer flex items-center justify-evenly gap-2 px-5"
                >
                  <div className="flex items-center justify-between ">
                    {/* Platform Logo */}
                    <div className="">
                      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-800/40 group-hover:bg-zinc-700/50 transition">
                        <img
                          src={platform.icon}
                          alt={platform.name}
                          className="w-6 h-6 invert"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Input / Handle */}
                  {editing ? (
                    <input
                      type="text"
                      value={handles[platform.key] || ""}
                      onChange={(e) =>
                        setHandles((prev) => ({
                          ...prev,
                          [platform.key]: e.target.value,
                        }))
                      }
                      placeholder={`Enter ${platform.name} handle`}
                      disabled={updating}
                      className="w-full px-3 py-2 border border-none rounded-lg text-white placeholder:text-zinc-400 focus:outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  ) : (
                    <p className="text-zinc-300 font-medium">
                      {profile[platform.key] || "Not set"}
                    </p>
                  )}
                </div>
              )) : (
                <div className="col-span-2 text-center text-zinc-400">
                  <p>No platforms data available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;