import React from 'react';
import BrandImages from '../components/BrandImages'
import SimpleCTA from './SimpleCTA';


const ComponentSelection = ({
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
    const type = attribute['options']?.type
    if(type === "Brand Images") {
        return (
        <BrandImages value={value} onChange={onChange} name={name} attribute={attribute} intlLabel={intlLabel}/>
    )}
    if(type === "Simple CTA") return <SimpleCTA value={value} onChange={onChange} name={name} attribute={attribute} intlLabel={intlLabel} />
    else return <p>Unknown component type</p>
}

export default ComponentSelection