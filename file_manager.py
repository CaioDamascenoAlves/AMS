import json
import csv

def save_to_json(data, filename):
    """Salva dados em formato JSON."""
    with open(filename, 'w') as file:
        json.dump(data, file)

def save_to_tsv(data, filename):
    """Salva dados em formato TSV."""
    keys = data[0].keys()
    with open(filename, 'w', newline='') as file:
        dict_writer = csv.DictWriter(file, keys, delimiter='\t')
        dict_writer.writeheader()
        dict_writer.writerows(data)

def load_from_tsv(filename):
    """Carrega dados de um arquivo TSV em um dicionário."""
    with open(filename, newline='') as file:
        dict_reader = csv.DictReader(file, delimiter='\t')
        return list(dict_reader)
