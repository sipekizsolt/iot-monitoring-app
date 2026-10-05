# Fullstack Monitoring — Interview Exercise

This repository contains two independent parts of the exercise. Each has its
own task list — start there:

- **Backend (Spring Boot / Java):** [`backend/TASKS.md`](backend/TASKS.md)
- **Frontend (Angular):** [`frontend/TASK.md`](frontend/TASK.md)

Read the task file for the part you're working on first; it explains the
setup steps, requirements, and how your work will be verified (e.g. which
test classes to run).

# Solution

**Notes**:
- Live demo: https://sipekizsolt.hu/iot-monitoring/ (Kafka does not work here)
- During development, "spring.jpa.hibernate.ddl-auto=update" was used to inspect data in the db.

**Backend**:
- An .env file is being used for variables DB_USERNAME, DB_PASSWORD and DB_URL. The file needs to be created in folder backend/ to run the app locally.
- Improvement ideas: 
    - add sensorType to alertDto
    - create configurable services for alerts based on sensorReading thresholds/business rules
    - add endpoints for CRUD operations to manage records from the frontend.

**Frontend**:
- React was used instead of Angular (as discussed on Teams)
- An .env.development and an .env.production file were created to separate dev and live hosts. No need to create new file for running locally.
- Improvement ideas: 
    - scalability:
        - implement pagination in case of big amount of alerts
        - avoid re-rendering on each incoming data - query db only when needed
        - add filtering possibility for Sensors and Alerts
    - add tests for important functionalities and automate them in Github CI/CD pipelines
    - create admin page to manage thresholds/rules/properties
    - enable CRUD operations on alerts and sensors
    - add reports/statistics