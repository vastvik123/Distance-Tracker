var express = require('express');
var app = express();
var https = require('https');
var path=require('path');
var fs=require('fs');

var src=null;
var dest=null;
var s;
app.get('/form', function (req, res) {
    res.sendFile('input.html', {root: path.join(__dirname,'./')});
});



app.get('/submit',function(req,res){
    src=req.query.source;
    dest=req.query.destination;
    
    const file = fs.createWriteStream('temp.json');
    const request = https.get('https://www.mapquestapi.com/directions/v2/route?key=zbfZdfGn9EjNm5PGAWctZcb6GtArGlEX&from='+src+'&to='+dest+'&outFormat=json', function(response) {
    response.pipe(file);
    });
    setTimeout(function(){
        rawdata =fs.readFileSync('temp.json');
        temp = JSON.parse(rawdata);
        s=temp.route.distance;
        console.log(s);
        return res.redirect('submit.html');
        
    },3000);
    
   
});  

app.get('/submit.html',function(req,res){
    fs.writeFileSync("submit.html","The Distance between "+src+" and "+dest+" is "+s+"Km",function(err){
        if(err)
        console.log(err);
    });
    res.sendFile('submit.html', {root: path.join(__dirname,'./')});
});

app.listen(3000);
