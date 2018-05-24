import * as React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import FilterListIcon from '@material-ui/icons/FilterList'

export interface IHeadProps {
  numSelected: number
  order: 'asc' | 'desc' | undefined
  orderBy: string
  rowCount: number
  // from Graphql
  columnData: Array<{
    id: string
    numeric: boolean
    disablePadding: boolean
    label: string
  }>
  onRequestSort (
    property: string
  ): void
  onSelectAllClick (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void
}

export interface IToolbarProps {
  numSelected: number
}

export interface ITableState {
  order: 'asc' | 'desc' | undefined
  orderBy: string
  selected: Array<undefined | number>
  // from GraphQL
  data: Array<IDatum>
  page: number
  rowsPerPage: number
}

export interface IDatum {
  id: number
  name: string
  calories: number
  fat: number
  carbs: number
  protein: number
}

function EnhancedTableHead (props: IHeadProps): JSX.Element {
  const {
    numSelected,
    onSelectAllClick,
    order,
    orderBy,
    rowCount,
    columnData
  } = props

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox' style={{
          background: 'white',
          boxShadow: '0 3px 2px -2px grey',
          position: 'sticky',
          top: '64px',
          zIndex: 999
        }}>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected > rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {columnData && columnData[0] && columnData.map((
          datum,
          i: number
        ) => (
            <TableCell
              key={`${i}--${datum.id}`}
              numeric={datum.numeric}
              padding={datum.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === datum.id ? order : false}
              style={{
                background: 'white',
                boxShadow: '0 3px 2px -2px grey',
                position: 'sticky',
                top: '64px'
              }}
            >
              <Tooltip
                title='Sort'
                placement={datum.numeric ? 'bottom-end' : 'bottom-start'}
                enterDelay={300}
              >
                <TableSortLabel
                  active={orderBy === datum.id}
                  direction={order}
                  onClick={() => props.onRequestSort(datum.id)}
                >
                  {datum.label}
                </TableSortLabel>
              </Tooltip>
            </TableCell>
          ))}
      </TableRow>
    </TableHead>
  )
}

