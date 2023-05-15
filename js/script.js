async function buscaEndereco(cep) {

    let mensagemErro = document.querySelector('.erro__texto');
    mensagemErro.innerHTML = "";

    try {
        let consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        let consultaCEPConvertida = await consultaCEP.json();

        if (consultaCEPConvertida.erro) {
            throw Error('CEP não existente!');
        }

        let bairro = document.getElementById('bairro');
        let complemento = document.getElementById('complemento');
        let cidade = document.getElementById('cidade');
        let logradouro = document.getElementById('endereco');
        let estado = document.getElementById('estado');

        bairro.value = consultaCEPConvertida.bairro;
        complemento.value = consultaCEPConvertida.complemento;
        cidade.value = consultaCEPConvertida.localidade;
        logradouro.value = consultaCEPConvertida.logradouro;
        estado.value = consultaCEPConvertida.uf;

        console.log(consultaCEPConvertida);

        return consultaCEPConvertida;
    } catch (err) {
        mensagemErro.innerHTML = `
            <p>CEP inválido. Tente novamente!</p>
        `;
    }
}

let cep = document.getElementById('cep');
cep.addEventListener('focusout', () => buscaEndereco(cep.value));