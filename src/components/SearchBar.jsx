function SearchBar({ query, onQueryChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search FDA reports (e.g., 'serious aspirin cases 2024')"
        style={{ width: '80%', padding: '8px' }}
      />
      <button type="submit" style={{ marginLeft: '10px', padding: '8px 12px' }}>
        Search
      </button>
    </form>
  );
}

export default SearchBar;
