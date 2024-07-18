const fs = require('fs');

// Função para ler e processar o JSON
function processJSON(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    try {
      const parsedData = JSON.parse(data);
      const nodes = [];
      const links = [];
      const nodeMap = new Map(); // Mapa para garantir unicidade dos nós

      // Adiciona nós
      parsedData.dados.forEach(item => {
        const nodeId = item.numeroDeputadoID; // ID único para cada nó
        if (!nodeMap.has(nodeId)) {
          nodes.push({
            id: nodeId,
            nomeParlamentar: item.nomeParlamentar,
            fornecedor: item.fornecedor,
            valorDocumento: parseFloat(item.valorDocumento),
            ano: item.ano,
            siglaPartido: item.siglaPartido,
            siglaUF: item.siglaUF
          });
          nodeMap.set(nodeId, true);
        }
      });

      // Adiciona links
      parsedData.dados.forEach(item => {
        const source = item.numeroDeputadoID;
        const target = item.numeroDeputadoID; // Ajustar lógica para definir 'target'
        if (source !== target) {
          links.push({
            source: source,
            target: target,
            value: parseFloat(item.valorDocumento)
          });
        }
      });

      // Adiciona clusterização
      const clusters = {};
      nodes.forEach(node => {
        const clusterKey = node.siglaPartido || 'Outros'; // Agrupar por partido
        if (!clusters[clusterKey]) {
          clusters[clusterKey] = [];
        }
        clusters[clusterKey].push(node.id);
      });

      const clusteredLinks = [];
      Object.values(clusters).forEach(clusterNodes => {
        clusterNodes.forEach((source, i) => {
          clusterNodes.slice(i + 1).forEach(target => {
            clusteredLinks.push({
              source: source,
              target: target,
              value: 1 // Ajustar valor para o cluster
            });
          });
        });
      });

      // Salva os dados processados
      const outputData = {
        nodes: nodes,
        links: clusteredLinks
      };

      fs.writeFile('transformedData2.json', JSON.stringify(outputData, null, 2), (err) => {
        if (err) {
          console.error('Error writing file:', err);
        } else {
          console.log('Data successfully processed and saved.');
        }
      });
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
    }
  });
}

// Chame a função com o caminho do seu arquivo JSON
processJSON('data.json');
