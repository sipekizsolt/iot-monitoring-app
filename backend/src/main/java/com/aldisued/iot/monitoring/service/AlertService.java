package com.aldisued.iot.monitoring.service;

import com.aldisued.iot.monitoring.dto.AlertDto;
import com.aldisued.iot.monitoring.dto.SensorResponseDto;
import com.aldisued.iot.monitoring.entity.Alert;
import com.aldisued.iot.monitoring.entity.SensorReading;
import com.aldisued.iot.monitoring.entity.Sensor;
import com.aldisued.iot.monitoring.repository.AlertRepository;
import com.aldisued.iot.monitoring.repository.SensorRepository;
import java.util.UUID;
import java.util.List;
import java.time.LocalDateTime;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AlertService {

  private final AlertRepository alertRepository;
  private final SensorRepository sensorRepository;
  private final KafkaTemplate<String, AlertDto> kafkaTemplate;

  public AlertService(AlertRepository alertRepository, SensorRepository sensorRepository,
      KafkaTemplate<String, AlertDto> kafkaTemplate) {
    this.alertRepository = alertRepository;
    this.sensorRepository = sensorRepository;
    this.kafkaTemplate = kafkaTemplate;
  }

  public Alert saveAlert(AlertDto alertDto) {
    Sensor sensor = sensorRepository.findById(alertDto.sensorId())
    .orElseThrow(() -> new RuntimeException("Sensor not found"));

    Alert alert = new Alert(
      alertDto.message(),
      alertDto.timestamp(),
      sensor
  );
    Alert savedAlert = alertRepository.save(alert);
    kafkaTemplate.send("alerts", alertDto);

    return savedAlert;
  }

  public List<AlertDto> getAlerts() {
      return alertRepository.findAll().stream()
      .map(alert -> new AlertDto(alert.getSensor().getId(), alert.getMessage(), alert.getTimestamp()))
      .toList();
  }

  public AlertDto findLastAlertBySensorId(UUID sensorId) {

    Alert latestAlert = alertRepository.findFirstBySensorIdOrderByTimestampDesc(sensorId);
    // Return 404 status if no alert was found
    if (latestAlert == null) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No alert found for sensor");
    }
    return new AlertDto(
        latestAlert.getSensor().getId(),
        latestAlert.getMessage(),
        latestAlert.getTimestamp()
    );
  }
}
