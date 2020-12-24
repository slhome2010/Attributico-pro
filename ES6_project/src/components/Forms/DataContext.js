import React, { createContext, useContext, useState } from 'react'

const DataContext = createContext()

export const DataProvider = props => {
    const {
        data,
        store,
        children
     } = props

    return (
        <DataContext.Provider value={{data, store}}>
            { children}
        </DataContext.Provider>
    )
}

export const useData = () => useContext(DataContext)


const FormContext = createContext()

export const FormProvider = ({ children }) => {
    const [formData, setData] = useState({})

    const setValues = (values) => {
        setData((prevData) => ({
            ...prevData,
            ...values
        }))
    }

    return (
        <FormContext.Provider value={{ formData, setValues }}>
            { children}
        </FormContext.Provider>
    )
}

export const useForm = () => useContext(FormContext)