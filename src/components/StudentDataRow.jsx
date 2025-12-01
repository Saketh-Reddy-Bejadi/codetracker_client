import React from "react";
import { MdOutlineStar } from "react-icons/md";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const StudentDataRow = React.memo(({ row, showDetails }) => {
  return showDetails ? (
    <tr className={`whitespace-nowrap text-center`}>
      <td className="px-4 py-5">{row.serial}</td>
      <td className="flex items-center justify-center h-17 gap-2 px-2">
        <span>{row.rollNumber}</span>
        {row.isHandlesVerified && (
          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
        )}
        <MdOutlineStar size={22} color="#FFD700" opacity={row.consistency} />
      </td>

      <td className={row.codeforces}>
        <Link
          to={`https://codeforces.com/profile/${row.codeforces.handle}`}
          target="_blank"
          className="hover:text-[#D3D3FF] transition-colors duration-300"
        >
          {row.codeforces.handle}
        </Link>
      </td>
      <td className={row.codeforces}>{row.codeforces.rating}</td>
      <td className={row.codeforces}>{row.codeforces.count}</td>

      <td className={row.gfg}>
        <Link
          to={`https://auth.geeksforgeeks.org/user/${row.gfg.handle}`}
          target="_blank"
          className="hover:text-[#D3D3FF] transition-colors duration-300"
        >
          {row.gfg.handle}
        </Link>
      </td>
      <td className={row.gfg}>{row.gfg.contestScore}</td>
      <td className={row.gfg}>{row.gfg.practiceScore}</td>
      <td className={row.gfg}>{row.gfg.count}</td>

      <td className={row.leetcode}>
        <Link
          to={`https://leetcode.com/${row.leetcode.handle}`}
          target="_blank"
          className="hover:text-[#D3D3FF] transition-colors duration-300"
        >
          {row.leetcode.handle}
        </Link>
      </td>
      <td className={row.leetcode}>{row.leetcode.rating}</td>
      <td className={row.leetcode}>{row.leetcode.count}</td>

      <td className={row.codechef}>
        <Link
          to={`https://www.codechef.com/users/${row.codechef.handle}`}
          target="_blank"
          className="hover:text-[#D3D3FF] transition-colors duration-300"
        >
          {row.codechef.handle}
        </Link>
      </td>
      <td className={row.codechef}>{row.codechef.practiceScore}</td>
      <td className={row.codechef}>{row.codechef.count}</td>

      <td className={row.hackerRank}>
        <Link
          to={`https://www.hackerrank.com/${row.hackerRank.handle}`}
          target="_blank"
          className="hover:text-[#D3D3FF] transition-colors duration-300"
        >
          {row.hackerRank.handle}
        </Link>
      </td>
      <td className={row.hackerRank}>{row.hackerRank.practiceScore}</td>

      <td>{row.totalScore}</td>
    </tr>
  ) : (
    <tr className={`whitespace-nowrap text-center`}>
      <td className="px-4 py-5">{row.serial}</td>
      <td className="flex items-center justify-center h-17 gap-2 px-2">
        <span>{row.rollNumber}</span>
        {row.isHandlesVerified && (
          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
        )}
        <MdOutlineStar size={22} color="#FFD700" opacity={row.consistency} />
      </td>
      <td className={row.codeforces}>{row.codeforces.rating}</td>
      <td className={row.gfg}>{row.gfg.contestScore}</td>
      <td className={row.leetcode}>{row.leetcode.rating}</td>
      <td className={row.codechef}>{row.codechef.practiceScore}</td>
      <td className={row.hackerRank}>{row.hackerRank.practiceScore}</td>
      <td>{row.totalScore}</td>
    </tr>
  );
});

StudentDataRow.displayName = "StudentDataRow";

export default StudentDataRow;