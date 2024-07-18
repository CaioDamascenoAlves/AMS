const fs = require('fs');

// Função para ler e processar o JSON
function transformData(inputFile, outputFile) {
  fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    let rawData;
    try {
      const parsedData = JSON.parse(data);
      // Verifique a estrutura do JSON
      console.log('Parsed data:', parsedData);
      
      // Assumindo que a estrutura é { "dados": [...] }
      rawData = parsedData.dados || [];
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      return;
    }

    // Verifique se rawData é um array
    if (!Array.isArray(rawData)) {
      console.error('Expected an array but got:', typeof rawData, rawData);
      return;
    }

    const nodes = [];
    const links = [];
    const nodeMap = new Map();

    // Transforme os dados em nodes
    rawData.forEach(item => {
      const nodeId = item.numeroDeputadoID; // Use um campo único para id
      if (!nodeMap.has(nodeId)) {
        nodes.push({ id: nodeId, label: item.nomeParlamentar });
        nodeMap.set(nodeId, item);
      }
    });

    // Adicione links fictícios entre todos os nós
    nodes.forEach(node1 => {
      nodes.forEach(node2 => {
        if (node1.id !== node2.id) {
          links.push({
            source: node1.id,
            target: node2.id,
            value: 1 // ou outro valor baseado em algum critério
          });
        }
      });
    });

    const transformedData = {
      nodes: nodes,
      links: links
    };

    // Escreva o arquivo JSON transformado
    fs.writeFile(outputFile, JSON.stringify(transformedData, null, 2), err => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log('Data transformed and saved to', outputFile);
      }
    });
  });
}

// Execute a transformação
transformData('data.json', 'transformedData.json');
