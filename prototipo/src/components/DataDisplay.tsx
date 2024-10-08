// src/components/DataDisplay.tsx
import React, { useState, useEffect } from 'react';
import GaugeChart from 'react-gauge-chart';
import { connect } from '../mqtt/mqttClient';
import '../styles/DataDisplay.css';

interface TelemetryData {
  distanciaFrente: number;
  distanciaTras: number;
  temperatura: number;
  marcha: number;
  bateria: number;
  pressaoPneu: number;
  desgastePneu: number;
  rpm: number;
  velocidade: number;
}

const DataDisplay: React.FC = () => {
  const [telemetry, setTelemetry] = useState<TelemetryData>({
    distanciaFrente: 0,
    distanciaTras: 0,
    temperatura: 0,
    marcha: 0,
    bateria: 0,
    pressaoPneu: 0,
    desgastePneu: 0,
    rpm: 0,
    velocidade: 0,
  });

  useEffect(() => {
    const client = connect();

    client.on('message', (topic, message) => {
      const value = parseFloat(message.toString());
      const sensor = topic.split('/').pop();

      if (sensor) {
        setTelemetry((prev) => ({ ...prev, [sensor]: value }));
      }
    });

    return () => {
      client.end(); 
    };
  }, []);

  return (
    <div className="data-container">
      <div className="gauge-group">
        <GaugeChart id="bateria" {...gaugeProps(telemetry.bateria, 0, 100, '%')} />
        <p>Bateria</p>
      </div>
      <div className="gauge-group">
        <GaugeChart 
          id="velocidade" 
          {...gaugeProps(telemetry.velocidade, 0, 350, 'Km/h')} 
        />
        <p>Velocidade</p>
      </div>
      <div className="gauge-group">
        <GaugeChart id="rpm" {...gaugeProps(telemetry.rpm, 0, 20000, 'RPM')} />
        <p>RPM</p>
      </div>
      <div className="gauge-group">
        <GaugeChart 
          id="temperatura" 
          {...gaugeProps(telemetry.temperatura, 0, 100, '°C')} 
        />
        <p>Temperatura</p>
      </div>
      <div className="gauge-group">
        <GaugeChart 
          id="pressaoPneu" 
          {...gaugeProps(telemetry.pressaoPneu, 0, 100, '%')} 
        />
        <p>Pressão Pneu</p>
      </div>
      <div className="gauge-group">
        <GaugeChart 
          id="desgastePneu" 
          {...gaugeProps(telemetry.desgastePneu, 0, 100, '%')} 
        />
        <p>Desgaste Pneu</p>
      </div>
      <div className="gauge-group">
        <GaugeChart 
          id="distanciaFrente" 
          {...gaugeProps(telemetry.distanciaFrente, 0, 100, 'cm')} 
        />
        <p>Distância Frente</p>
      </div>
      <div className="gauge-group">
        <GaugeChart 
          id="distanciaTras" 
          {...gaugeProps(telemetry.distanciaTras, 0, 100, 'cm')} 
        />
        <p>Distância Trás</p>
      </div>
      <div className="data-item">
        <p>Marcha: {telemetry.marcha}</p>
      </div>
    </div>
  );
};

// Função auxiliar para propriedades do GaugeChart 
const gaugeProps = (value: number, min: number, max: number, units: string) => ({
  nrOfLevels: 5,
  percent: (value - min) / (max - min), 
  needleColor: '#e51937',
  arcWidth: 0.3,
  formatTextValue: (value) => `${value.toFixed(0)} ${units}`, 
});

export default DataDisplay;