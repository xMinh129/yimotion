const apiRequest = {};

apiRequest.get = function(url, context){
    const xhr = new XMLHttpRequest();
    xhr.open('get', url);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ` +  localStorage.getItem('token'));
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
            context.setState({
                data: xhr.response
            });
        }

    });
    xhr.send();
};

apiRequest.post = function(url, context, formData){
    const xhr = new XMLHttpRequest();
    xhr.open('post', url);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ` + localStorage.getItem('token'));
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
            // success

            // change the component-container state
            context.setState({
                errors: {},
                data: xhr.response
            });


        } else {
            // failure
            context.setState({
                data: false
            });
        }
    });
    xhr.send(formData);

};

module.exports = apiRequest;