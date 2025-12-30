import { useState } from "react";
import ReactDatePicker from "react-datepicker";

import { StatusRequestMap, StatusRequestPQRSMap } from "@/utils";
import { Filter } from "@/entities";
import { useSessionManager } from "@/features/shared/hooks/useSessionManager";
import { DateTime } from "luxon";

interface FilterProps {
    filterData: Filter[];
    handleFilterChange: (
        field: string,
        value: string
    ) => void;
}

export const FilterTableHistoric: React.FC<FilterProps> = ({ filterData, handleFilterChange }) => {
    const [createAtStart, setCreateAtStart] = useState<Date | undefined>(undefined);
    const [createAtEnd, setCreateAtEnd] = useState<Date | undefined>(undefined);

    const [programmedStart, setProgrammedStart] = useState<Date | undefined>(undefined);
    const [programmedEnd, setProgrammedEnd] = useState<Date | undefined>(undefined);

    const [sendedStart, setSendedStart] = useState<Date | undefined>(undefined);
    const [sendedEnd, setSendedEnd] = useState<Date | undefined>(undefined);

    const [deliveredStart, setDeliveredStart] = useState<Date | undefined>(undefined);
    const [deliveredEnd, setDeliveredEnd] = useState<Date | undefined>(undefined);

    const [selfManagementStart, setSelfManagementStart] = useState<Date | undefined>(undefined);
    const [selfManagementEnd, setSelfManagementEnd] = useState<Date | undefined>(undefined);

    const { userData } = useSessionManager()

    const onChangeDate = (dates: [Date | undefined, Date | undefined], field: string) => {
        const [start, end] = dates;

        if (field === 'createdAt') {
            setCreateAtStart(start);
            setCreateAtEnd(end);
        } else if (field === 'programed_date') {
            setProgrammedStart(start);
            setProgrammedEnd(end);
        } else if (field === 'self_management_date') {
            setSelfManagementStart(start);
            setSelfManagementEnd(end);
        } else if (field === 'delivered') {
            setDeliveredStart(start);
            setDeliveredEnd(end);
        } else if (field === 'sended') {
            setSendedStart(start);
            setSendedEnd(end);
        }

        handleFilterChange(field, `${DateTime.fromJSDate(start!).toFormat('YYYY-MM-DD')}|${DateTime.fromJSDate(end!).toFormat('YYYY-MM-DD')}`);
    };

    const clearFilters = () => {
        setCreateAtStart(undefined)
        setCreateAtEnd(undefined)
        setProgrammedStart(undefined)
        setProgrammedEnd(undefined)
        setSelfManagementStart(undefined)
        setSelfManagementEnd(undefined)
        setSendedStart(undefined)
        setSendedEnd(undefined)
        setDeliveredStart(undefined)
        setDeliveredEnd(undefined)

        for (const filter of filterData) {
            handleFilterChange(filter.field, '');
        }
    };

    return (
        <tr>
            {filterData.map((filter) => (
                <th
                    className="text-uppercase text-start"
                    key={filter.field}
                >
                    {filter.type === 'date' && filter.field === 'createdAt' && (
                        <ReactDatePicker
                            selected={createAtStart}
                            onChange={(date) => {
                                onChangeDate([date[0] ?? undefined, date[1] ?? undefined], filter.field);
                            }}
                            startDate={createAtStart}
                            endDate={createAtEnd}
                            selectsRange
                            className="form-control form-control-sm"
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Fecha Radicación"
                        />
                    )}

                    {filter.type === 'date' && filter.field === 'programed_date' && (
                        <ReactDatePicker
                            selected={programmedStart}
                            onChange={(date) => {
                                onChangeDate([date[0] ?? undefined, date[1] ?? undefined], filter.field);
                            }}
                            startDate={programmedStart}
                            endDate={programmedEnd}
                            selectsRange
                            className="form-control form-control-sm"
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Fecha Programación"
                        />
                    )}

                    {filter.type === 'date' && filter.field === 'sended' && (
                        <ReactDatePicker
                            selected={sendedStart}
                            onChange={(date) => {
                                onChangeDate([date[0] ?? undefined, date[1] ?? undefined], filter.field);
                            }}
                            startDate={sendedStart}
                            endDate={sendedEnd}
                            selectsRange
                            className="form-control form-control-sm"
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Fecha Envío"
                        />
                    )}

                    {filter.type === 'date' && filter.field === 'delivered' && (
                        <ReactDatePicker
                            selected={deliveredStart}
                            onChange={(date) => {
                                onChangeDate([date[0] ?? undefined, date[1] ?? undefined], filter.field);
                            }}
                            startDate={deliveredStart}
                            endDate={deliveredEnd}
                            selectsRange
                            className="form-control form-control-sm"
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Fecha de Entrega"
                        />
                    )}

                    {filter.type === 'date' && filter.field === 'self_management_date' && (
                        <ReactDatePicker
                            selected={selfManagementStart}
                            onChange={(date) => {
                                onChangeDate([date[0] ?? undefined, date[1] ?? undefined], filter.field);
                            }}
                            startDate={selfManagementStart}
                            endDate={selfManagementEnd}
                            selectsRange
                            className="form-control form-control-sm"
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Fecha Pharmaser"
                        />
                    )}
                    {filter.type === 'text' && filter.name === 'Estado' &&
                        <select
                            value={filter.value}
                            onChange={(e) =>
                                handleFilterChange(
                                    filter.field,
                                    e.target.value,
                                )
                            }
                        >
                            <option value="">Todos</option>
                            {userData?.audipharma ?
                                StatusRequestPQRSMap.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                )) :
                                StatusRequestMap.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))
                            }
                        </select>
                    }

                    {filter.type === 'text' && filter.name !== 'Estado' &&
                        <input
                            className="w-100"
                            type={filter.type || "text"}
                            value={filter.value}
                            placeholder={filter.name}
                            onChange={(e) =>
                                handleFilterChange(
                                    filter.field,
                                    e.target.value,
                                )
                            }
                        />
                    }
                    {
                        filter.type === 'select' && filter.name !== "canal" &&
                        <select
                            value={filter.value}
                            onChange={(e) =>
                                handleFilterChange(
                                    filter.field,
                                    e.target.value,
                                )
                            }
                        >
                            {
                                filter.options?.split('|').map((option) => (
                                    <option key={option} value={option.split('=')[1]}>{option.split('=')[0]}</option>
                                ))
                            }
                        </select>
                    }

                    {
                        filter.type === 'number' && (
                            <input
                                className="w-100"
                                type={filter.type}
                                value={filter.value}
                                placeholder={filter.name}
                                onChange={(e) =>
                                    handleFilterChange(
                                        filter.field,
                                        e.target.value,
                                    )
                                }
                            />
                        )
                    }
                </th>
            ))}
            <th>
                <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={clearFilters}
                >
                    Borrar Filtros
                </button>
            </th>
        </tr>
    );
}