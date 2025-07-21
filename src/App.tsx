import { useState } from 'react';
import { Tabs } from 'antd';
import SchemaBuilder from './components/SchemaBuilder';
import JsonPreview from './components/JsonPreview';
import { SchemaField } from './types';

const App = () => {
  const [schema, setSchema] = useState<SchemaField[]>([
    { id: '1', key: 'name', type: 'String', value: '' },
    { id: '2', key: 'age', type: 'Number', value: 0 },
  ]);

  return (
    <div className="container">
      <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>JSON Schema Builder</h1>
      
      <div className="card">
        <Tabs
          defaultActiveKey="builder"
          items={[
            {
              key: 'builder',
              label: 'Schema Builder',
              children: <SchemaBuilder schema={schema} setSchema={setSchema} />,
            },
            {
              key: 'json',
              label: 'JSON Preview',
              children: <JsonPreview schema={schema} />,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default App;