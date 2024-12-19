import { fromEvent } from 'rxjs';
import { map, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators';

const draggable = document.getElementById('draggable'); // Элемент для перетаскивания
const container = document.getElementById('container'); // Ограничивающий контейнер

// Создаем потоки событий
const mouseDown$ = fromEvent(draggable, 'mousedown'); // Нажатие на элемент
const mouseMove$ = fromEvent(container, 'mousemove'); // Перемещение мыши в пределах контейнера
const mouseUp$ = fromEvent(container, 'mouseup'); // Отпускание кнопки мыши

// Поток, отслеживающий движения мыши во время перетаскивания
const drag$ = mouseDown$.pipe(
  // Берем начальные координаты мыши относительно элемента
  map((startEvent) => ({
    startX: startEvent.clientX,
    startY: startEvent.clientY,
    offsetX: startEvent.offsetX,
    offsetY: startEvent.offsetY,
  })),
  // Переключаемся на поток событий перемещения мыши
  switchMap(({ startX, startY, offsetX, offsetY }) =>
    mouseMove$.pipe(
      map((moveEvent) => ({
        left: moveEvent.clientX - offsetX,
        top: moveEvent.clientY - offsetY,
      })),
      takeUntil(mouseUp$) // Завершаем поток, когда отпущена кнопка мыши
    )
  )
);

// Обработка перемещения
drag$.subscribe(({ left, top }) => {
  // Ограничиваем перемещение элементом-контейнером
  const containerRect = container.getBoundingClientRect();
  const draggableRect = draggable.getBoundingClientRect();

  const constrainedLeft = Math.max(
    containerRect.left,
    Math.min(left, containerRect.right - draggableRect.width)
  );

  const constrainedTop = Math.max(
    containerRect.top,
    Math.min(top, containerRect.bottom - draggableRect.height)
  );

  // Устанавливаем новые координаты
  draggable.style.left = `${constrainedLeft - containerRect.left}px`;
  draggable.style.top = `${constrainedTop - containerRect.top}px`;
});
