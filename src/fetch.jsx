import { useState, useEffect, useMemo } from 'react'

export function useMountedFetch(url, options, setLoading) {
    const [data, setData] = useState(null);
    console.log("now in useData")
    useEffect(() => {
        if (url) {
            let ignore = false;
            fetch(url, options)
                .then(response => response.json())
                .then(json => {
                    if (!ignore) {
                        console.log(json)
                        setData(json);
                        setLoading(false)
                    }
                });
            return () => {
                ignore = true;
            };
        }
    }, []);
    return data;
}

export function fetchTimes(url, options, setLoading) {
    const [data, setData] = useState(null);
    console.log("now in useData")
    useEffect(() => {
        if (url) {
            let ignore = false;
            fetch(url, options)
                .then(response => response.json())
                .then(json => {
                    if (!ignore) {
                        console.log(json)
                        setData(json);
                        setLoading(false)
                    }
                });
            return () => {
                ignore = true;
            };
        }
    }, []);
    return data;
}
export function useActionFetch(url, options, setLoading) {
    const [data, setData] = useState(null);
    console.log("now in useData")
    useEffect(() => {
        if (url) {
            let ignore = false;
            fetch(url, options)
                .then(response => response.json())
                .then(json => {
                    if (!ignore) {
                        console.log(json)
                        setData(json);
                        setLoading(false)
                    }
                });
            return () => {
                ignore = true;
            };
        }
    }, [options]);
    return data;
}
export function importImg(path, setLoading) {
    const IMG_PATH = './img/'
    const [data, setData] = useState('');
    console.log("now in importImg")
    console.log(path)
    useMemo(() => {
        if (path) {
            let ignore = false;
            import(IMG_PATH + path)
                .then(response => response.default)
                .then(img => {
                    if (!ignore) {
                        console.log(img)
                        setData(img);
                        setLoading(false)
                    }
                }).catch(error => {
                    if (!ignore) {
                        console.log(error)
                        // most likely due to the browser not able to import images
                        setData('../img/' + path)
                        setLoading(false)
                    }
                });
            return () => {
                ignore = true;
            };
        }
    }, []);
    return data;
}

export function handleSubmit(props) {
    props.event.preventDefault()

    props.apiResponse = useMountedFetch(props.url, req, setLoading)

    return(
        <div>
            {apiResponse ? (
                <div>{
                    props.handleResponse(apiResponse)
                }</div>) : (
                <div></div>
            )}
        </div>
    )
}
