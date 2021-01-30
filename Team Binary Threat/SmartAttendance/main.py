import face_recognition
import cv2
import numpy as np
import dlib
import os
import glob
from math import hypot
import datetime
import json

# Creating directory
try:
    os.mkdir("data/faces")
except FileExistsError:
    pass

# Required Data
info = {"roll": None, "ClassDur": None, "eyesAvert": []}
eyesAvertedThreshold = 5
def logEyes(duration: int, timestamp: datetime.datetime):
    info["eyesAvert"].append((duration, timestamp.strftime("%H:%M:%S %p")))
    with open('result.json', 'w') as fp:
        json.dump(info, fp)
    print(info)

# For face recignition
roll = input("Enter your roll number: ")
info["roll"] = roll
img_reqired = not os.path.isfile('data\\faces\\' + roll + ".jpg")

cam = cv2.VideoCapture(0)
cv2.namedWindow("Camera")

while img_reqired:
    ret, frame = cam.read()
    if not ret:
        print("failed to grab frame")
        break
    cv2.imshow("Camera", frame)

    k = cv2.waitKey(1)
    if k%256 == 32:
        # SPACE pressed
        img_name = "data\\faces\\{}.jpg".format(roll)
        cv2.imwrite(img_name, frame)
        # print("{} written!".format(img_name))
        break

cam.release()
cv2.destroyAllWindows()
##

video_capture = cv2.VideoCapture(0)

video_capture.release()

faces_encodings = []
faces_names = []

cur_direc = os.getcwd()
path = os.path.join(cur_direc, 'data/faces/')
list_of_files = [f for f in glob.glob(path+'*.jpg')]

number_files = len(list_of_files)
names = list_of_files.copy()

for i in range(number_files):
    globals()['image_{}'.format(i)] = face_recognition.load_image_file(list_of_files[i])
    globals()['image_encoding_{}'.format(i)] = face_recognition.face_encodings(globals()['image_{}'.format(i)])[0]
    faces_encodings.append(globals()['image_encoding_{}'.format(i)])

    # Create array of known names
    names[i] = names[i].replace(cur_direc, "")
    faces_names.append(names[i])

# Face Recognition
face_locations = []
face_encodings = []
face_names = []
process_this_frame = True

cap = cv2.VideoCapture(0)

detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")

def midpoint(p1 ,p2):
    return int((p1.x + p2.x)/2), int((p1.y + p2.y)/2)

font = cv2.FONT_HERSHEY_PLAIN

def get_blinking_ratio(eye_points, facial_landmarks):
    left_point = (facial_landmarks.part(eye_points[0]).x, facial_landmarks.part(eye_points[0]).y)
    right_point = (facial_landmarks.part(eye_points[3]).x, facial_landmarks.part(eye_points[3]).y)
    center_top = midpoint(facial_landmarks.part(eye_points[1]), facial_landmarks.part(eye_points[2]))
    center_bottom = midpoint(facial_landmarks.part(eye_points[5]), facial_landmarks.part(eye_points[4]))

    #hor_line = cv2.line(frame, left_point, right_point, (0, 255, 0), 2)
    #ver_line = cv2.line(frame, center_top, center_bottom, (0, 255, 0), 2)

    hor_line_lenght = hypot((left_point[0] - right_point[0]), (left_point[1] - right_point[1]))
    ver_line_lenght = hypot((center_top[0] - center_bottom[0]), (center_top[1] - center_bottom[1]))

    ratio = hor_line_lenght / ver_line_lenght
    return ratio

def get_gaze_ratio(eye_points, facial_landmarks):
    left_eye_region = np.array([(facial_landmarks.part(eye_points[0]).x, facial_landmarks.part(eye_points[0]).y),
                                (facial_landmarks.part(eye_points[1]).x, facial_landmarks.part(eye_points[1]).y),
                                (facial_landmarks.part(eye_points[2]).x, facial_landmarks.part(eye_points[2]).y),
                                (facial_landmarks.part(eye_points[3]).x, facial_landmarks.part(eye_points[3]).y),
                                (facial_landmarks.part(eye_points[4]).x, facial_landmarks.part(eye_points[4]).y),
                                (facial_landmarks.part(eye_points[5]).x, facial_landmarks.part(eye_points[5]).y)], np.int32)
    # cv2.polylines(frame, [left_eye_region], True, (0, 0, 255), 2)

    height, width, _ = frame.shape
    mask = np.zeros((height, width), np.uint8)
    cv2.polylines(mask, [left_eye_region], True, 255, 2)
    cv2.fillPoly(mask, [left_eye_region], 255)
    eye = cv2.bitwise_and(gray, gray, mask=mask)

    min_x = np.min(left_eye_region[:, 0])
    max_x = np.max(left_eye_region[:, 0])
    min_y = np.min(left_eye_region[:, 1])
    max_y = np.max(left_eye_region[:, 1])

    gray_eye = eye[min_y: max_y, min_x: max_x]
    _, threshold_eye = cv2.threshold(gray_eye, 70, 255, cv2.THRESH_BINARY)
    height, width = threshold_eye.shape
    left_side_threshold = threshold_eye[0: height, 0: int(width / 2)]
    left_side_white = cv2.countNonZero(left_side_threshold)

    right_side_threshold = threshold_eye[0: height, int(width / 2): width]
    right_side_white = cv2.countNonZero(right_side_threshold)

    if left_side_white == 0:
        gaze_ratio = 1
    elif right_side_white == 0:
        gaze_ratio = 5
    else:
        gaze_ratio = left_side_white / right_side_white
    return gaze_ratio

