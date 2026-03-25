'use server'

import CONFIG from '@/config';
import { ModalidadValidacion } from '@/lib/types/modalidadValidacion/modalidadValidacion.entity';
import { getToken } from '@/lib/utils/getToken';

export async function getModalidadesValidacion(): Promise<ModalidadValidacion[]> {
    try {
        const token = await getToken();

        const modalidadesValidacion = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_MODALIDADVALIDACION}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if(!modalidadesValidacion.ok) throw new Error(`Error getting modalidadesValidacion: ${modalidadesValidacion.status} - ${modalidadesValidacion.statusText}`);

        return await modalidadesValidacion.json();
    } catch (error) {
        console.error('Get modalidadesValidacion failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
}; 