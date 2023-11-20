import axios from "axios";

const Episodes = async (arrayItems) => {
    try{
        const response = await axios.get('https://rickandmortyapi.com/api/episode/'+arrayItems);
        return response.data;
    } catch(error) {
        const respuestaObjeto = JSON.parse(error.request.responseText);
        throw respuestaObjeto.error;
    }
}

export default Episodes;
