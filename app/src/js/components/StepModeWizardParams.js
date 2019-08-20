import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, InputNumber, Slider, Button } from 'antd';
import { setCurrentImage, addHistoryEntry } from '../actions/stepModeActions';

/*
ITEM CONF:
  * type
  * defaultValue
  * label
  * id - same as API param name
  * minVal
  * maxVal
  * step for Slider (same as precision :))
*/

const StepModeWizardParams = ({ stepId, inputs, isMulti, onSubmit, dispatch, ...props }) => {
  const initialParams = inputs.reduce((acc, input) => ({ ...acc, [input.id]: input.defaultValue }), {});
  const [currentParams, setCurrentParams] = useState(initialParams);

  const onValueChange = (id) => (val) => {
    setCurrentParams({ ...currentParams, [id]: val });
  }

  const submitForm = () => {
    console.log(currentParams);
    onSubmit(currentParams).then((response) => {
      const entry = {
        params: currentParams,
        image: response.data.filePath,
        data: response.data.data || {},
      };

      dispatch(setCurrentImage(response.data.filePath));
      dispatch(addHistoryEntry(stepId, isMulti, entry));
    });
  }

  const renderInput = (input) => {
    switch (input.type.toLowerCase()) {
      case 'number':
        return (
          <InputNumber
            id={input.id}
            min={input.min}
            max={input.max}
            step={input.step || 1}
            defaultValue={input.defaultValue}
            onChange={onValueChange(input.id)}/>
        );
      case 'slider':
        return (
          <Slider
            id={input.id}
            min={input.mix}
            max={input.max}
            defaultValue={input.defaultValue}
            step={input.step || 1}
            marks={{ [input.min]: input.min, [input.max]: input.max }}
            onChange={onValueChange(input.id)}
            tooltipVisible/>
        );
      default:
        return;
    }
  }

  return (
    <Form data-step-id={ stepId }>
      {
        inputs.map((input) => (
          <Form.Item key={input.id} label={input.label}>
            { renderInput(input) }
          </Form.Item>
        ))
      }
      {
        isMulti &&
        <Button
          type="normal"
          icon="rollback"
          size="large"
          { ...props.history.length === 0 && { disabled: true }}
          onClick={() => {}}>
          Revert last
        </Button>
      }
      <Button type="primary"
        size="large"
        onClick={ submitForm }
        { ...isMulti && { icon: "plus" } }>
        Process
      </Button>
    </Form>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { isMulti, stepId } = ownProps;

  if (!isMulti) {
    return;
  }

  return ({
    history: state.stepMode.steps[stepId] && state.stepMode.steps[stepId].history || [], // TODO: this is ugly, try to somehow init the history
  });
};

export default connect(mapStateToProps)(StepModeWizardParams);
