import axios from 'axios';

const fetchDataInfo = async (numPage) => {
  const page = numPage|| 1;
  try {
    const response = await axios.get('https://rickandmortyapi.com/api/character/?page='+page);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
};

export default fetchDataInfo;
