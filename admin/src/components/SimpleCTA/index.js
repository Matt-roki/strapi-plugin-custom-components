import React, { useState, useEffect, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Typography, Grid, GridItem, Select, Option, TextInput, ToggleInput } from '@strapi/design-system';
import styles from './styles.module.css'
import Plus from '@strapi/icons/Plus';
import { ModalLayout, ModalBody, ModalHeader, ModalFooter } from '@strapi/design-system';

const SimpleCTA = ({
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
  const [isVisible, setIsVisible] = useState(false);
  const [buttonEdit, setButtonEdit] = useState(false)
  const [buttonOptions, setButtonOptions] = useState({})
  const [data, setData] = useState({
    title: values?.data?.title || "Title",
    text: values?.data?.text || "Text",
    buttons: null
  })

  useEffect(() => {
    if (!isInitialMount.current) {
      onChange({
        target: {
          name: name,
          value: JSON.stringify({
            data: data
          }),
          type: attribute.type,
        },
      });
    } else {
      isInitialMount.current = false;
    }
  }, [data]);

    const buttonStyle = (type) => {
        if(type === undefined) return null
        if(type === "primary") return styles.primaryButton
        else return styles.secondaryButton
    }

  return (
    <Box background="#fff">
      <Box padding={4}>
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <input value={data.title} onChange={(e) => setData({...data, title: e.target.value})} className={styles.title} type="text"/>
                <textarea rows={3} value={data.text} onChange={(e) => setData({...data, text: e.target.value})} className={styles.text} type="text"/>
                <div className={styles.buttonHolder}>
                    {data?.buttons?.map((v, i) => (
                        <button 
                            onClick={() => {
                                setButtonOptions({...v})
                                setIsVisible(true)
                                setButtonEdit(true)
                            }}
                            className={buttonStyle(v.type)} 
                            type='button' key={i}>
                                {v.text} {v.icon}
                        </button>
                    ))}
                    <button type='button' onClick={() => setIsVisible(true)} className={styles.add}><Plus/></button>
                </div>
            </div>
        </div>
        {isVisible && <ModalLayout onClose={() => setIsVisible(prev => !prev)} labelledBy="title">
            <ModalHeader>
            <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
                Confugure button
            </Typography>
            </ModalHeader>
            <ModalBody>
            <Grid gap={2}>
        <GridItem padding={1} col={4} s={12}>
        <Select
            name="button-preview-type"
            id="button-preview-type"
            label="Type"
            required={true}
            hint="Button type"
            onChange={(v) => setButtonOptions({...buttonOptions, type: v })}
            placeholder="Select a button type"
            value={buttonOptions?.type}
            >
            <Option value="primary">
                Primary
            </Option>
            <Option value="Secondary">
                Secondary
            </Option>
          </Select>
        </GridItem>
        <GridItem padding={1} col={4} s={12}>
        <TextInput 
          required={true}
          placeholder="Enter the button text" 
          label="Text" 
          name="text" 
          onChange={(e) => {
            setButtonOptions({...buttonOptions, text: e.target.value })
          }}
          value={buttonOptions?.text} 
        />
        </GridItem>
        <GridItem padding={1} col={4} s={12}>
        <TextInput 
          required={true}
          placeholder="/home" 
          label="URL" 
          name="url" 
          onChange={(e) => {
            setButtonOptions({...buttonOptions, url: e.target.value })
          }}
          value={buttonOptions?.url} 
        />
        </GridItem>
        <GridItem padding={1} col={6} s={12}>
          <Select
              name="button-preview-icon"
              id="button-preview-icon"
              label="Icon"
              required={required}
              hint="Button icon"
              onChange={(v) => setButtonOptions({...buttonOptions, icon: v})}
              placeholder={placeholder}
              value={buttonOptions?.icon}
              >
              <Option value={null}>None</Option>
              <Option value="arrow">
                    arrow
              </Option>
          </Select>
        </GridItem>
        <GridItem padding={1} col={6} s={12}>
            <ToggleInput label="New Tab" name="new-tab-provider" onLabel="True" offLabel="False" checked={buttonOptions?.checked} onChange={e => setButtonOptions({...buttonOptions, checked:e.target.checked})} />
        </GridItem>
        <GridItem alignItems="stretch" padding={1} col={12} s={12} style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100%"}}>
            <button 
                type='button' 
                className={buttonStyle(buttonOptions?.type)}>
                    {buttonOptions?.text} {buttonOptions?.icon}
                </button>
        </GridItem>
      </Grid>
            </ModalBody>
            <ModalFooter startActions={<Button onClick={() => {
                setIsVisible(false)
                setButtonOptions({})
                setButtonEdit(false)
            }} variant="tertiary">
                Cancel
                </Button>} endActions={<>
                {buttonEdit ?
                <Button 
                    variant="danger"
                    onClick={() => {
                        setData({...data, buttons: null})
                        setButtonOptions({})
                        setIsVisible(false)
                        setButtonEdit(false)
                    }}
                >
                    Remove
                </Button>
                :
                <Button 
                    disabled={
                        buttonOptions?.text === undefined || 
                        buttonOptions?.text === "" || 
                        buttonOptions?.type === undefined ||
                        buttonOptions?.url === undefined ||
                        buttonOptions?.url === ""
                    } 
                    onClick={() =>{ 
                        setIsVisible(prev => !prev)
                        setData({...data, buttons: data?.buttons === null ? [buttonOptions] : [...data?.buttons, buttonOptions]})
                        setButtonOptions({})
                    }}>Add</Button>}
                </>} />
        </ModalLayout>}
      </Box>
    </Box>
  )
}

SimpleCTA.defaultProps = {
  description: null,
  disabled: false,
  error: null,
  labelAction: null,
  required: false,
  value: '',
}

SimpleCTA.propTypes = {
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

export default SimpleCTA
