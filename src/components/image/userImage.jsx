import { useState , useEffect} from 'react'
import { downloadUserIMG } from '../../utils/firebase'
import './image.css'
export default function Image({id}) {
    const [Img, setImg] = useState()
    useEffect(()=>{
      if(id){
        getImage(id)
      }
      
    },[])
    const getImage = async (id)=>{
      const img = await downloadUserIMG(id)
      setImg(img)
    }
    
  return (
    <div className='image-wrapper flex'>
    {
      Img?
      <img src={Img} alt="" />
      :  <div className="image-loading">
    
    </div>
    }
      
    </div>
  )
}
