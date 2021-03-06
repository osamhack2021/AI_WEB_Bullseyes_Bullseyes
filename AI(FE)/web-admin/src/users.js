import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  ImageField,
  ImageInput,
  EditButton,
  FileInput,
  FileField,
  Edit,
  Create,
  SimpleForm,
  TextInput,
  Show,
  SimpleShowLayout
} from "react-admin";

const userFilters = [
  <TextInput label="Search" source="q" alwaysOn />
];

export const UserList = (props) => {
  return (
    <List filters={userFilters} {...props}>
      <Datagrid rowClick="show">
        <TextField label="순번" source="id" />
        <ImageField label="사진" source="photourl" />
        <TextField label="소속" source="company" />
        <TextField label="군번" source="altid" />
        <TextField label="계급" source="rank" />
        <TextField label="이름" source="name" />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export const UserEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput label="순번" source="id" />
      <ImageInput label="사진" source="photourl" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
      <TextInput label="소속" source="company" />
      <TextInput label="군번" source="altid" />
      <TextInput label="계급" source="rank" />
      <TextInput label="이름" source="name" />
    </SimpleForm>
  </Edit>
);

export const UserCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput label="순번" source="id" />
      <FileInput label="사진" source="photourl">
        <FileField source="src" title="title" />
      </FileInput>
      <TextInput label="소속" source="company" />
      <TextInput label="군번" source="altid" />
      <TextInput label="계급" source="rank" />
      <TextInput label="이름" source="name" />
    </SimpleForm>
  </Create>
);

export const UserShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField label="순번" source="id" />
      <ImageField label="사진" source="photourl" />
      <TextField label="소속" source="company" />
      <TextField label="군번" source="altid" />
      <TextField label="계급" source="rank" />
      <TextField label="이름" source="name" />
    </SimpleShowLayout>
  </Show>
);
