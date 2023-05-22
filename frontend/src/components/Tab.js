import React, {useEffect,useState } from 'react';
import { fetchAllFiles } from '../reducers/files';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';

function Tab() {
  const [isLoading, setIsLoading] = useState(true)
  const [listFiles, setListFiles] = useState([])

  const files = useSelector(state => state.files.files);
  const dispatch = useDispatch()
  console.log(files)
  
  useEffect(()=>{
    fetch('http://localhost:3000/files/data',
    {headers:{'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'},
    method:'GET'})
    .then((res) => res.json())
    .then((data) => {
      setListFiles(data.flat())
      setIsLoading(false)
    })
    
  }, [])

  

  

  if(isLoading){
    return <div>Loading...</div>
  }
  return (
    <Table responsive="sm" striped>
    <thead>
      <tr>
      
        <th>File Name</th>
        <th>Text</th>
        <th>Number</th>
        <th>Hex</th>
      
      </tr>
    </thead>
    <tbody>
     {listFiles.map((file,index)=>(
      <tr key={index}>
   
      <td>{file.file}</td>
      <td>{file.text}</td>
      <td>{file.number}</td>
      <td>{file.hex}</td>
     
    </tr>
     ))}
     
    </tbody>
  </Table>
  )
}

export default Tab