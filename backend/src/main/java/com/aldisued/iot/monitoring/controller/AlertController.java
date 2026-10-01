package com.aldisued.iot.monitoring.controller;

import com.aldisued.iot.monitoring.service.AlertService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.UUID;
import com.aldisued.iot.monitoring.dto.AlertDto;

@RestController
@RequestMapping("/alerts")
public class AlertController {

  private final AlertService alertService;

  public AlertController(AlertService alertService) {
    this.alertService = alertService;
  }

  @GetMapping("/latest")
  public AlertDto getLatestAlert(@RequestParam UUID sensorId) {
      return this.alertService.findLastAlertBySensorId(sensorId);
  }

}
