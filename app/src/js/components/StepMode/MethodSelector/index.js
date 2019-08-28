import React from 'react';
import { MethodSelect, Title } from './styles';

const { Option } = MethodSelect;

export const MethodSelector = ({ className, methods, selectorTitle, methodData, onMethodChange, onParamsChange }) => {
  const { method } = methodData;

  const renderMethods = () => {
    return Object.entries(methods).map(([methodId, methodData]) => (
      <Option key={methodId} value={methodId}>{methodData.title}</Option>
    ))
  };

  const renderMethodForm = () => {
    const CurrentMethodForm = methods[method].form;

    return (
      <>
        {
        !methods[method].noParams &&
        <>
          <Title>Select parameters:</Title>
          <CurrentMethodForm onParamsChange={onParamsChange} methodData={methodData}/>
        </>
        } {
          methods[method].noParams &&
          <Title>This method has no params.</Title>
        }
      </>
    )
  };

  return (
    <div className={className}>
      <Title>{selectorTitle}</Title>
      <MethodSelect
        value={method}
        onChange={onMethodChange}>
        { renderMethods() }
      </MethodSelect>
      { renderMethodForm() }
    </div>
  );
};
