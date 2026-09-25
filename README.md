# CrowdPulse

CrowdPulse is a crowd monitoring and analysis system developed for large-scale events such as concerts, exhibitions, conventions, and sports venues. The project aims to use computer vision to analyze crowd distribution from video feeds and help identify areas that may become overcrowded.

The idea behind CrowdPulse is that most CCTV systems only show what is currently happening. Our goal is to build a system that can understand crowd behavior, identify high-density areas, and eventually predict potential congestion before it becomes a serious issue.

## Current Prototype

For the first phase of the project, we have focused on building the core crowd analysis pipeline.

The current prototype is capable of:

* Detecting people from video footage using YOLOv8
* Counting the total number of people in a scene
* Dividing the venue into multiple zones
* Assigning detected people to their respective zones
* Calculating occupancy levels for each zone
* Classifying zones into LOW, MEDIUM, or HIGH congestion risk levels

This allows us to understand how crowds are distributed across different parts of a venue in real time.

## How It Works

```text id="5j7f0l"
Video Feed
     ↓
Person Detection
     ↓
Zone Assignment
     ↓
Occupancy Analysis
     ↓
Risk Assessment
```

The system processes a video frame by frame, detects people, determines which zone they belong to, and calculates occupancy information for each zone. Based on predefined thresholds, a risk level is assigned to help identify potentially crowded areas.

## Technologies Used

* Python
* OpenCV
* YOLOv8 (Ultralytics)
* NumPy
* Flask (Backend API)

## Running the Project

Install the required libraries:

```bash id="9m1h6s"
pip install ultralytics opencv-python numpy flask
```

Run the crowd analysis system:

```bash id="x7twxt"
python main.py
```

Run the backend API:

```bash id="3z6jxf"
python backend.py
```

## Future Development

This prototype represents the foundation of the project. In the upcoming phases, we plan to add:

* Multi-object tracking
* Movement speed analysis
* Direction analysis
* Inflow and outflow monitoring
* Congestion prediction
* Alert generation
* Route recommendations
* What-if crowd flow simulations
* Interactive dashboard visualization

## Project Goal

The long-term goal of CrowdPulse is to move beyond simple crowd monitoring and develop a system that can provide meaningful insights about crowd movement and help event organizers make better operational decisions.

---

**Project Status:** Prototype Phase (Assessment 1)
