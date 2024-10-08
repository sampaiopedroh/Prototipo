// Função para atualizar a barra de progresso
function atualizarBarraProgresso(id, valor) {
    var barra = document.querySelector("#" + id + " .progress-bar-fill");
    barra.style.width = valor + "%";
  }
  
  // Função para atualizar um elemento específico na página
  function atualizarElemento(id, valor) {
    document.getElementById(id).getElementsByTagName('span')[0].innerHTML = valor;
  }
  
  // Função para atualizar os dados da interface
  function atualizarDados(dados) {
    for (const topico in dados) {
      const valor = dados[topico];
      switch (topico) {
        case "velocidade":
          atualizarElemento("velocidade", "Velocidade: " + valor + " km/h");
          atualizarBarraProgresso("velocidade", parseFloat(valor) / 350 * 100);
          break;
        case "rpm":
          atualizarElemento("rpm", "RPM: " + valor);
          atualizarBarraProgresso("rpm", parseFloat(valor) / 20000 * 100);
          break;
        case "marcha":
          atualizarElemento("marcha", "Marcha: " + valor);
          break;
        case "bateria":
          atualizarElemento("bateria", "Bateria: " + valor + "%");
          atualizarBarraProgresso("bateria", parseFloat(valor));
          break;
        case "distanciaFrente":
          atualizarElemento("distancia-frente", "Distância Frente: " + valor + " cm");
          atualizarBarraProgresso("distancia-frente", parseFloat(valor) / 100);
          break;
        case "distanciaTras":
          atualizarElemento("distancia-tras", "Distância Trás: " + valor + " cm");
          atualizarBarraProgresso("distancia-tras", parseFloat(valor) / 100);
          break;
        case "dht/temperatura": 
          atualizarElemento("temperatura", "Temperatura: " + valor + " °C");
          atualizarBarraProgresso("temperatura", parseFloat(valor) / 50);
          break;
        case "pressaoPneu":
          atualizarElemento("pressao-pneus", "Pressão dos Pneus: " + valor + "%");
          atualizarBarraProgresso("pressao-pneus", parseFloat(valor));
          break;
        case "desgastePneu":
          atualizarElemento("desgaste-pneus", "Desgaste dos Pneus: " + valor + "%");
          atualizarBarraProgresso("desgaste-pneus", parseFloat(valor));
          break;
      }
    }
  }
  
  // Função para obter os dados do servidor
  async function obterDados() {
    try {
      const resposta = await fetch('/dados_sensores');
      const dados = await resposta.json();
      atualizarDados(dados);
    } catch (error) {
      console.error('Erro ao obter dados:', error);
    }
  }
  
  // Chama a função para obter os dados inicialmente
  obterDados();
  
  // Chama a função para obter os dados a cada 1 segundo (ajuste o tempo conforme necessário)
  setInterval(obterDados, 1000);