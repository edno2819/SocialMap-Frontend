import React, { ChangeEvent, FormEvent, useState } from 'react';
import { TextField, Stack, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import CustomAppBar from '../../components/CustomAppBar';
import DropZone from '../../components/DropZone';
import server from '../../api/server';
import logo from '../../assets/logoAlert.png';

import './index.css'

const EditPerfil = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("accessToken");
    const [selectedFile, setSelectedFile] = useState<File>();
    const [formData, setFormData] = useState({
        name: "",
        about: "",
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const { name, about } = formData;
        const data = new FormData();

        data.append("name", name);
        data.append("about", about);
        if (selectedFile) {
            data.append("file", selectedFile);
        };


        try {
            await server.post('/posts', data, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast.success('Post criado com sucesso!', {
                icon: () => <img src={logo} alt="logo" />,
            });

            navigate("/home");
        } catch (err) {
            toast.error('Ocorreu um erro ao criar o Post', {
                icon: () => <img src={logo} alt="logo SocialMap" />,
            });
        }
    }

    return (
        <div>
            <CustomAppBar />

            <div className='mainNewPost'>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={6}>

                        <TextField
                            variant='standard'
                            label='Nome'
                            name='name'
                            value={formData.name}
                            onChange={handleInputChange}
                        />

                        <TextField
                            variant='standard'
                            label='Descrição'
                            name='about'
                            multiline
                            minRows={3}
                            value={formData.about}
                            onChange={handleInputChange}
                        />

                        <DropZone onFileUploaded={setSelectedFile} />
                        <Button variant='contained' type='submit'>Publicar</Button>

                    </Stack>
                </form>
            </div>
        </div>
    );
}

export default EditPerfil;