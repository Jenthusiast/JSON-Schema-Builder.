import { Input, Select, Button, Space, Row, Col } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { FieldType, SchemaRowProps } from '../types';
import SchemaBuilder from './SchemaBuilder';

const { Option } = Select;

const SchemaRow = ({ field, onUpdate, onDelete, onAddField, level }: SchemaRowProps) => {
  const handleTypeChange = (value: FieldType) => {
    // Set default values based on type
    let updates: { type: FieldType; value?: string | number } = { type: value };
    
    if (value === 'String') {
      updates.value = '';
    } else if (value === 'Number') {
      updates.value = 0;
    } else if (value === 'Nested') {
      updates.value = undefined;
    }
    
    onUpdate(field.id, updates);
  };

  return (
    <div style={{ marginBottom: '12px' }}>
      <Row gutter={16} align="middle">
        <Col span={8}>
          <Input
            placeholder="Field Name"
            value={field.key}
            onChange={e => onUpdate(field.id, { key: e.target.value })}
          />
        </Col>
        <Col span={6}>
          <Select
            style={{ width: '100%' }}
            value={field.type}
            onChange={handleTypeChange}
          >
            <Option value="String">String</Option>
            <Option value="Number">Number</Option>
            <Option value="Nested">Nested</Option>
          </Select>
        </Col>
        {field.type !== 'Nested' && (
          <Col span={6}>
            {field.type === 'String' ? (
              <Input
                placeholder="Default Value"
                value={field.value as string}
                onChange={e => onUpdate(field.id, { value: e.target.value })}
              />
            ) : (
              <Input
                type="number"
                placeholder="Default Value"
                value={field.value as number}
                onChange={e => onUpdate(field.id, { value: Number(e.target.value) })}
              />
            )}
          </Col>
        )}
        <Col span={field.type === 'Nested' ? 10 : 4}>
          <Space>
            {field.type === 'Nested' && (
              <Button
                icon={<PlusOutlined />}
                onClick={() => onAddField(field.id)}
                type="primary"
                ghost
              >
                Add Nested Field
              </Button>
            )}
            <Button
              icon={<DeleteOutlined />}
              onClick={() => onDelete(field.id)}
              danger
            />
          </Space>
        </Col>
      </Row>

      {/* Render nested fields if type is Nested */}
      {field.type === 'Nested' && (
        <div style={{ marginTop: '8px' }}>
          <SchemaBuilder
            schema={field.children || []}
            setSchema={(newChildren) => {
              if (typeof newChildren === 'function') {
                onUpdate(field.id, { children: newChildren(field.children || []) });
              } else {
                onUpdate(field.id, { children: newChildren });
              }
            }}
            parentId={field.id}
            level={level + 1}
          />
        </div>
      )}
    </div>
  );
};

export default SchemaRow;