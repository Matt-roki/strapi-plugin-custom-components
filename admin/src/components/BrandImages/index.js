import React, { useState, useEffect, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@strapi/design-system';
import styles from './styles.module.css'
import ImageBox from '../ImageBox';

const BrandImages = ({
  value,
  onChange,
  name,
  intlLabel,
  required,
  attribute,
  description,
  placeholder,
  disabled,
  error,
}) => {

  const values = useMemo(() => {
    let dropValue
    try{
      dropValue = JSON.parse(value)
      return dropValue
    } catch {
      dropValue = ""
    }
  })
  const isInitialMount = useRef(true);
  const [images, setImages] = useState([
  {
    id: 0,
    image: values?.data[0]?.image || null
  },
  {
    id: 1,
    image: values?.data[1]?.image || null
  },
  {
    id: 2,
    image: values?.data[2]?.image || null
  },
  {
    id: 3,
    image: values?.data[3]?.image || null
  },
  {
    id: 4,
    image: values?.data[4]?.image || null
  },
  {
    id: 5,
    image: values?.data[5]?.image || null
  },
  {
    id: 6,
    image: values?.data[6]?.image || null
  },
  ])

  useEffect(() => {
    if (!isInitialMount.current) {
      onChange({
        target: {
          name: name,
          value: JSON.stringify({
            data: images
          }),
          type: attribute.type,
        },
      });
    } else {
      isInitialMount.current = false;
    }
  }, [images]);


  return (
    <Box background="#fff">
      <Box  padding={4}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <ImageBox 
                value={images[0]}
                className={styles.box1}
                handleChange={(assets) => {
                const newImages = [...images];
                newImages[0] = {
                  ...newImages[0],
                  image: assets === null ? null : {
                    ...assets[0]
                  },
                };    
                setImages(images => newImages);
              }}/>
              <ImageBox 
                value={images[1]}
                className={styles.box1}
                handleChange={(assets) => {
                const newImages = [...images];
                newImages[1] = {
                  ...newImages[1],
                  image: assets === null ? null : {
                    ...assets[0]
                  },
                };    
                setImages(images => newImages);
              }}/>
        </div>
        <div className={styles.container}>
          <ImageBox 
            value={images[2]}
            className={styles.box2}
            handleChange={(assets) => {
            const newImages = [...images];
            newImages[2] = {
              ...newImages[2],
              image: assets === null ? null : {
                ...assets[0]
              },
            };    
            setImages(images => newImages);
          }}/>
          <ImageBox 
            value={images[3]}
            className={styles.box6}
            handleChange={(assets) => {
            const newImages = [...images];
            newImages[3] = {
              ...newImages[3],
              image: assets === null ? null : {
                ...assets[0]
              },
            };    
            setImages(images => newImages);
          }}/>
        </div>
        <div className={styles.container}>
          <ImageBox 
            value={images[4]}
            className={styles.box3}
            handleChange={(assets) => {
            const newImages = [...images];
            newImages[4] = {
              ...newImages[4],
              image: assets === null ? null : {
                ...assets[0]
              },
            };    
            setImages(images => newImages);
          }}/>
          <ImageBox 
            value={images[5]}
            className={styles.box4}
            handleChange={(assets) => {
            const newImages = [...images];
            newImages[5] = {
              ...newImages[5],
              image: assets === null ? null : {
                ...assets[0]
              },
            };    
            setImages(images => newImages);
          }}/>
          <ImageBox 
            value={images[6]}
            className={styles.box5}
            handleChange={(assets) => {
            const newImages = [...images];
            newImages[6] = {
              ...newImages[6],
              image: assets === null ? null : {
                ...assets[0]
              },
            };    
            setImages(images => newImages);
          }}/>
        </div>
      </div>
      </Box>
    </Box>
  )
}

BrandImages.defaultProps = {
  description: null,
  disabled: false,
  error: null,
  labelAction: null,
  required: false,
  value: '',
}

BrandImages.propTypes = {
  intlLabel: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  attribute: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.object,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  labelAction: PropTypes.object,
  required: PropTypes.bool,
  value: PropTypes.string,
}

export default BrandImages
