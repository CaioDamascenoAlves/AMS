from file_manager import save_to_json, save_to_tsv, load_from_tsv

def main():
    # Dicionário estático para armazenar as informações da entidade
    car_data = {
        'make': 'Toyota',
        'model': 'Corolla',
        'year': 2022,
        'color': 'Blue',
        'engine_type': 'Hybrid'
    }

    # Salvar os dados do carro em um arquivo JSON
    save_to_json([car_data], 'car_data.json')

    # Salvar os dados do carro em um arquivo TSV
    save_to_tsv([car_data], 'car_data.tsv')

    # Carregar os dados do arquivo TSV e imprimir
    loaded_data = load_from_tsv('car_data.tsv')
    print("Dados carregados do arquivo TSV:", loaded_data)

if __name__ == '__main__':
    main()
