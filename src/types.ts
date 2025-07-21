export type FieldType = 'String' | 'Number' | 'Nested';

export interface SchemaField {
  id: string;
  key: string;
  type: FieldType;
  value?: string | number;
  children?: SchemaField[];
}

export interface SchemaBuilderProps {
  schema: SchemaField[];
  setSchema: React.Dispatch<React.SetStateAction<SchemaField[]>>;
  parentId?: string;
  level?: number;
}

export interface JsonPreviewProps {
  schema: SchemaField[];
}

export interface SchemaRowProps {
  field: SchemaField;
  onUpdate: (id: string, updates: Partial<SchemaField>) => void;
  onDelete: (id: string) => void;
  onAddField: (parentId?: string) => void;
  level: number;
}

export interface SchemaOutput {
  [key: string]: string | number | SchemaOutput;
}