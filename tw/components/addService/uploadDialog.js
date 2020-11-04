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
      title={iconType == 1 ? '選擇默認圖示' : '上傳圖片'}
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
            <span className="iconDesc">上傳本地圖示</span>
            <span className="iconTip">圖示尺寸必須為120*120的JPG、GIF、PNG圖片且尺寸不大於5M</span>
          </div>)
      }
    </PopDialog>
  )
}
export default UploadDialog;