faceVisiblityDuration = datetime.datetime.now()
FaceNotVisibleDur = datetime.timedelta(0)
eyesAvertedDur = datetime.timedelta(0)
logEveryXsec = 5
logEveryXsecCheck = datetime.datetime.now()
while True:
    ret, frame = cap.read()
    new_frame = np.zeros((500, 500, 3), np.uint8)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    faces = detector(gray)
    for face in faces:
        #x, y = face.left(), face.top()
        #x1, y1 = face.right(), face.bottom()
        #cv2.rectangle(frame, (x, y), (x1, y1), (0, 255, 0), 2)

        landmarks = predictor(gray, face)

        # Detect blinking
        left_eye_ratio = get_blinking_ratio([36, 37, 38, 39, 40, 41], landmarks)
        right_eye_ratio = get_blinking_ratio([42, 43, 44, 45, 46, 47], landmarks)
        try:
            blinking_ratio = (left_eye_ratio + right_eye_ratio) / 2
        except:
            pass

        if blinking_ratio > 5.7:
            cv2.putText(frame, "BLINKING", (50, 150), font, 7, (255, 255, 0), 2)


        # Gaze detection
        gaze_ratio_left_eye = get_gaze_ratio([36, 37, 38, 39, 40, 41], landmarks)
        gaze_ratio_right_eye = get_gaze_ratio([42, 43, 44, 45, 46, 47], landmarks)
        gaze_ratio = (gaze_ratio_right_eye + gaze_ratio_left_eye) / 2


        # print(gaze_ratio)
        if gaze_ratio <= 0.55:
            cv2.putText(frame, "RIGHT", (50, 100), font, 2, (0, 0, 255), 3)
            new_frame[:] = (0, 0, 255)
            if eyesAvertedDur == datetime.timedelta(0):
                eyesAvertedDur = datetime.datetime.now()
                # print("Right Started " + str(type(eyesAvertedDur)) + ' ' + str(eyesAvertedDur))
        elif 0.55 < gaze_ratio < 1.3:
            cv2.putText(frame, "CENTER", (50, 100), font, 2, (255, 0, 255), 3)
            # print("Center" + str(type(eyesAvertedDur)) + ' ' + str((eyesAvertedDur)))
            if eyesAvertedDur != datetime.timedelta(0):
                if (datetime.datetime.now() - eyesAvertedDur).seconds >= eyesAvertedThreshold:
                    # print("Log")
                    logEyes((datetime.datetime.now() - eyesAvertedDur).seconds, datetime.datetime.now())
                    eyesAvertedDur = datetime.timedelta(0)

        else:
            new_frame[:] = (255, 0, 0)
            cv2.putText(frame, "LEFT", (50, 100), font, 2, (255, 0, 0), 3)
            if eyesAvertedDur == datetime.timedelta(0):
                eyesAvertedDur = datetime.datetime.now()
                # print("Left Started " + str(type(eyesAvertedDur)) + ' ' + str(eyesAvertedDur))

    # print(eyesAvertedDur)
    ###################################
    # Above was finding eye movement
    # Below is of face recognition
    ###################################
    small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
    rgb_small_frame = small_frame[:, :, ::-1]

    if process_this_frame:
        face_locations = face_recognition.face_locations( rgb_small_frame)
        face_encodings = face_recognition.face_encodings( rgb_small_frame, face_locations)
        face_names = []

        if faces_encodings.__len__() == 0:
            FaceNotVisibleDur = datetime.datetime.now()
        elif FaceNotVisibleDur != datetime.timedelta(0):
            faceVisiblityDuration -= (datetime.datetime.now() - FaceNotVisibleDur)

        for face_encoding in face_encodings:
            matches = face_recognition.compare_faces (faces_encodings, face_encoding)
            name = "Unknown"

            face_distances = face_recognition.face_distance( faces_encodings, face_encoding)
            best_match_index = np.argmin(face_distances)
            if matches[best_match_index]:
                name = faces_names[best_match_index]
                name = name.split("\\")[-1].split('.')[0]


            face_names.append(name)

    process_this_frame = not process_this_frame

    # Display the results
    for (top, right, bottom, left), name in zip(face_locations, face_names):
        top *= 4
        right *= 4
        bottom *= 4
        left *= 4

        # Draw a rectangle around the face
        cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)

        # Input text label with a name below the face
        cv2.rectangle(frame, (left, bottom - 35), (right, bottom), (0, 255, 0), cv2.FILLED)
        font = cv2.FONT_HERSHEY_PLAIN
        cv2.putText(frame, name, (left + 6, bottom - 6), cv2.FONT_HERSHEY_DUPLEX, 1.0, (0, 0, 0), 1)

    if (datetime.datetime.now() - logEveryXsecCheck).seconds >= logEveryXsec:
        info["ClassDur"] = (datetime.datetime.now() - faceVisiblityDuration).seconds
        logEveryXsecCheck = datetime.datetime.now()
        with open('result.json', 'w') as fp:
            json.dump(info, fp)
        print(info)


    cv2.imshow("Frame", frame)
    # cv2.imshow("New frame", new_frame)

    key = cv2.waitKey(1)
    if key == 27:
        break

cap.release()
cv2.destroyAllWindows()