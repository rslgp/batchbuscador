var request = require('request');
const fs = require('fs');
var dir = './resultados';

var options = {
  url: 'https://www.google.com/search?q="transporte"+-site%3Acttu.recife.pe.gov.br+"recife"+AND+"JOCEMAR+CEZAR+CA,PELO+DE+SOUZA"',
  headers: {
	'Connection': 'keep-alive',
	'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36',
	'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
	'referer': 'https://www.google.com.br/',
	'accept-language': 'en-US,en;q=0.9,pt;q=0.8'
  }
};
//nova fonte confiavel https://br.mundopsicologos.com/consultorios/terapia-cognitivo-comportamental/recife
var sites = ["http://www.atcpe.org.br/associados/adamastor-neves/", "http://www.atcpe.org.br/associados/adriana-cristina-cavalcanti/", "http://www.atcpe.org.br/associados/adriana-galvao-rocha/", "http://www.atcpe.org.br/associados/alemburegio/", "http://www.atcpe.org.br/associados/alessandra-gerlane/", "http://www.atcpe.org.br/associados/alessandrocavalcante/", "http://www.atcpe.org.br/associados/alexandre-barbosa/", "http://www.atcpe.org.br/associados/alexandro-andrade/", "http://www.atcpe.org.br/associados/alexsandra-maria-arruda/", "http://www.atcpe.org.br/associados/alice-lima/", "http://www.atcpe.org.br/associados/aliria-vana-viana/", "http://www.atcpe.org.br/associados/amanda-lins/", "http://www.atcpe.org.br/associados/amandaaraujo/", "http://www.atcpe.org.br/associados/amauryjunior/", "http://www.atcpe.org.br/associados/ana-berenguer/", "http://www.atcpe.org.br/associados/ana-julia/", "http://www.atcpe.org.br/associados/ana-monica-melo/", "http://www.atcpe.org.br/associados/ana-teodora/", "http://www.atcpe.org.br/associados/analgbezerra-alves/", "http://www.atcpe.org.br/associados/analuciaazevedo/", "http://www.atcpe.org.br/associados/anamere-remigio/", "http://www.atcpe.org.br/associados/anapaulaximenes/", "http://www.atcpe.org.br/associados/andre-daconti-menezes/", "http://www.atcpe.org.br/associados/andre-luiz-dos-santos/", "http://www.atcpe.org.br/associados/andre-rodrigo-mota/", "http://www.atcpe.org.br/associados/angelaorico/", "http://www.atcpe.org.br/associados/barbara-leodegario/", "http://www.atcpe.org.br/associados/beneriadonato/", "http://www.atcpe.org.br/associados/biancafelizardo/", "http://www.atcpe.org.br/associados/bruna-bastos/", "http://www.atcpe.org.br/associados/bruna-rodrigues/", "http://www.atcpe.org.br/associados/camila-kerolayne/", "http://www.atcpe.org.br/associados/camilastor/", "http://www.atcpe.org.br/associados/carla-fabricia-gomes/", "http://www.atcpe.org.br/associados/carlos-fernando/", "http://www.atcpe.org.br/associados/carolina-klaus-diniz/", "http://www.atcpe.org.br/associados/carolinacosta/", "http://www.atcpe.org.br/associados/catarinadias/", "http://www.atcpe.org.br/associados/chris-emanuelle/", "http://www.atcpe.org.br/associados/cintia-lima/", "http://www.atcpe.org.br/associados/cirleide-santos/", "http://www.atcpe.org.br/associados/claudemir-bispo/", "http://www.atcpe.org.br/associados/claudenicesilva/", "http://www.atcpe.org.br/associados/claudia-maciel/", "http://www.atcpe.org.br/associados/claudilene-bezerra-cabral/", "http://www.atcpe.org.br/associados/clebersongaldino/", "http://www.atcpe.org.br/associados/clenesmendes/", "http://www.atcpe.org.br/associados/cristianerysthon/", "http://www.atcpe.org.br/associados/cynthia-maria-tenorio/", "http://www.atcpe.org.br/associados/danielly-lins/", "http://www.atcpe.org.br/associados/denise-de-melo-peixoto/", "http://www.atcpe.org.br/associados/denise-mayra-lima-martins/", "http://www.atcpe.org.br/associados/diego-lima-gomes/", "http://www.atcpe.org.br/associados/dilane-nichols/", "http://www.atcpe.org.br/associados/diogo-emmanuel-lucena-dos-santos/", "http://www.atcpe.org.br/associados/doeris-pereira-de-santana/", "http://www.atcpe.org.br/associados/duard-lisboa/", "http://www.atcpe.org.br/associados/ecilenebarbosa/", "http://www.atcpe.org.br/associados/ednaldo-marcelo-miranda/", "http://www.atcpe.org.br/associados/eduardo-henrique-arruda/", "http://www.atcpe.org.br/associados/edvanete-p-carvalho/", "http://www.atcpe.org.br/associados/elenacristina/", "http://www.atcpe.org.br/associados/elienesarmento/", "http://www.atcpe.org.br/associados/elizio-jose/", "http://www.atcpe.org.br/associados/emanuella-miranda-assuncao/", "http://www.atcpe.org.br/associados/emmanuelle-r-alves-fontenelle/", "http://www.atcpe.org.br/associados/ericka-marta-dias/", "http://www.atcpe.org.br/associados/eunice-magalhaes/", "http://www.atcpe.org.br/associados/evelyn-olimpia/", "http://www.atcpe.org.br/associados/fabiana-petribu/", "http://www.atcpe.org.br/associados/fabio-henrique/", "http://www.atcpe.org.br/associados/fatima-salgueiro/", "http://www.atcpe.org.br/associados/fatimacastrodepaiva/", "http://www.atcpe.org.br/associados/felipe-leitao/", "http://www.atcpe.org.br/associados/fernanda-freire-de-lira/", "http://www.atcpe.org.br/associados/fernanda-vilar-cavalcanti/", "http://www.atcpe.org.br/associados/fernandalima/", "http://www.atcpe.org.br/associados/flavia-rios/", "http://www.atcpe.org.br/associados/flavio-augusto-de-melo/", "http://www.atcpe.org.br/associados/flavio-minervino/", "http://www.atcpe.org.br/associados/gabriel-medeiros/", "http://www.atcpe.org.br/associados/gabriela-alexandre/", "http://www.atcpe.org.br/associados/gabriela-almeida/", "http://www.atcpe.org.br/associados/geizzacarol/", "http://www.atcpe.org.br/associados/genyaraujo/", "http://www.atcpe.org.br/associados/gil-santos-2/", "http://www.atcpe.org.br/associados/gilbertodemoura/", "http://www.atcpe.org.br/associados/henrique-faria-de-sousa/", "http://www.atcpe.org.br/associados/huirllayane-mirtys/", "http://www.atcpe.org.br/associados/igorlemos/", "http://www.atcpe.org.br/associados/inayara-sa-riether/", "http://www.atcpe.org.br/associados/ingrid-natacha/", "http://www.atcpe.org.br/associados/irlanda-bezerra-da-silva/", "http://www.atcpe.org.br/associados/irlanda-bezerra/", "http://www.atcpe.org.br/associados/isabel-carolina-fonseca/", "http://www.atcpe.org.br/associados/isabela-schuler-da-cunha/", "http://www.atcpe.org.br/associados/isabelle-carmellino/", "http://www.atcpe.org.br/associados/ivana-cristina-cavalcanti-vidal-de-lima/", "http://www.atcpe.org.br/associados/jaciel-fabiano-barros-da-silva/", "http://www.atcpe.org.br/associados/jane-cavalcanti-2/", "http://www.atcpe.org.br/associados/janildareis/", "http://www.atcpe.org.br/associados/jefferson-souza/", "http://www.atcpe.org.br/associados/jeffersontorres/", "http://www.atcpe.org.br/associados/jenefferlibia/", "http://www.atcpe.org.br/associados/jessica-targino-albuquerque/", "http://www.atcpe.org.br/associados/jeysiel-marcos/", "http://www.atcpe.org.br/associados/jose-airton/", "http://www.atcpe.org.br/associados/jose-francisco-de-arruda-filho/", "http://www.atcpe.org.br/associados/josepadilha/", "http://www.atcpe.org.br/associados/josespencer/", "http://www.atcpe.org.br/associados/joyce-sueely-goncalves/", "http://www.atcpe.org.br/associados/juditealves/", "http://www.atcpe.org.br/associados/juliana-teixeira-do-amaral/", "http://www.atcpe.org.br/associados/julianafernandes/", "http://www.atcpe.org.br/associados/julianna-gustavo-cavalcanti/", "http://www.atcpe.org.br/associados/jullyanna-de-lima/", "http://www.atcpe.org.br/associados/kamilla-cardeal/", "http://www.atcpe.org.br/associados/katarina-araujo/", "http://www.atcpe.org.br/associados/katia-paes/", "http://www.atcpe.org.br/associados/katiaboulitreau/", "http://www.atcpe.org.br/associados/katialeao/", "http://www.atcpe.org.br/associados/katiapetribu/", "http://www.atcpe.org.br/associados/kilda-cezar/", "http://www.atcpe.org.br/associados/lailakurtinaitis/", "http://www.atcpe.org.br/associados/laise-gomes-leal-novaes/", "http://www.atcpe.org.br/associados/larissa-alves/", "http://www.atcpe.org.br/associados/leiaandrade/", "http://www.atcpe.org.br/associados/leilarocha/", "http://www.atcpe.org.br/associados/leonardo-machado/", "http://www.atcpe.org.br/associados/leopoldobarbosa/", "http://www.atcpe.org.br/associados/leticia-pimentel/", "http://www.atcpe.org.br/associados/leticia-santana/", "http://www.atcpe.org.br/associados/louisefrias/", "http://www.atcpe.org.br/associados/louisemustafa/", "http://www.atcpe.org.br/associados/luciana-chagas/", "http://www.atcpe.org.br/associados/luciana-francisca-cordeiro/", "http://www.atcpe.org.br/associados/luciana-maria-galvao-guedes-alcoforado/", "http://www.atcpe.org.br/associados/luciana-tavares-lobo/", "http://www.atcpe.org.br/associados/lucianabarros/", "http://www.atcpe.org.br/associados/lucianabraine/", "http://www.atcpe.org.br/associados/lucianacarla/", "http://www.atcpe.org.br/associados/lucianagropo/", "http://www.atcpe.org.br/associados/luciene-santos/", "http://www.atcpe.org.br/associados/lucimaryserapiao/", "http://www.atcpe.org.br/associados/marcelo-lindemberg/", "http://www.atcpe.org.br/associados/marcia-maria-florencio-2/", "http://www.atcpe.org.br/associados/margarida-andrade/", "http://www.atcpe.org.br/associados/maria-aparecida-albuquerque/", "http://www.atcpe.org.br/associados/maria-eduarda-bezerra/", "http://www.atcpe.org.br/associados/maria-eduarda-pessoa/", "http://www.atcpe.org.br/associados/maria-eduarda-silva/", "http://www.atcpe.org.br/associados/maria-fernanda-almeida/", "http://www.atcpe.org.br/associados/maria-helena-caldas/", "http://www.atcpe.org.br/associados/maria-jose-moura-de-oliveira/", "http://www.atcpe.org.br/associados/maria-lucia-da-silva-oliveira/", "http://www.atcpe.org.br/associados/maria-luiza-ferreira/", "http://www.atcpe.org.br/associados/mariaaragao/", "http://www.atcpe.org.br/associados/mariaeduardacosta/", "http://www.atcpe.org.br/associados/marianalira/", "http://www.atcpe.org.br/associados/marilia-martins/", "http://www.atcpe.org.br/associados/marlaneluz/", "http://www.atcpe.org.br/associados/martina-ferraz/", "http://www.atcpe.org.br/associados/maureen-cassimiro-pereira/", "http://www.atcpe.org.br/associados/mayara-amorim/", "http://www.atcpe.org.br/associados/mayllane-costa/", "http://www.atcpe.org.br/associados/maysa-suelma-palmeira/", "http://www.atcpe.org.br/associados/micheline-lira-do-nascimento/", "http://www.atcpe.org.br/associados/moacyr-ferreira-pires-filho/", "http://www.atcpe.org.br/associados/natalia-regina-gomes-leal-campos/", "http://www.atcpe.org.br/associados/nathdellasanta/", "http://www.atcpe.org.br/associados/nice-muniz/", "http://www.atcpe.org.br/associados/osanagama/", "http://www.atcpe.org.br/associados/patricia-maria-guimaraes/", "http://www.atcpe.org.br/associados/patricia-soares/", "http://www.atcpe.org.br/associados/patriciainteraminense-2/", "http://www.atcpe.org.br/associados/paulo-brito/", "http://www.atcpe.org.br/associados/pollyanna-regina-gomes/", "http://www.atcpe.org.br/associados/priscila-francine-goncalves-da-silva/", "http://www.atcpe.org.br/associados/priscilla-jessica-santos/", "http://www.atcpe.org.br/associados/rafaella-silveira/", "http://www.atcpe.org.br/associados/raquel-cantalice-costa/", "http://www.atcpe.org.br/associados/reginetepereira/", "http://www.atcpe.org.br/associados/renata-magalhaes/", "http://www.atcpe.org.br/associados/renata-maria-da-guarda/", "http://www.atcpe.org.br/associados/renata-patricia-tavares-de-lucena/", "http://www.atcpe.org.br/associados/renatarodrigues/", "http://www.atcpe.org.br/associados/risolene-martins/", "http://www.atcpe.org.br/associados/rita-de-cassia-batista/", "http://www.atcpe.org.br/associados/rosalina-maria-dantas/", "http://www.atcpe.org.br/associados/rosanarodrigues/", "http://www.atcpe.org.br/associados/rosangelaacioli/", "http://www.atcpe.org.br/associados/rosangelapaes/", "http://www.atcpe.org.br/associados/rosangelapinheiro/", "http://www.atcpe.org.br/associados/rosiane-oliveira/", "http://www.atcpe.org.br/associados/rosilda-santos-linhares/", "http://www.atcpe.org.br/associados/rucenita-leite-de-queiroz/", "http://www.atcpe.org.br/associados/ruy-wanderley-neto/", "http://www.atcpe.org.br/associados/samid-danielle-costa/", "http://www.atcpe.org.br/associados/sandra-cabral/", "http://www.atcpe.org.br/associados/sandra-maria-gomes/", "http://www.atcpe.org.br/associados/sandraminssen/", "http://www.atcpe.org.br/associados/scgracas/", "http://www.atcpe.org.br/associados/silvana-milet/", "http://www.atcpe.org.br/associados/silvana-silveira/", "http://www.atcpe.org.br/associados/silvanarenata/", "http://www.atcpe.org.br/associados/silviaazevedo/", "http://www.atcpe.org.br/associados/simone-claudia/", "http://www.atcpe.org.br/associados/simone-souza/", "http://www.atcpe.org.br/associados/simonebarros/", "http://www.atcpe.org.br/associados/solange-de-lima-martins/", "http://www.atcpe.org.br/associados/suelymendonca/", "http://www.atcpe.org.br/associados/suelysantana/", "http://www.atcpe.org.br/associados/suzanasilva/", "http://www.atcpe.org.br/associados/suzy-vaz/", "http://www.atcpe.org.br/associados/talitha-alexandrina/", "http://www.atcpe.org.br/associados/tatiana-araujo-bertulino-da-silva/", "http://www.atcpe.org.br/associados/tatiana-carla-fraga-figueiroa-de-faria/", "http://www.atcpe.org.br/associados/tereza-lima/", "http://www.atcpe.org.br/associados/valeria-cabral-chaves/", "http://www.atcpe.org.br/associados/valeria-cabral/", "http://www.atcpe.org.br/associados/vanialacerda/", "http://www.atcpe.org.br/associados/vaniaolivier/", "http://www.atcpe.org.br/associados/victoria/", "http://www.atcpe.org.br/associados/virginia-toscano-allain-teixeira/", "http://www.atcpe.org.br/associados/wanda-waleria-leite-lourenco/", "http://www.atcpe.org.br/associados/wanezzasilva/", "http://www.atcpe.org.br/associados/yasmin-da-costa/"];

