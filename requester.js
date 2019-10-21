var request = require('request');
const fs = require('fs');
var dir = './resultados';

var options = {
  url: 'https://www.google.com/search?q="transporte"+-site%3Acttu.recife.pe.gov.br+"recife"+AND+"JOCEMAR+CEZAR+CA,PELO+DE+SOUZA"',
  headers: {
	'authority': 'www.google.com.br',
	'pragma': 'no-cache',
	'cache-control': 'no-cache',
	'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36',
	'Sec-Fetch-Mode': 'navigate',
	'Sec-Fetch-User': '?1',
	'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
	'sec-fetch-site': 'none',
	'referer': 'https://www.google.com.br/',
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
	  
	  //catch me if you can
	switch(Math.floor(Math.random() * 4)){
		 //android
		case 0:
		options.headers['user-agent'] = "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Mobile Safari/537.36";
		break;
		
		//iphone
		case 2: 
		options.headers['user-agent'] = "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1";
		break;
		
		//ipad
		case 1: 
		options.headers['user-agent'] = "Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1";
		break;
		
		//pc
		default: 
		options.headers['user-agent'] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36";
		break;
	}
	  
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
