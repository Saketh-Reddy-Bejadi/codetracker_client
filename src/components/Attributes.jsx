import { IoMdMore } from "react-icons/io";
import { Link } from "react-router-dom";
import { Info } from "lucide-react";

const Attributes = ({ showDetails, setShowDetails, setLoading }) => {
  return (
    <>
      <thead className="sticky top-0 whitespace-nowrap bg-black text-lgz-1000 z-10">
        <tr>
          <th
            rowSpan={`${showDetails ? "2" : ""}`}
            className="border border-zinc-800"
          >
            <button className="border-2 p-1.5 rounded-full border-transparent border-pulse cursor-pointer">
              <IoMdMore
                className="w-full m-auto"
                size={30}
                onClick={async () => {
                  setLoading(true);
                  await setShowDetails(!showDetails);
                  setTimeout(() => {
                    setLoading(false);
                  }, 100);
                }}
              />
            </button>
          </th>
          <th rowSpan={`${showDetails ? "2" : ""}`} className=" px-4 py-5">
            Roll Number
          </th>
          <th colSpan={`${showDetails ? "3" : ""}`} className=" px-4 py-5">
            Codeforces
          </th>
          <th colSpan={`${showDetails ? "4" : ""}`} className=" px-4 py-5">
            GFG
          </th>
          <th colSpan={`${showDetails ? "3" : ""}`} className=" px-4 py-5">
            Leetcode
          </th>
          <th colSpan={`${showDetails ? "3" : ""}`} className=" px-4 py-5">
            Codechef
          </th>
          <th colSpan={`${showDetails ? "2" : ""}`} className=" px-4 py-5">
            HackerRank
          </th>
          <th rowSpan={`${showDetails ? "2" : ""}`} className=" px-4 py-5">
            <div className="flex items-center justify-center gap-1">
              <Link to="/calculation">
                <Info className="w-4 h-4 text-zinc-400 flex-shrink-0" />
              </Link>
              Total Score
            </div>
          </th>
        </tr>
        {showDetails ? (
          <tr>
            <th className=" px-20 py-4">Handle</th>
            <th className=" px-5 ">Rating</th>
            <th className=" px-5 ">Contests Attended</th>
            <th className=" px-20 ">Handle</th>
            <th className=" px-5 ">Contest Score</th>
            <th className=" px-5 ">Practice Score</th>
            <th className=" px-5 ">Contests Attended</th>
            <th className=" px-20 ">Handle</th>
            <th className=" px-5 ">Rating</th>
            <th className=" px-5 ">Contests Attended</th>
            <th className=" px-20 ">Handle</th>
            <th className=" px-5 ">Rating</th>
            <th className=" px-5 ">Contests Attended</th>
            <th className=" px-20 ">Handle</th>
            <th className=" px-5 ">Practice Score</th>
          </tr>
        ) : null}
      </thead>
    </>
  );
};
export default Attributes;
