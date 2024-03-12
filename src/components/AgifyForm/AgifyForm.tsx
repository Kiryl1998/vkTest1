import React, { useState, useRef, useEffect } from 'react';

interface AgifyResponse {
  name: string;
  age: number;
}

const AgifyForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const lastRequestRef = useRef<string | null>(null);

  const fetchAge = async (inputName: string) => {
    try {
      setLoading(true);

      // Предотвращаем дублирующие запросы
      if (lastRequestRef.current === inputName) {
        return;
      }

      lastRequestRef.current = inputName;

      const response = await fetch(`https://api.agify.io/?name=${inputName}`);
      const data: AgifyResponse = await response.json();
      console.log(data);

      setAge(data.age);
    } catch (error) {
      console.error('Error fetching age:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Отправляем запрос по таймеру после ввода имени
    const timerId = setTimeout(() => {
      if (name.trim() !== '') {
        fetchAge(name);
      }
    }, 3000);

    return () => clearTimeout(timerId);
  }, [name]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Отправляем запрос при отправке формы
    if (name.trim() !== '') {
      fetchAge(name);
    }
  };

  return (
    <div>
      <h1>Запрос работает только с именами на латинице</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Введите имя:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button type="submit">Отправить</button>
      </form>
      {loading && <p>Загрузка...</p>}
      {age !== null && <p>Возраст: {age}</p>}
    </div>
  );
};

export default AgifyForm;
