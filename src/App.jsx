import "./App.css";
import { useState } from "react";
import FilterList from "./components/FilterList";
import ModeChanger from "./components/ModeChanger";
import SearchBar from "./components/SearchBar";
import Note from "./components/Note";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import emptyDark from "./assets/empty-dark.png";

function App() {
  const [mode, setMode] = useState("light");
  const [notes, setNotes] = useState([
    { id: 1, text: "Note# 1", checked: false },
    { id: 2, text: "Note# 2", checked: false },
    { id: 3, text: "Note# 3", checked: false },
  ]);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [newNoteText, setNewNoteText] = useState("");

  const handleAddNote = () => {
    setModalOpen(true);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (newNoteText.trim() === "") return;
    const newId = notes.length ? Math.max(...notes.map(n => n.id)) + 1 : 1;
    setNotes([...notes, { id: newId, text: newNoteText, checked: false }]);
    setNewNoteText("");
    setModalOpen(false);
  };

  const handleModalCancel = () => {
    setNewNoteText("");
    setModalOpen(false);
  };

  const handleCheck = (id) => {
    setNotes(notes.map(note => note.id === id ? { ...note, checked: !note.checked } : note));
  };

  const handleDelete = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleModeToggle = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };

  // Filter and search notes
  const filteredNotes = notes.filter(note => {
    if (filter === "Pending" && note.checked) return false;
    if (filter === "Completed" && !note.checked) return false;
    if (search && !note.text.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      {/* Modal for adding a new note (rendered above everything) */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-[90vw] max-w-md flex flex-col z-60">
            <h2 className="text-xl font-bold mb-4 text-center">Add a new note</h2>
            <form onSubmit={handleModalSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#6C63FF]"
                placeholder="Enter note text..."
                value={newNoteText}
                onChange={e => setNewNoteText(e.target.value)}
                autoFocus
              />
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400"
                  onClick={handleModalCancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[#6C63FF] text-white hover:bg-[#4f4b93]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className={`container min-w-screen flex flex-col items-center mt-[150px] ${mode === "dark" ? "bg-[#181818]" : "bg-white"} text-black ${modalOpen ? 'pointer-events-none select-none opacity-60' : ''}`}>
        <div className="w-[65vw] h-[auto] flex flex-col p-[20px] shadow-black/50 rounded-lg">
          <h1 className="text-[26px] font-bold mb-5 mx-auto text-[#252525]">
            TO DO APP
          </h1>
          <div className="search-bar-container mb-5 flex items-center justify-center gap-2 w-[65%] mx-auto">
            <SearchBar value={search} onChange={handleSearchChange} />
            <FilterList value={filter} onChange={handleFilterChange} />
            <ModeChanger mode={mode} onToggle={handleModeToggle} />
          </div>
          {/* Show empty-dark.png if no notes to display */}
          {filteredNotes.length === 0 ? (
            <div className="flex flex-col items-center justify-center w-full my-8">
              <img
                src={emptyDark}
                alt="No notes found"
                className="w-64 h-64 object-contain opacity-80"
              />
              <p className="mt-4 text-gray-500 text-lg">No notes to show</p>
            </div>
          ) : (
            <div className="note-section mx-auto w-[60%]">
              {filteredNotes.map(note => (
                <Note
                  key={note.id}
                  id={note.id}
                  text={note.text}
                  checked={note.checked}
                  onCheck={handleCheck}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
          <div className="addBtn fixed bottom-10 right-140 bg-[#6C63FF] hover:bg-[#4f4b93] text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition duration-200 cursor-pointer">
            <button className="cursor-pointer" onClick={handleAddNote}>
              <AddOutlinedIcon style={{ fontSize: 30 }} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
