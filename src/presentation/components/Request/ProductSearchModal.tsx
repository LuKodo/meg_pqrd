import { PaginatedData, Product } from "@/entities";
import { ProductRepository } from "@/features/shared/repositories";
import { FilterDto } from "@/utils";
import { FC, useEffect, useState, useMemo } from "react"
import { toast } from "sonner";
import { Tooltip } from "../Common/TooltipComponent";
import { Pagination } from "../../../features/shared/components/Pagination";
import { Button } from "@/features/shared/components/Button.tsx";
import { Col, Row } from "@/features/shared/components/Grid.tsx";
import { Card, CardBody, CardFooter } from "@/features/shared/components/Card";
import { IconBookmarkSlash } from "@/svg/bookmark-slash";
import { IconBookmark } from "@/svg/bookmark";
import { Modal, ModalBody, ModalHeader, ModalTitle } from "@/features/shared/components/Modal";

interface ProductSearchModalProps {
    show: boolean;
    handleClose: () => void;
    setProduct: (product: Product, required: boolean) => void;
}

export const ProductSearchModal: FC<ProductSearchModalProps> = ({ show, handleClose, setProduct }) => {
    const [products, setProducts] = useState<PaginatedData<Product>>({
        data: [],
        pageSize: 10,
        totalPages: 0,
        currentPage: 1,
    });
    const [searchField, setSearchField] = useState<string>("code");
    const [searchParam, setSearchParam] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const productRepository = useMemo(() => new ProductRepository(), []);

    const fetchProducts = async () => {
        if (searchParam === '') {
            toast.warning("No se ha ingresado un valor de búsqueda");
            return;
        }
        const filters: FilterDto[] = []
        const filter: FilterDto = {
            param: searchField,
            value: '%' + searchParam + '%',
            operator: "like"
        }
        filters.push(filter);
        const productsResponse = await productRepository.getProductByParam(filters, page, 10);
        setProducts(productsResponse);
    };

    useEffect(() => {
        if (show && searchParam !== null && searchParam !== '') {
            fetchProducts();
        }
    }, [page, productRepository]);

    useEffect(() => {
        setSearchField("code");
        setSearchParam("");
        setProducts({
            data: [],
            pageSize: 10,
            totalPages: 0,
            currentPage: 1,
        });
    }, []);

    const handleCloseModal = () => {
        handleClose();
        setSearchParam('');
    }

    return (
        <Modal show={show} onClose={handleCloseModal} size="3xl">
            <ModalHeader onClose={handleCloseModal}>
                <ModalTitle>Buscar Medicamento</ModalTitle>
            </ModalHeader>
            <ModalBody className="p-4">
                <Row>
                    <Col md={6}>
                        <label className="label">Buscar por:</label>
                    </Col>
                    <Col>
                        <label className="label">Búsqueda</label>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <select value={searchField} onChange={(e) => setSearchField(e.target.value)} className="select">
                            <option value="code">Código</option>
                            <option value="plu">PLU</option>
                            <option value="description">Descripción</option>
                        </select>
                    </Col>
                    <Col md={6}>
                        <div className="flex items-center gap-2">
                            <input type="text" className="input rounded-lg" onChange={(e) => setSearchParam(e.target.value)} />
                            <span role="button" className="btn btn-primary rounded-lg" onClick={() => fetchProducts()}>Buscar</span>
                        </div>
                    </Col>
                </Row>
                {
                    products.data.length > 0 && (
                        <Row className="mt-4">
                            <Col md={12}>
                                <Card>
                                    <CardBody className="overflow-y-auto scrollbar" style={{ height: "55vh" }}>
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Código</th>
                                                    <th>PLU</th>
                                                    <th>Descripción</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {products.data.map((product: Product) => (
                                                    <tr key={product.id}>
                                                        <td>{product.code}</td>
                                                        <td>{product.plu}</td>
                                                        <td>{product.description}</td>
                                                        <td>
                                                            <div className="flex gap-2">
                                                                <Tooltip title="Sin Marca Requerida" id={'sinMarca' + product.id}>
                                                                    <Button variant="primary" onClick={() => {
                                                                        setProduct(product, false);
                                                                        handleClose();
                                                                    }}>
                                                                        <IconBookmarkSlash />
                                                                    </Button>
                                                                </Tooltip>
                                                                <Tooltip title="Con Marca Requerida" id={'conMarca' + product.id}>
                                                                    <Button variant="primary" onClick={() => {
                                                                        setProduct(product, true);
                                                                        handleClose();
                                                                    }}>
                                                                        <IconBookmark />
                                                                    </Button>
                                                                </Tooltip>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </CardBody>

                                    <CardFooter>
                                        <Pagination
                                            pagination={{
                                                totalPages: products.totalPages,
                                                currentPage: page,
                                                setPage: setPage,
                                            }}
                                        />
                                    </CardFooter>
                                </Card>
                            </Col>
                        </Row>
                    )
                }
            </ModalBody >
        </Modal >
    )
}