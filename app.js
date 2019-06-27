`use strict`;

let conf = require('./config');

exports.handler = async () => {
    
    let query = 'SELECT COUNT(*) AS rowcount FROM source."'+conf.TABLE+'"';

    let rowCount = await conf.db2.query(query);

    rowCount = rowCount[0].rowcount;

    query = 'SELECT * FROM source."'+conf.TABLE+'" LIMIT '+conf.LIMIT+' OFFSET '+rowCount+'';

    let sourceData = await conf.db1.query(query);
    
    if (sourceData.length === 0) {
         
        console.log('Data Insertion Completed...');
    
    } else {

        let keys = [];
        Object.keys(sourceData[0]).map(k => keys.push(k));

        let cs = new conf.pgp.helpers.ColumnSet(keys, {table: {schema: conf.SCHEMA, table: ''+conf.TABLE+''}});

        let query = conf.pgp.helpers.insert(sourceData, cs);

        console.log(new Date());

        await conf.db2.query(query);

        console.log(new Date());

        console.log(sourceData.length, ' Records Inserted...');
        
    }

};
