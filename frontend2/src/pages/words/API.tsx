import axios from 'src/api/axios';

const { VITE_API_ENDPOINT } = import.meta.env;

// eslint-disable-next-line import/prefer-default-export
export const getUniqueWords = async () => {
  return axios.get(`${VITE_API_ENDPOINT}/unique-words`);
};
