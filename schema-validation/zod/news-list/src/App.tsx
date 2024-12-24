import React from 'react';
import { z, ZodSchema } from 'zod';

interface NewsItem {
  Id: number;
  Title: string;
  Summary: string;
  SeoUrl: string;
  Content: string;
  PublicationDate: string;
  ImageUrl: string;
  Image: any;
}

const NewsItemSchema = z.object({
  Id: z.number().int().nonnegative(),
  Title: z.string(),
  Summary: z.string(),
  SeoUrl: z.string().url(),
  Content: z.string(),
  PublicationDate: z.string(),
  ImageUrl: z.string().url(),
  Image: z.object({
    src: z.string(),
    width: z.number().int().nonnegative(),
    height: z.number().int().nonnegative(),
    type: z.string(),
  }),
});

const testData = [
  {
    Id: 1,
    Title: 'Breaking News',
    Summary: 'A quick summary',
    SeoUrl: 'https://example.com/news-1',
    Content: 'Detailed news content here...',
    PublicationDate: '2024-12-01T10:00:00Z',
    ImageUrl: 'https://example.com/image-1.jpg',
    Image: {
      src: 'https://example.com/image-1.jpg',
      width: 800,
      height: 600,
      type: 'jpeg',
    },
  },
  {
    Id: 2,
    Title: 'Breaking News 2',
    Summary: 'A quick summary',
    SeoUrl: 'https://example.com/news-2',
    Content: 'Detailed news content here...',
    PublicationDate: '2024-12-01T10:00:00Z',
    ImageUrl: 'https://example.com/image-2.jpg',
    Image: {
      src: 'https://example.com/image-2.jpg',
      width: 800,
      height: 600,
      type: 'jpeg',
    },
  },
];

type SchemaType = z.infer<typeof Schema>;
const Schema = z.array(NewsItemSchema);

interface DummyResponse {
  ok: boolean;
  status: number;
  json: () => Promise<typeof testData>;
}

const fetchDummy = (url: string, options: { method: string }) =>
  new Promise<DummyResponse>((resolve) => {
    console.log(`Fetching from URL: ${url}`);
    console.log('Options:', options);

    const response: DummyResponse = {
      ok: true,
      status: 200,
      json: async () => testData,
    };
    resolve(response);
  });

const fetcherGET = async (
  url: string,
  schema: ZodSchema<SchemaType>,
  callback: (result: NewsItem[]) => void
) => {
  try {
    const res = await fetchDummy(url, { method: 'GET' });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const response = await res.json();
    // выбросит исключение если чтото пойдет не так и обработка проболжится в catch
    const result = schema.parse(response);
    callback(result);
  } catch (exception) {
    console.log('catch: ', exception);
    callback([]);
  }
};

function EventsList() {
  const [newsList, setNewsList] = React.useState<Array<NewsItem>>([]);

  //Получение новостей
  React.useEffect(() => {
    fetcherGET('/News/GetNewsList', Schema, (result) => {
      setNewsList(result);
    });
  }, []);

  return (
    <>
      <h4 className="purpleTextHead">Лента событий</h4>
      {newsList.length > 0 ? (
        newsList.map((item) => (
          <a href={item.SeoUrl}>
            <span className="defaultComment">{item.PublicationDate}</span>
            <p className="defaultDescription">{item.Title}</p>
          </a>
        ))
      ) : (
        <p className="errorText">Событий не найдено</p>
      )}
    </>
  );
}

function App() {
  return <EventsList />;
}

export default App;
