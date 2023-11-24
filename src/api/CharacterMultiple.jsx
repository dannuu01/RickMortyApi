
import axios from "axios";

const  CharacterMultiple = async (arrayItems)  => {
    try{
        const response = await axios.get('https://rickandmortyapi.com/api/character/'+arrayItems);
        return response.data;
    } catch(error) {
        const respuestaObjeto = JSON.parse(error.request.responseText);
        throw respuestaObjeto.error;
    }
}

export default CharacterMultiple;