var index = 0;
var houveResultado;
var special="", plano="";

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

(function theLoop (i) {
  setTimeout(function () {
	options.url = sites[index++];
		  
    request(options, function (error, response, body) {	    
	    
		try{
			if (error) {
			  throw false;
			}			
			
			houveResultado=false;
			//encontrou resultado util pra cruzamento de dados
			special="";
			plano="";
			if(
			body.indexOf("Recife") != -1
			
			&& body.indexOf("Boa Viagem,") == -1 
			&& body.indexOf("Olinda,") == -1 
			&& body.indexOf("Pina,") == -1 
			&& body.indexOf("Garanhuns,") == -1 
			&&			 
			(body.indexOf("Cognitive") != -1 
			|| body.indexOf("Behavioral") != -1 
			||  body.indexOf("Cognitivo") != -1
			||  body.indexOf("Comportamental") != -1
			)){
							
					houveResultado = true;
					special="-special"
				
			}
			
			if(body.indexOf('Sim<') != -1){
				plano="-plano";
			}
			
		}catch(e){
			houveResultado=false;
		}
		if(houveResultado){
		  var stream = fs.createWriteStream(dir+"/"+(index-1)+special+plano+".html");
		  console.log("sucesso "+i);
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
  }, 1 + (Math.floor(Math.random() * 2200)) );
})(sites.length);
