import React, { useEffect, useState, useRef } from "react";
import AsyncCreatableSelect from 'react-select/async-creatable';

const colourOptions = [
    {
      label: "Cheddar",
      value: 1,
    },
    {
      label: "Manchego",
      value: 2,
     },
   ]   

function AsyncCreateSelect(props) {

    const filterColors = (inputValue) => {
        return colourOptions.filter(i =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const promiseOptions = inputValue =>
        new Promise(resolve => {
            setTimeout(() => {
                resolve(filterColors(inputValue));
            }, 1000);
        });

    return (
        <AsyncCreatableSelect
            cacheOptions
            defaultOptions
            loadOptions={promiseOptions}
            id={props.name} 
            name={props.name}            
            defaultValue={props.defaultValue}
            inputId={props.name} 
            inputName={props.name}              
            defaultInputValue={props.defaultValue}                      
            placeholder={props.placeholder}
            form={props.form}
        />
    );
}

export default AsyncCreateSelect