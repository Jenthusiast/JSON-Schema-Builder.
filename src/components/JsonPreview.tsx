import { JsonPreviewProps, SchemaField, SchemaOutput } from '../types';

const JsonPreview = ({ schema }: JsonPreviewProps) => {
  // Convert schema to JSON object
  const convertSchemaToJson = (schemaItems: SchemaField[]): SchemaOutput => {
    const rootItems = schemaItems.filter(item => !item.id.includes('-'));
    const result: SchemaOutput = {};

    rootItems.forEach(item => {
      if (item.type === 'Nested') {
        // Find all children of this item
        const childrenIds = schemaItems
          .filter(field => field.id.startsWith(`${item.id}-`))
          .map(field => field.id);

        if (childrenIds.length > 0) {
          const nestedItems = schemaItems.filter(field => 
            childrenIds.some(id => field.id === id || field.id.startsWith(`${id}-`))
          );
          result[item.key] = convertSchemaToJson(nestedItems);
        } else {
          result[item.key] = {};
        }
      } else if (item.type === 'String') {
        result[item.key] = item.value as string;
      } else if (item.type === 'Number') {
        result[item.key] = item.value as number;
      }
    });

    return result;
  };

  const jsonOutput = convertSchemaToJson(schema);

  return (
    <div className="json-preview">
      <pre>{JSON.stringify(jsonOutput, null, 2)}</pre>
    </div>
  );
};

export default JsonPreview;