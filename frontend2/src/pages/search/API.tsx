import axios from 'src/api/axios';

const { VITE_API_ENDPOINT } = import.meta.env;

export const getSearchResult = async (query: string) => {
  return axios.get(`${VITE_API_ENDPOINT}/search?q=${query}`);
};

export const getRandomWords = async () => {
  return axios.get(`${VITE_API_ENDPOINT}/random-words/`);
};

export const getChartData = (searchData: any) =>
  searchData.results.reduce((acc: any, item: any) => {
    const { year } = item.origin;
    const words = item.matching_words;
    if (year) {
      if (acc[year]) {
        acc[year] = [...acc[year], ...words];
      } else {
        acc[year] = words;
      }
    }
    return acc;
  }, {});
