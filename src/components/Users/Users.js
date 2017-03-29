import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Table, Pagination, Popconfirm, Button } from 'antd'
import styles from './Users.css'
import { PAGE_SIZE } from '../../constants/Users'
import UserEditModal from './UserEditModal'

const Users = ({ dispatch, list: dataSource, total, page: current, loading }) => {
  const createHandler = (values) => {
    dispatch({
      type: 'users/create',
      payload: { values }
    })
  }

  const editHandler = (id, values) => {
    dispatch({
      type: 'users/patch',
      payload: { id, values }
    })
  }

  const deleteHandler = (id) => {
    dispatch({
      type: 'users/remove',
      payload: { id }
    })
  }

  const pageChangeHandler = (page) => {
    dispatch(routerRedux.push({
      pathname: 'users',
      query: { page }
    }))
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href=''>{text}</a>
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website'
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <UserEditModal record={record} onOk={editHandler}>
            <a>Edit</a>
          </UserEditModal>
          <Popconfirm title='Confirm to delete?' onConfirm={() => { deleteHandler(record.id) }}>
            <a href=''>Delete</a>
          </Popconfirm>
        </span>
      )
    }
  ]

  return (
    <div className={styles.normal}>
      <div className={styles.create}>
        <UserEditModal record={{}} onOk={createHandler}>
          <Button type='primary'>Create User</Button>
        </UserEditModal>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey={record => record.id}
          pagination={false}
        />
        <Pagination
          className='ant-table-pagination'
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={pageChangeHandler}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { list, total, page } = state.users
  const { models: { users } } = state.loading
  return {
    list,
    total,
    page,
    loading: users
  }
}

Users.propTypes = {
  dispatch: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  total: PropTypes.number,
  page: PropTypes.number,
  loading: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(Users)
