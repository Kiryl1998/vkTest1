import React, { useRef, useState } from 'react';

import style from './FactsComponent.module.css';

interface CatFactsComponentProps {}

const CatFactsComponent: React.FC<CatFactsComponentProps> = () => {
  const [catFact, setCatFact] = useState<string>('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const fetchCatFact = async () => {
    try {
      const response = await fetch('https://catfact.ninja/fact');
      const data = await response.json();
      const newCatFact = data.fact;
      setCatFact(newCatFact);
      setTimeout(() => {
        const input = inputRef.current;
        if (input) {
          const text = input.value;
          input.focus();
          const firstSpaceIndex = text.indexOf(' ');
          if (firstSpaceIndex !== -1) {
            input.setSelectionRange(firstSpaceIndex + 1, firstSpaceIndex + 0);
          } else {
            input.setSelectionRange(text.length, text.length);
          }
        }
      }, 0);
    } catch (error) {
      console.error('Error fetching cat fact:', error);
    }
  };

  const handleButtonClick = () => {
    fetchCatFact();
  };

  return (
    <div className={style.wrap}>
      <button onClick={handleButtonClick}>Загрузить факт о котах</button>
      <textarea
        className={style.input}
        value={catFact}
        onChange={() => {}}
        ref={inputRef}
      />
    </div>
  );
};

export default CatFactsComponent;
