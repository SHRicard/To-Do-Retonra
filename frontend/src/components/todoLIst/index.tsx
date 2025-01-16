import { useState, useEffect } from 'react';
import axios from 'axios';
import { CCard, CCardBody, CCol, CFormCheck, CRow, CPagination, CPaginationItem, CAlert } from '@coreui/react';
import { useTheme } from '@mui/material/styles';
import Swal from 'sweetalert2';

const itemsPerPage = 4;

interface ITasks {
    id: string;
    tarea: { tarea: string };
    status: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}
interface ITodoList {
    refresh: boolean;
    onTaskAdded: () => void;
}
export const TodoList: React.FC<ITodoList> = ({ refresh, onTaskAdded }) => {
    const [tasks, setTasks] = useState<ITasks[]>([]);
    const [data, setData] = useState<ITasks[]>([]);
    const [pendingTasks, setPendingTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [up, setUp] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:3000/todo');
                setTasks(response.data);
            } catch (error) {
                console.error("Error al obtener las tareas:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();

    }, [refresh, up]);

    useEffect(() => {
        if (tasks.length > 0) {
            setData(tasks);
        }
        if (pendingTasks.length > 0) {
            setData(pendingTasks);
        }
        if (completedTasks.length > 0) {
            setData(completedTasks);
        }

    }, [tasks, pendingTasks, completedTasks]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const indexOfLastTask = currentPage * itemsPerPage;
    const indexOfFirstTask = indexOfLastTask - itemsPerPage;
    const currentTasks = data.slice(indexOfFirstTask, indexOfLastTask);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    if (loading) {
        return <div>Cargando tareas...</div>;
    }





    const toggleDelete = async (id: string) => {
        try {
            await axios.delete('http://localhost:3000/todo/delete', {
                data: { id }
            });

            Swal.fire({
                title: '¡Tarea eliminada!',
                text: 'La tarea se eliminó correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
            onTaskAdded()
            setUp(prev => !prev);
        } catch (error) {
            console.error("Error al eliminar tarea:", error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudo eliminar la tarea. Intenta nuevamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };
    const toggleComplete = async (id: string, status: string) => {
        const newStatus = status === "completado" ? "completado" : "pendiente";
        try {
            await axios.put('http://localhost:3000/todo/update', {
                id,
                status: newStatus,
            });
            setUp(prev => !prev);
            Swal.fire({
                title: '¡Tarea actualizada!',
                text: `La tarea fue marcada como ${newStatus}.`,
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
        } catch (error) {
            console.error("Error al actualizar tarea:", error);

            Swal.fire({
                title: 'Error',
                text: 'No se pudo actualizar la tarea. Intenta nuevamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };
    const toggleActive = async () => {
        try {
            setTasks([])
            setCompletedTasks([])
            const response = await axios.get('http://localhost:3000/todo/pending');
            setPendingTasks(response.data);
        } catch (error) {
            console.error("Error al obtener tareas pendientes:", error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudieron cargar las tareas activas. Intenta nuevamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
        }
    };
    const toggleCompleted = async () => {
        try {
            setTasks([])
            setPendingTasks([])
            const response = await axios.get('http://localhost:3000/todo/completed');
            console.log({ data: response.data })
            setCompletedTasks(response.data);
        } catch (error) {
            console.error("Error al obtener tareas completadas:", error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudieron cargar las tareas completadas. Intenta nuevamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
        }
    };
    const toggleTodo = async () => {
        try {
            setPendingTasks([])
            setCompletedTasks([])
            const response = await axios.get('http://localhost:3000/todo');
            setTasks(response.data);;
        } catch (error) {
            console.error("Error al obtener tareas pendientes:", error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudieron cargar las tareas activas. Intenta nuevamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
        }
    };
    const toggleAllDelete = async () => {
        try {
            setPendingTasks([])
            setCompletedTasks([])
            setTasks([]);
            setData([])
            axios.delete('http://localhost:3000/todo/allDelete');
            Swal.fire({
                title: '¡Tarea Eliminadas!',
                text: `Toda las Tareas Fueron Eliminadas`,
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
        } catch (error) {
            console.error("Error al obtener tareas pendientes:", error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudieron cargar las tareas activas. Intenta nuevamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
        }
    };

    return (
        <CRow className='mx-1'>
            {currentTasks.length && currentTasks.length > 0 ? (
                currentTasks.map((task) => (
                    <CCard key={task.id} className="shadow-sm border-0 rounded-0 p-0 m-0">
                        <CCardBody style={{
                            backgroundColor: theme.palette.background.paper,
                            padding: '0.5rem'
                        }}>
                            <CRow className="d-flex justify-content-center align-items-center mx-auto">
                                <CCol xs={1} sm={1} md={2} className="d-flex justify-content-start">
                                    <CFormCheck
                                        id={`check-${task.id}`}
                                        disabled={task.status === "completado"}
                                        checked={task.status === "completado"}
                                        readOnly
                                        onChange={() => toggleComplete(task.id, "completado")}
                                    />
                                </CCol>

                                <CCol xs={10} md={8} className="text-center p-0 m-0" style={{
                                    borderColor: theme.palette.primary.main,
                                    color: theme.palette.text.primary,
                                    fontSize: theme.typography.fontSize
                                }}>
                                    {task?.tarea?.tarea}
                                </CCol>
                                <CCol xs={1} md={2} className="d-flex justify-content-center align-items-center" style={{
                                    borderColor: theme.palette.primary.main,
                                    color: theme.palette.text.primary,
                                    fontSize: theme.typography.fontSize,
                                    cursor: 'pointer'
                                }}
                                    onClick={() => toggleDelete(task.id)}
                                >
                                    X
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                ))
            ) : (
                <CAlert color="warning">Aún no hay tareas.</CAlert>
            )}

            {currentTasks.length && currentTasks.length > 0 ?
                <CCard className="shadow-sm border-0 rounded-0 p-0 m-0">
                    <CCardBody style={{
                        backgroundColor: theme.palette.background.paper,
                        padding: '0.5rem'
                    }}>
                        <CRow className="d-flex justify-content-between align-items-center">
                            <CCol xs="auto">
                                <small style={{
                                    borderColor: theme.palette.primary.main,
                                    color: theme.palette.text.primary,
                                    fontSize: "10px",
                                }}>
                                    {currentTasks.length} Tareas
                                </small>
                            </CCol>

                            <CCol xs="auto" onClick={toggleActive}>
                                <small style={{
                                    borderColor: theme.palette.primary.main,
                                    color: theme.palette.text.primary,
                                    fontSize: "10px",
                                    cursor: 'pointer',

                                }}>

                                    Activas
                                </small>

                            </CCol>
                            <CCol xs="auto" onClick={toggleCompleted}>
                                <small style={{
                                    borderColor: theme.palette.primary.main,
                                    color: theme.palette.text.primary,
                                    fontSize: "10px",
                                    cursor: 'pointer',
                                }}>
                                    Completadas
                                </small>
                            </CCol>
                            <CCol xs="auto" onClick={toggleTodo}>
                                <small style={{
                                    borderColor: theme.palette.primary.main,
                                    color: theme.palette.text.primary,
                                    fontSize: "10px",
                                    cursor: 'pointer',
                                }}>
                                    Todo
                                </small>
                            </CCol>
                            <CCol xs="auto" className="text-end" onClick={toggleAllDelete} >
                                <small style={{
                                    borderColor: theme.palette.primary.main,
                                    color: theme.palette.text.primary,
                                    fontSize: "10px",
                                    cursor: 'pointer',
                                }} >
                                    Borrar Todo
                                </small>
                            </CCol>
                        </CRow>


                    </CCardBody>
                </CCard > : <></>

            }
            {/* Paginación */}
            <CCol md={12} className='d-flex justify-content-center align-items-center pt-5 text-center'>
                <CPagination size="sm" aria-label="Page navigation example">
                    <CPaginationItem
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        Previous
                    </CPaginationItem>
                    {[...Array(totalPages).keys()].map((page) => (
                        <CPaginationItem
                            key={page + 1}
                            active={currentPage === page + 1}
                            onClick={() => handlePageChange(page + 1)}
                        >
                            {page + 1}
                        </CPaginationItem>
                    ))}
                    <CPaginationItem
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        Next
                    </CPaginationItem>
                </CPagination>
            </CCol>
        </CRow >
    );
};
