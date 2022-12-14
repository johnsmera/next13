import axios from "axios";

export type ListNewsOutput = {
  title: string;
  description: string;
  author: string;
  date: string;
  url: string;
};

export type ListNewsAPIOutput = {
  articles: {
    author: string;
    title: string;
    description: string;
    publishedAt: string;
    url: string;
  }[];
};

export const newsService = {
  listNews: (): Promise<ListNewsOutput[]> =>
    axios
      .get<ListNewsAPIOutput>(
        `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=2ff1ec86815f4b2b94ccd0923fcb2265`,
        { headers: { "Accept-Encoding": "gzip,deflate,compress" } }
      )
      .then((res) => {
        if (!res.data) return [];

        const output: ListNewsOutput[] = res.data.articles.map((item) => ({
          author: item.author,
          date: item.publishedAt,
          description: item.description,
          title: item.title,
          url: item.url,
        }));

        return output;
      })
      .catch((err) => {
        return [];
      }),
};
