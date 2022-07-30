import React, { useState, useCallback } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import { useDropzone } from 'react-dropzone';

import './index.css'

interface Props {
    onFileUploaded: (file: File) => void;
}

function DropZone({ onFileUploaded }: Props) {
    const [selectedFileUrl, setSelectedFileUrl] = useState('');

    const onDrop = useCallback(
        (acceptedFiles: any[]) => {
            const file = acceptedFiles[0];

            const fileUrl = URL.createObjectURL(file);
            setSelectedFileUrl(fileUrl);
            onFileUploaded(file);
        },
        [onFileUploaded]
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
    });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />

            {selectedFileUrl ?
                (<div className='DropImageWithImage'>
                    <img className="imageSelected" src={selectedFileUrl} alt='Point thumbnail' />
                </div>)
                : 
                (<div className='DropImage'>
                    <ImageIcon style={{ fontSize: '50px' }}/>
                    <h3>Selecione sua imagem</h3>
                    </div>)}
        </div>
    );
}

export default DropZone;