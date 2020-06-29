//* Cálculo da Idade **//
document.querySelector("#nascimento").addEventListener('blur', e => {
    let dataNascimento = new Date(document.querySelector("#nascimento").value);
    let dataAtual = new Date();
    let diferenca = Math.abs(dataAtual.getTime() - dataNascimento.getTime());
    let idade = Math.ceil((diferenca / (1000 * 60 * 60 * 24 * 365) - 1));
    let idadeValue = document.querySelector("#idade");

    if (idade != '0') {
        idadeValue.value = idade;
    }
    document.querySelector('#dividade').classList.remove('hidden');
});

//** Troca de Pessoa Jurídica e Física **//
function pessoa(e) {

    if (document.querySelector('input[name="pessoa"]')) {
        document.querySelectorAll('input[name="pessoa"]').forEach((elem) => {
            elem.addEventListener("change", function (event) {
                var item = event.target.value;
                if (item === 'PJ') {
                    document.querySelector('.pessoafisica').classList.add('hidden');
                    document.querySelector('.pessoajuridica').classList.remove('hidden');
                } else {
                    document.querySelector('.pessoajuridica').classList.add('hidden');
                    document.querySelector('.pessoafisica').classList.remove('hidden');
                }
            });
        });
    }

}
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

//** CEP  **//
function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('rua').value="...";
            document.getElementById('bairro').value="...";
            document.getElementById('cidade').value="...";
            document.getElementById('uf').value="...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

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
};
/* document.querySelector('.open-menu').addEventListener('click', e => {
    document.querySelector('header .menu').classList.add('open');
});

document.querySelector('.close-menu button').addEventListener('click', e => {
    document.querySelector('header .menu').classList.remove('open');
});

document.querySelector('.menu .backdrop').addEventListener('click', e => {
    document.querySelector('header .menu').classList.remove('open');
}); */