import csv
'''
# Writing to a CSV file
data = [
    ['Name', 'Age', 'City'],
    ['Alice', 30, 'New York'],
    ['Bob', 25, 'Los Angeles'],
    ['Charlie', 35, 'Chicago']
]

with open('output.csv', mode='w', newline='') as file:
    writer = csv.writer(file)
    writer.writerows(data)
'''

# Reading from a CSV file
with open('output.csv', mode='r', newline='') as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)