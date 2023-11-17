import { RubroArticuloManufacturado } from "../types/RubroArticuloManufacturado";

const BASE_URL = 'http://localhost:8080/';

export const RubroArticuloManufacturadoService = {

    getRubroArticuloManufacturados: async () : Promise <RubroArticuloManufacturado[]>=> {
    
    const response = await fetch(`${BASE_URL}/api/v1/RubroArticuloManufacturado`);
    const data = await response.json();
    return data;
    
    },

    getRubroArticuloManufacturado: async (id: number): Promise<RubroArticuloManufacturado> => {

        const response = await fetch(`${BASE_URL}/api/v1/RubroArticuloManufacturado/${id}`);
        const data = await response.json();
        return data;
    },

    createRubroArticuloManufacturado: async (RubroArticuloManufacturado: RubroArticuloManufacturado): Promise<RubroArticuloManufacturado>=> {
        const response = await fetch( `${BASE_URL}/api/v1/RubroArticuloManufacturado`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(RubroArticuloManufacturado)
        });

        const data = await response.json();
        return data;

    },

    updateRubroArticuloManufacturado: async (id:number,RubroArticuloManufacturado:RubroArticuloManufacturado):Promise<RubroArticuloManufacturado>=>{
        const response = await fetch( `${BASE_URL}/api/v1/RubroArticuloManufacturado/${id}`,{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(RubroArticuloManufacturado)
        });

        const data = await response.json();
        return data;

    },

    deleteRubroArticuloManufacturado: async (id:number):Promise<void>=>{
        await fetch( `${BASE_URL}/api/v1/RubroArticuloManufacturado/${id}`,{
            method: "DELETE",
      
    });
    }    

}