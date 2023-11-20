import axios from 'axios';

const fetchDataInfo = async (numPage) => {
  const page = numPage|| 1;
  try {
    const response = await axios.get('https://rickandmortyapi.com/api/character/?page='+page);
    return response.data;
  } catch (error) {
    const respuestaObjeto = JSON.parse(error.request.responseText);
        throw respuestaObjeto.error;
  }
};

export default fetchDataInfo;
