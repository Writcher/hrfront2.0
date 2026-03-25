import { EmpleadoItemDto } from "@/lib/types/empleado/get-empleado";
import { Controller, useForm } from "react-hook-form";
import { EmpleadosTableEditFormData } from "../types/empleadosTableEditFormData";
import { useSnackbar } from "@/lib/contexts/snackbar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useConfirm } from "@/lib/hooks/useConfirm";
import { useShow } from "@/lib/hooks/useShow";
import { ModalidadValidacion } from "@/lib/types/modalidadValidacion/modalidadValidacion.entity";
import { deactivateEmpleado, editEmpleado } from "@/actions/empleado/empleado.actions";
import { Box, Button, Chip, MenuItem, TableRow, TextField } from "@mui/material";
import { TableRowCell } from "@/components/common/tables/tableRowCell";
import LightTooltip from "@/components/common/components/tooltip";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SyncIcon from '@mui/icons-material/Sync';
import PersonRemoveRoundedIcon from '@mui/icons-material/PersonRemoveRounded';
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import { useEffect } from "react";

export default function EmpleadosTableRow({
    empleado,
    modalidadesValidacion
}: {
    empleado: EmpleadoItemDto,
    modalidadesValidacion: ModalidadValidacion[]
}) {
    //init
    const queryClient = useQueryClient();
    //hooks
    const { showSuccess, showError } = useSnackbar();
    const { control, setValue, handleSubmit, reset, formState: { isValid } } = useForm<EmpleadosTableEditFormData>({
        defaultValues: {
            id_modalidadvalidacion: ''
        }
    });
    const confirm = useConfirm();
    const show = useShow();
    //mutacion
    const edit = useMutation({
        mutationFn: (data: { id_mdoalidadvalidacion: number, id: number }) => editEmpleado(data),
        onSuccess: () => {
            showSuccess('Empleado editado correctamente');
            show.handleShow();
            queryClient.invalidateQueries({
                queryKey: ['getEmpleados']
            });
        },
        onError: () => {
            showError('Error al editar empleado');
        }
    });
    const deactivate = useMutation({
        mutationFn: (data: { id: number }) => deactivateEmpleado(data),
        onSuccess: () => {
            showSuccess('Empleado dado de baja correctamente');
            queryClient.invalidateQueries({
                queryKey: ['getEmpleados']
            });
        },
        onError: () => {
            showError('Error al dar de baja empleado');
        }
    });
    //effect
    useEffect(() => {
        if (empleado) {
            setValue('id_modalidadvalidacion', empleado.id_modalidadvalidacion ? empleado.id_modalidadvalidacion : '');
        };
    }, [empleado, setValue, show.show])
    return (
        <TableRow>
            <TableRowCell alignment='left'>
                {empleado.legajo}
            </TableRowCell>
            <TableRowCell alignment='center'>
                {empleado.dni}
            </TableRowCell>
            <TableRowCell alignment='center'>
                {empleado.nombre}
            </TableRowCell>
            <TableRowCell alignment='center'>
                {empleado.tipoempleado}
            </TableRowCell>
            <TableRowCell alignment='center'>
                {show.show ? (
                    <Controller
                        name='id_modalidadvalidacion'
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                variant='outlined'
                                color='warning'
                                size='small'
                                select
                                fullWidth
                                error={!!error}
                                helperText={error?.message}
                                disabled={modalidadesValidacion?.length === 0 || !modalidadesValidacion}
                                slotProps={{
                                    select: {
                                        MenuProps: {
                                            slotProps: {
                                                paper: {
                                                    style: {
                                                        marginTop: '4px',
                                                        maxHeight: '200px',
                                                    },
                                                },
                                            },
                                        },
                                    },
                                }}
                            >
                                {modalidadesValidacion?.map((modalidadValidacion: ModalidadValidacion) => (
                                    <MenuItem key={modalidadValidacion.id} value={modalidadValidacion.id}>
                                        {modalidadValidacion.nombre}
                                    </MenuItem>
                                )) || []}
                            </TextField>
                        )}
                    />
                ) : (
                    empleado.modalidadvalidacion
                )}
            </TableRowCell>
            <TableRowCell alignment='center'>
                {empleado.nombreproyecto}
            </TableRowCell>
            <TableRowCell alignment='center'>
                <Chip
                    label={empleado.estadoempleado}
                    className='!rounded'
                    color={
                        empleado.estadoempleado.toLowerCase() === 'activo' ? 'success' : 'error'
                    }
                />
            </TableRowCell>
            <TableRowCell alignment='right' variant='buttons'>
                <Box sx={{ display: 'flex' }}>
                    {show.show ? (
                        <>
                            <LightTooltip title='Guardar' placement='left' arrow>
                                <Button
                                    variant='contained'
                                    color='success'
                                    disableElevation
                                    size='small'
                                    disabled={edit.isPending || !isValid}
                                    onClick={handleSubmit((data) => edit.mutate({ id_mdoalidadvalidacion: Number(data.id_modalidadvalidacion), id: empleado.id }))}
                                    sx={{ borderRadius: '4px 0 0 4px' }}
                                >
                                    {!edit.isPending ? <SaveAsRoundedIcon /> : <SyncIcon className='animate-spin' style={{ animationDirection: 'reverse' }} />}
                                </Button>
                            </LightTooltip>
                            <LightTooltip title='Cancelar' placement='left' arrow>
                                <Button
                                    variant='contained'
                                    color='error'
                                    disableElevation
                                    size='small'
                                    disabled={edit.isPending}
                                    onClick={show.handleShow}
                                    sx={{ borderRadius: '0 4px 4px 0' }}
                                >
                                    {!edit.isPending ? <CloseRoundedIcon /> : <SyncIcon className='animate-spin' style={{ animationDirection: 'reverse' }} />}
                                </Button>
                            </LightTooltip>
                        </>
                    ) : (
                        <>
                            <LightTooltip title='Editar' placement='left' arrow>
                                <Button
                                    variant='contained'
                                    color='success'
                                    disableElevation
                                    size='small'
                                    disabled={deactivate.isPending || empleado.estadoempleado.toLowerCase() === 'baja'}
                                    onClick={() => {
                                        show.handleShow();
                                        reset();
                                    }}
                                    sx={{ borderRadius: '4px 0 0 4px' }}
                                >
                                    {!deactivate.isPending ? <EditRoundedIcon /> : <SyncIcon className='animate-spin' style={{ animationDirection: 'reverse' }} />}
                                </Button>
                            </LightTooltip>
                            <LightTooltip title={confirm.confirm ? 'Confirmar' : '¿Dar Baja?'} placement='left' arrow>
                                <Button
                                    variant={empleado.estadoempleado.toLowerCase() === 'baja' ? 'contained' : confirm.confirm ? 'contained' : 'outlined'}
                                    color='error'
                                    disableElevation
                                    size='small'
                                    disabled={deactivate.isPending || empleado.estadoempleado.toLowerCase() === 'baja' || show.show}
                                    onBlur={() => confirm.handleConfirm(false)}
                                    onClick={confirm.confirm ? () => deactivate.mutate({ id: empleado.id }) : () => confirm.handleConfirm()}
                                    sx={{ borderRadius: '0 4px 4px 0' }}
                                >
                                    {!deactivate.isPending ? <PersonRemoveRoundedIcon /> : <SyncIcon className='animate-spin' style={{ animationDirection: 'reverse' }} />}
                                </Button>
                            </LightTooltip>
                        </>
                    )}
                </Box>
            </TableRowCell>
        </TableRow>
    );
};