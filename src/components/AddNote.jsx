import React, { useState } from 'react';

export default function AddNote({ modalOpen, setModalOpen, onAddNote, mode }) {
    const [newNoteText, setNewNoteText] = useState("");

    const handleModalSubmit = (e) => {
        e.preventDefault();
        if (newNoteText.trim() === "") return;
        onAddNote(newNoteText);
        setNewNoteText("");
        setModalOpen(false);
    };

    const handleModalCancel = () => {
        setNewNoteText("");
        setModalOpen(false);
    };

    return (
        <>
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-70 z-50">
                    <div className={`rounded-lg shadow-lg p-8 w-[90vw] max-w-md flex flex-col z-60 ${mode === "dark" ? "bg-[#23272f] text-white" : "bg-white text-black"}`}>
                        <h2 className="text-xl font-bold mb-4 text-center">Add a new note</h2>
                        <form onSubmit={handleModalSubmit} className="flex flex-col gap-4">
                            <input
                                type="text"
                                className={`border rounded px-3 py-2 focus:outline-none ${mode === "dark" ? "bg-[#181c23] border-gray-700 text-white placeholder-gray-400 focus:border-[#6C63FF]" : "border-gray-300 text-black focus:border-[#6C63FF]"}`}
                                placeholder="Enter note text..."
                                value={newNoteText}
                                onChange={e => setNewNoteText(e.target.value)}
                                autoFocus
                            />
                            <div className="flex gap-2 justify-end">
                                <button
                                    type="button"
                                    className={`px-4 py-2 rounded ${mode === "dark" ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-300 text-gray-700 hover:bg-gray-400"}`}
                                    onClick={handleModalCancel}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={`px-4 py-2 rounded ${mode === "dark" ? "bg-[#6C63FF] text-white hover:bg-[#4f4b93]" : "bg-[#6C63FF] text-white hover:bg-[#4f4b93]"}`}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
