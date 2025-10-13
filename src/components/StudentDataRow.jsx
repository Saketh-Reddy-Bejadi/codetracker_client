import React from "react";
import { MdOutlineStar } from "react-icons/md";
import { CheckCircle } from "lucide-react";

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

      <td className={row.codeforces}>{row.codeforces.handle}</td>
      <td className={row.codeforces}>{row.codeforces.rating}</td>
      <td className={row.codeforces}>{row.codeforces.count}</td>

      <td className={row.gfg}>{row.gfg.handle}</td>
      <td className={row.gfg}>{row.gfg.contestScore}</td>
      <td className={row.gfg}>{row.gfg.practiceScore}</td>
      <td className={row.gfg}>{row.gfg.count}</td>

      <td className={row.leetcode}>{row.leetcode.handle}</td>
      <td className={row.leetcode}>{row.leetcode.rating}</td>
      <td className={row.leetcode}>{row.leetcode.count}</td>

      <td className={row.codechef}>{row.codechef.handle}</td>
      <td className={row.codechef}>{row.codechef.practiceScore}</td>
      <td className={row.codechef}>{row.codechef.count}</td>

      <td className={row.hackerRank}>{row.hackerRank.handle}</td>
      <td className={row.hackerRank}>{row.hackerRank.practiceScore}</td>

      <td>{row.totalScore}</td>
    </tr>
  ) : (
    <tr className={`whitespace-nowrap text-center`}>
      <td className="px-4 py-5">{row.serial}</td>
      <td className="flex items-center justify-center gap-2 px-2">
        <span>{row.rollNumber}</span>
        {row.isHandlesVerified && (
          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
        )}
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

StudentDataRow.displayName = 'StudentDataRow';

export default StudentDataRow;