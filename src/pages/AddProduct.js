// import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useGlobalContext } from '../context'
import '../main.scss'
import '../App.css'



export const AddProduct = () => {
    const navigate = useNavigate()
    const {setDataList, listItem, setListItem, productTypes, special} = useGlobalContext()
    

    const handleChange = (e) => {
        const {name, value} = e.target
        // handle on change inputs. Navigate to products list.
        if (name === "width" || name === "length" || name === "height") {
            setListItem((prev) => {
                return {
                    ...prev,
                    [name]: value,
                    dimmension: function() {
                        return [this.height, this.width, this.length]
                    }
                }
            })
        }
        setListItem((prev) => {
        return {
                ...prev,
                [name]: value
                }
            })
    }

    // handle on submit form. Navigate to products list.
    const handleSubmit = (e) => {
        e.preventDefault()
        // if every input have value navigate to list page
        // checking list validation
        if (Object.values(listItem).every(val => val.length > 0 || typeof(val) === "function")) {
            // add isChecked prop to listItem
            setListItem((prev) => {
                return {
                    ...prev,
                    isChecked: false
                }
            })
            // add new item to the data list
            setDataList((prev) => {
                return [
                    ...prev,
                    listItem
                ]
            })
            
            // set items value to default
            setListItem({})
            // navigate to list page
            navigate('/')
        }
    
    }

   
    
    // find the type that the user choose
    const choseenType = productTypes.find(item => item.type === listItem.producttype)

  return (
    <>
        <header className='navigation'>
            <h1>Add product</h1>
            <div className='btns-wraper'>
                <button onClick={handleSubmit} id='delete-product-btn' className='btn'>Save</button>
                <Link to='/' className='btn'>Cancel</Link>
            </div>
        </header>
        <form className='product_form box-border container' id='product_form' onSubmit={handleSubmit}>
            <div className='item-container'>
                <label htmlFor='sku'>SKU</label>
                <input type='text' name="SKU" id='sku' onChange={handleChange} /><br />
            </div>
                <div className='item-container'>
                <label htmlFor='name'>Name</label>
            <input type='text' name="name" id='name' onChange={handleChange} /><br />
            </div>
            <div className='item-container'>
                <label htmlFor='price'>Price ($)</label>
                <input type='text' name="price" id='price' onChange={handleChange} />
            </div>
            <div className='item-container'>
                <label htmlFor='productType'>Type Switcher</label>
                <select name="producttype" id="productType" onChange={handleChange}>
                    <option value="null">Type Switcher</option>
                    {productTypes && productTypes.map((item) => {
                        const loverCase = item.type
                        const upperCase = item.type[0].toUpperCase() + item.type.substring(1)
                        return <option key={loverCase} value={loverCase}>{upperCase}</option>
                    })}
                </select>
            </div>
            <div className='item-container'>
                {choseenType && choseenType.attributes.map((item, index) => {
                    return <div className='item-type-container' key={index}>
                                <label htmlFor={`${item}`}>{`${item} (${choseenType.measure})`}</label>
                                <input type='text' name={item} id={`${item}`} onChange={handleChange}/>
                            </div>
                })}
                <div className='description'>
                    {choseenType && `Please, provide ${special[choseenType.type]}`}
                </div>
            </div>
        </form>
    </>
  )
}
  
  
