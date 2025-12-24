import type { Note } from "../../types/note";
import css from "./NoteList.module.css";


interface NoteListProps {
    notes: Note[];
onDelete: (id: string) => void;
}

const NoteList = ({notes, onDelete} :NoteListProps) => {
    if(notes.length === 0) {
        return <p className={css.empty}>No notes found. Try changing your search.</p>;
    }
    return (
   <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.item}>
          <div className={css.noteCard}>
            <div className={css.cardHeader}>
              <span className={css.tag}>{note.tag}</span>
              <button 
                className={css.deleteBtn} 
                onClick={() => onDelete(note.id)}
              >
                &times;
              </button>
            </div>
            
            <h3 className={css.title}>{note.title}</h3>
            <p className={css.content}>{note.content}</p>
            
            <footer className={css.footer}>
              {new Date(note.createdAt).toLocaleDateString()}
            </footer>
          </div>
        </li>
      ))}
    </ul>
  );
}
export default NoteList;
