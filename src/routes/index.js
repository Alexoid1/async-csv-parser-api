import {Router} from "express";
import * as https from 'https';
import csv from 'csvtojson';

const router = new Router();

const options = {
      
    headers: {
        Authorization: 'Bearer aSuperSecretKey'
    }
}

let files =[]
let fileList =[]

function getFilesList(){
    return new Promise((resolve)=>{
        const response = https.get('https://echo-serv.tbxnet.com/v1/secret/files',options, (resp) => {
            let data = '';
        
            // Un fragmento de datos ha sido recibido.
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                fileList=[]
                fileList=JSON.parse(data).files

                resolve()
                
            });
          

    })
})
}


function getAllFiles(file){
    
    return new Promise((resolve, reject)=>{       
        
        for(let i in file){            
            
            const response =https.get(`https://echo-serv.tbxnet.com/v1/secret/file/${file[i]}`,options, (resp) => {
                let data = '';
                console.log(resp.statusCode)
            
                // Un fragmento de datos ha sido recibido.
                resp.on('data', (chunk) => {
                    data += chunk
                })
            
                // Toda la respuesta ha sido recibida. Imprimir el resultado.
                resp.on('end', () => {
                   
                    let forCsv
                
                    if(resp.statusCode ===200){
                        
                        csv({
                            ignoreEmpty: true,
                            output: "json"
                        }).fromString(data).then((csvRow)=>{         
                            forCsv = csvRow.map((f)=>{
                                if(f.number){
                                    if(/^[0-9]*$/.test(f.number)){
                                        f.number
                                    }else{
                                        delete f.number
                                    }
    
                                }
                                
                                if(f.hex){
                                    if(/[0-9A-Fa-f]/g.test(f.hex)){
                                        f.hex
                                    }else{
                                        delete f.hex
                                    }
                                }
                            })
                            files.push(csvRow)                      
                            
                        })
                    }
                 
                });
                resp.on("error", (err) => {
                    console.log("Error: " + err.message);
                    
                });
              
            
            })

        } 
        resolve()
    })
            
 }


router.get("/files/data", async(req, res) => {
   
    await getFilesList()
    await getAllFiles(fileList)

    res.json(files)
    
    // Toda la respuesta ha sido recibida. Imprimir el resultado.
  
})



export default router;

