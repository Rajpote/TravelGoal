import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import { ratesData, timesData, yearsData } from "../Data/FilterData";

function Filters({ data }) {
   const { categories, category, setCategory, year, setYear, time, setTimes, rate, setRates } = data;

   const Filter = [
      {
         value: category,
         onchange: setCategory,
         items: categories?.length > 0 ? [{ title: "All Categories" }, ...categories] : [{ title: "No categories found" }],
      },
      {
         value: year,
         onchange: setYear,
         items: yearsData,
      },
      {
         value: time,
         onchange: setTimes,
         items: timesData,
      },
      {
         value: rate,
         onchange: setRates,
         items: ratesData,
      },
   ];

   return (
      <div className="my-6 bg-dry border text-dryGray border-gray-800 grid md:grid-cols-4 grid-cols-2 lg:gap-12 gap-2 rounded p-6">
         {Filter.map((item, index) => (
            <Listbox key={index} value={item.value} onChange={item.onchange}>
               <div className="relative">
                  <Listbox.Button className="relative border border-gray-800 w-full text-white bg-main rounded-lg cursor-default py-4 pl-6 pr-10 text-left text-xs">
                     <span className="block truncate">{item.value.title}</span>
                     <span className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                        <ChevronUpDownIcon className="w-5 h-5" aria-hidden="true" />
                     </span>
                  </Listbox.Button>
                  <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                     <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full bg-white border-gray-800 text-dryGray rounded-md shadow-lg py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                        {item.items.map((opt, i) => (
                           <Listbox.Option key={i} className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-subMain text-white" : "text-main"}`} value={opt}>
                              {({ selected }) => (
                                 <>
                                    <span className={`block truncate ${selected ? "font-semibold" : "font-normal"}`}>{opt.title}</span>
                                    {selected && (
                                       <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                       </span>
                                    )}
                                 </>
                              )}
                           </Listbox.Option>
                        ))}
                     </Listbox.Options>
                  </Transition>
               </div>
            </Listbox>
         ))}
      </div>
   );
}

export default Filters;
