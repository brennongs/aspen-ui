# `<Select />`

**INPUT:** Because the intial value is set by Formik.Formik, all `<Select />` needs is a `name` (string) and `options` (array(string)).

**BEHAVIOR:** `<Select />` MUST be the child of a [`<Form />`](../Form/README.md) component to work correctly! It will take the name of a value given to the parents' `defaults` property for state management, and then iterate over the `options` array and display them as expected. It makes use of [Material-UI's `<Select />` component](https://material-ui.com/demos/selects) as well as [formik's `<Field />` component](https://github.com/jaredpalmer/formik#field-).