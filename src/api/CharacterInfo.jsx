import axios from 'axios';

const CharacterInfo = async (id) => {
  try {
    const response = await axios.get('https://rickandmortyapi.com/api/character/'+id);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
};



export default CharacterInfo;
