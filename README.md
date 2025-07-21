# JSON Schema Builder

A React application that allows users to create a JSON schema by adding fields dynamically. Users can edit field names, add more fields, delete fields, and add nested fields for the 'Nested' type.

## Features

- Edit the name/key of a field
- Add more fields dynamically
- Delete a field
- Add nested fields for the 'Nested' type (recursively)
- JSON tab that displays the real-time JSON preview

## Technologies Used

- React
- TypeScript
- Ant Design
- React Hook Form

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Running the Application

```bash
npm run dev
```

The application will be available at http://localhost:5173

### Building for Production

```bash
npm run build
```

## Usage

1. Use the Schema Builder tab to create your JSON schema
2. Add fields using the "Add Field" button
3. Edit field names and types
4. For Nested type fields, add nested fields using the "Add Nested Field" button
5. Switch to the JSON Preview tab to see the real-time JSON representation of your schema

## Project Structure

- `src/components/SchemaBuilder.tsx`: Main component for building the schema
- `src/components/SchemaRow.tsx`: Component for each field row
- `src/components/JsonPreview.tsx`: Component for displaying the JSON preview
- `src/types.ts`: TypeScript interfaces and types
- `src/App.tsx`: Main application component