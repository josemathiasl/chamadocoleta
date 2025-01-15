document.addEventListener('DOMContentLoaded', () => {
    // Elementos para os botões
    const gerarChamadoButton = document.getElementById('gerarChamadoButton');
    const limparFormularioButton = document.getElementById('limparFormularioButton');
    const saidaCampo = document.getElementById('saida');
    const saidaChamado = document.getElementById('saidaChamado');

    // Função para remover acentos e caracteres especiais
    function removerAcentos(texto) {
        const mapaAcentos = {
            'á': 'a', 'à': 'a', 'ã': 'a', 'â': 'a', 'ä': 'a', 'å': 'a', 'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
            'í': 'i', 'ì': 'i', 'î': 'i', 'ï': 'i', 'ó': 'o', 'ò': 'o', 'õ': 'o', 'ô': 'o', 'ö': 'o', 'ú': 'u',
            'ù': 'u', 'û': 'u', 'ü': 'u', 'ç': 'c', 'ñ': 'n', 'Á': 'A', 'À': 'A', 'Ã': 'A', 'Â': 'A', 'Ä': 'A',
            'Å': 'A', 'É': 'E', 'È': 'E', 'Ê': 'E', 'Ë': 'E', 'Í': 'I', 'Ì': 'I', 'Î': 'I', 'Ï': 'I', 'Ó': 'O',
            'Ò': 'O', 'Õ': 'O', 'Ô': 'O', 'Ö': 'O', 'Ú': 'U', 'Ù': 'U', 'Û': 'U', 'Ü': 'U', 'Ç': 'C', 'Ñ': 'N'
        };

        return texto.replace(/[áàãâäåéèêëíìîïóòõôöúùûüçñÁÀÃÂÄÅÉÈÊËÍÌÎÏÓÒÕÔÖÚÙÛÜÇÑ]/g, (match) => mapaAcentos[match]);
    }

    // Função para gerar e exibir o chamado
    gerarChamadoButton.addEventListener('click', () => {
        // Coleta de informações do formulário
        const ctofttai = removerAcentos(document.getElementById('ctofttai').value.toUpperCase());
        const ctoFtta = removerAcentos(document.getElementById('ctoFtta').value.toUpperCase());
        const potencia = removerAcentos(document.getElementById('potencia').value.toUpperCase());
        const periodo = removerAcentos(document.getElementById('periodo').value.toUpperCase());

        // Coleta dos serviços extras selecionados
        const pontoExtraSelecionado = document.getElementById('instalacaoPontoExtra').value;
        const isencaoOS = document.getElementById('isençãoOS').checked;
        const nomeSupervisorIsencao = removerAcentos(document.getElementById('nomeSupervisorIsencao').value.toUpperCase
        ());

        // Coleta dos alarmes selecionados
        const alarmes = Array.from(document.querySelectorAll('input[name="alarmes"]:checked')).map(checkbox => checkbox.value);

        // Coleta dos custos adicionais selecionados
        const custos = Array.from(document.querySelectorAll('input[name="custos"]:checked')).map(checkbox => checkbox.value);

        // Coleta das observações
        const observacoes = removerAcentos(document.getElementById('observacoes').value.toUpperCase());

        // Mensagem final condicional para isenção de OS
        let mensagemFinal = '';
        if (!isencaoOS) {
            mensagemFinal = `CLIENTE CIENTE DOS CUSTOS DE R$ 50,00 HORA TÉCNICA + MATERIAIS NECESSÁRIOS (VARIÁVEIS) CASO CONSTATADO DANOS A ESTRUTURA OU AOS EQUIPAMENTOS, OU SE CONSTATADO QUE O PROBLEMA FOI CAUSADO PELO CLIENTE.\n\nCLIENTE CIENTE DO PRAZO MÁXIMO DE ATENDIMENTO DE ATÉ 48 HORAS.`; 
        }

        // Função para processar as informações do cliente
        function processarInformacoes() {
            // Obtém o texto inserido pelo usuário
            let texto = document.getElementById("infoCliente").value;

            // Função para remover acentos e transformar em maiúsculas
            function removerAcentosETornarMaiusculas(str) {
                const acentuado = 'áàãâäéèêëíìîïóòõôöúùûüç';
                const normal = 'aaaaaeeeeiiioooouuuuc';
                let novaStr = str.toUpperCase();
                for (let i = 0; i < acentuado.length; i++) {
                    novaStr = novaStr.replace(new RegExp(acentuado[i], 'g'), normal[i]);
                }
                return novaStr;
            }

            // Expressões regulares para capturar as informações
            const regexCliente = /Nome do Cliente:\s*(.*?)\n/;
            const regexId = /ID do Cliente:\s*(\d+)/;
            const regexTelefone = /Telefone de Contato:\s*(.*?)\n/;
            const regexEndereco = /Endereço de Instalação:\s*(.*?)\n/;
            const regexReferencia = /Ponto de Referência:\s*(.*?)\n/;
            const regexPppoe = /PPPoE:\s*(.*?)\n/;

            // Extração das informações usando as expressões regulares
            let cliente = texto.match(regexCliente) ? texto.match(regexCliente)[1] : "";
            let id = texto.match(regexId) ? texto.match(regexId)[1] : "";
            let telefone = texto.match(regexTelefone) ? texto.match(regexTelefone)[1] : "";
            let endereco = texto.match(regexEndereco) ? texto.match(regexEndereco)[1] : "";
            let referencia = texto.match(regexReferencia) ? texto.match(regexReferencia)[1] : "";
            let pppoe = texto.match(regexPppoe) ? texto.match(regexPppoe)[1] : "";

            // Atualiza os campos com as informações extraídas
            return `
        CLIENTE: ${removerAcentosETornarMaiusculas(cliente)}____
        CONTATO: ${removerAcentosETornarMaiusculas(telefone)}____
        ENDERECO: ${removerAcentosETornarMaiusculas(endereco)}____
         PONTO DE REFERENCIA: ${removerAcentosETornarMaiusculas(referencia)}____
        ID: ${removerAcentosETornarMaiusculas(id)}____
        PPPoE: ${pppoe}____
            `;
        }

        // Gerar o conteúdo do chamado
        let chamadoTexto = ` 
       \n
       ________________INFORMACOES CLIENTE_____________
       ${processarInformacoes()}

       ________________INFORMACOES TÉCNICAS____________
       ${ctoFtta}:${ctofttai}___
       POTENCIA:${potencia}____
       PERIODO:${periodo}___
       ___________________OBSERVACOES___________________ 
       ${observacoes ? observacoes : 'Nenhuma observação fornecida.'}
       _____________________ALARMES_____________________ 
       ${alarmes.length > 0 ? alarmes.join('\n        ') : 'Nenhum alarme selecionado.'} 
       
       ________________CUSTOS ADICIONAIS________________ 
       ${custos.length > 0 ? custos.join('\n        ') : 'Nenhum custo adicional selecionado.'} 
       
       _____________________SERVICOS____________________ 
       ${pontoExtraSelecionado ? `Ponto Extra: ${pontoExtraSelecionado}` : 'Nenhum serviço extra selecionado.'} 
       ${isencaoOS ? `ORDEM DE SERVIÇO ISENTA CONFORME ACORDADO COM (Supervisor: ${nomeSupervisorIsencao})` : ''} 
       
       ${mensagemFinal} 
        `;

        // Exibe a saída gerada
        saidaChamado.textContent = chamadoTexto;
        saidaCampo.style.display = 'none';

        // Copiar a saída gerada para a área de transferência
        navigator.clipboard.writeText(chamadoTexto).then(() => {
            alert('Chamado gerado e copiado para a área de transferência!');
        }).catch(err => {
            alert('Erro ao copiar o chamado: ' + err);
        });
    });

    // Função para limpar o formulário
    limparFormularioButton.addEventListener('click', () => {
        document.getElementById('formulario').reset(); // Reseta todos os campos do formulário
        saidaCampo.style.display = 'none'; // Esconde a área de saída
        saidaChamado.textContent = ''; // Limpa o texto da saída
    });

    // Exibe a área de saída
    saidaCampo.style.display = 'block';
});

// Função para alternar a visibilidade das seções de Instalação/Troca de Endereço e Serviços Extras
function toggleSection(sectionId) {
    const sectionContent = document.getElementById(sectionId);
    if (sectionContent.style.display === 'none' || sectionContent.style.display === '') {
        sectionContent.style.display = 'block';
    } else {
        sectionContent.style.display = 'none';
    }
}
function exibirInfoTecnicas() {
    const ctoFtta = document.getElementById('ctoFtta').value.trim();
    const potencia = document.getElementById('potencia').value.trim();

    const infoTecnicasContent = ctoFtta && potencia 
        ? `CTO/FTTA: ${ctoFtta}, POTÊNCIA: ${potencia}`
        : 'Nenhuma observação fornecida.';

    // Exibe a saída no console ou em um elemento HTML
    console.log(infoTecnicasContent);

    const resultadoDiv = document.getElementById('resultado');
    if (resultadoDiv) {
        resultadoDiv.textContent = infoTecnicasContent;
    }
}