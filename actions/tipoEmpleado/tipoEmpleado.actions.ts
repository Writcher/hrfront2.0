'use server'

import CONFIG from '@/config';
import { TipoEmpleado } from '@/lib/types/tipoEmpleado/tipoEmpleado.entity';
import { getToken } from '@/lib/utils/getToken';

export async function getTiposEmpleado(): Promise<TipoEmpleado[]> {
    try {
        const token = await getToken();

        const tiposEmpleado = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_TIPOEMPLEADO}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!tiposEmpleado.ok) throw new Error(`Error getting tiposEmpleado: ${tiposEmpleado.status} - ${tiposEmpleado.statusText}`);

        return await tiposEmpleado.json();
    } catch (error) {
        console.error('Get tiposEmpleado failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};