import React from 'react';
import PopDialog from 'pub-comp/pop';
import Icon from 'pub-comp/icon';
import { iconData } from './iconUrl.json';
import { iconDialogContent, iconDialogContent2 } from './index.css';
import { u8c } from './u8c.css'

const UploadDialog = (props) => {
  const { iconType, iconDialog, precutIndex, newApplicationIcon, iconBtn } = props;
  const { closeIconDialog, imgChange, precut } = props;
  return (
    <PopDialog
      title={iconType == 1 ? 'Select default icon' : 'Please upload picture.'}
      type=""
      className={`${u8c} u8cDialog`}
      close={closeIconDialog}
      show={iconDialog}
      btns={iconBtn}
    >
      {
        iconType === 1 ?
          (<div className={iconDialogContent2}>
            {
              iconData.map((item, index) => {
                return <span key={`cdnImg-${index}`} className={`cdnImgOuter ${precutIndex === index ? 'cdnImgActive' : ''}`}><img className="cdnImg" src={item.url} key={`cdnImg-${index}`} onClick={e => { precut(index, item.url) }} /></span>
              })
            }
          </div>)
          :
          (<div className={iconDialogContent}>
            {newApplicationIcon !== '' && <img id="imgSrc2" src={newApplicationIcon} className="appImg" alt="" />}
            <span className="iconOuter">
              <input type="file" id="btn_file2" accept="image/x-png,image/gif,image/jpeg,image/bmp" onChange={imgChange} />
              <Icon type="add" className="iconAdd"></Icon>
            </span>
            <span className="iconDesc">Upload Local Icon</span>
            <span className="iconTip">Size: 120*120;JPG、GIF、PNG; no more than 5M</span>
          </div>)
      }
    </PopDialog>
  )
}
export default UploadDialog;
