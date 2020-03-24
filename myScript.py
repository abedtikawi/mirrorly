import sys
import csv

with open('toPython3.txt', 'r') as csv_file:
    csv_reader = csv.DictReader(csv_file)

    with open('new_names.csv', 'w', newline="") as new_file:
        fieldnames = ['id', 'status']

        csv_writer = csv.DictWriter(
            new_file, fieldnames=fieldnames, delimiter=',')

        csv_writer.writeheader()
        for line in csv_reader:
            csv_writer.writerow(line)

with open('new_names.csv', 'r') as wee:
    csv_reader = csv.DictReader(wee)
    for line in csv_reader:
        print(line)
        sys.stdout.flush()