import paho.mqtt.client as mqtt
from flask import Flask, jsonify
import requests

# Dados de conexão MQTT (ajuste para o seu broker)
mqtt_broker = '18.189.31.124'
mqtt_port = 1883
mqtt_topic_prefix = '/TEF/device001/' 

# Dicionário para armazenar os dados dos tópicos
dados_sensores = {}

# Funções de callback MQTT
def on_connect(client, userdata, flags, rc):
    print("Conectado ao broker MQTT!")
    client.subscribe(f"{mqtt_topic_prefix}#")  # Inscreve-se em todos os tópicos sob o prefixo

def on_message(client, userdata, message):
    topic = message.topic.replace(mqtt_topic_prefix, "")
    valor = message.payload.decode()
    dados_sensores[topic] = valor

    # Envia os dados via JSON para o JavaScript
    enviar_dados_json(dados_sensores)

    print(f"Tópico: {topic} - Valor: {valor}")

# Função para enviar dados em JSON para o JavaScript
def enviar_dados_json(dados):
    url = 'http://127.0.0.1:5000/dados_sensores'  # Substitua pelo seu endereço
    response = requests.post(url, json=dados)
    if response.status_code == 200:
        print("Dados enviados com sucesso!")
    else:
        print("Erro ao enviar dados:", response.text)

# Criação da aplicação Flask 
app = Flask(__name__)

# Rota para a página principal (index.html)
@app.route('/')
def index():
    return "<h1>API em execução</h1>"

# Endpoint para o JavaScript receber os dados
@app.route('/dados_sensores')
def get_dados_sensores():
    return jsonify(dados_sensores)

# Configuração do cliente MQTT
mqtt_client = mqtt.Client()
mqtt_client.on_connect = on_connect
mqtt_client.on_message = on_message

# Conexão ao broker MQTT e início do loop
mqtt_client.connect(mqtt_broker, mqtt_port)
mqtt_client.loop_start() 

# Inicia o servidor Flask
if __name__ == '__main__':
    app.run(debug=True)