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
        <div className="text-center text-4xl font-bold font-mono">
          <p>What do you want to Search ?</p>
        </div>

        <form className="flex justify-center items-center mt-5">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-2/3">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Type Image name"
              value={searchTerm}
              onChange={handleSearch}
              required
            />
          </div>
          {/* <button
            type="submit"
            className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button> */}
        </form>

        {/* <div className="flex justify-center space-x-4 mt-5">
          <input
            type="text"
            className="border border-grey-300 rounded py-2 px-4 w-2/3 text-center"
            placeholder="Type image name ..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div> */}
      </div>

      <div className="grid content-center justify-items-center mt-5">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-7 gap-5 mb-4 font-sans">
          <button
            className={`${
              activeFilter === null
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "bg-gray-300 hover:bg-gray-400 text-gray-700 hover:text-white"
            } py-2 px-4 rounded`}
            onClick={() => handleFilterClick("all")}
          >
            All
          </button>
          <button
            className={`${
              activeFilter === "nature"
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "bg-gray-300 hover:bg-gray-400 text-gray-700 hover:text-white"
            } py-2 px-4 rounded`}
            onClick={() => handleFilterClick("nature")}
          >
            Nature
          </button>
          <button
            className={`${
              activeFilter === "animals"
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "bg-gray-300 hover:bg-gray-400 text-gray-700 hover:text-white"
            } py-2 px-4 rounded`}
            onClick={() => handleFilterClick("animals")}
          >
            Animals
          </button>
          <button
            className={`${
              activeFilter === "sport"
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "bg-gray-300 hover:bg-gray-400 text-gray-700 hover:text-white"
            } py-2 px-4 rounded`}
            onClick={() => handleFilterClick("sport")}
          >
            Sport
          </button>
          <button
            className={`${
              activeFilter === "people"
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "bg-gray-300 hover:bg-gray-400 text-gray-700 hover:text-white"
            } py-2 px-4 rounded`}
            onClick={() => handleFilterClick("people")}
          >
            People
          </button>
          <button
            className={`${
              activeFilter === "food"
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "bg-gray-300 hover:bg-gray-400 text-gray-700 hover:text-white"
            } py-2 px-4 rounded`}
            onClick={() => handleFilterClick("food")}
          >
            Food
          </button>
          <button
            className={`${
              activeFilter === "cars"
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "bg-gray-300 hover:bg-gray-400 text-gray-700 hover:text-white"
            } py-2 px-4 rounded`}
            onClick={() => handleFilterClick("cars")}
          >
            Cars
          </button>
        </div>

        <div className="px-6 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-4 mt-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="text-center bg-white rounded-lg border-2 border-slate-300 hover:shadow-2xl p-4 "
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
                  className="bg-sky-700 hover:bg-sky-900 text-white py-2 px-4 rounded mt-2"
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
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-amber-400 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-amber-500 sm:mt-0 sm:w-auto"
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
