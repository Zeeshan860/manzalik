import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  // Popup,
} from '@mui/material';
// components
import { PERSONAL_HOUSES_QUERY } from '../graphql';
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { HouseListToolbar, HouseMoreMenu,HouseListHead } from '../sections/@dashboard/house';
// mock
import USERLIST from '../_mock/user';
import NewHouseModal from '../components/Newhouse';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  // { id: 'id', label: 'Name', alignRight: false },
  { id: 'province', label: 'Province', alignRight: false },
  { id: 'city', label: 'City', alignRight: false },
  { id: 'area', label: 'Area', alignRight: false },
  { id: 'rentalPrice', label: 'Rental Price', alignRight: false },
  { id: 'furnished', label: 'Furnished', alignRight: false },
  { id: 'reserved', label: 'Reserved', alignRight: false },

  { id: '' },
];

// ----------------------------------------------------------------------

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
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function PersonalHouses() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('province');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open, setOpen] = useState(false);

  const [modalData, setModalData] = useState(null);

  const { data, refetch } = useQuery(PERSONAL_HOUSES_QUERY);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  useEffect(() => {
    if (!open) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
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
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
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

  const onEditClick = (data) => {
    setModalData(data);
    setOpen(true);
  }

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };
  const personalHouses = data?.getPersonalHouses || [];
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - personalHouses.length) : 0;
  const filteredUsers = applySortFilter(personalHouses, getComparator(order, orderBy), filterName);
  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Personal Houses">
      <NewHouseModal open={open} setOpen={setOpen} data={modalData}/>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Personal Houses
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setModalData(null)
              setOpen(true);
            }}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New House
          </Button>
        </Stack>

        <Card>
          <HouseListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <HouseListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, city, area, furnished, reserved,  rentalPrice, province, image } = row;
                    const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                       
                        <TableCell component="th" scope="row" padding="10px">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={image} />
                            <Typography variant="subtitle2" noWrap>
                              {province}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{city}</TableCell>
                        <TableCell align="left">{area}</TableCell>
                        <TableCell align="left">{rentalPrice}</TableCell>
                        <TableCell align="left">
                          <Label variant="ghost" color={furnished ? 'warning' : 'info'}>
                            {furnished ? "Furnished" : "Non Furnished"}
                          </Label>
                        </TableCell>
                        <TableCell align="left">
                          <Label variant="ghost" color={reserved ? 'error' : 'success'}>
                            {reserved ? "Reserved" : "Available For Rent"}
                          </Label>
                        </TableCell>

                        <TableCell align="right">
                          <HouseMoreMenu data={row} onEditClick={onEditClick} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
