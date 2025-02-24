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
        const printContent = document.getElementById(sectionId);
        const printWindow = window.open('', '_blank');

        // Obtener fecha actual formateada
        const today = new Date().toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });

        // Plantilla de factura
        const invoiceTemplate = `
    <html>
        <head>
            <title>Reporte de Ventas</title>
            <style>
                /* Estilos generales */
                body {
                    font-family: 'Arial', sans-serif;
                    margin: 1.5cm;
                    color: #333;
                }
                
                /* Encabezado */
                .invoice-header {
                    border-bottom: 2px solid #000;
                    padding-bottom: 20px;
                    margin-bottom: 30px;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                }
                
                .company-info {
                    width: 60%;
                }
                
                .logo {
                    max-width: 150px;
                    margin-bottom: 15px;
                }
                
                /* Cuerpo del reporte */
                .report-title {
                    text-align: center;
                    margin: 30px 0;
                    font-size: 1.8em;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                }
                
                /* Tablas */
                .invoice-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 25px 0;
                }
                
                .invoice-table th {
                    background-color: #f8f9fa;
                    border-bottom: 2px solid #000;
                    padding: 12px;
                    text-align: left;
                }
                
                .invoice-table td {
                    padding: 12px;
                    border-bottom: 1px solid #eee;
                }
                
                .total-row {
                    font-weight: bold;
                    background-color: #f8f9fa;
                }
                
                /* Pie de página */
                .footer {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    padding: 20px;
                    text-align: center;
                    font-size: 0.9em;
                    border-top: 1px solid #ddd;
                    background: white;
                }
                
                /* Estilos específicos para impresión */
                @media print {
                    @page {
                        margin: 1.5cm;
                        size: A4 portrait;
                    }
                    
                    .footer {
                        position: fixed;
                    }
                        table {
                            width: 100%;
                            border-collapse: separate;
                            border-spacing: 0;
                            margin-top: 15px;
                            border-radius: 8px;
                            overflow: hidden;
                            background-color: #f9f9f9;
                        }

                        th, td {
                            padding: 12px;
                            text-align: left;
                            border: 1px solid #dee2e6;
                            border-radius: 5px;
                        }

                        th {
                            background-color: #f8f9fa;
                            font-weight: bold;
                        }

                        td {
                            color: #555;
                        }

                        tr:nth-child(even) { background-color: #f9f9f9; }
                        tr:nth-child(odd) { background-color: #ffffff; }

                        /* Estilos de la fila total */
                        .total {
                            font-weight: bold;
                            color: #27ae60;
                            background-color: #f1f8e9;
                        }

                        /* Evita saltos de página dentro de la tabla */
                        table, tr, td, th { page-break-inside: avoid; }
                    }

                    body { font-family: Arial, sans-serif; margin: 20px; }
                    h2 { color: #2c3e50; border-bottom: 2px solid #ecf0f1; padding-bottom: 10px; }

                    /* Ocultar elementos no necesarios en la impresión */
                    .no-print {
                        display: none;
                    }
                }
            </style>
        </head>
        <body>
            <header class="invoice-header">
                <div class="company-info">
                    <h1>Mi Empresa S.A.</h1>
                    <p>RUC: 12345678901<br>
                    Av. Principal 123, Ciudad<br>
                    Tel: (01) 555-1234<br>
                    ventas@miempresa.com</p>
                </div>
                <div class="invoice-meta">
                    <p><strong>Fecha de emisión:</strong> ${today}</p>
                    <p><strong>Tipo de reporte:</strong> ${sectionId.includes('city') ? 'Ventas por Ciudad' : 'Ventas por Cliente/Artículo'}</p>
                </div>
            </header>
            
            <h2 class="report-title">${sectionId.includes('city') ? 'Reporte de Ventas por Ciudad' : 'Reporte de Ventas por Cliente y Artículo'}</h2>
            
            <!-- Aquí se incluye el contenido del reporte -->
            <div class="report-content">
                ${printContent.innerHTML}
            </div>

            <footer class="footer">
                <p>Sistema de Gestión Comercial - ${today} | Página 1 de 1</p>
            </footer>
        </body>
    </html>
    `;

        printWindow.document.write(invoiceTemplate);
        printWindow.document.close();

        // Retrasar ligeramente la impresión para que carguen los estilos
        setTimeout(() => {
            printWindow.print();
        }, 300);
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
