import axios from 'axios';

const CharacterInfo = async (id) => {
  try {
    const response = await axios.get('https://rickandmortyapi.com/api/character/'+id);
    return response.data;
  } catch (error) {
    const respuestaObjeto = JSON.parse(error.request.responseText);
    throw respuestaObjeto.error;
  }
};



export default CharacterInfo;
