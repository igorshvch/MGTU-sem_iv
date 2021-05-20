export function CoordsCall(url, data) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
              }
        })
        .then((resp) => {
            return resp.json();
        })
        .then((innerData) => {
            console.log("THIS IS POST!")
            console.log(innerData);
            resolve(innerData);
        });
    });
}