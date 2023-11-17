import axios from "axios"

const fetchSearchData = async (value,page) => {

    const param = value || '';
    const paramPage = page || 1;

    try{
        const response = await axios.get('https://rickandmortyapi.com/api/character/?page='+paramPage+'&name='+param)
        return response.data;

    } catch(error) {
        const respuestaObjeto = JSON.parse(error.request.responseText);
        throw respuestaObjeto.error;
    }
}

export default fetchSearchData;

