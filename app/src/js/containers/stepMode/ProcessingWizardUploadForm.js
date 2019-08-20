import React from 'react';
import { connect } from 'react-redux';
import { Button, Upload, Icon } from 'antd';
import * as API from '../../api';
import { setSelectedImage, setCurrentImage } from '../../actions/stepModeActions';

const Dragger = Upload.Dragger;

const mapStateToProps = (state) => ({
  selectedImagePath: state.stepMode.selectedImage,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedImage: (imagePath) => dispatch(setSelectedImage(imagePath)),
  setCurrentImage: (imagePath) => dispatch(setCurrentImage(imagePath)),
});

const ProcessingWizardUploadForm = ({ selectedImagePath, setSelectedImage, setCurrentImage, transitionToNext }) => {
  // File list probably not needed here, remove it - but it will be needed in other views, so remove it later
  // const [fileList, setFileList] = useState([]);

  const handleStartProcessingClick = () => (
    API.uploadFile(selectedImagePath)
      .then((response) => {
        console.log('fileUploaded');
        setCurrentImage(response.data.filePath);
        transitionToNext();
      })
  );

  const uploadProps = {
    name: 'file',
    multiple: false,
    // fileList,
    // listType: 'picture-card',
    showUploadList: false,
    beforeUpload(file) {
      // const transformedFileList = [file].map(fileToObject);

      // setFileList(transformedFileList);
      setSelectedImage(file.path);
      return false;
    },
    // onRemove(file) {
    //   setFileList([]);
    //   setFilePath('');
    // },
  };

  return (
    <div className="wizard-form wizard-form--upload">
      <Dragger {...uploadProps} className="form-uploadField">
        {
          selectedImagePath !== null
          && <img className="wizard-upload--preview" src={`file:///${selectedImagePath}`} />
        }
        <p className="ant-upload-drag-icon">
          <Icon type="upload" />
        </p>
        <p className="ant-upload-text">
          {
            selectedImagePath !== null
            && 'Drag and drop or click to select a different image for processing.'
            || 'Drag and drop or click and select an image for processing.'
          }
        </p>
      </Dragger>
      <Button
        onClick={handleStartProcessingClick}
        disabled={selectedImagePath === null}
        type="primary"
        size="large"
        block>
        Start processing
        <Icon type="right-circle" />
      </Button>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProcessingWizardUploadForm);
