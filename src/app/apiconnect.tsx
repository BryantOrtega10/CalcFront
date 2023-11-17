const ruta = 'http://127.0.0.1:5000'
const sumar = async (num1:number, num2:number ) => {
    try{
        const consultarApi = await fetch(`${ruta}/suma/${num1}/${num2}`,{
            mode:'cors',
            headers: {
                'Content-Type': 'application/json',
                //"Access-Control-Allow-Origin": "*"
            }
        });
        const jsonRes = await consultarApi.json();
        if (!jsonRes.success){
            return 0;
        }
        return jsonRes.resultado;
    }catch(e){
        return 0;
    }
}


const restar = async (num1:number, num2:number ) => {
    try{
        const consultarApi = await fetch(`${ruta}/resta/${num1}/${num2}`);
        const jsonRes = await consultarApi.json();
        if (!jsonRes.success){
            return 0;
        }
        return jsonRes.resultado;
    }catch(e){
        return 0;
    }
}

const multiplicar = async (num1:number, num2:number ) => {
    try{
        const consultarApi = await fetch(`${ruta}/multiplicacion/${num1}/${num2}`);
        const jsonRes = await consultarApi.json();
        if (!jsonRes.success){
            return 0;
        }
        return jsonRes.resultado;
    }catch(e){
        return 0;
    }
}

const dividir = async (num1:number, num2:number ) => {
    try{
        const consultarApi = await fetch(`${ruta}/division/${num1}/${num2}`);
        const jsonRes = await consultarApi.json();
        if (!jsonRes.success){
            return 0;
        }
        return jsonRes.resultado;
    }catch(e){
        return 0;
    }
}

const modulo = async (num1:number, num2:number ) => {
    try{
        const consultarApi = await fetch(`${ruta}/modulo/${num1}/${num2}`);
        const jsonRes = await consultarApi.json();
        if (!jsonRes.success){
            return 0;
        }
        return jsonRes.resultado;
    }catch(e){
        return 0;
    }
}


export {sumar, restar, multiplicar, dividir, modulo}
