import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/routes/index.js';

chai.should();

chai.use(chaiHttp);

describe('Router', ()=>{
    it("Debe listar todos los archivos formateados", ()=>{
        chai.request(app)
        .get("/files/data")
        .end((err,response) => {
            response.should.have.status(200);
            response.body.should.be.a('array');
 
        })
    })

    it("Debe devolver 404 con urls no definidas", ()=>{
        chai.request(app)
        .get("/files/dataa")
        .end((err,response) => {
            response.should.have.status(404);
         
        })
    })
    
})