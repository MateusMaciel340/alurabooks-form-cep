async function buscaEndereco(cep) {

    try {
        let consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        let consultaCEPConvertida = await consultaCEP.json();

        if (consultaCEPConvertida.erro) {
            throw Error('CEP não existente!');
        }

        console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
    } catch (erro) {
        console.log(erro);
    }
}

let ceps = ['01001000', '01001001'];
let conjuntosCeps = ceps.map(valores => buscaEndereco(valores));

Promise.all(conjuntosCeps).then(respostas => console.log(respostas));