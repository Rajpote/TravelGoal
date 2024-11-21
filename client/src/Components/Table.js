import React from "react";
import { MdDelete } from "react-icons/md";
import { GoEye } from "react-icons/go";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const Head = "text-xs text-center text-main font-semibold px-6 uppercase";
const Text = "text-sm text-center leading-6 whitespace-nowrap px-5 py-3";

const Rows = (travel, i, onDeleteHandler, admin) => {
   return (
      <tr key={i}>
         <td className={`${Text} flex items-center justify-center`}>
            <div className="w-12 p-1 bg-dry border-border h-12 rounded overflow-hidden">
               <img className="h-full w-full object-cover" src={travel?.image ? travel?.image : "/image/user.png"} alt={travel?.name} />
            </div>
         </td>
         <td className={`${Text} truncate`}>{travel.name}</td>
         <td className={`${Text}`}>{travel.category}</td>
         <td className={`${Text}`}>{travel.year}</td>
         <td className={`${Text}`}>{travel.time}hrs</td>
         <td className={`${Text} center gap-2`}>
            {admin ? (
               <>
                  {/* Admin action buttons */}
                  <Link to={`/edit/${encodeURIComponent(travel?._id)}`} className="border border-border bg-dry flex items-center gap-2 text-border rounded py-1 px-2">
                     Edit <FaEdit className="text-editBtn" />
                  </Link>
                  <button onClick={() => onDeleteHandler(travel?._id)} className="bg-subMain center w-6 h-6 text-white rounded">
                     <MdDelete />
                  </button>
               </>
            ) : (
               <>
                  {/* Non-admin action buttons */}
                  <div className="flex items-center justify-center w-full">
                     <Link to={`/travel/${encodeURIComponent(travel?._id)}`} className="bg-subMain center w-6 h-6 text-white rounded">
                        <GoEye />
                     </Link>
                  </div>
               </>
            )}
         </td>
      </tr>
   );
};

function Table({ data, admin, onDeleteHandler }) {
   return (
      <div className="overflow-x-auto overflow-hidden relative w-full">
         <table className="w-full table-auto border border-border divide-y divide-border">
            <thead>
               <tr className="bg-dryGray">
                  <th scope="col" className={`${Head}`}>
                     Image
                  </th>
                  <th scope="col" className={`${Head}`}>
                     Name
                  </th>
                  <th scope="col" className={`${Head}`}>
                     Category
                  </th>
                  <th scope="col" className={`${Head}`}>
                     Year
                  </th>
                  <th scope="col" className={`${Head}`}>
                     Hours
                  </th>
                  <th scope="col" className={`${Head}`}>
                     Action
                  </th>
               </tr>
            </thead>
            <tbody className="bg-main divide-y divide-gray-800">{data.map((travel, i) => Rows(travel, i, onDeleteHandler, admin))}</tbody>
         </table>
      </div>
   );
}

export default Table;
