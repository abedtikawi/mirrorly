import serial, time
import struct

arduinoData = serial.Serial('COM3',baudrate = 9600,timeout =1)
time.sleep(2)
with open("motorInfo.txt","r") as file:
  for last_line in file:
    pass

print(last_line)
if last_line == "1 true":
  arduinoData.write(b'g')
  print("done")

