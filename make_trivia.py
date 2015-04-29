import csv
import json
import os

def getData(filename):
    data = []
    with open(filename) as csvfile:
        for row in csv.DictReader(csvfile):
            data.append({
                'materi': row['materi'],
                'ujian': row['ujian'],
                'tahun': int(row['tahun']),
                'semester': int(row['semester']),
                'soal': 
                {
                    'teori': int(row['teori']),
                    'campuran': int(row['campuran']),
                    'analisis': int(row['analisis'])
                }
            })
    return data

def readHeatmap():
    output = []
    for filename in os.listdir('./csv'):
        if filename.startswith('IF'):
            subject = filename[:-4]
            output.append({
                'kode': subject[0:6],
                'kuliah': subject[7:],
                'data': getData('./csv/' + filename)
            })
    return output

def readTrivia(filename):
    output = []
    with open(filename) as csvfile:
        for row in csv.DictReader(csvfile):
            output.append({
                'judul': row['judul'],
                'isi': row['isi']
            })
    return output

def main():
    # Create trivia.json
    triviajson = open('./json/trivia.json', 'w')
    triviatemp = json.dumps(readTrivia('./csv/trivia.csv'), separators=(',',':'))
    #triviajson.write(triviatemp)
    print triviatemp # dicetak ke stdout

if __name__ == '__main__':
    main()