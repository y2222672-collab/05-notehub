import type { Note } from "../../types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
}

const NoteList = ({ notes, onDelete }: NoteListProps) => {
  if (notes.length === 0) {
    return (
      <div className={css.emptyContainer}>
        <div className={css.emptyIcon}>🔍</div>
        <h3 className={css.emptyTitle}>No notes found</h3>
        <p className={css.emptyText}>
          We couldn't find anything matching your search. Try using different
          keywords.
        </p>
      </div>
    );
  }
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <div className={css.contentWrapper}>
            <h3 className={css.title}>{note.title}</h3>
            <p className={css.content}>{note.content}</p>
          </div>

          <footer className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button className={css.deleteBtn} onClick={() => onDelete(note.id)}>
              Delete
            </button>
          </footer>
        </li>
      ))}
    </ul>
  );
};
export default NoteList;
