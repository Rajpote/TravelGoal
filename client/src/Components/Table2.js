import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { DateFormat, shortUpperCaseId } from "./Notifications/Empty";

const Head = "text-xs text-center text-main font-semibold px-6 uppercase";
const Text = "text-sm text-center leading-6 whitespace-nowrap px-5 py-3";

const Rows = ({ data, users, OnEditFunction, onDeleteFunction }) => {
   return (
      <tr>
         {users ? (
            <>
               <td className={`${Text} flex items-center justify-center`}>
                  <div className="w-12 p-1 bg-dry border-border h-12 rounded overflow-hidden">
                     <img className="h-full w-full object-cover" src={`${data?.image ? data.image : "/image/user.png"}`} alt={data?.fullName} />
                  </div>
               </td>
               <td className={`${Text}`}>{data?._id ? shortUpperCaseId(data._id) : "2R75T8"}</td>
               <td className={`${Text}`}>{DateFormat(data?.createdAt)}</td>
               <td className={`${Text}`}>{data?.fullName}</td>
               <td className={`${Text}`}>{data?.email}</td>
               <td className={`${Text}`}>{data?.isAdmin ? "Admin" : "User"}</td>
               <td className={`${Text} flex items-center justify-center gap-2`}>
                  {!data?.isAdmin && (
                     <button onClick={() => onDeleteFunction(data?._id)} className="bg-subMain flex items-center justify-center w-6 h-6 text-white rounded">
                        <MdDelete />
                     </button>
                  )}
               </td>
            </>
         ) : (
            <>
               <td className={`${Text} font-bold`}>{data?._id ? shortUpperCaseId(data._id) : "2R75T8"}</td>
               <td className={`${Text}`}>{DateFormat(data?.createdAt)}</td>
               <td className={`${Text}`}>{data.title}</td>
               <td className={`${Text} flex items-center justify-center gap-2`}>
                  {/* Admin action buttons */}
                  <button onClick={() => OnEditFunction(data)} className="border border-border bg-dry flex items-center gap-2 text-border rounded py-1 px-2">
                     Edit <FaEdit className="text-editBtn" />
                  </button>
                  <button onClick={() => onDeleteFunction(data?._id)} className="bg-subMain flex items-center justify-center w-6 h-6 text-white rounded">
                     <MdDelete />
                  </button>
               </td>
            </>
         )}
      </tr>
   );
};

function Table2({ data, users, OnEditFunction, onDeleteFunction }) {
   return (
      <div className="overflow-x-auto overflow-hidden relative w-full">
         <table className="w-full table-auto border border-border divide-y divide-border">
            <thead>
               <tr className="bg-dryGray">
                  {users ? (
                     <>
                        <th scope="col" className={`${Head}`}>
                           Image
                        </th>
                        <th scope="col" className={`${Head}`}>
                           Id
                        </th>
                        <th scope="col" className={`${Head}`}>
                           Date
                        </th>
                        <th scope="col" className={`${Head}`}>
                           Full Name
                        </th>
                        <th scope="col" className={`${Head}`}>
                           Email
                        </th>
                        <th scope="col" className={`${Head}`}>
                           Role
                        </th>
                     </>
                  ) : (
                     <>
                        <th scope="col" className={`${Head}`}>
                           Id
                        </th>
                        <th scope="col" className={`${Head}`}>
                           Date
                        </th>
                        <th scope="col" className={`${Head}`}>
                           Title
                        </th>
                     </>
                  )}
                  <th scope="col" className={`${Head}`}>
                     Action
                  </th>
               </tr>
            </thead>
            <tbody className="bg-main divide-y divide-gray-800">
               {data.map((data, i) => (
                  <Rows key={i} data={data} users={users} OnEditFunction={OnEditFunction} onDeleteFunction={onDeleteFunction} />
               ))}
            </tbody>
         </table>
      </div>
   );
}

export default Table2;
