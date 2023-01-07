import React, { useState, useContext } from 'react'




const AppContext = React.createContext()



const AppProvider = ({children}) => {

    const [dataList, setDataList] = useState([])
    const [listItem, setListItem] = useState(
            {
                SKU: "",
                name: "",
                price: "",
                producttype: "",
            }
        )

        // product types data
    const productTypes = [
        {
            type: "DVD",
            attributes: ["size"],
            measure: "MB" 
        },
        {
            type: "book",
            attributes: ['weight'],
            measure: "KG" 
        },
        {
            type: "furniture",
            attributes: ["height", "length", "width"],
            measure: "CM"
        }
    ]

    // special attribute text based on type of product
    const special = {
        DVD: "size",
        book: "weight",
        furniture: "dimmension"
    }

    return (
        <AppContext.Provider
            value={{
                dataList,
                setDataList,
                listItem,
                setListItem,
                productTypes,
                special
            }}
        >
            {children}
        </AppContext.Provider>
    )
    
}


export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }