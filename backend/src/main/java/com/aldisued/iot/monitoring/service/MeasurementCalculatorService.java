package com.aldisued.iot.monitoring.service;


import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class MeasurementCalculatorService {

  public List<Double> filterByAverageDeviation(List<Double> values, Double deviation) {

    if (deviation > 1 || deviation < 0) {
      throw new IllegalArgumentException("Deviation must be between 0 and 1");
    }

    if (values.isEmpty()) {
        return List.of();
    }

    final double sum = values.stream().mapToDouble(Double::doubleValue).sum();
    final double avg = sum / values.size();
    final double min = avg * (1 - deviation);
    final double max = avg * (1 + deviation);

    return values.stream().filter(value -> value >= min && value <= max).toList();
  }

  public List<Double> getMovingAverage(List<Double> data, int windowSize) {

    final int nrOfValues = data.size();

    if (windowSize <= 0) {
      throw new IllegalArgumentException("'windowSize' must be a positive integer");
    }
    if (windowSize > nrOfValues){
      throw new IllegalArgumentException("'windowSize' cannot be bigger than the number of elements in 'data'");
    }

    int offset = 0;
    int nrOfWindows = nrOfValues - windowSize + 1;
    List<Double> movingAverages = new ArrayList<>();

    for (int w = nrOfWindows; w > 0; w--){
      double sum = 0;
      for (int i = offset; i < offset + windowSize; i++) {
        sum += data.get(i);
      }
      movingAverages.add(sum / windowSize);
      offset++;
    }

    return movingAverages;
  }

}
