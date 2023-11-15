import { useEffect, useState } from "react";
import { RubroArticuloManufacturado } from "../../types/RubroArticuloManufacturado";
import { RubroArticuloManufacturadoService } from "../../services/RubroArticuloManufacturadoService";
import { Button, Table } from "react-bootstrap";
import Loader from "../Loader/Loader"; 
import { ModalType } from "../../types/ModalType";
import RubroArticuloManufacturadoModal from "../RubroArticuloManufacturadoModal/RubroArticuloManufacturadoModal";
import { EditButton } from "../EditButton/EditButton";
import { DeleteButton } from "../DeleteButton.tsx/DeleteButton";

const RubroArticuloManufacturadoTable =()=>{

    //VARIABLE QUE CONTIENE DATOS RECIBIDOS POR LA API
    const[RubroArticuloManufacturados, setRubroArticuloManufacturados] =useState<RubroArticuloManufacturado[]>([]);

    //VARIABLE QUE MUESTRA EL LOADER HASTA QUE SE RECIBAN DATOS DE LA API
    const [isLoading, setIsLoading] = useState(true);

    //ACTUALIZA LA TABLA DESPUES DE CADA OPERACION EXITOSA
    const [refreshData, setRefreshData] = useState(false);

    //HOOK QUE SE EJECUTA CADA VEZ QUE SE RENDERIZA EL COMPONENTE O REFRESH DATA CAMBIE DE ESTADO
    useEffect(()=>{
        //LLAMAMOS A LA FUNCION PARA OBTENER LOS PRODUCTOS DECLARADOS POR EL PRODUCT SERVICE
        const fetchRubroArticuloManufacturados = async()=>{
            const RubroArticuloManufacturados = await RubroArticuloManufacturadoService.getRubroArticuloManufacturados(); 
            setRubroArticuloManufacturados(RubroArticuloManufacturados);
            setIsLoading(false);
        };

        fetchRubroArticuloManufacturados(); 
    },[refreshData]);

    //TEST, LOG MODIFICADO PARA QUE MUESTRE LOS DATOS MAS LEGIBLE
    console.log(JSON.stringify(RubroArticuloManufacturados,null,2));
    //STRINGIFY ES CONVERTIR OBJETO JAVASCRIPT EN CADENA JSON

    //CONST PARA INICIALIZAR UN PRODUCTO POR DEFECTO Y EVITAR EL "undefined"

        const initializableNewRubroArticuloManufacturado = (): RubroArticuloManufacturado=>{
            return {
                id:0,
                denominacion:"",
            };
        };


        //PRODUCTO SELECCIONADO QUE SE VA A PASAR COMO PROP AL MODAL
        const [RubroArticuloManufacturado, setRubroArticuloManufacturado] = useState<RubroArticuloManufacturado>(initializableNewRubroArticuloManufacturado);

        //CONST PAR MANEJAR ESTADO DEL MODAL
        const [showModal, setShowModal] = useState(false);
        const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
        const [title,setTitle]=useState("");

        //LOGICA DEL MODAL
        const handleClick = (newTitle:string, rub:RubroArticuloManufacturado,modal: ModalType)=>{
            setTitle(newTitle);
            setModalType(modal);
            setRubroArticuloManufacturado(rub);
            setShowModal(true);
        };

    return (
        <>
        <Button onClick={()=> handleClick("Nuevo Rubro Insumo", initializableNewRubroArticuloManufacturado(),
        ModalType.CREATE)}> Nuevo Rubro Insumo </Button>
            {isLoading ? <Loader/> :(
                <Table hover>
                    <thead>
                        <tr>
                            <th>Denominacion</th>
                            <th>Editar</th>
                            <th>Borrar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {RubroArticuloManufacturados.map( RubroArticuloManufacturado => (
                            <tr key={RubroArticuloManufacturado.id}>
                                <td>{RubroArticuloManufacturado.denominacion}</td>
                                <td><EditButton onClick={()=> handleClick("Editar rubro", RubroArticuloManufacturado, ModalType.UPDATE)}/></td>
                                <td><DeleteButton onClick={()=> handleClick("Borrar rubro", RubroArticuloManufacturado, ModalType.DELETE)}/></td>
                            </tr>
                        )

                        )

                        }
                    </tbody>
                </Table>
            )}

            {showModal && (
                <RubroArticuloManufacturadoModal
                show={showModal}
                onHide={()=>setShowModal(false)}
                title={title}
                modalType={modalType}
                rub={RubroArticuloManufacturado}
                refreshData={setRefreshData}
                />
            )

            }
        </>
    )
}


export default RubroArticuloManufacturadoTable