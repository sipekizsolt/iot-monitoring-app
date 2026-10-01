package com.aldisued.iot.monitoring.dto;

import com.aldisued.iot.monitoring.entity.SensorType;

import java.util.UUID;

// Created to make sure unique id is sent to the frontend
public record SensorResponseDto(
    UUID id,
    String name,
    SensorType type
) {
}
