import React, { useState, useEffect } from "react";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import data from "../data/data.json";

export const Content = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setGalleryItems(data);
    setFilteredItems(data);
  }, []);

  const filterItems = (category) => {
    if (category === "all") {
      setActiveFilter(null);
      return galleryItems;
    } else {
      setActiveFilter(category);
      return galleryItems.filter((item) => item.category === category);
    }
  };

  const handleFilterClick = (category) => {
    const filteredItems = filterItems(category);
    setFilteredItems(filteredItems);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filteredItems = galleryItems.filter((item) =>
      item.alt.toLowerCase().includes(term)
    );
    setFilteredItems(filteredItems);
  };
  const openModal = (itemId) => {
    // Find the selected item based on its ID
    const selectedItem = filteredItems.find((item) => item.id === itemId);
    setSelectedItem(selectedItem);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="container mx-auto mt-5 py-5">
        <div className="text-center text-3xl font-bold">
          <p>What do you want to Search ?</p>
        </div>
        <div className="flex justify-center space-x-4 mt-5">
          <input
            type="text"
            className="border border-grey-300 rounded py-2 px-4 w-2/3 text-center"
            placeholder="Type image name ..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="container mx-auto py-8">
        <div className="flex justify-center space-x-4 mb-4">
          <button
            className={`${
              activeFilter === null
                ? "bg-stone-500 text-white"
                : "bg-gray-300 text-gray-700"
            } py-2 px-4 rounded`}
            onClick={() => handleFilterClick("all")}
          >
            All
          </button>
          <button
            className={`${
              activeFilter === "nature"
                ? "bg-stone-500 text-white"
                : "bg-gray-300 text-gray-700"
            } py-2 px-4 rounded`}
            onClick={() => handleFilterClick("nature")}
          >
            Nature
          </button>
          <button
            className={`${
              activeFilter === "animals"
                ? "bg-stone-500 text-white"
                : "bg-gray-300 text-gray-700"
            } py-2 px-4 rounded`}
            onClick={() => handleFilterClick("animals")}
          >
            Animals
          </button>
          <button
            className={`${
              activeFilter === "sport"
                ? "bg-stone-500 text-white"
                : "bg-gray-300 text-gray-700"
            } py-2 px-4 rounded`}
            onClick={() => handleFilterClick("sport")}
          >
            Sport
          </button>
          <button
            className={`${
              activeFilter === "people"
                ? "bg-stone-500 text-white"
                : "bg-gray-300 text-gray-700"
            } py-2 px-4 rounded`}
            onClick={() => handleFilterClick("people")}
          >
            People
          </button>
          <button
            className={`${
              activeFilter === "food"
                ? "bg-stone-500 text-white"
                : "bg-gray-300 text-gray-700"
            } py-2 px-4 rounded`}
            onClick={() => handleFilterClick("food")}
          >
            Food
          </button>
          <button
            className={`${
              activeFilter === "cars"
                ? "bg-stone-500 text-white"
                : "bg-gray-300 text-gray-700"
            } py-2 px-4 rounded`}
            onClick={() => handleFilterClick("cars")}
          >
            Cars
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="text-center bg-white rounded-lg shadow-lg p-4"
            >
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-52 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h5 className="text-lg font-bold mb-1">{item.alt}</h5>
                {/* <p className="text-gray-700">{item.description}</p> */}
                <button
                  className="bg-sky-700 text-white py-2 px-4 rounded mt-2"
                  onClick={() => openModal(item.id)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedItem && (
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-base font-semibold leading-6 text-gray-900"
                          >
                            Image Details
                          </Dialog.Title>
                          <div className="mt-2">
                            <img
                              src={selectedItem.image}
                              alt={selectedItem.alt}
                              className="w-full h-64 rounded-md mb-4 object-cover"
                            />{" "}
                            <h3 className="text-lg font-bold mb-2">
                              {selectedItem.alt}
                            </h3>
                            <p className="text-gray-600">
                              {selectedItem.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-amber-400 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-amber-600 sm:mt-0 sm:w-auto"
                        ref={cancelButtonRef}
                        onClick={closeModal}
                      >
                        Back
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </div>
  );
};
