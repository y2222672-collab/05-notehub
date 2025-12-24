import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes, deleteNote, createNote } from "../../services/noteService";
import css from "./App.module.css";
import SearchBox from "../SearchBox/SearchBox";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";

const App = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isFetching, isError } = useQuery({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () => fetchNotes(page, 12, debouncedSearch),
    placeholderData: keepPreviousData,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });

  const createMutation = useMutation({
    mutationFn: (newNote: { title: string; content: string; tag: string }) =>
      createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setIsModalOpen(false);
    },
  });

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <div className={css.leftSection}>
          <SearchBox value={search} onChange={handleSearch} />
        </div>

        <div className={css.centerSection}>
          {data && data.totalPages > 1 && (
            <Pagination
              totalPages={data.totalPages}
              currentPage={page}
              onChange={(newPage) => setPage(newPage)}
            />
          )}
        </div>

        <div className={css.rightSection}>
          <button className={css.button} onClick={() => setIsModalOpen(true)}>
            Create note +
          </button>
        </div>
      </header>

      <main className={css.mainContent}>
        {isFetching && (
          <div className={css.loaderContainer}>
            <Loader />
          </div>
        )}

        {!isFetching && isError && (
          <ErrorMessage message="Failed to load notes. Check your internet connection." />
        )}

        {!isFetching && !isError && data && (
          <NoteList
            notes={data.notes}
            onDelete={(id) => deleteMutation.mutate(id)}
          />
        )}
      </main>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onSubmit={(formData) => createMutation.mutate(formData)}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default App;
