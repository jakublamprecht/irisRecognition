import React from 'react';
import { Button, Icon, Tooltip } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { downloadObjectAsJson } from '../../../../helpers/download';
import { getStepData } from '../../../../helpers/stepModeHelpers';
import { clearStepData } from '../../../../actions/stepModeActions';
import { STEP_STEPS } from '../../../../stateMachine/stateNames';
import { WizardStep } from '../../../../components/WizardStep';
import { MatchingResults } from '../../../../components/MatchingResults';

export const Results = (props) => {
  const { stepId } = props;
  const dispatch = useDispatch();

  const processConfig = useSelector(getStepData(STEP_STEPS.PROCESSING));
  const { imageData: processingImageData, matchingEntries} = useSelector(getStepData(stepId));

  const saveProcessConfig = () => {
    downloadObjectAsJson(processConfig, 'processConfig');
  };

  const onPreviousTransition = () => {
    dispatch(clearStepData(stepId));
  };

  return (
    <WizardStep {...props} onPreviousTransition={onPreviousTransition}>
      <Tooltip placement='bottom' title='Save process config file to use it later in Batch mode.'>
        <Button type='primary' onClick={saveProcessConfig}>
          Download process config file <Icon type='download'/>
        </Button>
      </Tooltip>
      <MatchingResults
        processingImageData={processingImageData}
        matchingEntries={matchingEntries}
        noCollapseAction={true}/>
    </WizardStep>
  )
};
