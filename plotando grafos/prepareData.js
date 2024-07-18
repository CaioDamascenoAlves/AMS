const fs = require('fs');
const JSONStream = require('JSONStream');

function prepareData() {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream('data.json', { encoding: 'utf8' });
    const parser = JSONStream.parse('dados.*');

    const filteredData = [];

    stream.pipe(parser)
      .on('data', entry => {
        const filteredEntry = {
          nomeParlamentar: entry.nomeParlamentar,
          fornecedor: entry.fornecedor,
          valorDocumento: entry.valorDocumento,
          dataEmissao: entry.dataEmissao
        };
        filteredData.push(filteredEntry);
      })
      .on('end', () => resolve(filteredData))
      .on('error', err => reject(err));
  });
}

async function saveProcessedData() {
  const processedData = await prepareData();
  fs.writeFileSync('processedData.json', JSON.stringify({ dados: processedData }, null, 2));
}

saveProcessedData().catch(err => console.error(err));
