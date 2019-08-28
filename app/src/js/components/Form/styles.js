import styled from 'styled-components';
import { Form, Input, InputNumber } from 'antd';

const { Item } = Form;

export const FWInput = styled(Input)``;
export const FWInputNumber = styled(InputNumber)``;

export const FormItem = styled(Item)`
  margin-bottom: 0 !important;

  ${FWInput},
  ${FWInputNumber} {
    width: 100%;
  };
`;
