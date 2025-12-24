import css from "./SearchBox.module.css";

interface SearchBoxProps {
    value: string;
    onChange: (value: string) => void;
}

const SearchBox = ({value, onChange} :SearchBoxProps) => {

    return (
    <div className={css.wrapper}>
      <label className={css.label}>
        Search by title
        <input
          type="text"
          className={css.input}
          value={value} 
          placeholder="Enter search term..."
          onChange={(e) => onChange(e.target.value)} 
        />
      </label>
    </div>
);
}

export default SearchBox;







