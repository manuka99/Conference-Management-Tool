import axios from 'axios';

const url = 'http://localhost:5000/paper';

export const getPapers = async (id)=>{

    id = id||'';
    return await axios.get(`${url}/${id}`);
}





export const updatePaper = async (id,paper) => {
 return await axios.patch(`${url}/update/${id}`,paper);
}

export const deletePaper = async (id) => {
    return await axios.delete(`${url}/delete/${id}`);
}