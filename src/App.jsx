
import { useState } from "react";
import { useNotes } from "./NotesContext.jsx";

function App() {
  const {
    notes,
    loading,
    error,
    createNote,
    deleteNote,
    updateNote,
  } = useNotes();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // Add Note
  const handleAdd = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Please enter title and content");
      return;
    }

    const success = await createNote({
      title: title.trim(),
      content: content.trim(),
    });

    if (success) {
      setTitle("");
      setContent("");
    }
  };

  // Edit Note
  const handleEdit = (note) => {
    setEditId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  // Update Note
  const handleUpdate = async () => {
    if (!editTitle.trim() || !editContent.trim()) {
      alert("Please enter title and content");
      return;
    }

    const success = await updateNote(editId, {
      title: editTitle.trim(),
      content: editContent.trim(),
      updatedAt: new Date().toISOString(),
    });

    if (success) {
      setEditId(null);
      setEditTitle("");
      setEditContent("");
    }
  };

  // Cancel Edit
  const handleCancel = () => {
    setEditId(null);
    setEditTitle("");
    setEditContent("");
  };

  // Delete Note
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (confirmDelete) {
      await deleteNote(id);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 text-slate-800 px-4 py-8 sm:px-8">

      {/* Header */}
      <header className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-2xl shadow-lg mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" />
            <path d="M18.4 2.6a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4Z" />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-blue-800">
          My Notepad
        </h1>

        
      </header>

      {/* Add Note Form */}
      <section className="max-w-xl mx-auto bg-white p-5 sm:p-7 rounded-3xl shadow-md border border-blue-100 mb-12">
        <h2 className="text-xl font-bold text-blue-800 mb-5">
          Create a New Note
        </h2>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-2">
              Title
            </label>

            <input
              type="text"
              placeholder="Enter your title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              className="w-full bg-blue-50 border border-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl p-3 outline-none transition"
            />

           
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-2">
              Content
            </label>

            <textarea
              placeholder="Write your note here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={500}
              rows={4}
              className="w-full bg-blue-50 border border-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl p-3 outline-none transition resize-y"
            />

          
          </div>

          <button
            onClick={handleAdd}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] disabled:opacity-50 text-white font-semibold py-3 rounded-xl shadow-md shadow-blue-200 transition"
          >
            + Add Note
          </button>
        </div>
      </section>

      {/* Loading */}
      {loading && (
        <p className="text-center text-blue-600 font-medium mb-5">
          Loading notes...
        </p>
      )}

      {/* Error */}
      {error && (
        <p className="max-w-xl mx-auto text-center text-red-600 bg-red-50 border border-red-100 rounded-xl p-3 mb-5">
          {error}
        </p>
      )}

      {/* Notes Heading */}
      <div className="max-w-7xl mx-auto mb-5">
        <h2 className="text-2xl font-bold text-blue-900">
          My Notes
          <span className="text-blue-500 text-base font-medium ml-2">
            ({notes.length})
          </span>
        </h2>
      </div>

     

      {/* Notes Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

        {notes.map((note) => (
          <article
            key={note.id}
            className="bg-white border border-blue-100 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-200 min-w-0"
          >
            {editId === note.id ? (
              <>
                {/* Edit Form */}
                <h3 className="text-lg font-bold text-blue-800 mb-4">
                  Edit Note
                </h3>

                <input
                  type="text"
                  placeholder="Edit title"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  maxLength={10}
                  className="w-full bg-blue-50 border border-blue-100 focus:border-blue-500 rounded-xl p-3 outline-none"
                />

                <textarea
                  placeholder="Edit content"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  maxLength={100}
                  rows={4}
                  className="w-full bg-blue-50 border border-blue-100 focus:border-blue-500 rounded-xl p-3 mt-3 outline-none resize-y"
                />

                <div className="flex flex-wrap gap-2 mt-4">
                  <button
                    onClick={handleUpdate}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium px-3 py-2 rounded-xl transition"
                  >
                    Save Changes
                  </button>

                  <button
                    onClick={handleCancel}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-3 py-2 rounded-xl transition"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Note Content */}
                <div className="w-10 h-1 bg-blue-500 rounded-full mb-4" />

                <h3 className="text-xl font-bold text-blue-900 mb-3 break-words">
                  {note.title}
                </h3>

                <p className="text-slate-600 leading-7 whitespace-pre-wrap break-words min-h-16">
                  {note.content}
                </p>

                {/* Note Actions */}
                <div className="flex gap-2 mt-6 pt-4 border-t border-blue-50">
                  <button
                    onClick={() => handleEdit(note)}
                    className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold px-3 py-2 rounded-xl transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(note.id)}
                    className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-3 py-2 rounded-xl transition"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </article>
        ))}

      </div>

      {/* Footer */}
      <footer className="text-center text-slate-400 text-sm mt-14">
        Developed by Jaishal P | react Machine Task 2026
      </footer>
    </div>
  );
}

export default App;