function EnhancedTableToolbar (props: IToolbarProps) {
  const { numSelected } = props
  return (
    <Toolbar style={{
      background: '#eee',
      position: 'sticky',
      top: 0,
      zIndex: 9999,
    }}>
      <div>
        {numSelected > 0
          ? (
            <Typography
              color='inherit'
              variant='subheading'
            >
              {numSelected} selected
          </Typography>
          ) : (
            <Typography variant='title'>
              Nutrition
          </Typography>
          )}
      </div>
      <div style={{
        marginTop: '1em'
      }} />
      <div>
        {numSelected > 0 ? (
          <Tooltip title='Delete'>
            <IconButton aria-label='Delete'>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
            <Tooltip title='Filter list'>
              <IconButton aria-label='Filter list'>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
      </div>
    </Toolbar>
  )
}

let counter = 0
function createDatum (
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
): IDatum {
  counter++
  return {
    calories,
    carbs,
    fat,
    id: counter,
    name,
    protein
  }
}

const initialState: ITableState = {
  data: [
    createDatum('Cupcake', 305, 3.7, 67, 4.3),
    createDatum('Donut', 452, 25.0, 51, 4.9),
    createDatum('Eclair', 262, 16.0, 24, 6.0),
    createDatum('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createDatum('Gingerbread', 356, 16.0, 49, 3.9),
    createDatum('Honeycomb', 408, 3.2, 87, 6.5),
    createDatum('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createDatum('Jelly Bean', 375, 0.0, 94, 0.0),
    createDatum('KitKat', 518, 26.0, 65, 7.0),
    createDatum('Lollipop', 392, 0.2, 98, 0.0),
    createDatum('Marshmallow', 318, 0, 81, 2.0),
    createDatum('Nougat', 360, 19.0, 9, 37.0),
    createDatum('Oreo', 437, 18.0, 63, 4.0),
  ].sort((a, b) => (a.calories - b.calories)),
  order: 'asc',
  orderBy: 'calories',
  page: 0,
  rowsPerPage: 5,
  selected: []
}

export class EnhancedTable extends React.Component<any, ITableState> {
  public state = initialState

  public handleRequestSort = (
    property: string
  ): void => {
    const { order, orderBy } = this.state
    let newOrder: 'asc' | 'desc' | undefined = 'desc'

    if (orderBy === property && order === 'desc') {
      newOrder = 'asc'
    }

    const data = newOrder === 'desc'
      ? this.state.data.sort((a, b) => (a[property] - b[property]))
      : this.state.data.sort((a, b) => (b[property] - a[property]))

    this.setState({
      data,
      order: newOrder,
      orderBy: property
    })
  }

  public handleSelectAllClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void => {
    if (checked) {
      this.setState({
        selected: this.state.data.map((n) => n.id)
      })
      return
    }

    this.setState({
      selected: []
    })
  }

  public handleSelectClick = (
    event: React.MouseEvent<HTMLTableRowElement>,
    id: number
  ): void => {
    const { selected } = this.state
    const selectedIndex = selected.indexOf(id)
    let newSelected: Array<undefined | number> = []

    if (selectedIndex === -1) {
      newSelected = [...selected, id]
    } else if (selectedIndex === 0) {
      newSelected = [...selected.slice(1)]
    } else if (selectedIndex === selected[selected.length - 1]) {
      newSelected = [...selected.slice(0, -1)]
    } else if (selectedIndex > 0) {
      newSelected = [
        ...selected.slice(0, selectedIndex),
        ...selected.slice(selectedIndex + 1)
      ]
    }
    this.setState({ selected: newSelected })
  }

  public handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement>,
    page: number
  ): void => {
    this.setState({ page })
  }

  public handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    this.setState({ rowsPerPage: +event.target.value })
  }

  public declareSelected = (
    id: number
  ): boolean => this.state.selected.indexOf(id) !== -1

  public render () {
    const {
      data,
      order,
      orderBy,
      selected,
      rowsPerPage,
      page
    } = this.state
    const emptyRows = (
      rowsPerPage - Math.min(
        rowsPerPage,
        data.length - page * rowsPerPage
      )
    )

    return (
      <Paper>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div>
          <Table>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
              columnData={[
                {
                  disablePadding: true,
                  id: 'name',
                  label: 'Dessert (100g serving)',
                  numeric: false
                }, {
                  disablePadding: false,
                  id: 'calories',
                  label: 'Calories',
                  numeric: true
                }, {
                  disablePadding: false,
                  id: 'fat',
                  label: 'Fat (g)',
                  numeric: true
                }, {
                  disablePadding: false,
                  id: 'carbs',
                  label: 'Carbs (g)',
                  numeric: true
                }, {
                  disablePadding: false,
                  id: 'protein',
                  label: 'Protein (g)',
                  numeric: true
                }
              ]}
            />
            <TableBody style={{
              zIndex: -1
            }}>
              {data.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              ).map((datum) => {
                const isSelected = this.declareSelected(datum.id)
                return (
                  <TableRow
                    hover
                    onClick={(event) => this.handleSelectClick(
                      event,
                      datum.id
                    )}
                    role='checkbox'
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={datum.id}
                    selected={isSelected}
                  >
                    <TableCell padding='checkbox'>
                      <Checkbox checked={isSelected} />
                    </TableCell>
                    <TableCell padding='none'>{datum.name}</TableCell>
                    <TableCell numeric>{datum.calories}</TableCell>
                    <TableCell numeric>{datum.fat}</TableCell>
                    <TableCell numeric>{datum.carbs}</TableCell>
                    <TableCell numeric>{datum.protein}</TableCell>
                  </TableRow>
                )
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component='div'
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page'
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page'
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          style={{
            background: 'white',
            bottom: 0,
            boxShadow: '0 -1px 2px grey',
            position: 'sticky'
          }}
        />
      </Paper>
    )
  }
}