import './createProducts.css'
import IMG from '../../../assets/album.jpeg'
import { useEffect, useState } from 'react'
import { saveImgToDB } from '../../../utils/firebase'
import createRandom from '../../../utils/createRandom'
import axios from 'axios'
import {backendURL, config} from '../../../utils/utils'
import { useNavigate } from 'react-router'
export default function createproducts() {
    const navigate = useNavigate()
    const size = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12]
    const [qty,setQty] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0])
    // const [colorElem, setColorElem] = useState()
    // const [Color, setColor]=useState([])
    // useEffect(() =>{
    //     Color.map((data,i)=>{
    //         document.getElementById(`color${i+1}`).style.backgroundColor = data
    //     })
    // },[Color]);

    // const addElem = obj => {
    //     setColor(current => [...current, colorElem]);
    // };
    // const arrayRemove = value => {
    //     setColor(oldValues => {
    //     return oldValues.filter(fruit => fruit !== value)
    //     })
    // }
    const [uploadedImg,setUploadedImg] = useState()
    const handleInputClick = ()=>{
        document.getElementById('getFile').click()
    }  
    const [imgData, setImgData]= useState()
    const [name,setName] = useState()
    const [price,setPrice] = useState()
    const [description,setDescription] = useState()

    const imgupload = (img)=>{
        setUploadedImg(URL.createObjectURL(img))
    }
 
    const clickUpload = async()=>{
        const fileName = createRandom(12)
        const productID = createRandom(20)
        try{
            await saveImgToDB(fileName, imgData)
            await axios.post(`${backendURL}/api/products/createProduct`,{
                ProductId : productID,
                Name: name,
                Description : description,
                Amount : price,
                Image: fileName,
                Qty: qty,
                Size: size,
            },config)
        }catch(error){
            console.log(error)
        }
        
    }


    const changeSizeQty = (sizeIn, qtyNum) => {

        const newArray = qty.map((item, i) => {
            if (sizeIn === size[i]) {
              return Number(qtyNum);
            } else {
              return item;
            }
          });
          setQty(newArray);
    }
    console.log(qty)
    return (
    <div className='create-products-wrapper background flex'>
       <div className="create-products-box secondary-bg flex-column">
            <div className="create-product-sub-box">
                <div className="create-products-section-1">
                    <button onClick={()=>{navigate('/admin/products')}}><i className="fa-solid fa-arrow-left-long"></i></button>
                </div>
                <div className="create-products-section-2">
                    <div className="create-product-img-upload">
                        <input type="file" accept="image/*" id="getFile" onChange={(e)=>{setImgData(e.target.files[0]); imgupload(e.target.files[0])}}/>
                        {/* <img src={uploadedImg?uploadedImg:IMG} alt="" /> */}
                        {
                            uploadedImg?
                            <img src={uploadedImg}  />
                            :<div className="create-product-img-dummy"></div>
                        }
                        <button onClick={()=>{handleInputClick()}}><i className="fa-solid fa-plus"></i></button>
                    </div>
                    <div className="create-product-name">
                        <span>Name</span>
                        <input type="text" name='name' onChange={(e)=>{setName(e.target.value)}}/>
                        <span>Description</span><br />
                        <textarea cols="30" rows="10" onChange={(e)=>{setDescription(e.target.value)}}></textarea><br />
                        <span>Price</span><br />
                        <input type="number" name='price' onChange={(e)=>{setPrice(e.target.value)}}/>
                    </div>
                </div>
                <br />
                {/* <span>Add Color Options</span><br />
                <div className="create-product-select-color">
                    
                    <div className="create-product-select-color-menu">
                        <input type="color" name="" id="" onChange={(e)=>{setColorElem(e.target.value)}}/>
                        <button onClick={()=>{addElem()}}>ADD COLOR</button>
                    </div>
                    <div className="create-product-selected-colors">
                        {
                            Color.map((data,i) =>
                            <button id={`color${i+1}`} onClick={()=>{arrayRemove(data);}} key={i}><i className="fa-solid fa-trash"></i></button>
                            )
                        }
                    </div>
                </div> */}
                <span>Add Size Options</span><br />
                <div className="create-product-select-size">
                    {
                        size.map((data,i) =>
                        <div className="create-product-size-sub" key={i}>
                            <div><span>{data}</span></div>
                            <input type="number" onChange={(e)=>{changeSizeQty(data,e.target.value)}}/>
                        </div>
                        )
                    }

                </div>
                <div className="create-product-submit flex">
                    <button onClick={()=>{clickUpload()}}>CREATE</button>
                </div>
            </div>

       </div>
    </div>
  )
}
