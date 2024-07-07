import cv2 
import numpy as np

# Load pre-trained deep learning model for age and gender detection
age_gender_model = cv2.dnn.readNetFromCaffe(
    'deploy_age.prototxt', 'age_net.caffemodel')

# Load face detector
face_detector = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

def detect_age(image):
    # Convert image to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Detect faces in the image
    faces = face_detector.detectMultiScale(gray, 1.3, 5)

    # Loop through detected faces
    for (x, y, w, h) in faces:
        # Extract face region
        face = image[y:y+h, x:x+w].copy()

        # Preprocess face for age detection
        blob = cv2.dnn.blobFromImage(face, scalefactor=1.0, size=(256, 256), mean=(104.0, 177.0, 123.0))

        # Feed face blob into age and gender detection model
        age_gender_model.setInput(blob)
        predictions = age_gender_model.forward()

        # Get predicted age
        age = predictions[0][0][0][0] * 100  # Output is a scalar value in the range [0, 1] representing age distribution

        # Draw rectangle around the face and put age text
        cv2.rectangle(image, (x, y), (x+w, y+h), (0, 255, 0), 2)
        cv2.putText(image, f'Age: {int(age)}', (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (36,255,12), 2)

    return image

# Capture video from webcam
cap = cv2.VideoCapture(0)

output_frames = []

while True:
    # Read frame from webcam
    ret, frame = cap.read()

    # Detect age in the frame
    frame_with_age = detect_age(frame)

    # Store the frame with age information
    output_frames.append(frame_with_age)

    # Display output
    cv2.imshow('Age Detection', frame_with_age)

    # Break the loop when 'q' is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release video capture and close windows
cap.release()
cv2.destroyAllWindows()


