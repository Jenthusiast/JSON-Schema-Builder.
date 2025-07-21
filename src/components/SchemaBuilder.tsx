import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { SchemaBuilderProps, SchemaField } from '../types';
import SchemaRow from './SchemaRow';

const SchemaBuilder = ({ schema, setSchema, parentId, level = 0 }: SchemaBuilderProps) => {
  // Filter schema items based on parentId
  const filteredSchema = parentId
    ? schema.filter(field => field.id.startsWith(`${parentId}-`))
    : schema.filter(field => !field.id.includes('-'));

  // Generate a unique ID for a new field
  const generateId = (parentId?: string) => {
    if (parentId) {
      const childrenCount = schema.filter(field => field.id.startsWith(`${parentId}-`)).length;
      return `${parentId}-${childrenCount + 1}`;
    }
    return String(schema.length + 1);
  };

  // Add a new field
  const handleAddField = (parentId?: string) => {
    const newId = generateId(parentId);
    const newField: SchemaField = {
      id: newId,
      key: `field${newId}`,
      type: 'String',
      value: '',
    };
    setSchema([...schema, newField]);
  };

  // Update a field
  const handleUpdateField = (id: string, updates: Partial<SchemaField>) => {
    setSchema(prevSchema =>
      prevSchema.map(field =>
        field.id === id ? { ...field, ...updates } : field
      )
    );
  };

  // Delete a field and its children
  const handleDeleteField = (id: string) => {
    setSchema(prevSchema => {
      // Remove the field and all its nested children
      return prevSchema.filter(field => !field.id.startsWith(id));
    });
  };

  return (
    <div style={{ marginLeft: level * 24 }}>
      {filteredSchema.map(field => (
        <SchemaRow
          key={field.id}
          field={field}
          onUpdate={handleUpdateField}
          onDelete={handleDeleteField}
          onAddField={handleAddField}
          level={level}
        />
      ))}
      
      {/* Add field button */}
      <Button 
        type="dashed" 
        onClick={() => handleAddField(parentId)} 
        style={{ marginTop: '12px', width: '100%' }}
        icon={<PlusOutlined />}
      >
        Add Field
      </Button>
    </div>
  );
};

export default SchemaBuilder;