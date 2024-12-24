import { z } from 'zod';

// Схема для объекта Image
const ImageSchema = z.object({
  src: z.string(), // URL изображения
  width: z.number().int().nonnegative(), // Ширина изображения
  height: z.number().int().nonnegative(), // Высота изображения
  type: z.string(), // Тип изображения (например, 'jpeg', 'png')
});

// Схема для объекта NewsItem
const NewsItemSchema = z.object({
  Id: z.number().int().nonnegative(), // ID новости
  Title: z.string().min(1), // Заголовок новости
  Summary: z.string().optional(), // Краткое описание, может быть пустым
  SeoUrl: z.string().url(), // SEO-URL, валидный URL
  Content: z.string().min(1), // Контент новости
  PublicationDate: z.string().refine(
    (date) => !isNaN(Date.parse(date)), // Проверяем, что строка является корректной датой
    { message: "Invalid date format" }
  ),
  ImageUrl: z.string().url(), // URL изображения
  Image: ImageSchema, // Объект изображения, соответствующий ImageSchema
});

// Пример схемы для массива объектов NewsItem
const NewsArraySchema = z.array(NewsItemSchema);

export { NewsItemSchema, NewsArraySchema };
