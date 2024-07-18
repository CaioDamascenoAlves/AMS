# README.md

## API de Gerenciamento de Dados

Este projeto é uma implementação prática de um sistema de gerenciamento de dados utilizando dicionários da linguagem Python e interfaces de servidores web. Ele é projetado para demonstrar como os dados podem ser armazenados, recuperados e persistidos utilizando diferentes formatos de dados, como JSON e TSV (Valores Separados por Tabulação). O sistema é implementado com um servidor web Flask e oferece uma API interativa documentada usando Swagger.

### Primeiros Passos

Para executar este projeto, você precisará do Python instalado no seu sistema. Se você já tem o Python e o pip instalados, pode configurar o projeto seguindo estes passos:

1. Clone o repositório ou baixe o código-fonte.
2. Navegue até o diretório do projeto no seu terminal.
3. Instale as dependências necessárias com `pip`:

```bash
pip install flask flask-restful flasgger
```

4. Inicie o servidor executando:

```bash
python server.py
```

O servidor iniciará em `http://localhost:5000`. Para interagir com a API, você pode usar a interface do Swagger ou qualquer cliente de API como o Postman.

### Usando o Swagger UI

O Swagger UI fornece uma página de documentação interativa para a sua API. Uma vez que o servidor está em execução, você pode acessar o Swagger UI navegando até `http://localhost:5000/apidocs/` no seu navegador web.

Na página do Swagger UI, você verá:

- O nome da API e sua descrição.
- Uma lista de todos os endpoints disponíveis.
- Para cada endpoint, uma descrição do que ele faz, a entrada esperada e o formato de saída.
- Funcionalidade "Try it out" que permite enviar solicitações à API diretamente do navegador e visualizar a resposta.

### Endpoints

Os seguintes endpoints estão disponíveis nesta API:

- `POST /data`: Este endpoint permite adicionar ou atualizar dados no dicionário. O corpo da requisição deve conter um objeto JSON com os dados que você deseja armazenar.
- `GET /data`: Recupera o estado atual dos dados armazenados no dicionário.
- `POST /save/json`: Aciona o salvamento dos dados do dicionário atual para um arquivo JSON chamado `data.json`.
- `POST /save/tsv`: Aciona o salvamento dos dados do dicionário atual para um arquivo TSV chamado `data.tsv`.
- `GET /load/json`: Lê os dados do arquivo `data.json` e os retorna na resposta.
- `GET /load/tsv`: Lê os dados do arquivo `data.tsv`, carrega-os em um dicionário e retorna o dicionário na resposta.

### Exemplo de Uso

Aqui está um exemplo de comando curl para adicionar dados usando o endpoint `POST /data`:

```bash
curl -X POST http://localhost:5000/data \
-H "Content-Type: application/json" \
-d '{"make": "Toyota", "model": "Corolla", "year": 2022, "color": "Blue", "engine_type": "Hybrid"}'
```

Para ver os dados que você acabou de adicionar:

```bash
curl http://localhost:5000/data
```

