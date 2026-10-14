
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";

const NotesContext = createContext();

const API_URL = "http://localhost:3000/notes";

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch Notes
  const fetchNotes = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(API_URL);
      setNotes(response.data);
    } catch (err) {
      setError("Notes load cheyyan kazhinjilla.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Add Note
  const createNote = async (note) => {
    setError("");

    try {
      const response = await axios.post(API_URL, {
        title: note.title,
        content: note.content,
        createdAt: new Date().toISOString(),
      });

      setNotes((prevNotes) => [...prevNotes, response.data]);
      return true;
    } catch (err) {
      setError("Note add cheyyan kazhinjilla.");
      return false;
    }
  };

  // Delete Note
  const deleteNote = async (id) => {
    setError("");

    try {
      await axios.delete(`${API_URL}/${id}`);

      setNotes((prevNotes) =>
        prevNotes.filter((note) => note.id !== id)
      );

      return true;
    } catch (err) {
      setError("Note delete cheyyan kazhinjilla.");
      return false;
    }
  };

  // Update Note
  const updateNote = async (id, updatedData) => {
    setError("");

    try {
      const response = await axios.patch(
        `${API_URL}/${id}`,
        updatedData
      );

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === id ? response.data : note
        )
      );

      return true;
    } catch (err) {
      setError("Note update cheyyan kazhinjilla.");
      return false;
    }
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        loading,
        error,
        createNote,
        deleteNote,
        updateNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  return useContext(NotesContext);
}
