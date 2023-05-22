import { createSlice } from '@reduxjs/toolkit';

export const filesSlice = createSlice({
    name: 'files',
    initialState: {
        files: [],
    },
    reducers: {
        setFileList: (state,action) =>{
            state.list = action.payload;
        }
    }    
})

export const {setFileList}= filesSlice.actions;

export default filesSlice.reducer;
  
export const fetchAllFiles = () => (dispatch) => {
    fetch('http://localhost:3000/files/data',
    {headers:{'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'},
    method:'GET'})
    .then((res) => res.json())
    .then((data) => setFileList(data))
} 
  
