var request = require('request');
const fs = require('fs');
var dir = './resultados';

var options = {
  url: 'https://www.google.com.br/search?q="transporte"+-site%3Acttu.recife.pe.gov.br+"recife"+AND+"JOCEMAR+CEZAR+CA,PELO+DE+SOUZA"',
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
var sites = ["https://cnpj.biz/04157035000351", "https://cnpj.biz/04245725000109", "https://cnpj.biz/07799727000120", "https://cnpj.biz/09045654000106", "https://cnpj.biz/10875040000130", "https://cnpj.biz/12615861000163", "https://cnpj.biz/12884367000102", "https://cnpj.biz/14501788000124", "https://cnpj.biz/14626533000198", "https://cnpj.biz/14910732000123", "https://cnpj.biz/15485641000150", "https://cnpj.biz/15533927000164", "https://cnpj.biz/16655161000153", "https://cnpj.biz/17018358000144", "https://cnpj.biz/17239359000119", "https://cnpj.biz/17998677000163", "https://cnpj.biz/18174488000139", "https://cnpj.biz/18398660000138", "https://cnpj.biz/18413162000117", "https://cnpj.biz/18714335000137", "https://cnpj.biz/18834195000130", "https://cnpj.biz/19306715000103", "https://cnpj.biz/19379089000177", "https://cnpj.biz/19629335000100", "https://cnpj.biz/19866985000160", "https://cnpj.biz/20726781000103", "https://cnpj.biz/22286533000114", "https://cnpj.biz/22569254000168", "https://cnpj.biz/22928890000139", "https://cnpj.biz/23164959000168", "https://cnpj.biz/23262508000163", "https://cnpj.biz/23764972000158", "https://cnpj.biz/23833406000150", "https://cnpj.biz/23860870000136", "https://cnpj.biz/23909482000100", "https://cnpj.biz/23909555000156", "https://cnpj.biz/23909664000173", "https://cnpj.biz/23909767000133", "https://cnpj.biz/23968446000100", "https://cnpj.biz/23996600000157", "https://cnpj.biz/24012159000194", "https://cnpj.biz/24012476000100", "https://cnpj.biz/24015114000173", "https://cnpj.biz/24032296000190", "https://cnpj.biz/24075527000143", "https://cnpj.biz/24265394000178", "https://cnpj.biz/24382741000142", "https://cnpj.biz/24752684000146", "https://cnpj.biz/24811884000122", "https://cnpj.biz/24854180000137", "https://cnpj.biz/26163235000198", "https://cnpj.biz/26252463000134", "https://cnpj.biz/26403197000101", "https://cnpj.biz/26594867000106", "https://cnpj.biz/26765348000163", "https://cnpj.biz/26788541000110", "https://cnpj.biz/26790480000125", "https://cnpj.biz/26801470000148", "https://cnpj.biz/26843062000159", "https://cnpj.biz/26858296000170", "https://cnpj.biz/26909760000100", "https://cnpj.biz/26932941000157", "https://cnpj.biz/27386730000129", "https://cnpj.biz/27657933000102", "https://cnpj.biz/27771017000107", "https://cnpj.biz/28433904000120", "https://cnpj.biz/28854998000100", "https://cnpj.biz/28982785000164", "https://cnpj.biz/29154348000115", "https://cnpj.biz/29329908000125", "https://cnpj.biz/29333787000195", "https://cnpj.biz/29347362000135", "https://cnpj.biz/29401862000108", "https://cnpj.biz/29496633000114", "https://cnpj.biz/29574179000172", "https://cnpj.biz/29637630000153", "https://cnpj.biz/29730358000151", "https://cnpj.biz/30548726000124", "https://cnpj.biz/30844283000119", "https://cnpj.biz/30942459000175", "https://cnpj.biz/31203163000103", "https://cnpj.biz/31349762000121", "https://cnpj.biz/31543758000108", "https://cnpj.biz/31753082000179", "https://cnpj.biz/31844829000102", "https://cnpj.biz/32123997000163", "https://cnpj.biz/32234200000103", "https://cnpj.biz/32242781000117", "https://cnpj.biz/32247685000161", "https://cnpj.biz/32320540000149", "https://cnpj.biz/32341872000100", "https://cnpj.biz/32352888000118", "https://cnpj.biz/32407097000148", "https://cnpj.biz/32409729000102", "https://cnpj.biz/32866586000168", "https://cnpj.biz/33543651000187", "https://cnpj.biz/33674596000164", "https://cnpj.biz/34126898000160"];

var index = 0;
var houveResultado;
var special="";

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

(function theLoop (i) {
  setTimeout(function () {
	options.url = sites[index++];
	var mudaroagent = Math.floor(Math.random() * 101);
	if(mudaroagent<35){
		var agentChooser = Math.floor(Math.random() * 4);
		switch(agentChooser){
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
			options.headers['user-agent'] = "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Mobile Safari/537.36";
			break;
		}
	}
	
    request(options, function (error, response, body) {
		if(body!=undefined){
			if(body.indexOf("Recife") != -1 && body.indexOf("49.24-8-00") != -1 || body.indexOf("estudantes") != -1){
				var teli= body.indexOf("<p>Telefone(s):");
				var telefones = body.substring(teli, body.indexOf("</p",teli));
				
				var nomei= body.indexOf("Razão Social");
				var nome = body.substring(nomei, body.indexOf("Tipo",nomei));
				
				var bairroi= body.indexOf("Bairro");
				var bairro = body.substring(bairroi, body.indexOf("CEP",bairroi));
				
				console.log(sites[index-1]+" , "+nome+" , "+telefones+" , "+bairro);
			}
		}
	});
	
    if (--i) {          // If i > 0, keep going
      theLoop(i);       // Call the loop again, and pass it the current value of i
    }
  }, 2000 );
})(sites.length);
