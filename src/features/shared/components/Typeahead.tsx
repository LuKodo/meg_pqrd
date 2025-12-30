import { useEffect, useRef, useState } from "react";

export interface TypeaheadOption {
  label: string;
  value: string | number;
}

interface TypeaheadProps {
  options: TypeaheadOption[];
  value?: string;
  placeholder?: string;
  onSelect: (option: TypeaheadOption) => void;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export function Typeahead({
  options,
  value = "",
  placeholder,
  onSelect,
  onChange,
  disabled = false,
}: TypeaheadProps) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(option: TypeaheadOption) {
    setQuery(option.label);
    setOpen(false);
    onSelect(option);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);
    setOpen(true);
    onChange?.(value);
  }

  return (
    <div className="relative" ref={containerRef}>
      <input
        type="text"
        className="input rounded-lg w-full"
        value={query}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={() => setOpen(true)}
        disabled={disabled}
        autoComplete="off"
      />

      {open && filteredOptions.length > 0 && (
        <ul className="absolute w-100 shadow-sm mt-1 z-3 bg-white max-h-[200px] overflow-y-scroll">
          {filteredOptions.map((option) => (
            <li
              key={option.value}
              className="p-2 cursor-pointer"
              onMouseDown={() => handleSelect(option)}
              style={{ cursor: "pointer" }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}

      {open && query && filteredOptions.length === 0 && (
        <div className="absolute w-100 shadow-sm mt-1 z-3 bg-white">
          <div className="list-group-item text-muted">
            Sin resultados
          </div>
        </div>
      )}
    </div>
  );
}
