import React, { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";

function MainModal({ modalOpen, setModalOpen, children }) {
   const cancelButtonRef = useRef(null);

   return (
      <Transition show={modalOpen} as={Fragment} appear>
         <Dialog as="div" className="fixed inset-0 z-30 overflow-y-auto text-center" initialFocus={cancelButtonRef} onClose={() => setModalOpen(false)}>
            <div className="min-h-screen px-4 text-center">
               {/* Overlay */}
               <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                  <div className="fixed inset-0 bg-main opacity-60" aria-hidden="true" />
               </Transition.Child>

               {/* Centering the modal contents */}
               <span className="inline-block h-screen align-middle" aria-hidden="true">
                  &#8203;
               </span>

               {/* Modal Content */}
               <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
               >
                  <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden align-middle transition-all transform shadow-xl rounded-lg relative z-40">
                     {/* Close Button */}
                     <button
                        onClick={() => setModalOpen(false)}
                        className="absolute right-5 top-5 z-50 w-10 h-10 flex items-center justify-center text-base text-subMain bg-white rounded-full hover:bg-subMain hover:text-white"
                        type="button"
                        ref={cancelButtonRef}
                        aria-label="Close modal"
                     >
                        <IoClose />
                     </button>

                     {children}
                  </div>
               </Transition.Child>
            </div>
         </Dialog>
      </Transition>
   );
}

export default MainModal;
