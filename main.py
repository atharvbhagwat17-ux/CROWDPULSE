
import cv2
from ultralytics import YOLO
model = YOLO("yolov8n.pt")

def get_risk(count):

    if count < 5:
        return "LOW"

    elif count < 15:
        return "MEDIUM"

    else:
        return "HIGH"
    
video = cv2.VideoCapture("crowd.mp4")

while True:

    success, frame = video.read()

    if not success:
        break

    height, width, _ = frame.shape

    mid_x = width // 2
    mid_y = height // 2

    zone_a = 0
    zone_b = 0
    zone_c = 0
    zone_d = 0

    results = model(frame)

    people_count = 0

    for box in results[0].boxes:

        class_id = int(box.cls[0])

        if class_id == 0:

            people_count += 1

            x1, y1, x2, y2 = map(int, box.xyxy[0])

            cv2.rectangle(
                frame,
                (x1, y1),
                (x2, y2),
                (0, 255, 0),
                2
            )

            center_x = (x1 + x2) // 2
            center_y = (y1 + y2) // 2

            cv2.circle(
                frame,
                (center_x, center_y),
                4,
                (0, 0, 255),
                -1
            )

            if center_x < mid_x and center_y < mid_y:
                zone_a += 1

            elif center_x >= mid_x and center_y < mid_y:
                zone_b += 1

            elif center_x < mid_x and center_y >= mid_y:
                zone_c += 1

            else:
                zone_d += 1

    risk_a = get_risk(zone_a)
    risk_b = get_risk(zone_b)
    risk_c = get_risk(zone_c)
    risk_d = get_risk(zone_d)

    cv2.line(frame, (mid_x, 0), (mid_x, height), (255, 0, 0), 2)
    cv2.line(frame, (0, mid_y), (width, mid_y), (255, 0, 0), 2)
    cv2.putText(
        frame,
        f"People: {people_count}",
        (20, 40),
        cv2.FONT_HERSHEY_SIMPLEX,
        1,
        (0, 0, 255),
        2
    )
    
    cv2.putText(frame, f"A: {zone_a}", (20, 80),
                cv2.FONT_HERSHEY_SIMPLEX, 0.8,
                (255,255,255), 2)

    cv2.putText(frame, f"B: {zone_b}", (mid_x + 20, 80),
                cv2.FONT_HERSHEY_SIMPLEX, 0.8,
                (255,255,255), 2)

    cv2.putText(frame, f"C: {zone_c}", (20, mid_y + 40),
                cv2.FONT_HERSHEY_SIMPLEX, 0.8,
                (255,255,255), 2)

    cv2.putText(frame, f"D: {zone_d}", (mid_x + 20, mid_y + 40),
                cv2.FONT_HERSHEY_SIMPLEX, 0.8,
                (255,255,255), 2)


    cv2.putText(frame, risk_a, (20, 120),
                cv2.FONT_HERSHEY_SIMPLEX, 0.7,
                (0,255,255), 2)

    cv2.putText(frame, risk_b, (mid_x + 20, 120),
                cv2.FONT_HERSHEY_SIMPLEX, 0.7,
                (0,255,255), 2)

    cv2.putText(frame, risk_c, (20, mid_y + 80),
                cv2.FONT_HERSHEY_SIMPLEX, 0.7,
                (0,255,255), 2)

    cv2.putText(frame, risk_d, (mid_x + 20, mid_y + 80),
                cv2.FONT_HERSHEY_SIMPLEX, 0.7,
                (0,255,255), 2)


    cv2.imshow("CrowdPulse Prototype", frame)

    if cv2.waitKey(1) == 27:
        break

video.release()
cv2.destroyAllWindows()

