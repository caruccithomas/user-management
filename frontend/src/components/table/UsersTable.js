import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { visuallyHidden } from "@mui/utils";
import { Edit, MoreVert, Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";

// Styles

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

// Table Head

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [

    {
        id: "id",
        numeric: false,
        disablePadding: true,
        label: "ID",
    },
    {
        id: "username",
        numeric: true,
        disablePadding: false,
        label: "Nombre de Usuario",
    },
    {
        id: "name",
        numeric: true,
        disablePadding: false,
        label: "Nombre y Apellido",
    }, 
    {
        id: "email",
        numeric: true,
        disablePadding: false,
        label: "Correo Electrónico",
    }
    
];

function EnhancedTableHead(props) {
    const {
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (

    <TableHead>
        <TableRow>

            <TableCell padding="checkbox">
                <Checkbox
                    color="primary"
                    indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={rowCount > 0 && numSelected === rowCount}
                    onChange={onSelectAllClick}
                    inputProps={{
                      "aria-label": "seleccionar todo",
                    }}
                />
            </TableCell>

            {headCells.map((headCell) => (
                <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? "right" : "left"}
                    padding={headCell.disablePadding ? "none" : "normal"}
                    sortDirection={orderBy === headCell.id ? order : false}
                >
                    <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : "asc"}
                        onClick={createSortHandler(headCell.id)}
                    >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                            <Box component="span" sx={visuallyHidden}>
                                {order === "desc" ? "sorted descending" : "sorted ascending"}
                            </Box>
                        ) : null}
                    </TableSortLabel>
                </TableCell>
            ))}

        </TableRow>
    </TableHead>

    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

// Table Toolbar

function EnhancedTableToolbar(props) {
    const { numSelected } = props;
    const { id } = props;
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const loadUsers = async () => {
        const res = await axios.get("http://localhost:8080/users");
        setUsers(res.data);
    };

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8080/user/${id}`);
        window.location.reload();
    };

    useEffect(() => {
        loadUsers();
    }, [users]);

    return (

        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) => alpha(
                        theme.palette.primary.main,
                        theme.palette.action.activatedOpacity
                    ),
                }),
            }}
        >
            {numSelected === 0 && (
                <Typography
                    sx={{ flex: "1 1 100%" }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Usuarios
                </Typography>
            )}
            {numSelected === 1 && (
                <Typography
                    sx={{ flex: "1 1 100%" }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} seleccionado
                </Typography>
            )}
            {(numSelected > 0 && numSelected !== 1) && (
                <Typography
                    sx={{ flex: "1 1 100%" }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} seleccionados
                </Typography>
            )}
            {numSelected > 0 ? (
                <Wrapper>
                    <Tooltip title="visualizar">
                        <Link to={`/view-user/${id}`}>
                            <IconButton>
                                <Visibility />
                            </IconButton>
                        </Link>
                    </Tooltip>
                    <Tooltip title="editar">
                        <Link to={`/edit-user/${id}`}>
                            <IconButton>
                                <Edit />
                            </IconButton>
                        </Link>
                    </Tooltip>
                    <Tooltip title="eliminar">
                        <IconButton onClick={handleClickOpen}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {`Estás a punto de eliminar el usuario con ID ${id}`}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Si deseas borrar definitivamente el usuario, confirma los cambios.
                                Si deseas cancelar esta acción, descarta los cambios.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions sx={{margin: "10px"}}>
                            <Button onClick={() => deleteUser(id)} variant="outlined">Eliminar</Button>
                            <Button onClick={handleClose} variant="contained">Cancelar</Button>
                        </DialogActions>
                    </Dialog>
                </Wrapper>
            ) : (
                <Tooltip>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    id: PropTypes.number
};

// Users Table

export default function UsersTable () {
    const [users, setUsers] = useState([]);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("id");
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = users.map((user) => user.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.

    const emptyRows = (page > 0) ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

    // Fetching data from mySQL database.

    useEffect(() => {
        const loadUsers = async () => {
            const res = await axios.get(`http://localhost:8080/users`);
            setUsers(res.data);
        };

        loadUsers();
    }, []);

    return (

        <Box sx={{ width: "100%" }}>
            <Paper elevation={3} sx={{ width: "100%", mb: 1.5 }}>
                <EnhancedTableToolbar numSelected={selected.length} id={selected[0]}/>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? "small" : "large"}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={users.length}
                        />
                        <TableBody>

                            {stableSort(users, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((user, index) => {
                                    const isItemSelected = isSelected(user.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, user.id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={user.id}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                  "aria-labelledby": labelId,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                        >
                                            {user.id}
                                        </TableCell>
                                        <TableCell align="right">{user.username}</TableCell>
                                        <TableCell align="right">{user.name}</TableCell>
                                        <TableCell align="right">{user.email}</TableCell>
                                    </TableRow>
                                );
                            })}

                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}

                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Quitar relleno entre líneas"
            />
        </Box>

    );
};