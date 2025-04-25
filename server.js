import http from 'http';
import app from './app.js';
//we need more customization or extra features like websocket 
//so using http.createServer using express app in it.
const server = http.createServer(app); //creats http server using nodejs built-in http module using express app to handle incoming request
server.listen(3000, ()=>{
    console.log("Server started on port 3000.");
}); // makes server start listening for incoming requests on a specific port.