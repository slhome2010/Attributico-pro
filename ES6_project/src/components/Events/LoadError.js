export function loadError(event, data) {
    let error = data.error;
    if (error.status && error.statusText) {
        data.message = "Ajax error: " + data.message;
        data.details = "Ajax error: " + error.statusText + ", status code = " + error.status;
    } else {
        data.message = "Custom error: " + data.message;
        data.details = "An error occurred during loading: " + error;
    }
    console.log(data);
    console.log(error.responseText);
}