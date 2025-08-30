import axios from "axios";

const Api = axios.create({
  baseURL: `${import.meta.env.VITE_BACK_END_URL}/api`,
});

console.log(`${import.meta.env.VITE_BACK_END_URL}/api`);

export default Api;
