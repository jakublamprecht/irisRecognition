import React from 'react';
import { Form } from 'antd';
import { FormItem } from '../../Form/styles';

const mapParamsToFields = (params) => (
  Object.entries(params).reduce((acc, [paramName, paramData]) => ({
    ...acc,
    [paramName]: Form.createFormField({
      value: paramData,
    }),
  }), {})
);

const getFormFieldsInitialParams = (fields) => (
  Object.entries(fields).reduce((acc, [paramName, paramData]) => ({
    ...acc,
    [paramName]: paramData.config.initialValue,
  }), {})
);

const formFieldsToParams = (fields) => (
  Object.entries(fields).reduce((acc, [paramName, paramData]) => ({
    ...acc,
    [paramName]: paramData.value,
  }), {})
);

/*
 Fields configuration:

 fields = {
  [name]: { // name of the field which has to be the same as specified in API in JS and Python
    label, // label for the Form Field
    config, // Config of the field created via getFieldDecorator - antd
    renderInput, // Input to be rendered for the field as a function
  }
 };

 */
const FormRender = ({ fields, form, ...props }) => {
  const { getFieldDecorator } = form;

  const renderFormFields = () => (
    Object.entries(fields).map(([fieldName, fieldData]) => (
      <FormItem key={fieldName} label={fieldData.label}>
        {
          getFieldDecorator(fieldName, fieldData.config)(
            fieldData.renderInput()
          )
        }
      </FormItem>
    ))
  );

  return (
    <Form>
      { renderFormFields() }
    </Form>
  );
};

export const ParamsForm = Form.create({
  onFieldsChange(props, _, allValues) {
    const { onParamsChange } = props;
    const data = formFieldsToParams(allValues);

    onParamsChange(data);
  },
  mapPropsToFields(props) {
    // Two way binding between the Step methodData and the form
    const { methodParams, onParamsChange, fields } = props;

    // Checks the methodParams and if it's empty changes it to initial values
    if (Object.entries(methodParams).length === 0 && methodParams.constructor === Object) {
      const initialParams = getFormFieldsInitialParams(fields);

      onParamsChange(initialParams);
    }

    return mapParamsToFields(methodParams);
  },
})(FormRender);
