import React, { useEffect, useState } from 'react';
import { Subject, combineLatest, interval } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

const useSubject = (value) => {
  const initial = React.useRef(false);
  const subject = React.useRef(null);
  if (!initial.current) {
    subject.current = new Subject(value);
    initial.current = true;
  }
  return subject.current;
};

const App = () => {
  // Создаем BehaviorSubject для каждого датчика
  const smokeSensor$ = useSubject(0);
  const fireSensor$ = useSubject(0);

  const [output, setOutput] = useState('норма');

  useEffect(() => {
    // Интервальный опрос датчиков
    const smokeStream$ = interval(1500).pipe(
      withLatestFrom(smokeSensor$), // Получаем последнее значение датчика
      map(([, smoke]) => smoke) // Извлекаем значение
    );

    const fireStream$ = interval(1000).pipe(
      withLatestFrom(fireSensor$),
      map(([, fire]) => fire)
    );

    // Комбинируем значения потоков
    const combinedStream$ = combineLatest([smokeStream$, fireStream$]).pipe(
      map(([smoke, fire]) => {
        console.log('smoke fire', smoke, fire);
        return smoke > 80 && fire > 80 ? 'Пожар' : 'норма';
      })
    );

    // Подписываемся на обновления
    const subscription = combinedStream$.subscribe(setOutput);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Обработчики изменения датчиков
  const handleSmokeChange = (e) => {
    smokeSensor$.next(Number(e.target.value));
  };

  const handleFireChange = (e) => {
    fireSensor$.next(Number(e.target.value));
  };

  return (
    <div>
      <div>
        <label>
          Detector smoke:
          <input type="range" min="0" max="100" onChange={handleSmokeChange} />
        </label>
      </div>
      <div>
        <label>
          Detector fire:
          <input type="range" min="0" max="100" onChange={handleFireChange} />
        </label>
      </div>
      <div className="output">{output}</div>
    </div>
  );
};

export default App;
