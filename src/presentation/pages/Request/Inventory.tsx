import { Fragment, useState } from "react";
import { DownloadFile } from "@/presentation/components";
import { Loading } from "@/presentation/components";
import { Col, Row } from "@/features/shared/components/Grid";
import { Header } from "@/features/shared/components/Header";
import { Card, CardBody, CardHeader } from "@/features/shared/components/Card";
import { Button } from "@/features/shared/components/Button";

interface StructureFile {
    'Centro Costo': string;
    Punto: string;
    PLU: string;
    Descripcion: string;
    Inventario: number;
    'Ultimo Costo': string;
    Total: string;
}

export interface BalanceDTO {
    CENTRO_COSTO: string;
    PUNTO: string;
    PLU: string;
    PLU_SIN_LAB: string;
    DESCRIPCION: string;
    INVENTARIO: number;
    COSTO: number;
}

interface TypeData<T> {
    data: T[];
}

const Inventory = () => {
    const [response, _setData] = useState<TypeData<StructureFile> | undefined>();
    const [loading, setLoading] = useState<boolean>(false);

    const saveInventory = async () => {
        try {
            setLoading(true)
            const data: BalanceDTO[] = [];
            response?.data.map((item: StructureFile) => {
                data.push({
                    CENTRO_COSTO: item["Centro Costo"],
                    PUNTO: item.Punto,
                    INVENTARIO: item.Inventario,
                    COSTO: Number(item["Ultimo Costo"]),
                    PLU: item.PLU,
                    PLU_SIN_LAB: item.PLU,
                    DESCRIPCION: item.Descripcion
                })
            })

        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Fragment>
            <Header title="Cargue de Saldos" subItem="Configuración" />

            <section className="section dashboard">
                <Row>
                    <Col lg={6} md={8}>
                    </Col>

                    <Col md={4}>
                        <DownloadFile filename="CARGUE_SALDOS" />
                    </Col>
                </Row>
            </section>

            <section className="section">
                <Row>
                    <Col lg={12} md={12} sm={12} className="d-flex justify-content-center">
                        {loading ? <Loading /> : response && response.data.length > 0 && (
                            <Card className="w-100">
                                <CardHeader>
                                    <Button variant="primary" size="sm" className="float-end" onClick={saveInventory}>Cargar</Button>
                                </CardHeader>
                                <CardBody>
                                    <table className="table table-sm table-hover">
                                        <thead>
                                            <tr className="text-uppercase">
                                                <th>Centro Costo</th>
                                                <th>Punto</th>
                                                <th>PLU</th>
                                                <th>Descripcion</th>
                                                <th>Inventario</th>
                                                <th>Ultimo Costo</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {response?.data?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item["Centro Costo"]}</td>
                                                    <td>{item.Punto}</td>
                                                    <td>{item.PLU}</td>
                                                    <td>{item.Descripcion}</td>
                                                    <td>{item.Inventario}</td>
                                                    <td>{item["Ultimo Costo"]}</td>
                                                    <td>{item.Total}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </CardBody>
                            </Card>
                        )}
                    </Col>
                </Row>
            </section >
        </Fragment >
    )
}

export default Inventory;