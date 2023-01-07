import { Link } from 'react-router-dom'
import '../main.scss'
import '../App.css'
import { useGlobalContext } from '../context'


export const ProductList = () => {
    const {dataList, setDataList, productTypes, special} = useGlobalContext()


    // delete checked list items
    const massDelete = (e) => {
        e.preventDefault()
        const newData = dataList.filter(item => !item.isChecked)
        setDataList(newData)
    }
    // set checked items 
    const checkhandle = (id) => {
        const targetItem = dataList.find(item => item.SKU === id)
        const newItem = {...targetItem, isChecked: !targetItem.isChecked}

        // change old value with new
        const newData = dataList.map((item) => {
            if (item.SKU === targetItem.SKU) {
                return newItem
            } else {
                return item
            }
        })
        // set modified list to new data list
        setDataList(newData)
    }


  return (
    <>
        <header className='navigation'>
            <h1>Product List</h1>
            <div className='btns-wraper'>
                <Link to='/AddProduct' className='btn'>ADD</Link>
                <button onClick={massDelete} id='delete-product-btn' className='btn'>MASS DELETE</button>
            </div>
        </header>
        <ul className='box-border container'>
            {dataList.map((list, index) => {
                const {SKU, name, price, isChecked, producttype} = list
                const currentProduct = productTypes.find(list => list.type === producttype)
                console.log(currentProduct)
                console.log(list[currentProduct.attributes[0]])
                return <li key={index}>
                            <input type="checkbox" className='delete-checkbox' checked={isChecked} onChange={() => checkhandle(SKU)}/>
                            <h3>{SKU}</h3>
                            <p>{name}</p>
                            <p>{price}$</p>
                            <p>{special[currentProduct.type][0].toUpperCase() + special[currentProduct.type].substring(1)} : {typeof(list.dimmension) === "function" ? list.dimmension().join("x") :
                             list[currentProduct.attributes[0]]} {currentProduct.measure}</p>
                        </li>
            })}
        </ul>
    </>
  )
  
}

