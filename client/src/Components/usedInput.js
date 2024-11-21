export const Message = ({ label, placeholder, name, register }) => {
   return (
      <div className="text-sm w-full">
         <label className="text-border font-semibold">{label}</label>
         <textarea className="w-full h-40 mt-2 p-6 border bg-main border-border rounded" placeholder={placeholder} {...register} name={name} />
      </div>
   );
};

export const Select = ({ label, options, register, name }) => {
   return (
      <div className="text-sm w-full">
         <label className="text-border font-semibold">{label}</label>
         <select className="w-full mt-2 px-6 py-4 text-text bg-main border border-border rounded" {...register} name={name}>
            {options?.map((opt, i) => (
               <option key={i} value={opt.value}>
                  {opt.title}
               </option>
            ))}
         </select>
      </div>
   );
};

export const Input = ({ label, placeholder, type, bg, register, name, value, onChange }) => {
   return (
      <div className="text-sm w-full">
         <label className="text-border font-semibold">{label}</label>
         <input
            name={name}
            value={value}
            onChange={onChange}
            {...register}
            type={type}
            placeholder={placeholder}
            className={`w-full mt-2 px-6 py-5 text-sm text-white border border-border rounded ${bg ? "bg-main" : "bg-dry"}`}
         />
      </div>
   );
};
