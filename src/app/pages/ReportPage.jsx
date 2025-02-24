import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import {
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    IconButton
} from "@mui/material";
import { AppLayout } from "../layout/AppLayout";
import PrintIcon from '@mui/icons-material/Print';
import { startLoadingDataInvoice } from "../../store/invoice/thunks";

const tableStyles = {
    marginTop: '1rem',
    '& .MuiTableCell-root': {
        border: '1px solid #e0e0e0',
        padding: '12px',
    },
    '& .MuiTableHead-root': {
        backgroundColor: '#f5f5f5',
    }
};

const filterStyles = {
    margin: '1rem 0',
    display: 'flex',
    gap: '1rem',
    alignItems: 'center'
};

export const ReportPage = () => {
    const dispatch = useDispatch();
    const { invoices = [], cities = [], clients = [] } = useSelector((state) => state.invoce);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedClient, setSelectedClient] = useState("");

    useEffect(() => {
        dispatch(startLoadingDataInvoice("invoices"));
        dispatch(startLoadingDataInvoice("cities"));
        dispatch(startLoadingDataInvoice("clients"));
    }, [dispatch]);

    const salesByCity = useMemo(() => {
        return invoices.reduce((acc, invoice) => {
            const city = cities.find((c) => c.id === invoice.cityId);
            const total = invoice.invoiceDetails.reduce(
                (sum, item) => sum + item.quantity * item.price, 0
            );
            const cityName = city?.name || "Desconocida";
            acc[cityName] = (acc[cityName] || 0) + total;
            return acc;
        }, {});
    }, [invoices, cities]);

    const articleSales = useMemo(() => {
        const result = {};
        invoices.forEach((invoice) => {
            const client = clients.find((c) => c.id === invoice.clientId);
            const clientName = client?.name || "Desconocido";
            invoice.invoiceDetails.forEach((detail) => {
                const article = detail.article;
                if (!result[article]) result[article] = {};
                result[article][clientName] = (result[article][clientName] || 0) + (detail.quantity * detail.price);
            });
        });
        return result;
    }, [invoices, clients]);

    const handlePrint = (sectionId) => {
        const printContent = document.getElementById(sectionId).innerHTML;
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Reporte</title>
                    <style>
                        @media print {
                            .no-print { display: none; }
                            body { font-family: Arial, sans-serif; margin: 20px; }
                            h2 { color: #2c3e50; border-bottom: 2px solid #ecf0f1; padding-bottom: 10px; }
                            table { width: 100%; border-collapse: collapse; margin-top: 15px; }
                            th { background-color: #f8f9fa; text-align: left; padding: 12px; border: 1px solid #dee2e6; }
                            td { padding: 12px; border: 1px solid #dee2e6; }
                            .total { font-weight: bold; color: #27ae60; }
                            /* Evita saltos de página inesperados */
                            table, tr, td, th { page-break-inside: avoid; }
                        }
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        h2 { color: #2c3e50; border-bottom: 2px solid #ecf0f1; padding-bottom: 10px; }
                        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
                        th { background-color: #f8f9fa; text-align: left; padding: 12px; border: 1px solid #dee2e6; }
                        td { padding: 12px; border: 1px solid #dee2e6; }
                        .total { font-weight: bold; color: #27ae60; }
                    </style>
                </head>
                <body>${printContent}</body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <AppLayout>
            <Grid container spacing={4}>
                {/* Reporte de Ciudades */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <div id="report-city-sales">
                            <Typography variant="h5" gutterBottom>
                                Ventas por Ciudad
                                <IconButton
                                    className="no-print"
                                    color="primary"
                                    onClick={() => handlePrint("report-city-sales")}
                                    sx={{ float: 'right' }}
                                >
                                    <PrintIcon />
                                </IconButton>
                            </Typography>

                            <FormControl fullWidth sx={filterStyles}>
                                <InputLabel className="no-print">Filtrar por ciudad</InputLabel>
                                <Select
                                    className="no-print"
                                    value={selectedCity}
                                    onChange={(e) => setSelectedCity(e.target.value)}
                                    label="Filtrar por ciudad"
                                >
                                    <MenuItem value="">Todas las ciudades</MenuItem>
                                    {cities.map((city) => (
                                        <MenuItem key={city.id} value={city.name}>
                                            {city.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TableContainer sx={tableStyles}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Ciudad</TableCell>
                                            <TableCell align="right">Total Ventas</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Object.entries(salesByCity)
                                            .filter(([city]) =>
                                                selectedCity ? city === selectedCity : true
                                            )
                                            .map(([city, total]) => (
                                                <TableRow key={city}>
                                                    <TableCell>{city}</TableCell>
                                                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                                                        {total.toLocaleString("en-US", {
                                                            style: "currency",
                                                            currency: "USD"
                                                        })}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </Paper>
                </Grid>

                {/* Reporte de Clientes/Artículos */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <div id="report-article-client-sales">
                            <Typography variant="h5" gutterBottom>
                                Ventas por Artículo/Cliente
                                <IconButton
                                    className="no-print"
                                    color="primary"
                                    onClick={() => handlePrint("report-article-client-sales")}
                                    sx={{ float: 'right' }}
                                >
                                    <PrintIcon />
                                </IconButton>
                            </Typography>

                            <FormControl fullWidth sx={filterStyles}>
                                <InputLabel className="no-print">Filtrar por cliente</InputLabel>
                                <Select
                                    className="no-print"
                                    value={selectedClient}
                                    onChange={(e) => setSelectedClient(e.target.value)}
                                    label="Filtrar por cliente"
                                >
                                    <MenuItem value="">Todos los clientes</MenuItem>
                                    {clients.map((client) => (
                                        <MenuItem key={client.id} value={client.name}>
                                            {client.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TableContainer sx={tableStyles}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Artículo</TableCell>
                                            {clients
                                                .map(c => c.name)
                                                .filter(name =>
                                                    selectedClient ? name === selectedClient : true
                                                )
                                                .map((client) => (
                                                    <TableCell key={client} align="right">{client}</TableCell>
                                                ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Object.keys(articleSales).map((article) => (
                                            <TableRow key={article}>
                                                <TableCell>{article}</TableCell>
                                                {clients
                                                    .map(c => c.name)
                                                    .filter(name =>
                                                        selectedClient ? name === selectedClient : true
                                                    )
                                                    .map((client) => (
                                                        <TableCell key={`${article}-${client}`} align="right">
                                                            {(articleSales[article]?.[client] || 0)
                                                                .toLocaleString("en-US", {
                                                                    style: "currency",
                                                                    currency: "USD"
                                                                })}
                                                        </TableCell>
                                                    ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </AppLayout>
    );
};
