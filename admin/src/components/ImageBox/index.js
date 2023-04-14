import React from 'react';
import { useState } from 'react';
import MediaLib from '../MediaLib';
import PicturePlus from '@strapi/icons/PicturePlus'
import { Icon } from '@strapi/design-system';

const ImageBox = ({handleChange, className, value}) => {

    const [edit, setEdit] = useState(false)

    return(
      <div onClick={() => setEdit(true)} className={className} style={value.image !== null ? {border: "2px solid #fff", backgroundColor: "#fff"} : null}>
      <MediaLib isOpen={edit} onToggle={() => setEdit(!edit)} onChange={(assets) => handleChange(assets)}/>
      {value.image === null ? <Icon width={`100%`} height={`${25 / 16}rem`} color="primary900" as={PicturePlus} /> : 
      <>
      <button type='button' onClick={() => handleChange(null)} style={{position: "absolute", top: 0, right: 0}}>x</button>
      <img src={value.image.url} alt={value.image.alt} style={{overflow: "hidden"}}/>
      </>}
      </div>
    )
}

export default ImageBox