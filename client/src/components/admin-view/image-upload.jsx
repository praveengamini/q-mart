import React, { useEffect } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useRef } from 'react'
import { UploadCloudIcon } from 'lucide-react'
import { FileIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { XIcon } from 'lucide-react'
import axios from 'axios'
import { Skeleton } from '../ui/skeleton'
const ProductImageUpload = ({imageFile,setImageFile,uploadedImageUrl,setUploadedImageUrl,setImageLoadingState,imageLoadingState,isEditMode}) => {
  const inputRef = useRef(null);
  function handleImageFileChange(event)
    {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) setImageFile(selectedFile)
    }
    function handleDragOver(event)
    {
        event.preventDefault();
        const draggedFile = event.dataTransfer.files?.[0];
        if(draggedFile)
            setImageFile(draggedFile)
    }
    function handleDrop(event)
    {
        event.preventDefault();
        const draggedFile = event.dataTransfer.files?.[0];
        if(draggedFile)
            setImageFile(draggedFile)
    }
    function handleRemoveImage()
    {
            setImageFile(null)
            if(Input.current)
            {
                inputRef.current.value = ''
            }
    }
    async function uploadedImageToCloudinary() {
        setImageLoadingState(true)
        const data = new  FormData();
        data.append('my_file', imageFile);
        const response = await axios.post(
            "http://localhost:5000/api/admin/products/upload-image",
            data
          );
        console.log(response.data);
                
        if(response?.data?.success)
           { setUploadedImageUrl(response.data.result.url)
            setImageLoadingState(false)
           }

    }
    useEffect(()=>{
        if (imageFile!==null)
        {
            uploadedImageToCloudinary();
        }
    },[imageFile])
  return (
    <div className='w-full max-w-md mx-auto mt-4'>
      <Label className = " text-lg font-semibold mb-2 block">
        Upload Image
        </Label>
        <div onDragOver={handleDragOver} onDrop={handleDrop} className='border-2 border-dashed rounded-lg mb-2 p-4'></div>
        <Input id="image-upload" type= "file" className={`${isEditMode ? 'cursor-not-allowed' : ''} hidden`}
        disabled = {isEditMode}
        ref={inputRef} onChange={handleImageFileChange} accept="image/*" />
        {
            !imageFile? 
            (<Label htmlFor="image-upload" className = {` ${isEditMode ? 'cursor-not-allowed' : ''} flex flex-col justify-center items-center h-32 cursor-pointer`}>
            <UploadCloudIcon className={`w-10 h-10 text-muted-foreground mb-2`} />
            <span>Drag & drop or click to upload image</span>
            </Label>)
            :
            (
                imageLoadingState?
                <Skeleton className="h-10 bg-gray-100 " />:
            <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                    <FileIcon />
                </div>
                <p className='text-sm font-medium'>{imageFile.name}</p>
                <Button variant='ghost'  size = "icon" className= "text-muted-foreground hover:text-foreground" onClick={handleRemoveImage}>
                    <XIcon className="w-4 h-4" />
                    <span className='sr-only'>Remove File</span>
                </Button>
            </div>)
        }
    </div>
  )
}

export default ProductImageUpload
