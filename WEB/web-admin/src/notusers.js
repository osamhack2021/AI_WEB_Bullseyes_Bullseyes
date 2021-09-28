import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    ImageField,
    TextInput,
    ReferenceInput,
    SelectInput,
} from 'react-admin';

const postFilters = [
    <TextInput source="q" label="Search" alwaysOn />,
    <ReferenceInput source="userId" label="User" reference="users" allowEmpty>
        <SelectInput optionText="name" />
    </ReferenceInput>,
];

export const NotUserList = props => (
    <List filters={postFilters} {...props}>
        <Datagrid rowClick="edit">
            <TextField label="순번" source="id" />
            <ImageField label="사진"/>
            <TextField label="출입시간"/>
            <TextField label="장소"/>
        </Datagrid>
    </List>
);