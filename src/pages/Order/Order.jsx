import React, {useEffect, useState} from "react";
import axios from "axios";
import moment from "moment";

const baseUrl = "http://localhost:8080/";

export function Order() {

    const [clients, setClients] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios
            .get(baseUrl + "client")
            .then(resp => setClients(resp.data))
    }, [])

    const selectClient = ({target:{value}}) => {
        axios
            .get(baseUrl + "order/by-client", {params: {idClient: value}})
            .then(resp => setOrders(resp.data))
    }

    return (
        <div className="d-flex">
            <div style={{margin: '3em'}}>
                <select onChange={selectClient}>
                    <option hidden>Seleziona un cliente</option>
                    {
                        clients?.map((client, index) =>
                            <option value={client.id} id={index}>{client.name}</option>
                        )
                    }
                </select>
            </div>
            {
                orders?.length > 0 ?
                    <div>
                        <span>Ordini associati</span>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Codice</th>
                                    <th scope="col">Data e ora conferma</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                orders?.map((order, index) =>
                                    <tr id={index}>
                                        <td>{order.code}</td>
                                        <td>{order.confirmation}</td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                    :
                    <span className="justify-content-end">Non ci sono ordini visualizzabili</span>
            }

        </div>
    )
}
