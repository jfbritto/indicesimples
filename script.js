
async function obterDados(url, indice) {
	try {
		const dadosEmCache = localStorage.getItem(indice);
		const tempoAtual = new Date().getTime();

		if (dadosEmCache) {
			const dadosArmazenados = JSON.parse(dadosEmCache);

			// Verifica se os dados estão dentro do tempo de validade (1 monuto)
			if (tempoAtual - dadosArmazenados.timestamp < 60 * 1000) {
				exibirLista(dadosArmazenados.data, indice);
				return;
			}
		}

		const response = await fetch(url);
		const data = await response.json();

		const dadosParaCache = {
			timestamp: tempoAtual,
			data: data
		};

		localStorage.setItem(indice, JSON.stringify(dadosParaCache));
		exibirLista(data, indice);
	} catch (error) {
		console.log('Ocorreu um erro:', error);
	}
}

	
function exibirLista(data, indice) {
	const listaResultados = document.getElementById('listaResultados');
	listaResultados.innerHTML = '';
	
	const tituloIndice = document.getElementById('tituloIndice');
	tituloIndice.innerHTML = indice;

	data.forEach(item => {
		const li = document.createElement('li');
		li.textContent = `${item.data} - ${item.valor}`;
		li.classList.add('list-group-item');

		if (item.data.split('/')[2] >= 2022) {
			
			listaResultados.appendChild(li);
		
		}

	});
}
	

obterDados('https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados?formato=json', 'IPCA');


function buscaIndice(indice) {

	const url_indices = {
		'TJSP'      : 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados?formato=json',
		'ORTN'      : 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados?formato=json',
		'UFIR'      : 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados?formato=json',
		'CADERNETA' : 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados?formato=json',
		'IGPDI'     : 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados?formato=json',
		'IGPM'      : 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.189/dados?formato=json', // ok
		'INPC'      : 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.188/dados?formato=json', // ok
		'IPCA'      : 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados?formato=json', // ok
		'SELIC'     : 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados?formato=json',
		'IPC'       : 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados?formato=json',
		'TR'        : 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados?formato=json',
		'TJMG'      : 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados?formato=json',
	}

	// alert(url_indices[indice])
	obterDados(url_indices[indice], indice);
}