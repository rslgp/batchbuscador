var request = require('request');
const fs = require('fs');
var dir = './resultados';

var options = {
  url: 'https://www.google.com/search?q="transporte"+-site%3Acttu.recife.pe.gov.br+"recife"+AND+"JOCEMAR+CEZAR+CA,PELO+DE+SOUZA"',
  headers: {
	'authority': 'www.google.com',
	'cache-control': 'max-age=0',
	'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36',
	'sec-fetch-mode': 'navigate',
	'sec-fetch-user': '?1',
	'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
	'sec-fetch-site': 'none',
	'accept-language': 'en-US,en;q=0.9,pt;q=0.8'
  }
};
var sites = ['https://www.google.com/search?q="transporte"+-site%3Acttu.recife.pe.gov.br+"recife"+AND+"JOCEMAR+CEZAR+CA,PELO+DE+SOUZA"', 'https://www.google.com/search?q="transporte"+-site%3Acttu.recife.pe.gov.br+"recife"+AND+"2G+TURISMO+EVENTOS+LTDA+ME"', 'https://www.google.com/search?q="transporte"+-site%3Acttu.recife.pe.gov.br+"recife"+AND+"ADASSON+LOPES+DA+SILVA"', 'https://www.google.com/search?q="transporte"+-site%3Acttu.recife.pe.gov.br+"recife"+AND+"ADEILZA+PEDROSA+DA+SILVA"', 'https://www.google.com/search?q="transporte"+-site%3Acttu.recife.pe.gov.br+"recife"+AND+"ADRIANA+GALDINO+GUERRA"'];

var index = 0;
var houveResultado;
var special="";

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

(function theLoop (i) {
  setTimeout(function () {
	options.url = sites[index++];
    request(options, function (error, response, body) {
	    
		if(body.indexOf("Our systems have detected unusual traffic") != -1){ //detected
			var stream = fs.createWriteStream(dir+"/DETECTADO.html");
				stream.once('open', function(fd) {
				  stream.write(body);
				  stream.end();
				});
			console.log("DETECTADO, abra no chrome: "+sites[index-1]);
			throw false; //stop
		}
	    
		try{
			if (error) {
			  throw false;
			}
			
			houveResultado = body.indexOf("No results found") == -1;
			
			//encontrou resultado util pra cruzamento de dados
			special="";
			if(body.indexOf("cnpj.biz") != -1){
				houveResultado = true;
				special="-special"
			}
		}catch(e){
			houveResultado=false;
		}
		if(houveResultado){
		  var stream = fs.createWriteStream(dir+"/"+(index-1)+special+".html");
			stream.once('open', function(fd) {
			  stream.write(body);
			  stream.end();
			});
		}else{
		  console.log("nao houve resultado");
		}
	});
	
    if (--i) {          // If i > 0, keep going
      theLoop(i);       // Call the loop again, and pass it the current value of i
    }
  }, 6000 + (Math.floor(Math.random() * 2200)) );
})(sites.length);
