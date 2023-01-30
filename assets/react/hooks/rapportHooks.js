import React, { useCallback, useState } from "react";

async function jsonLdFetch(url, method = 'GET', data = null) {
    const params = {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    if (data) {
        params.body = JSON.stringify(data)
    }

    const response = await fetch(url, params);

    if (response.status == 204) {
        return null;
    }
    const responseData = await response.json()
    if (response.ok) {
        return responseData;
    } else {
        throw responseData;
    }
}

export function useGetRapports(url) {
    const [loading, setLoading] = useState(false);
    const [rapports, setRapports] = useState([]);
    const load = useCallback(async () => {
        setLoading(true);
        try {
            const data = await jsonLdFetch(url)
            setRapports(data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }, [url])

    return {
        rapports,
        load,
        loading,
        setRapports
    }
}


export function useAddRapport(url, method = 'POST', callback = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const load = useCallback(async (data = null) => {
        setLoading(true);
        try {
            const response = await jsonLdFetch(url, method, data);
            if (callback) {
                callback(response)
            }
        } catch (error) {
            setErrors({ Erreur: 'Erreur', message: 'Une erreur l\'ors de la modification des données' })
        }
        setLoading(false)
    }, [url, method, callback])

    return {
        errors,
        load,
        loading
    }
}
