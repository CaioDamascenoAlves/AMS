const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const morgan = require('morgan');

// Configuração para servir arquivos estáticos
app.use(express.static('public'));
app.use(morgan('dev'));

// Carregar dados e paginar
app.get('/data', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 100;

  fs.readFile('transformedData2.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading file');
    }

    try {
      const jsonData = JSON.parse(data);
      const nodes = jsonData.nodes || [];
      const links = jsonData.links || [];
      const start = (page - 1) * limit;
      const end = start + limit;

      // Paginar apenas nós
      const paginatedNodes = nodes.slice(start, end);

      // Verificar se todos os links referenciam nós válidos
      const nodeIds = new Set(paginatedNodes.map(node => node.id));
      const filteredLinks = links.filter(link => nodeIds.has(link.source) && nodeIds.has(link.target));

      res.json({ nodes: paginatedNodes, links: filteredLinks });
    } catch (parseError) {
      res.status(500).send('Error parsing JSON');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
