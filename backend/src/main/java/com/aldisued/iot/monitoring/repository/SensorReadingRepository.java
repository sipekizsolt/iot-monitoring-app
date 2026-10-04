package com.aldisued.iot.monitoring.repository;

import com.aldisued.iot.monitoring.entity.SensorReading;
import org.springframework.data.jpa.repository.JpaRepository;
import com.aldisued.iot.monitoring.entity.SensorType;

import java.util.List;
import java.time.LocalDateTime;

public interface SensorReadingRepository extends JpaRepository<SensorReading, String> {
    List<SensorReading> findBySensor_TypeAndTimestampBetween(SensorType type,LocalDateTime rangeStart, LocalDateTime rangeEnd);
    List<SensorReading> findBySensor_TypeAndTimestampBetweenOrderByTimestamp(SensorType type,LocalDateTime rangeStart, LocalDateTime rangeEnd);
}
