const http= require ("http");
const fu=require("fs")
const server = http.createServer((req,res) => {
    const url=req.url;
    const method=req.method;
    if (url ==="/"){
        res.write("<html>");
        res.write('<head><title>Enter Message</title><head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">next page</button></form></body>');
        res.write("</html>");
        return res.end();
    }
    if (url==='/message' &&  method ==='POST'){
        const b=[]; 
        req.on('data',(cj) => {
            console.log(cj);
            b.push(cj); 
        });
        req.on('end', () => {
            const pb= Buffer.concat(b).toString();
            const ms=pb.split('=')[1];
            fu.writeFileSync("hello.txt", ms);
        });
        
        res.statusCode=302;
        res.setHeader('Location','/');
        return res.end();

    }
    //process.exit();
    res.setHeader("content_Type","text/html");
    res.write("<html>");
    res.write("<head><title>My DOC</title></head>");
    res.write("<body><h1>My First server page</h1></body>");
    res.write("</head>");
    res.end();
});
server.listen(3000);


