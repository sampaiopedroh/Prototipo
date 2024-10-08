Dashboard de Telemetria para Fórmula E com ESP32 e React
Este projeto implementa um dashboard de telemetria em tempo real para um carro de Fórmula E simulado, usando um ESP32 para coletar dados e um front-end React para visualizá-los.

Descrição do Projeto
O projeto consiste em duas partes principais:

Dispositivo ESP32:

Coleta dados de sensores simulados representando a telemetria de um carro de Fórmula E, incluindo:

Distância (frente e trás)

Temperatura

Marcha

Nível da bateria

Pressão dos pneus

Desgaste dos pneus

RPM do motor

Velocidade

Publica os dados coletados em um broker MQTT.

Dashboard React:

Se conecta ao broker MQTT.

Assina os tópicos relevantes para receber os dados de telemetria.

Exibe os dados em tempo real usando medidores circulares e outros elementos visuais.

Reproduz um vídeo em loop para simular a visão do piloto.

Funcionalidades
Coleta de dados em tempo real: O ESP32 envia dados de telemetria continuamente para o broker MQTT.

Visualização dinâmica: O dashboard React atualiza os medidores e valores na tela conforme recebe os dados do ESP32.

Interface amigável: O dashboard fornece uma maneira clara e intuitiva de visualizar os dados de telemetria.

Tecnologias Utilizadas
ESP32: Microcontrolador para coletar dados dos sensores e publicar via MQTT.

MQTT: Protocolo de comunicação leve para enviar e receber dados entre o ESP32 e o dashboard.

React: Biblioteca JavaScript para construir a interface de usuário do dashboard.

React Gauge Chart: Biblioteca para criar os medidores circulares.

HTML, CSS e JavaScript (TypeScript): Linguagens de desenvolvimento web para o front-end.

Como Executar o Projeto
Pré-requisitos
Node.js e npm instalados.

Backend (ESP32)
Configurar o ESP32:

Conecte os sensores e configure os pinos corretamente no código do ESP32.

Configure as credenciais de Wi-Fi no código.

Defina o endereço IP do broker MQTT no código.

Carregue o código para o ESP32.

Frontend (React)
Clonar o Repositório:

git clone https://github.com/seu-usuario/formula-e-dashboard.git
Use code with caution.
Bash
Instalar as Dependências:

cd formula-e-dashboard
npm install
Use code with caution.
Bash
Configurar o Broker MQTT:

No arquivo src/mqtt/mqttClient.ts, substitua 'mqtt://seu-endereco-mqtt:1883' pelo endereço correto do seu broker MQTT.

Iniciar o Servidor de Desenvolvimento:

npm start
Use code with caution.
Bash
Isso iniciará o servidor de desenvolvimento e abrirá o dashboard no seu navegador.

Estrutura do Projeto
formula-e-dashboard/
  ├── public/                     # Arquivos públicos (index.html, etc.)
  │   └── seu-video.mp4           # Arquivo de vídeo
  ├── src/                        # Código fonte do React
  │   ├── App.tsx                 # Componente principal do aplicativo
  │   ├── components/             # Componentes React
  │   │   ├── VideoFeed.tsx      # Componente do feed de vídeo
  │   │   ├── DataDisplay.tsx     # Componente de exibição de dados
  │   │   └── ...
  │   ├── styles/                 # Arquivos CSS
  │   │   └── global.css          # Estilos globais
  │   └── mqtt/                   # Lógica de conexão MQTT
  │       └── mqttClient.ts       # Cliente MQTT
  ├── package.json                # Arquivo de configuração do projeto
  └── ...
Use code with caution.
Próximos Passos
Implementar a autenticação MQTT: Se o seu broker MQTT exigir autenticação, adicione as credenciais de usuário e senha no cliente MQTT.

Adicionar mais sensores: Expanda o projeto adicionando mais sensores simulados ou reais ao ESP32.

Melhorar a interface do usuário: Crie um design mais sofisticado e responsivo para o dashboard, adaptando-o a diferentes tamanhos de tela.

Implementar gráficos históricos: Armazene os dados de telemetria e exiba-os em gráficos para análise de desempenho.

Contribuições
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests para relatar problemas, sugerir melhorias ou adicionar novas funcionalidades.

