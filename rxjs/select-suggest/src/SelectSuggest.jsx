import React, { useState, useEffect, useRef } from 'react';
import { fromEvent, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  catchError,
} from 'rxjs/operators';
import './Select.css';

const SelectWithSuggest = ({ options, onSelect }) => {
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const inputElement = inputRef.current;

    const input$ = fromEvent(inputElement, 'input').pipe(
      map((event) => event.target.value),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query) => {
        if (!query) return of([]);
        return of(
          options.filter((option) =>
            option.toLowerCase().includes(query.toLowerCase())
          )
        ).pipe(catchError(() => of([])));
      })
    );

    const subscription = input$.subscribe((filtered) => {
      setFilteredOptions(filtered);
      setIsMenuOpen(filtered.length > 0);
    });

    return () => subscription.unsubscribe();
  }, [options]);

  const handleOptionSelect = (option) => {
    if (inputRef.current) {
      inputRef.current.value = option;
    }
    setIsMenuOpen(false);
    onSelect(option);
  };

  return (
    <div style={{ position: 'relative', width: '200px' }}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Start typing..."
        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
      />
      {isMenuOpen && (
        <ul className="menu">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              className="option"
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectWithSuggest;
