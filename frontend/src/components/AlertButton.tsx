interface AlertButtonProps {
  sensorId: string;
  onClick: (sensorId: string) => void;
}

export function AlertButton({ sensorId, onClick }: AlertButtonProps) {
  return (
    <button className="form-submit" onClick={() => onClick(sensorId)}>
      <span>Alerts</span>
    </button>
  );
}