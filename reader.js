const fs = require('fs');
var dir="./special/"


for(var i=68; i<607; i++){
	try{
	fs.readFile(dir+i+'-special.html', "utf8", function(err, data) {
		if(!err){
			var site = data.indexOf("https://cnpj.biz");
			var encontrado = data.substring(site, site+22+9);
			if(encontrado.indexOf("img")==-1 && encontrado.indexOf(" ")==-1 )console.log(encontrado);
			
		}
		//else console.log("erro"+dir+i+'.html');
  });
	}catch(e){
		console.log(e.message);
	}
}
