import React, { useState } from 'react';
import axios from 'axios';
import { CCard, CCardBody, CCol, CFormCheck, CFormInput, CRow } from '@coreui/react';
import { useTheme } from '@mui/material/styles';
import Swal from 'sweetalert2';

interface ITodoAdd {
    onTaskAdded: () => void;
}

export const TodoAdd: React.FC<ITodoAdd> = ({ onTaskAdded }) => {
    const theme = useTheme();
    const [task, setTask] = useState('');

    const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setTask(e.target.value);
    };

    const handleCheckboxClick = async () => {
        if (!task.trim()) {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, escribe una tarea antes de enviarla.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/todo/post', {
                tarea: task.trim(),
            });

            console.log('Tarea agregada con éxito:', response.data);
            setTask('');
            onTaskAdded();
            Swal.fire({
                title: '¡Tarea agregada!',
                text: 'Tu tarea fue enviada correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });

        } catch (err) {
            console.error('Error al agregar la tarea:', err);

            Swal.fire({
                title: 'Error',
                text: 'No se pudo enviar tu tarea. Inténtalo de nuevo.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    return (
        <CRow className="mx-1">
            <CCard
                className="shadow-sm border-0 rounded-0 p-0 m-0"
                style={{
                    backgroundColor: theme.palette.background.paper
                }}
            >
                <CCardBody
                    style={{
                        padding: '0.5rem',
                        backgroundColor: theme.palette.background.paper
                    }}
                >
                    <CRow className="d-flex justify-content-between align-items-center mx-auto">
                        <CCol
                            xs={1} sm={1} md={2} lg={1}
                            className="d-flex justify-content-center align-items-center"
                        >
                            <CFormCheck
                                id="flexCheckDefault"
                                style={{
                                    color: theme.palette.background.default
                                }}
                                onChange={handleCheckboxClick}
                                checked={false} />
                        </CCol>
                        <CCol
                            xs={10} md={9} lg={10}
                            className="p-0 m-0"
                        >
                            <CFormInput
                                type="text"
                                id="exampleFormControlInput1"
                                placeholder="Agregar Tarea"
                                value={task}
                                onChange={handleInputChange}
                                aria-describedby="exampleFormControlInputHelpInline"
                                style={{
                                    borderColor: theme.palette.primary.main,
                                    color: theme.palette.text.primary,
                                    borderWidth: 0,
                                    backgroundColor: theme.palette.background.paper
                                }}
                            />
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
        </CRow>
    );
};
