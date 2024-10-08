import mqtt from 'mqtt';

const mqttBrokerUrl = 'mqtt://18.119.99.197:1883'; 

const connect = () => {
  const client = mqtt.connect(mqttBrokerUrl);

  client.on('connect', () => {
    console.log('Conectado ao broker MQTT!');
    // Assina todos os tópicos de uma vez (usando wildcard #)
    client.subscribe('/TEF/device001/#'); 
  });

  client.on('error', (err) => {
    console.error('Erro de conexão MQTT:', err);
  });

  return client;
};

export { connect };