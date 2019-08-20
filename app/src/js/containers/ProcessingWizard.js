import React from 'react';
import { connect } from 'react-redux';
import { Steps, Button } from 'antd';
import { revertLastStep } from '../actions/stepModeActions';
import { transitionToNextStep, transitionToPreviousStep } from '../actions/transitionActions';
import ProcessingWizardStep from './ProcessingWizardStep';
const Step = Steps.Step;

class ProcessingWizard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };

    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });

    this.props.transitionToNextStep();
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });

    this.props.transitionToPreviousStep();
    this.props.revertLastStep();
  }

  render() {
    const { current } = this.state;
    const { steps } = this.props;

    return (
      <div className="wizard">
        <Steps className="wizard-steps" current={ current }>
          { steps.map(item => <Step key={ item.title } title={ item.title } />) }
        </Steps>
        <div className="steps-content fill-height">
          <ProcessingWizardStep
            transitionToPrev={ this.prev }
            transitionToNext={ this.next }
            step={ steps[current] }/>
        </div>
        <div className="steps-action">
          {
            current < steps.length - 1 &&
            steps[current].hasPreview !== false &&
            <Button
              type="primary"
              { ...(current === 0 && { block }) } // if it's the first step make it block
              onClick={ this.next }>
              Next
            </Button>
          }
          {
            current > 0
            && (
              <Button
                style={{ marginLeft: 8 }}
                onClick={ this.prev }>
                Previous
              </Button>
            )
          }
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  transitionToNextStep: () => dispatch(transitionToNextStep()),
  transitionToPreviousStep: () => dispatch(transitionToPreviousStep()),
  revertLastStep: () => dispatch(revertLastStep()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProcessingWizard);
