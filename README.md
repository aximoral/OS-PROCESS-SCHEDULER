# OS Process Scheduler Simulation

I made this for my OS project.

## Project Overview
This is a high-performance, browser-based simulation of Operating System CPU scheduling algorithms. It allows users to input custom processes with dynamic Arrival Times and Burst Times to see exactly how the CPU handles them under different scheduling rules.

## Features
- **Algorithms Implemented:**
  - **FCFS** (First-Come, First-Serve)
  - **SJF** (Shortest Job First - Non-preemptive)
  - **RR** (Round Robin - with adjustable Time Quantum)
- **Live Visualizations:**
  - **Interactive Gantt Chart:** A visually rich, horizontally scrolling timeline that tracks active execution blocks and CPU Idle states in real-time.
  - **Metrics Engine:** Automatically calculates and breaks down Completion Time (CT), Turnaround Time (TAT), and Waiting Time (WT) alongside total averages.
- **UI/UX:** Built with a strict "Minimalist Dark" aesthetic, ensuring blazing fast client-side performance without heavy animation libraries.

## How to Run
Simply double-click the `Launch_OS_Scheduler.bat` file in the project folder. It will automatically start the local server and open the simulation in your default web browser!

---
**Made by:**
- Sarthak Gupta (RA2511003020460)
- Arush K (RA2511003020466)
- Harshvardhan Khanolkar (RA2511003020465)
