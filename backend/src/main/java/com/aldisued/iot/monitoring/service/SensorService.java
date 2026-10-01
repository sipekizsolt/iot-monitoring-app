package com.aldisued.iot.monitoring.service;

import com.aldisued.iot.monitoring.dto.SensorDto;
import com.aldisued.iot.monitoring.dto.SensorResponseDto;
import com.aldisued.iot.monitoring.entity.Sensor;
import com.aldisued.iot.monitoring.repository.SensorRepository;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@Service
public class SensorService {

  private final SensorRepository sensorRepository;

  public SensorService(SensorRepository sensorRepository) {
    this.sensorRepository = sensorRepository;
  }

  public Sensor saveSensor(SensorDto sensor) {
    if (sensor.name() == null) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Sensor name is required");
    }
    if (sensorRepository.existsByName(sensor.name())) {
        throw new ResponseStatusException(HttpStatus.CONFLICT, "Sensor name already exists");
    }
    return sensorRepository.save(new Sensor(
        sensor.name(),
        sensor.type()
    ));
  }

  public List<SensorResponseDto> getSensors() {
      return sensorRepository.findAll().stream()
          .map(sensor -> new SensorResponseDto(sensor.getId(), sensor.getName(), sensor.getType()))
          .toList();
  }
}
