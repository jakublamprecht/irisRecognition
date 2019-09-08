import styled from 'styled-components';

export const PreviewWrapper = styled.div`
  flex: 1;
  padding: 0 0 10px;
`;

export const ButtonsWrapper = styled.div`
  padding-top: 10px;
`;

export const Image = styled.img`
  width: 100%;
`;

export const EmptyImage = styled.div`
  position: relative;
  flex: 1;
  width: 100%;
  margin-right: 30px;
  height: 0;
  padding-top: 100%;
  background-color: #cccccc;
`;

export const EmptyContent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
`;
