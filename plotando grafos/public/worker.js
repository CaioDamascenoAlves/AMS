// worker.js
self.onmessage = function (e) {
    const data = e.data;
  
    // Processamento dos dados (exemplo)
    // Aqui você pode fazer operações intensivas sem travar o thread principal
    // Exemplo: transformar os dados em formato mais otimizado para D3.js
  
    // Simulando processamento (ajuste conforme necessário)
    const processedData = {
      nodes: data.nodes.map(node => ({ ...node, size: node.value * 10 })),
      links: data.links
    };
  
    // Enviando os dados processados de volta para o thread principal
    self.postMessage(processedData);
  };
  