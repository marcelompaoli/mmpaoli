//** Troca de Pessoa Física / Jurídica **//
function tipoPessoa() {
    let item = event.target.value;
    if (item === 'PJ') {
        document.querySelector('.pessoaFisica').classList.add('hidden');
        document.querySelector('.pessoaJuridica').classList.remove('hidden');

        document.getElementById("nomeCompleto").required = false;
        document.getElementById("cpf").required = false;

        document.getElementById("nomeFantasia").required = true;
        document.getElementById("razaoSocial").required = true;
        document.getElementById("cnpj").required = true;
    } else {
        document.querySelector('.pessoaJuridica').classList.add('hidden');
        document.querySelector('.pessoaFisica').classList.remove('hidden');

        document.getElementById("nomeFantasia").required = false;
        document.getElementById("razaoSocial").required = false;
        document.getElementById("cnpj").required = false;

        document.getElementById("nomeCompleto").required = true;
        document.getElementById("cpf").required = true;
    }
}

//* Cálculo da Idade **//
function calculoIdade() {
    let dataNascimento = new Date(document.querySelector("#nascimento").value);
    let dataAtual = new Date();
    let diferenca = Math.abs(dataAtual.getTime() - dataNascimento.getTime());
    let varIdade = Math.ceil((diferenca / (1000 * 60 * 60 * 24 * 365) - 1));
    let idadeValue = document.querySelector("#idade");

    if (isNaN(varIdade)) {
        varIdade = 0;
    }
    if (varIdade !== '0') {
        idadeValue.value = varIdade + ' Anos';
    }
    document.querySelector('#dividade').classList.remove('hidden');
}

//** Funções para CEP **//
function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('rua').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
    document.getElementById('uf').value=("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('rua').value=(conteudo.logradouro);
        document.getElementById('bairro').value=(conteudo.bairro);
        document.getElementById('cidade').value=(conteudo.localidade);
        document.getElementById('uf').value=(conteudo.uf);
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {
    //Nova variável "cep" somente com dígitos.
    let cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        let validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('rua').value="...";
            document.getElementById('bairro').value="...";
            document.getElementById('cidade').value="...";
            document.getElementById('uf').value="...";

            //Cria um elemento javascript.
            let script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
}