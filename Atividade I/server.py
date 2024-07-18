from flask import Flask, request, jsonify
from flasgger import Swagger
from flask_restful import Api, Resource
from file_manager import save_to_json, save_to_tsv, load_from_tsv
import json

app = Flask(__name__)
api = Api(app)
swagger = Swagger(app, template={
    "info": {
        "title": "Data Management API",
        "description": "API for managing data with operations to save and load in JSON and TSV formats.",
        "version": "1.0.0"
    }
})

data_dict = {}

class Data(Resource):
    def get(self):
        """Carrega os dados do dicionário.
        ---
        tags:
          - Data Operations
        responses:
          200:
            description: Os dados do dicionário foram carregados com sucesso.
            schema:
              type: object
              properties:
                data:
                  type: object
                  example: {"make": "Toyota", "model": "Corolla", "year": 2022, "color": "Blue", "engine_type": "Hybrid"}
        """
        return jsonify(data_dict)

    def post(self):
        """Escreve/Atualiza dados no dicionário.
        ---
        tags:
          - Data Operations
        parameters:
          - in: body
            name: body
            description: Objeto JSON com as informações para armazenar no dicionário.
            required: true
            schema:
              type: object
              example: {"make": "Toyota", "model": "Corolla", "year": 2022, "color": "Blue", "engine_type": "Hybrid"}
        responses:
          200:
            description: Os dados foram escritos/atualizados no dicionário com sucesso.
        """
        data = request.get_json()
        data_dict.update(data)
        return jsonify({"message": "Data written to dictionary", "data": data_dict})

class SaveJson(Resource):
    def post(self):
        """Salva os dados atuais do dicionário em um arquivo JSON.
        ---
        tags:
          - File Operations
        responses:
          200:
            description: Os dados do dicionário foram salvos no arquivo JSON com sucesso.
        """
        save_to_json([data_dict], 'data.json')
        return jsonify({"message": "Data saved to JSON"})

class SaveTsv(Resource):
    def post(self):
        """Salva os dados atuais do dicionário em um arquivo TSV.
        ---
        tags:
          - File Operations
        responses:
          200:
            description: Os dados do dicionário foram salvos no arquivo TSV com sucesso.
        """
        save_to_tsv([data_dict], 'data.tsv')
        return jsonify({"message": "Data saved to TSV"})

class LoadJson(Resource):
    def get(self):
        """Carrega os dados de um arquivo JSON para o dicionário.
        ---
        tags:
          - File Operations
        responses:
          200:
            description: Os dados foram carregados do arquivo JSON para o dicionário com sucesso.
        """
        with open('data.json', 'r') as file:
            data = json.load(file)
        return jsonify(data)

class LoadTsv(Resource):
    def get(self):
        """Carrega os dados de um arquivo TSV para o dicionário.
        ---
        tags:
          - File Operations
        responses:
          200:
            description: Os dados foram carregados do arquivo TSV para o dicionário com sucesso.
        """
        data = load_from_tsv('data.tsv')
        return jsonify(data)

api.add_resource(Data, '/data')
api.add_resource(SaveJson, '/save/json')
api.add_resource(SaveTsv, '/save/tsv')
api.add_resource(LoadJson, '/load/json')
api.add_resource(LoadTsv, '/load/tsv')

if __name__ == '__main__':
    app.run(debug=True)
