import "./App.css";
import { useState } from "react";
import FilterList from "./components/FilterList";
import ModeChanger from "./components/ModeChanger";
import SearchBar from "./components/SearchBar";
import Note from "./components/Note";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import emptyDark from "./assets/empty-dark.png";
import emptyLight from "./assets/empty-light.png";
import AddNote from "./components/AddNote";

function App() {
  const [mode, setMode] = useState("dark");
  const [notes, setNotes] = useState([
    { id: 1, text: "Note# 1", checked: false },
    { id: 2, text: "Note# 2", checked: false },
    { id: 3, text: "Note# 3", checked: false },
  ]);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingNoteText, setEditingNoteText] = useState("");

  const handleAddNote = () => {
    setModalOpen(true);
  };

  const onAddNote = (text) => {
    const newId = notes.length ? Math.max(...notes.map(n => n.id)) + 1 : 1;
    setNotes([...notes, { id: newId, text, checked: false }]);
  };

  const handleEdit = (id, text) => {
    setEditingNoteId(id);
    setEditingNoteText(text);
  };

  const handleEditModalSubmit = (e) => {
    e.preventDefault();
    setNotes(notes.map(note => note.id === editingNoteId ? { ...note, text: editingNoteText } : note));
    setEditingNoteId(null);
    setEditingNoteText("");
  };

  const handleEditModalCancel = () => {
    setEditingNoteId(null);
    setEditingNoteText("");
  };

  const handleCheck = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, checked: !note.checked } : note
      )
    );
  };

  const handleDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
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
  const filteredNotes = notes.filter((note) => {
    if (filter === "Pending" && note.checked) return false;
    if (filter === "Completed" && !note.checked) return false;
    if (search && !note.text.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  return (
    <>
      {/* Modal for adding a new note (rendered above everything) */}
      <AddNote
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        onAddNote={onAddNote}
        mode={mode}
      />
      {/* Edit Note Modal */}
      {editingNoteId !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-70 z-50">
          <div className={`rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 w-[95vw] max-w-xs sm:max-w-md md:max-w-lg flex flex-col z-60 ${mode === "dark" ? "bg-[#23272f] text-white" : "bg-white text-black"}`}>
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">Edit note</h2>
            <form onSubmit={handleEditModalSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                className={`border rounded px-2 py-2 sm:px-3 focus:outline-none ${mode === "dark" ? "bg-[#181c23] border-gray-700 text-white placeholder-gray-400 focus:border-[#6C63FF]" : "border-gray-300 text-black focus:border-[#6C63FF]"}`}
                placeholder="Edit note text..."
                value={editingNoteText}
                onChange={e => setEditingNoteText(e.target.value)}
                autoFocus
              />
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  className={`px-3 py-2 rounded text-sm sm:text-base ${mode === "dark" ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-300 text-gray-700 hover:bg-gray-400"}`}
                  onClick={handleEditModalCancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-3 py-2 rounded text-sm sm:text-base ${mode === "dark" ? "bg-[#6C63FF] text-white hover:bg-[#4f4b93]" : "bg-[#6C63FF] text-white hover:bg-[#4f4b93]"}`}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div
        className={`container min-w-screen min-h-screen flex flex-col items-center pt-[100px] px-2 sm:px-4 md:px-0 ${
          mode === "dark" ? "bg-[#181818]" : "bg-white"
        } text-black transition-colors duration-500 ${
          modalOpen || editingNoteId !== null ? "pointer-events-none select-none opacity-60" : ""
        }`}
        style={{ transition: 'background-color 0.5s, color 0.5s' }}
      >
        <div className='w-full sm:w-[90vw] md:w-[65vw] h-auto flex flex-col p-2 sm:p-4 md:p-[20px] '>
          <h1
            className={`text-lg sm:text-2xl md:text-[26px] font-bold mb-5 mx-auto transition-colors duration-500 ${
              mode === "dark" ? "text-white" : "text-[#252525]"
            }`}
          >
            TO DO APP
          </h1>
          <div className="search-bar-container mb-5 flex flex-col md:flex-row items-center justify-center gap-2 w-full sm:w-[90%] md:w-[65%] mx-auto">
            <SearchBar
              value={search}
              onChange={handleSearchChange}
              mode={mode}
            />
            <FilterList value={filter} onChange={handleFilterChange} />
            <ModeChanger mode={mode} onToggle={handleModeToggle} />
          </div>
          {/* Show empty-dark.png if no notes to display */}
          {filteredNotes.length === 0 ? (
            <div className="flex flex-col items-center justify-center w-full my-8">
              <img
                src={`${mode === "dark" ? emptyDark : emptyLight}`}
                alt="No notes found"
                className="w-40 h-40 sm:w-64 sm:h-64 object-contain opacity-80"
              />
              <p className="mt-4 text-gray-500 text-base sm:text-lg">No notes to show</p>
            </div>
          ) : (
            <div className="note-section mx-auto w-full sm:w-[90%] md:w-[60%]">
              {filteredNotes.map((note) => (
                <Note
                  key={note.id}
                  id={note.id}
                  text={note.text}
                  checked={note.checked}
                  onCheck={handleCheck}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  mode={mode}
                />
              ))}
            </div>
          )}
          <div className="addBtn fixed bottom-10 right-6 sm:right-10 bg-[#6C63FF] hover:bg-[#4f4b93] text-white rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shadow-lg transition duration-200 cursor-pointer">
            <button className="cursor-pointer" onClick={handleAddNote}>
              <AddOutlinedIcon style={{ fontSize: 28 }} className="sm:!text-[30px]" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
